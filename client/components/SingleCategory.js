import React, {Component} from 'react'
import Navbar from './navbar'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {loadSingleCategory} from '../store/actioncreators'

class SingleCategory extends Component {
  componentDidMount() {
    this.props.onLoadSingleCategory()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.category !== this.props.category) {
      this.props.onLoadSingleCategory()
    }
  }

  render() {
    const {selectedCategory} = this.props
    let category =
      this.props.category[0].toUpperCase() + this.props.category.slice(1)
    if (category === 'Watch') category += 'es'
    else category += 's'
    return selectedCategory ? (
      <div>
        <Navbar />
        <h3 className="allProductsTitle">All {category}</h3>
        <hr />
        {selectedCategory.map(product => {
          return (
            <div className="product" key={product.id}>
              <div id="allproductscontainer">
                <div id="productList">
                  <p>
                    <Link to={`/products/${product.category}/${product.id}`}>
                      <img id="productImage" src={product.imageUrl} />
                      <br />
                      <p className="centerProductname">{product.name}</p>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    ) : (
      <h1>Cannot find page</h1>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    selectedCategory: state.selectedCategory,
    category: ownProps.match.params.category
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLoadSingleCategory: function() {
      const category = ownProps.match.params.category
      const thunk = loadSingleCategory(category)
      dispatch(thunk)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleCategory)
