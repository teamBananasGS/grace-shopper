import React, {Component} from 'react'
import Navbar from './navbar'
import Axios from 'axios'
import {withRouter} from 'react-router-dom'

class GuestCheckout extends Component {
  constructor() {
    super()
    this.state = {
      paymentMethod: 'Credit Card',
      orderId: ''
    }
    this.handlePaymentChange = this.handlePaymentChange.bind(this)
    this.getSubtotalPrice = this.getSubtotalPrice.bind(this)
    this.submitOrder = this.submitOrder.bind(this)
  }

  handlePaymentChange(event) {
    this.setState({paymentMethod: event.target.value})
  }

  getSubtotalPrice() {
    const guestCart = JSON.parse(localStorage.getItem('cart'))
    return guestCart.reduce((acc, product) => {
      return acc + product.quantity * product.price
    }, 0)
  }

  async submitOrder() {
    try {
      const guestCart = JSON.parse(localStorage.getItem('cart'))
      const order = await Axios.post('/api/checkout/guest', {
        guestCart,
        paymentMethod: this.state.paymentMethod
      })
      this.setState({orderId: order.data.id})
      localStorage.clear()
      this.props.history.push(`/checkout/complete/guest/${this.state.orderId}`)
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    let subtotal
    if (localStorage.getItem('cart')) {
      subtotal = this.getSubtotalPrice()
    }

    return localStorage.getItem('cart') ? (
      <div>
        <div className="guestcheckoutbox">
          <h4>Guest Checkout</h4>
          <hr />
          <div className="shippingrow">
            <div>
              <ul>
                <h4>Shipping Address</h4>
                {/* <li>{`${user.firstName} ${user.lastName}`}</li>
                <li>{user.address}</li> */}
              </ul>
            </div>
            <div>
              <hr />
              <ul>
                <h4>Payment Method</h4>
                <form>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Credit Card"
                    checked={this.state.paymentMethod === 'Credit Card'}
                    onChange={this.handlePaymentChange}
                  />
                  <span>Credit Card</span>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Venmo"
                    checked={this.state.paymentMethod === 'Venmo'}
                    onChange={this.handlePaymentChange}
                  />
                  <span>Venmo</span>
                </form>
              </ul>
            </div>
            <div>
              <hr />
              <ul>
                <h4>
                  Subtotal: ${Number(subtotal)
                    .toFixed(2)
                    .toLocaleString('en')}
                </h4>
                <h4>
                  Tax: ${Number(subtotal * 0.08875)
                    .toFixed(2)
                    .toLocaleString('en')}
                </h4>
                <h4>
                  Total: ${Number(subtotal * 1.08875)
                    .toFixed(2)
                    .toLocaleString('en')}
                </h4>
              </ul>
            </div>
            <div>
              {/* <Link to='/checkout/complete/guest' params={{ order: this.state.orderId }}> */}
              <button type="submit" onClick={this.submitOrder}>
                Place Order
              </button>
              {/* </Link> */}
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div>
        <h2 className="allProductsTitle">Your Shopping Cart Is Empty</h2>
        <div>
          <img className="emptyCart" src="http://tny.im/ky1" />
        </div>
      </div>
    )
  }
}

export default withRouter(GuestCheckout)
