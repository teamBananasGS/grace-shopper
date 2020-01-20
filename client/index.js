import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router, Route} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './app'
import AllProducts from './components/allproducts'
import userHome from './components/user-home'
import SingleProduct from './components/SingleProduct'
import SingleCategory from './components/SingleCategory'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import CompleteOrder from './components/CompleteOrder'
import Admin from './components/admin'
import {Login} from './components'

// establishes socket connection
import './socket'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route exact path="/" component={App} user={store.user} />
      <Route exact path="/home" component={userHome} user={store.user} />
      <Route exact path="/login" component={Login} />
      <Route
        exact
        path="/products/:category"
        component={SingleCategory}
        user={store.user}
      />
      <Route
        exact
        path="/products/:category/:productId"
        component={SingleProduct}
      />
      <Route exact path="/cart" component={Cart} />
      <Route exact path="/checkout" component={Checkout} />
      <Route
        exact
        path="/checkout/complete/:first/:last/:order"
        component={CompleteOrder}
      />
      <Route exact path="/admin" component={Admin} user={store.user} />
    </Router>
  </Provider>,
  document.getElementById('app')
)
