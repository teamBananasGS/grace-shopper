import React, {Component} from 'react'
import {connect} from 'react-redux'
import {loadUserCart} from '../store/actioncreators'
import {Link} from 'react-router-dom'
import Axios from 'axios'
import {me} from '../store'

class Checkout extends Component {
  constructor() {
    super()
    this.state = {
      paymentMethod: 'Credit Card'
    }
    this.handlePaymentChange = this.handlePaymentChange.bind(this)
    this.getTotalPrice = this.getTotalPrice.bind(this)
    this.submitOrder = this.submitOrder.bind(this)
  }

  componentDidMount() {
    this.props.loadInitialData()
    if (this.props.user.id) {
      this.props.onLoadUserCart(this.props.user.id)
    }
  }

  handlePaymentChange(event) {
    this.setState({paymentMethod: event.target.value})
  }

  getTotalPrice() {
    let total
    if (this.props.userCart[0]) {
      const products = this.props.userCart[0].products
      total = products.reduce((acc, product) => {
        return acc + product.orderProduct.subtotal
      }, 0)
    }
    return total
  }

  async submitOrder(userId) {
    try {
      await Axios.put(`/api/checkout/${userId}`, {
        data: {
          userId: this.props.user.id,
          orderId: this.props.userCart[0].id,
          paymentName: this.state.paymentMethod
        }
      })
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    let orderId
    if (this.props.userCart.length) {
      orderId = this.props.userCart[0].id
    }

    return this.props.user.id ? (
      <div>
        <div>
          <div className="shippingrow">
            <div>
              <ul>
                <h4>Shipping Address</h4>
                <li>{`${this.props.user.firstName} ${
                  this.props.user.lastName
                }`}</li>
                <li>{this.props.user.address}</li>
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
                <h4>Subtotal: ${this.getTotalPrice()}</h4>
                <h4>Tax: ${(this.getTotalPrice() * 0.08875).toFixed(2)}</h4>
                <h4>Total: ${(this.getTotalPrice() * 1.08875).toFixed(2)}</h4>
                <Link
                  to={`/checkout/complete/${this.props.user.id.firstName}/${
                    this.props.user.id.lastName
                  }/${orderId}`}
                >
                  <button type="submit" onClick={this.submitOrder}>
                    Place Order
                  </button>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div />
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    userCart: state.userCart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    onLoadUserCart: function(userId) {
      const thunk = loadUserCart(userId)
      dispatch(thunk)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
