import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import {
  singleProductReducer,
  allProductsReducer,
  singleCategoryReducer,
  userCartReducer,
  allUsersReducer
} from './reducers'

const reducer = combineReducers({
  user,
  allProducts: allProductsReducer,
  selectedCategory: singleCategoryReducer,
  selectedProduct: singleProductReducer,
  userCart: userCartReducer,
  allUsers: allUsersReducer
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
