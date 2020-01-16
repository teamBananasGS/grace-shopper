import React from 'react'
import Navbar from './navbar'
import {connect} from 'react-redux'
import {loadSingleProduct} from '../store/actioncreators'

class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.onLoadSingleProduct()
  }

  render() {
    const selectedProduct = this.props.selectedProduct
    console.log(this.props.user)
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
              <button type="submit" className="addtocartButton">
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
    user: state.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLoadSingleProduct: function() {
      const productId = ownProps.match.params.productId
      const category = ownProps.match.params.category
      const thunk = loadSingleProduct(productId, category)
      dispatch(thunk)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
