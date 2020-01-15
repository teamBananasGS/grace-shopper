import {GET_ALL_PRODUCTS} from './actioncreators'
import {GET_SINGLE_PRODUCT} from './actioncreators'

export const allProductsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.allProducts
    default:
      return state
  }
}

export const singleProductReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return action.selectedProduct
    default:
      return state
  }
}