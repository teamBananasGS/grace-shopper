import {GET_ALL_PRODUCTS} from './actioncreators'

export const allProductsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.allProducts
    default:
      return state
  }
}
