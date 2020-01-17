import React from 'react'
import Navbar from './navbar'
import {connect} from 'react-redux'
import {loadSingleProduct, loadUserCart} from '../store/actioncreators'
import Axios from 'axios'

class SingleProduct extends React.Component {
  constructor() {
    super()
    this.handleAddToCart = this.handleAddToCart.bind(this)
  }

  componentDidMount() {
    this.props.onLoadSingleProduct()
  }

  async handleAddToCart(productId) {
    const cart = this.props.userCart
    const productUpdate = cart[0].products.filter(obj => obj.id === productId)
    const orderId = cart[0].id

    try {
      // if current product exist in the cart, increment the quantity by one
      if (productUpdate[0] !== undefined) {
        const newQuantity = ++productUpdate[0].orderProduct.quantityPurchased
        console.log(newQuantity)
        await Axios.put(`/api/cart/update/${productId}`, {
          quantityPurchased: newQuantity
        })
      } else {
        // else we create the product
        await Axios.post(`/api/cart/update/${productId}`, {
          productId: productId,
          quantityPurchased: 1,
          pricePerItem: this.props.selectedProduct.price,
          orderId: orderId
        })
        this.props.onLoadUserCart(this.props.user.id)
      }
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    const selectedProduct = this.props.selectedProduct
    return selectedProduct ? (
      <div>
        <Navbar />
        <div id="selectedProductContainer">
          <img src={selectedProduct.imageUrl} />
          <div>
            <h1>{selectedProduct.name}</h1>
            <span>Description</span>
            <p>{selectedProduct.description}</p>
            <p>{`Price: $${selectedProduct.price} USD`}</p>
            <div>
              <button
                type="submit"
                className="addtocartButton"
                onClick={() => this.handleAddToCart(selectedProduct.id)}
              >
                Add To Cart
              </button>
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
