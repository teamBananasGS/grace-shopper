import React, {Component} from 'react'
import Navbar from './navbar'
import {connect} from 'react-redux'
import {loadUserCart} from '../store/actioncreators'
import {Link} from '../store'

class Cart extends Component {
  componentDidMount() {
    if (this.props.user.id) {
      this.props.onLoadUserCart(this.props.user.id)
    }
  }

  render() {
    const userCart = this.props.userCart[0].products
    return (
      <div>
        <Navbar />
        <h1 className="Quote"> Shopping cart</h1>
        <div className="some-page-wrapper">
          {userCart.map(product => {
            return (
              <div className="product" key={product.id}>
                <ul>
                  <p className="cartImage">
                    {' '}
                    <img src={product.imageUrl} />{' '}
                  </p>
                  <div className="centercart">
                    <p> {product.name} </p>
                    <p> {`Size: insert product size`} </p>
                    <p> {`Quantity: insert product quantity`} </p>
                    <p> {`$${product.price}`} </p>
                    <button type="button" className="removeButton">
                      Remove
                    </button>
                  </div>
                </ul>
              </div>
            )
          })}
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
    onLoadUserCart: function(userId) {
      const thunk = loadUserCart(userId)
      dispatch(thunk)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)