import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import QuantityButton from './QuantityButton'

class GuestCart extends Component {
  constructor() {
    super()
    this.state = {
      guestCart: JSON.parse(localStorage.getItem('cart'))
    }
    this.handleRemoveItem = this.handleRemoveItem.bind(this)
    this.handleUpdateItem = this.handleUpdateItem.bind(this)
    this.getTotalPrice = this.getTotalPrice.bind(this)
  }

  handleUpdateItem(productId, quantity) {
    const updateCart = this.state.guestCart
    for (let product of updateCart) {
      if (product.id === productId) {
        product.quantity = quantity
      }
    }
    this.setState({guestCart: updateCart})
    localStorage.setItem('cart', JSON.stringify(updateCart))
  }

  handleRemoveItem(product, guestCart) {
    const index = guestCart.indexOf(product)
    guestCart.splice(index, 1)
    this.setState({guestCart})
    localStorage.setItem('cart', JSON.stringify(guestCart))
  }

  getTotalPrice(guestCart) {
    return guestCart.reduce((acc, product) => {
      return acc + product.quantity * product.price
    }, 0)
  }

  render() {
    let guestCart = JSON.parse(localStorage.getItem('cart'))

    return guestCart.length ? (
      <div>
        <h3 className="allProductsTitle"> Shopping Cart</h3> <hr />
        <div className="some-page-wrapper">
          {guestCart.map(product => {
            return (
              <div key={product.id}>
                <div className="cartproduct">
                  <div>
                    <img id="productImageInCart" src={product.imageUrl} />
                  </div>
                  <div className="centercart">
                    <h3> {product.name} </h3>
                    <p>{product.description}</p>
                    <p>Quantity: </p>{' '}
                    <QuantityButton
                      quantity={product.quantity}
                      productId={product.id}
                      stock={product.stock}
                      handleUpdateItem={this.handleUpdateItem}
                    />
                    <p> {`Price: $${product.price}`} </p>
                    <p> {`Subtotal: $${product.quantity * product.price}`} </p>
                    <button
                      type="button"
                      className="removeButton"
                      onClick={() => this.handleRemoveItem(product, guestCart)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <hr />
              </div>
            )
          })}
        </div>
        <div id="totalprice">
          <div>
            <p>{`Total Price: $${this.getTotalPrice(guestCart)}`}</p>
          </div>
          <span />
          <div>
            <Link to="/checkout/guest">
              <button type="button" className="checkoutbutton">
                Checkout
              </button>
            </Link>
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

export default GuestCart
