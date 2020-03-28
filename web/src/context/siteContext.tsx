{
/*
  Orginal Author of this file: https://github.com/thetrevorharmon
  Orginal File: https://github.com/thetrevorharmon/sell-things-fast/blob/master/src/context/StoreContext.js

  TYPED out by Issac: https://gist.github.com/isaac-martin

  Extended by Kevin Green for ✨
*/
}

import React, { useState, useEffect, useContext } from "react"
import { Checkout } from "shopify-storefront-api-typings"
import ShopifyClient from "shopify-buy"

const SHOPIFY_CHECKOUT_STORAGE_KEY = "shopify_checkout_id"

const client = ShopifyClient.buildClient({
  storefrontAccessToken: '919118b51c64eb39f9627dd1fa0bd936',
  domain: 'midway-sanity.myshopify.com',
})

interface InitialStore {
  client: ShopifyClient
  isAdding: boolean
  cartIsOpen: boolean
  navIsOpen: boolean
  page: null
  checkout: Checkout
}

const initialStoreState = {
  client,
  isAdding: false,
  cartIsOpen: false,
  page: null,
  navIsOpen: false,
  checkout: {} as Checkout
}

const StoreContext = React.createContext({
  store: initialStoreState,
  setStore: () => null,
})

const createNewCheckout = (store: InitialStore): Checkout => {
  return store.client.checkout.create()
}

const fetchCheckout = (store: InitialStore, id: string): Checkout => {
  return store.client.checkout.fetch(id)
}

const setCheckoutInState = (checkout: Checkout, setStore: any) => {
  const isBrowser = typeof window !== "undefined"
  if (isBrowser) {
    localStorage.setItem(SHOPIFY_CHECKOUT_STORAGE_KEY, checkout.id)
  }

  setStore((prevState: InitialStore) => {
    return { ...prevState, checkout }
  })
}

const StoreContextProvider = ({ children }: { children: any }) => {
  const [store, setStore] = useState(initialStoreState)
  const [initStore, setInitStore] = useState(false)

  useEffect(() => {
    if (initStore === false) {
      const initializeCheckout = async () => {
        // Check for an existing cart.
        const isBrowser = typeof window !== "undefined"
        const existingCheckoutId = isBrowser
          ? localStorage.getItem(SHOPIFY_CHECKOUT_STORAGE_KEY)
          : null

        if (existingCheckoutId) {
          try {
            const checkout = await fetchCheckout(store, existingCheckoutId)
            // Make sure this cart hasn’t already been purchased.
            console.log('sup checkout?', checkout)
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

      initializeCheckout()
      setInitStore(true)
    }
  }, [store, setStore, store.client.checkout, initStore])

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
      (runningTotal, item) => item.quantity + runningTotal,
      0
    )
  }

  return count
}

function useCartTotals() {
  const {
    store: { checkout },
  } = useContext(StoreContext)

  const tax = checkout.totalTaxV2
    ? `$${Number(checkout.totalTaxV2.amount).toFixed(2)}`
    : "-"
  const total = checkout.totalPriceV2
    ? `$${Number(checkout.totalPriceV2.amount).toFixed(2)}`
    : "-"

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

function useAddItemToCart() {
  const {
    store: { checkout, client },
    setStore,
  } = useContext(StoreContext)

  async function addItemToCart(variantId: string, quantity: number, attributes: []) {
    console.log(variantId, quantity)
    if (variantId === "" || !quantity) {
      console.error("Both a size and quantity are required.")
      return
    }

    setStore(prevState => {
      return { ...prevState, isAdding: true }
    })

    const checkoutId = checkout.id
    const lineItemsToAdd = [{ variantId, quantity, customAttributes: attributes }]

    const newCheckout = await client.checkout.addLineItems(
      checkoutId,
      lineItemsToAdd
    )

    setStore(prevState => {
      return { ...prevState, checkout: newCheckout, isAdding: false }
    })
  }

  return addItemToCart
}

function useRemoveItemFromCart() {
  const {
    store: { client, checkout },
    setStore,
  } = useContext(StoreContext)

  async function removeItemFromCart(itemId) {
    const newCheckout = await client.checkout.removeLineItems(checkout.id, [
      itemId,
    ])

    setStore(prevState => {
      return { ...prevState, checkout: newCheckout }
    })
  }

  return removeItemFromCart
}

function useCheckout() {
  const {
    store: { checkout },
  } = useContext(StoreContext)

  return () => {
    window.open(checkout.webUrl)
  }
}

function useSetPage() {
  const {
    store: { page },
    setStore
  } = useContext(StoreContext)
  async function setPage(page) {
    setStore(prevState => {
      return { ...prevState, page }
    })
  }
  return setPage
}


function useToggleCart() {
  const {
    store: { cartIsOpen },
    setStore
  } = useContext(StoreContext)

  async function toggleCart() {
    setStore(prevState => {
      return { ...prevState, cartIsOpen: !cartIsOpen }
    })
  }

  return toggleCart
}

export {
  client,
  StoreContextProvider,
  useAddItemToCart,
  useStore,
  useCartCount,
  useCartItems,
  useCartTotals,
  useSetPage,
  useRemoveItemFromCart,
  useCheckout,
  useToggleCart
}