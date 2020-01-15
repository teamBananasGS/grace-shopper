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

// establishes socket connection
import './socket'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route exact path="/" component={App} />
      <Route exact path="/home" component={userHome} />
      <Route exact path="/products" component={AllProducts} />
      <Route
        exact
        path="/products/:category/:productId"
        component={SingleProduct}
      />
    </Router>
  </Provider>,
  document.getElementById('app')
)
