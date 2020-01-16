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

// establishes socket connection
import './socket'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route exact path="/" component={App} user={store.user} />
      <Route exact path="/home" component={userHome} user={store.user} />
      <Route exact path="/products" component={AllProducts} user={store.user} />
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
    </Router>
  </Provider>,
  document.getElementById('app')
)
