{
/*
  Orginal Author of this file: https://github.com/thetrevorharmon
  Orginal File: https://github.com/thetrevorharmon/sell-things-fast/blob/master/src/context/StoreContext.js

  TYPED out by Issac: https://gist.github.com/isaac-martin

  Extended by Kevin Green for ✨
*/
}

import React, { useState, useEffect, useContext } from 'react'
import { Checkout } from 'shopify-storefront-api-typings'
import ShopifyClient from 'shopify-buy'
import cookie from 'js-cookie'

const SHOPIFY_CHECKOUT_STORAGE_KEY = 'shopify_checkout_id'

// @ts-ignore
const client = ShopifyClient.buildClient({
  storefrontAccessToken: process.env.GATSBY_SHOPIFY_STOREFRONT_TOKEN,
  domain: process.env.GATSBY_SHOPIFY_STORE
})

interface InitialStore {
  shopifyClient: ShopifyClient
  isAdding: boolean
  cartIsOpen: boolean
  navIsOpen: boolean
  page: undefined
  orders: any[]
  customerEmail: string | undefined
  customerName: string | undefined
  customerToken: string | undefined
  checkout: Checkout
}

const initialStoreState = {
  shopifyClient: client,
  isAdding: false,
  cartIsOpen: false,
  page: undefined,
  customerEmail: undefined,
  customerName: undefined,
  customerToken: undefined,
  orders: [],
  navIsOpen: false,
  checkout: {
    lineItems: []
  } as Checkout
}

const StoreContext = React.createContext({
  store: initialStoreState,
  setStore: () => null,
})

const createNewCheckout = (store: InitialStore): Checkout => {
  return store.shopifyClient.checkout.create()
}

const fetchCheckout = (store: InitialStore, id: string): Checkout => {
  return store.shopifyClient.checkout.fetch(id)
}

const setCheckoutInState = (checkout: Checkout, setStore: any) => {
  const isBrowser = typeof window !== 'undefined'
  if (isBrowser) {
    localStorage.setItem(SHOPIFY_CHECKOUT_STORAGE_KEY, checkout.id)
  }

  setStore((prevState: InitialStore) => {
    return { ...prevState, checkout }
  })
}

const initCustomer = (setStore: any) => {
  const customerEmail = cookie.get('customer_email')
  const customerToken = cookie.get('customer_token')
  const customerName = cookie.get('customer_firstName')

  if (customerEmail && customerToken && customerName) {
    setStore((prevState: InitialStore) => {
      return { ...prevState, customerEmail, customerToken, customerName }
    })
  }
}

const StoreContextProvider = ({ children }: { children: any }) => {
  const [store, setStore] = useState(initialStoreState)
  const [initStore, setInitStore] = useState(false)

  useEffect(() => {
    if (initStore === false) {
      const initializeCheckout = async () => {
        // Check for an existing cart.
        const isBrowser = typeof window !== 'undefined'
        const existingCheckoutId = isBrowser
          ? localStorage.getItem(SHOPIFY_CHECKOUT_STORAGE_KEY)
          : null

        if (existingCheckoutId) {
          try {
            const checkout = await fetchCheckout(store, existingCheckoutId)
            
            // Make sure none of the items in this cart have been deleted from Shopify.
            if (checkout.lineItems.some((lineItem) => !lineItem.variant)) {
              throw new Error(
                'Invalid line item in checkout. This variant was probably deleted from Shopify',
              )
            }
            
            // Make sure this cart hasn’t already been purchased.
            if (!checkout.completedAt) {
              setCheckoutInState(checkout, setStore)
              return
            }
          } catch (e) {
            localStorage.setItem(SHOPIFY_CHECKOUT_STORAGE_KEY, null)
          }
        }

        const newCheckout = await createNewCheckout(store)
        setCheckoutInState(newCheckout, setStore)
      }
      initCustomer(setStore)
      initializeCheckout()
      setInitStore(true)
    }
  }, [store, setStore, store.shopifyClient.checkout, initStore])

  return (
    <StoreContext.Provider
      value={{
        store,
        setStore,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

function useStore() {
  const { store } = useContext(StoreContext)
  return store
}

function useCartCount() {
  const {
    store: { checkout },
  } = useContext(StoreContext)

  let count = 0
  if (checkout.lineItems) {
    count = checkout.lineItems.reduce(
      (runningTotal: number, item: any) => item.quantity + runningTotal,
      0
    )
  }

  return count
}

const setCustomerInState = () => {
  const {
    setStore
  }: { setStore: any } = useContext(StoreContext)

  async function updateCustomerInState() {
    const customerEmail = cookie.get('customer_email')
    const customerToken = cookie.get('customer_token')
    const customerName = cookie.get('customer_firstName')
    setStore((prevState: InitialStore) => {
      return { ...prevState, customerEmail, customerToken, customerName }
    })
  }

  return updateCustomerInState
}

function useCartTotals() {
  const {
    store: { checkout },
  } = useContext(StoreContext)

  const tax = checkout.totalTaxV2
    ? `${Number(checkout.totalTaxV2.amount).toFixed(2)}`
    : '-'
  const total = checkout.totalPriceV2
    ? `${Number(checkout.totalPriceV2.amount).toFixed(2)}`
    : '-'

  return {
    tax,
    total,
  }
}

function useCartItems() {
  const {
    store: { checkout },
  } = useContext(StoreContext)

  return checkout.lineItems
}

function useCustomer() {
  const {
    store: { customerEmail, customerName, customerToken }
  } = useContext(StoreContext)

  return { customerEmail, customerName, customerToken }
}

function useAddItemToCart() {
  // @ts-ignore
  const {
    store: { checkout, shopifyClient },
    setStore,
  }: { store: InitialStore, setStore: any } = useContext(StoreContext)

  async function addItemToCart(variantId: string, quantity: number, attributes?: []) {
    if (variantId === '' || !quantity) {
      console.error('Both a size and quantity are required.')
      return
    }

    setStore((prevState: InitialStore) => {
      return { ...prevState, isAdding: true }
    })

    const checkoutId = checkout.id
    const lineItemsToAdd = [{ variantId, quantity, customAttributes: attributes }]

    const newCheckout = await shopifyClient.checkout.addLineItems(
      checkoutId,
      lineItemsToAdd
    )

    setStore((prevState: InitialStore) => {
      return { ...prevState, checkout: newCheckout, cartIsOpen: true, isAdding: false }
    })
  }

  return addItemToCart
}

function useRemoveItemFromCart() {
  const {
    store: { checkout, shopifyClient },
    setStore,
  }: {
    store: InitialStore
    setStore: any
  } = useContext(StoreContext)

  async function removeItemFromCart(itemId) {
    const newCheckout = await shopifyClient.checkout.removeLineItems(checkout.id, [
      itemId,
    ])

    setStore((prevState: InitialStore) => {
      return { ...prevState, checkout: newCheckout }
    })
  }

  return removeItemFromCart
}

function useUpdateItemsFromCart() {
  const {
    store: { checkout, shopifyClient },
    setStore,
  }: {
    store: InitialStore
    setStore: any
  } = useContext(StoreContext)

  async function updateItemsFromCart(items: any) {
    items = [].concat(items)
    const newCheckout = await shopifyClient.checkout.updateLineItems(checkout.id, items)

    setStore((prevState: InitialStore) => {
      return { ...prevState, checkout: newCheckout }
    })
  }

  return updateItemsFromCart
}

function useCheckout() {
  const {
    store: { checkout },
  }: {
    store: InitialStore
  } = useContext(StoreContext)

  return () => {
    window.open(checkout.webUrl)
  }
}

function useSetPage() {
  const {
    setStore
  }: {
    setStore: any
  } = useContext(StoreContext)
  async function setPage(page: string) {
    setStore((prevState: InitialStore) => {
      return { ...prevState, page }
    })
  }
  return setPage
}


function useToggleCart() {
  const {
    store: { cartIsOpen },
    setStore
  }: {
    store: InitialStore
    setStore: any
  } = useContext(StoreContext)

  async function toggleCart() {
    setStore((prevState: InitialStore) => {
      return { ...prevState, cartIsOpen: !cartIsOpen }
    })
  }

  return toggleCart
}

export {
  client,
  StoreContextProvider,
  setCustomerInState,
  useAddItemToCart,
  useStore,
  useCustomer,
  useCartCount,
  useCartItems,
  useCartTotals,
  useSetPage,
  useRemoveItemFromCart,
  useUpdateItemsFromCart,
  useCheckout,
  useToggleCart
}
