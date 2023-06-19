const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
  products: [],
  selectedProduct: {},
  isLoading: false,
}

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    requestPending: (state) => {
      state.isLoading = true
    },
    getProductSuccess: (state, { payload }) => {
      state.isLoading = false
      state.selectedProduct = payload
    },
  },
})

const { reducer, actions } = productSlice

export const { requestPending } = actions
export default reducer
