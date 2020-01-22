import React, {Component} from 'react'
import {connect} from 'react-redux'
import {loadAllProducts} from '../store/actioncreators'
import {Navbar} from '.'
import Axios from 'axios'

class AllProducts extends Component {
  constructor() {
    super()
    this.handleAddToInventory = this.handleAddToInventory.bind(this)
    this.handleDeleteToInventory = this.handleDeleteToInventory.bind(this)
    // this.totalInventory = this.totalInventory.bind(this)
  }

  componentDidMount() {
    this.props.onLoadAllProducts()
  }

  // componentDidUpdate(prevProps) {
  // if (prevProps.allProducts !== this.props.allProducts) {
  //   this.props.onLoadAllProducts()
  // }
  // }

  // totalInventory() {
  //   const total = this.props.allProducts.reduce((acc, product) => {
  //     return acc + product.stock
  //   }, 0)
  //   return total
  // }

  async handleAddToInventory(productId) {
    let productQuantity = this.props.allProducts.filter(
      element => element.id === productId
    )[0].stock
    let newQuantity = ++productQuantity

    try {
      await Axios.put(`/api/products/update/${productId}`, {
        data: {productId, newQuantity}
      })
    } catch (error) {
      console.error(error)
    }
  }

  async handleDeleteToInventory(productId) {
    let productQuantity = this.props.allProducts.filter(
      element => element.id === productId
    )[0].stock
    let newQuantity = --productQuantity

    if (productQuantity > 0) {
      try {
        await Axios.put(`/api/products/update/${productId}`, {
          data: {productId, newQuantity}
        })
      } catch (error) {
        console.error(error)
      }
    }
  }

  render() {
    const {allProducts} = this.props
    // console.log('total inventory', this.totalInventory())
    return (
      <div>
        {allProducts.map(product => {
          return (
            <div className="adminProductContainer" key={product.id}>
              <div className="productDetails">
                <img id="adminProductImage" src={product.imageUrl} />
                <h3 id="productTitle">{product.name}</h3>
                <h3 id="productPrice">{product.price}</h3>
                <div>
                  <button
                    type="submit"
                    className="stockButton"
                    onClick={() => this.handleEditPrice(product.id)}
                  >
                    Edit
                  </button>
                </div>
                <h3 id="productQuantity">{`In Stock: ${product.stock}`}</h3>
                <div>
                  <button
                    type="submit"
                    className="stockButton"
                    onClick={() => this.handleDeleteToInventory(product.id)}
                  >
                    -1
                  </button>
                  <button
                    type="submit"
                    className="stockButton"
                    onClick={() => this.handleAddToInventory(product.id)}
                  >
                    +1
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    allProducts: state.allProducts,
    quantity: ownProps.allProducts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoadAllProducts: function() {
      const thunk = loadAllProducts()
      dispatch(thunk)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
