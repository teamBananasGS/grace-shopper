import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {loadAllProducts} from '../store/actioncreators'

class AllProducts extends Component {
  componentDidMount() {
    this.props.onLoadAllProducts()
  }

  // handleToggleForm() {
  //     this.setState({
  //         isVisible: !this.state.isVisible
  //     })
  // }

  render() {
    const allProducts = this.props.allProducts
    // console.log(allProducts)
    return (
      <div>
        {allProducts.map(product => {
          return (
            <div className="products" key={product.id}>
              <ul>
                <p>
                  <Link to={`/products/${product.id}`}>{product.name}</Link>
                </p>
                <img src={product.imageUrl} />
              </ul>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    allProducts: state.allProducts
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
