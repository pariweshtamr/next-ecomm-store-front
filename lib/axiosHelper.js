import axios from "axios"

const apiRootUrl = "/api"
const productEp = apiRootUrl + "/product"
const checkoutEp = apiRootUrl + "/checkout"
const customerEp = apiRootUrl + "/customer"
const wishlistEp = apiRootUrl + "/wishlist"
const orderEp = apiRootUrl + "/order"

const axiosProcessor = async ({ url, method, objData }) => {
  try {
    const { data } = await axios({
      method,
      url,
      data: objData,
    })
    return data
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    }
  }
}

// get orders
export const getAllOrders = async () => {
  try {
    const obj = {
      method: "GET",
      url: orderEp,
    }
    return await axiosProcessor(obj)
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    }
  }
}

// get wished products
export const getProdsOnWishList = async () => {
  try {
    const obj = {
      method: "GET",
      url: wishlistEp,
    }
    return await axiosProcessor(obj)
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    }
  }
}

// add product to wishlist
export const addProdToWishlist = async (objData) => {
  try {
    const obj = {
      method: "POST",
      url: wishlistEp,
      objData,
    }
    return await axiosProcessor(obj)
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    }
  }
}

// get customer info
export const getCustomerInfo = async () => {
  try {
    const obj = {
      method: "GET",
      url: customerEp,
    }
    return await axiosProcessor(obj)
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    }
  }
}

// save customer info
export const addCustomerInfo = async (objData) => {
  try {
    const obj = {
      method: "PUT",
      url: customerEp,
      objData,
    }
    return await axiosProcessor(obj)
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    }
  }
}

// get category products
export const getProducts = async (ids) => {
  try {
    const obj = {
      method: "POST",
      url: productEp,
      objData: ids,
    }
    return await axiosProcessor(obj)
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    }
  }
}

export const getAllProducts = async (params) => {
  try {
    const obj = {
      method: "GET",
      url: productEp + `?${params}`,
    }
    return await axiosProcessor(obj)
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    }
  }
}

export const getSearchedProducts = async (params) => {
  try {
    const obj = {
      method: "GET",
      url: `${productEp}?searchTerm=${params}`,
    }
    return await axiosProcessor(obj)
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    }
  }
}

// checkout
export const handleCheckout = async (objData) => {
  try {
    const obj = {
      method: "POST",
      url: checkoutEp,
      objData,
    }
    return await axiosProcessor(obj)
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    }
  }
}
