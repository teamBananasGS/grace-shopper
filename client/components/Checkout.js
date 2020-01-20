import React, {Component} from 'react'
import Navbar from './navbar'
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

  async submitOrder() {
    await Axios.put('/api/checkout', {
      data: {
        userId: this.props.user.id,
        orderId: this.props.userCart[0].id,
        paymentName: this.state.paymentMethod
      }
    })
  }

  render() {
    const user = this.props.user
    const orderId = this.props.userCart[0].id
    return user.id ? (
      <div>
        <Navbar />
        <div>
          <div className="shippingrow">
            <div>
              <ul>
                <h4>Shipping Address</h4>
                <li>{`${user.firstName} ${user.lastName}`}</li>
                <li>{user.address}</li>
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
                <h4>Total Price: ${this.getTotalPrice()}</h4>
              </ul>
            </div>
          </div>
          <div>
            <Link
              to={`/checkout/complete/${user.firstName}/${
                user.lastName
              }/${orderId}`}
            >
              <button type="submit" onClick={this.submitOrder}>
                Place Order
              </button>
            </Link>
          </div>
        </div>
      </div>
    ) : (
      <div>
        <h3>Please sign up to proceed checkout</h3>
        <Link to="/signup">
          <button type="button">Sign Up</button>
        </Link>
      </div>
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
