import { addItemToCart, removeItemFromCart } from "./cartSlice"

export const addItemToCartAction = (id) => async (dispatch) => {
  try {
    dispatch(addItemToCart(id))
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    }
  }
}
export const removeItemFromCartAction = (id) => async (dispatch) => {
  try {
    dispatch(removeItemFromCart(id))
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    }
  }
}
