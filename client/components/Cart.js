import React, {Component} from 'react'
import Navbar from './navbar'
import {connect} from 'react-redux'
import {loadUserCart} from '../store/actioncreators'
import Axios from 'axios'
import {Link} from 'react-router-dom'
import QuantityButton from './QuantityButton'
import {me} from '../store'

class Cart extends Component {
  constructor() {
    super()
    this.handleRemoveItem = this.handleRemoveItem.bind(this)
    this.handleUpdateItem = this.handleUpdateItem.bind(this)
    this.getTotalPrice = this.getTotalPrice.bind(this)
  }

  componentDidMount() {
    this.props.loadInitialData()
    if (this.props.user.id) {
      this.props.onLoadUserCart(this.props.user.id)
    }
  }

  getTotalPrice() {
    const products = this.props.userCart[0].products
    const total = products.reduce((acc, product) => {
      return acc + product.orderProduct.subtotal
    }, 0)
    return total
  }

  async handleUpdateItem(productId, quantity) {
    const orderId = this.props.userCart[0].id
    await Axios.put(`/api/cart/update/${productId}`, {
      data: {quantity, orderId}
    })
    this.props.onLoadUserCart(this.props.user.id)
  }

  async handleRemoveItem(productId) {
    await Axios.delete(
      `/api/cart/delete/${productId}/${this.props.userCart[0].id}`
    )
    this.props.onLoadUserCart(this.props.user.id)
  }

  render() {
    let userCart

    if (this.props.userCart.length && this.props.userCart[0].products.length) {
      userCart = this.props.userCart[0].products
    }

    return userCart ? (
      <div>
        <Navbar />
        <h3 className="allProductsTitle"> Shopping Cart</h3> <hr />
        <div className="some-page-wrapper">
          {userCart.map(product => {
            return (
              <div className="product" key={product.id}>
                <ul>
                  <p className="cartImage">
                    {' '}
                    <img id="productImageInCart" src={product.imageUrl} />{' '}
                  </p>
                  <div className="centercart">
                    <p> {product.name} </p>
                    <p>Quantity: </p>{' '}
                    <QuantityButton
                      quantity={product.orderProduct.quantityPurchased}
                      productId={product.id}
                      handleUpdateItem={this.handleUpdateItem}
                    />
                    <p> {`Price: $${product.orderProduct.pricePerItem}`} </p>
                    <p> {`Subtotal: $${product.orderProduct.subtotal}`} </p>
                    <button
                      type="button"
                      className="removeButton"
                      onClick={() => this.handleRemoveItem(product.id)}
                    >
                      Remove
                    </button>
                  </div>
                </ul>
              </div>
            )
          })}
        </div>
        <div>
          <p>{`Total Price: $${this.getTotalPrice()}`}</p>
        </div>
        <div>
          <Link to="/">
            <button type="button">Checkout</button>
          </Link>
        </div>
      </div>
    ) : (
      <div>
        <Navbar />
        <h2 className="allProductsTitle">Your Shopping Cart Is Empty</h2>
        <div>
          <img className="emptyCart" src="http://tny.im/ky1" />
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
