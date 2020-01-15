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
    console.log(selectedProduct)
    return (
      <div>
        <Navbar />
        <div>
          <img src={selectedProduct.imageUrl} />
        </div>
        <div>
          <h1>{selectedProduct.name}</h1>
          <span>Description: </span>
          <p>{selectedProduct.description}</p>
          <span>Price: </span>
          <span>{`$${selectedProduct.price} USD`}</span>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedProduct: state.selectedProduct
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
