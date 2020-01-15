import {GET_SINGLE_PRODUCT} from './actioncreators'

export const singleProductReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return action.selectedProduct
    default:
      return state
  }
}

// const rootReducer = combineReducers({
//   selectedProduct: singleProductReducer
// })

// export default rootReducer
