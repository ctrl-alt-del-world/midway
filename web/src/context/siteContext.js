{
/*
  Orginal Author of this file: https://github.com/thetrevorharmon
  Orginal File: https://github.com/thetrevorharmon/sell-things-fast/blob/master/src/context/StoreContext.js
*/
}

import React, { useState, useEffect, useContext } from "react"
import Client from "shopify-buy"

const SHOPIFY_CHECKOUT_STORAGE_KEY = "shopify_checkout_id"

const client = Client.buildClient({
  storefrontAccessToken: '919118b51c64eb39f9627dd1fa0bd936',
  domain: 'midway-sanity.myshopify.com',
})

const initialStoreState = {
  client,
  isAdding: false,
  checkout: { lineItems: [] },
}

const StoreContext = React.createContext({
  store: initialStoreState,
  setStore: () => null,
})

function createNewCheckout(store) {
  return store.client.checkout.create()
}

function fetchCheckout(store, id) {
  return store.client.checkout.fetch(id)
}

function setCheckoutInState(checkout, setStore) {
  const isBrowser = typeof window !== "undefined"
  if (isBrowser) {
    localStorage.setItem(SHOPIFY_CHECKOUT_STORAGE_KEY, checkout.id)
  }

  setStore(prevState => {
    return { ...prevState, checkout }
  })
}

const StoreContextProvider = ({ children }) => {
  const [store, setStore] = useState(initialStoreState)

  useEffect(() => {
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
  }, [store, setStore, store.client.checkout])

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

  const count = checkout.lineItems.reduce(
    (runningTotal, item) => item.quantity + runningTotal,
    0
  )

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

  async function addItemToCart(variantId, quantity) {
    if (variantId === "" || !quantity) {
      console.error("Both a size and quantity are required.")
      return
    }

    setStore(prevState => {
      return { ...prevState, isAdding: true }
    })

    const checkoutId = checkout.id
    const lineItemsToAdd = [{ variantId, quantity: parseInt(quantity, 10) }]

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

export {
  StoreContextProvider,
  useAddItemToCart,
  useStore,
  useCartCount,
  useCartItems,
  useCartTotals,
  useRemoveItemFromCart,
  useCheckout,
}