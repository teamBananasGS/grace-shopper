import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import {
  singleProductReducer,
  allProductsReducer,
  singleCategoryReducer
} from './reducers'

const reducer = combineReducers({
  user,
  allProducts: allProductsReducer,
  selectedCategory: singleCategoryReducer,
  selectedProduct: singleProductReducer
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
