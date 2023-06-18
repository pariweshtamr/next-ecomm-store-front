import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  cartItems: [],
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setInitialCart: (state, { payload }) => {
      state.cartItems = payload
    },
    addItemToCart: (state, { payload }) => {
      state.cartItems.push(payload)
      localStorage.setItem("cart", JSON.stringify(state.cartItems))
    },
    removeItemFromCart: (state, { payload }) => {
      const index = state.cartItems.indexOf(payload)
      if (index !== -1) {
        state.cartItems = state.cartItems.filter((value, i) => i !== index)
      }

      localStorage.setItem("cart", JSON.stringify(state.cartItems))
    },
    emptyCart: (state) => {
      state.cartItems = []
      localStorage.removeItem("cart")
    },
  },
})

const { actions, reducer } = cartSlice

export const { addItemToCart, removeItemFromCart, setInitialCart, emptyCart } =
  actions

export default reducer
