import Axios from 'axios'

export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'

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
