import { toast } from "react-hot-toast"
import { addItemToCart, removeItemFromCart } from "./cartSlice"

const options = {
  duration: 2500,

  iconTheme: {
    primary: "#499c59",
  },
  ariaProps: {
    role: "status",
    "aria-live": "polite",
  },
}
export const addItemToCartAction = (product) => async (dispatch) => {
  try {
    dispatch(addItemToCart(product._id)) &&
      toast.success(`${product.title} added to cart!`)
  } catch (error) {
    toast.error(`Unable to add product to cart!`)

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
