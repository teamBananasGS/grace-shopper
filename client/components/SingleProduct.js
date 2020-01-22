import React from 'react'
import {connect} from 'react-redux'
import {
  loadSingleProduct,
  loadUserCart,
  loadUpdatedUserCart
} from '../store/actioncreators'

class SingleProduct extends React.Component {
  constructor() {
    super()
    this.handleAddToCart = this.handleAddToCart.bind(this)
    this.guestAddToCart = this.guestAddToCart.bind(this)
  }

  componentDidMount() {
    this.props.onLoadSingleProduct()
  }

  handleAddToCart(addedProduct) {
    const cart = this.props.userCart
    this.props.onUpdateUserCart(cart, addedProduct)
  }

  guestAddToCart(addedProduct) {
    let cartProducts = []
    let foundItem = false

    //check if the cart is already initialized and not empty
    if (localStorage.getItem('cart')) {
      cartProducts = JSON.parse(localStorage.getItem('cart'))
      // check if the product already exists in the cart
      for (let product of cartProducts) {
        // if product found, add quantity by 1, reset local storage
        if (product.id === addedProduct.id) {
          product.quantity++
          const stringified = JSON.stringify(cartProducts)
          localStorage.setItem('cart', stringified)
          foundItem = true
          break
        }
      }
    }

    // if the product does not exist in the cart or if the cart is initially empty
    // add the new product into cartProducts array
    // reset local storage
    if (!foundItem) {
      addedProduct.quantity = 1
      cartProducts.push(addedProduct)
      const stringified = JSON.stringify(cartProducts)
      localStorage.setItem('cart', stringified)
    }
  }

  render() {
    const selectedProduct = this.props.selectedProduct
    return selectedProduct ? (
      <div>
        <div id="selectedProductContainer">
          <img id="selectedProductImage" src={selectedProduct.imageUrl} />
          <div id="selectedProductBio">
            <h3 id="singleProductTitle">{selectedProduct.name}</h3>
            <span>Description</span>
            <p>{selectedProduct.description}</p>
            <p>{`Price: $${selectedProduct.price} USD`}</p>
            <div>
              {this.props.user.id ? (
                <button
                  type="submit"
                  className="addtocartButton"
                  onClick={() => this.handleAddToCart(selectedProduct)}
                >
                  ADD TO CART
                </button>
              ) : (
                <button
                  type="submit"
                  className="addtocartButton"
                  onClick={() => this.guestAddToCart(selectedProduct)}
                >
                  ADD TO CART
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    ) : (
      <h1>Cannot find page</h1>
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedProduct: state.selectedProduct,
    user: state.user,
    userCart: state.userCart
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLoadSingleProduct: function() {
      const productId = ownProps.match.params.productId
      const category = ownProps.match.params.category
      const thunk = loadSingleProduct(productId, category)
      dispatch(thunk)
    },
    onLoadUserCart: function(userId) {
      const thunk = loadUserCart(userId)
      dispatch(thunk)
    },
    onUpdateUserCart: function(cart, productToUpdate) {
      const thunk = loadUpdatedUserCart(cart, productToUpdate)
      dispatch(thunk)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
