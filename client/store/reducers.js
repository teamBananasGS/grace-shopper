import {
  GET_ALL_PRODUCTS,
  GET_SINGLE_CATEGORY,
  GET_SINGLE_PRODUCT,
  GET_USER_CART,
  UPDATE_USER_CART,
  REMOVE_USER_CART,
  GET_ALL_USERS
} from './actioncreators'

export const allUsersReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.allUsers
    default:
      return state
  }
}

export const allProductsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.allProducts
    case GET_SINGLE_CATEGORY:
      return action.selectedCategory
    default:
      return state
  }
}

export const singleCategoryReducer = (state = [], action) => {
  switch (action.type) {
    case GET_SINGLE_CATEGORY:
      return action.selectedCategory
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

export const userCartReducer = (state = [], action) => {
  switch (action.type) {
    case GET_USER_CART:
      return action.userCart
    case UPDATE_USER_CART:
      return action.userCart
    case REMOVE_USER_CART:
      return action.userCart
    default:
      return state
  }
}
