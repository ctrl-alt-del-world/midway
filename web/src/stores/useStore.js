import create from 'zustand'

import {Shopify} from 'src/api/shopify'
import cookie from 'js-cookie'
import queryString from 'query-string'

export const SHOPIFY_CHECKOUT_KEY = 'site_checkout_id'

//
// === Cart Count
//

export const handleCount = (lineItems) => {
	let count = 0
	if (lineItems) {
		count = lineItems.reduce(
			(runningTotal, item) => item.quantity + runningTotal,
			0
		)
	}
	return count
}


//
// === Initial State ===
//

export const getInitialState = (set, get) => ({

	isCartOpen: false,

  customerName: '',
  
	cartId: null,
	cartSession: null,
	cart: null,

	cartCount: 0,

	isFetchingCart: false,
	isUpdatingCart: false
});

export const initializeCartSession = (set, get) => async () => {
	const getCheckout = fetchCheckout(set, get);
	const makeCheckout = createCheckout(set, get);
	
  const cartId = cookie.get(SHOPIFY_CHECKOUT_KEY)

	set({
		isFetchingCart: true,
		cartId
	});

	if (cartId) {
		try {
			await getCheckout()
		} catch(error) {
			console.warn(error)
			set({
				isFetchingCart: false,
			});
		}
	} else {
		try {
			await makeCheckout()
		} catch(error) {
			console.warn(error)
			set({
				isFetchingCart: false,
			});
		}
	}
};

export const fetchCheckout = (set, get) => async () => {
	const makeCheckout = createCheckout(set, get)
	const {cartId} = get()
	try {
		const cart = await Shopify.checkout.fetch(cartId)
		if (cart && !cart.completedAt) {
			cookie.set(SHOPIFY_CHECKOUT_KEY, cart.id.toString(), {expires: 25})
			set({
				cart,
				cartId,
				cartCount: handleCount(cart.lineItems),
				isFetchingCart: false
			})
		} else {
			makeCheckout()
		}
	} catch(error) {
		console.warn(error)
	}
}

export const createCheckout = (set, get) => async () => {

	const referralUser = queryString.parse(location.search)
	try {
		let cart = await Shopify.checkout.create()
		set({
			cart,
			cartId: cart.id,
			cartCount: handleCount(cart.lineItems),
			isFetchingCart: false
		})
		cookie.set(SHOPIFY_CHECKOUT_KEY, cart.id.toString(), {expires: 25})
	} catch (error) {
		console.warn(error)
	}
}

export const toggleCart = (set, get) => () => {
	const {isCartOpen} = get()

	set({
		isCartOpen: !isCartOpen
	})
}

// Accepts an Array of items 

export const addItemsToCart = (set, get) => async (lineItems) => {
	const {cartId} = get()
	set({
		isUpdatingCart: true
	})

	try {
		const cart = await Shopify.checkout.addLineItems(
      cartId,
      lineItems
    )

		set({
			cart,
			cartCount: handleCount(cart.lineItems),
			isCartOpen: true
		})
	} catch (err) {
		console.warn(err)
	}
	set({
		isUpdatingCart: false
	})
}

export const updateItemsInCart = (set, get) => async (items) => {
	const { cartId } = get()

	set({
		isUpdatingCart: true
	})

	try {
		const cart = await Shopify.checkout.updateLineItems(cartId, items)

		set({
			cart,
			cartCount: handleCount(cart.lineItems),
		})
	} catch (err) {
		console.warn(err)
	}

	set({
		isUpdatingCart: false
	})
}

//
// === useStore interface ===
//

export default create((...args) => ({
	// State
	...getInitialState(...args),

	// Actions
	initializeCartSession: initializeCartSession(...args),
	fetchCheckout: fetchCheckout(...args),
	createCheckout: createCheckout(...args),
	toggleCart: toggleCart(...args),
	addItemsToCart: addItemsToCart(...args),
	updateItemsInCart: updateItemsInCart(...args)
}));
