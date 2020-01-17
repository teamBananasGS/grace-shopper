import React, {Component} from 'react'
import Navbar from './navbar'
import {connect} from 'react-redux'
import {loadUserCart} from '../store/actioncreators'

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
                  <p>
                    {' '}
                    <img src={product.imageUrl} />
                  </p>
                  <h3> {product.name} </h3>
                  <h3> {`Size: insert product size`} </h3>
                  <h3> {`Quantity: insert product quantity`} </h3>
                  <h3> {`$${product.price}`} </h3>
                  <button type="button">Remove</button>
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
