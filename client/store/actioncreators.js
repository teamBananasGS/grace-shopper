import Axios from 'axios'

export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
export const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'

export const getSingleProduct = productId => {
  return {
    type: GET_SINGLE_PRODUCT,
    selectedProduct: productId
  }
}

export const allProducts = products => {
  return {
    type: GET_ALL_PRODUCTS,
    allProducts: products
  }
}

export const loadAllProducts = function() {
  return function(dispatch) {
    Axios.get('/api/products')
      .then(res => res.data)
      .then(products => {
        const action = allProducts(products)
        dispatch(action)
      })
      .catch(err => console.error(err))
  }
}

export const loadSingleProduct = function(productId, category) {
  return function(dispatch) {
    Axios.get(`/api/products/${category}/${productId}`)
      .then(res => res.data)
      .then(product => {
        const action = getSingleProduct(product)
        dispatch(action)
      })
      .catch(err => console.error(err))
  }
}
