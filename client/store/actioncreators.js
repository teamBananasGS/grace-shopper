import Axios from 'axios'

export const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'

export const getSingleProduct = productId => {
  return {
    type: GET_SINGLE_PRODUCT,
    selectedProduct: productId
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
