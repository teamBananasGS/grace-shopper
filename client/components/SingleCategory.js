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
    return selectedCategory ? (
      <div>
        <Navbar />
        {selectedCategory.map(product => {
          return (
            <div className="product" key={product.id}>
              <ul>
                <p>
                  <Link to={`/products/${product.category}/${product.id}`}>
                    {product.name}
                  </Link>
                </p>
                <img src={product.imageUrl} />
              </ul>
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
