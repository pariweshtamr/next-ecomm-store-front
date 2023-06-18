import axios from "axios"

const apiRootUrl = "/api"
const productEp = apiRootUrl + "/product"
const checkoutEp = apiRootUrl + "/checkout"
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

// get products
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
