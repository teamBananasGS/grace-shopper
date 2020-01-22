import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import store from './store'
import userHome from './components/user-home'
import SingleCategory from './components/SingleCategory'
import SingleProduct from './components/SingleProduct'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import GuestCheckOut from './components/GuestCheckout'
import GuestCompleteOrder from './components/GuestCompleteOrder'
import CompleteOrder from './components/CompleteOrder'
import AllUsers from './components/allusers'
import AllProducts from './components/allproducts'
import Admin from './components/admin'
import {Login} from './components'
import NewUser from './components/NewUser'
import HomePage from './components/HomePage'
import Navbar from './components/navbar'
import {ToastProvider} from 'react-toast-notifications'

const MyCustomToast = ({appearance, children}) => (
  <div style={{background: appearance === 'error' ? 'red' : 'green'}}>
    {children}
  </div>
)

const App = () => {
  return (
    <div>
      <Navbar />
      <ToastProvider components={{Toast: MyCustomToast}} />
      <div>
        <Switch>
          <Route exact path="/" component={HomePage} user={store.user} />
          <Route exact path="/home" component={userHome} user={store.user} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={NewUser} />
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
          <Route exact path="/checkout/guest" component={GuestCheckOut} />
          <Route
            exact
            path="/checkout/complete/guest/:orderId"
            component={GuestCompleteOrder}
          />
          <Route
            exact
            path="/checkout/complete/:first/:last/:order"
            component={CompleteOrder}
          />
          <Route exact path="/admin" component={Admin} user={store.user} />
          <Route
            exact
            path="/admin/products"
            component={AllProducts}
            user={store.user}
          />
          <Route
            exact
            path="/admin/users"
            component={AllUsers}
            user={store.user}
          />
        </Switch>
      </div>
    </div>
  )
}

export default App
