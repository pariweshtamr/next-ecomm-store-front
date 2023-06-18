import { createContext, useEffect, useState } from "react"

export const CartContext = createContext({})

export const CartContextProvider = ({ children }) => {
  const ls = typeof window !== "undefined" ? window.localStorage : null
  const [cartProducts, setCartProducts] = useState([])

  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls?.setItem("cart", JSON.stringify(cartProducts))
    }
  }, [cartProducts, ls])

  useEffect(() => {
    if (ls?.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart")))
    }
  }, [ls])

  const addProductToCart = (productId) => {
    setCartProducts((prev) => [...prev, productId])
  }
  return (
    <CartContext.Provider
      value={{ cartProducts, setCartProducts, addProductToCart }}
    >
      {children}
    </CartContext.Provider>
  )
}
