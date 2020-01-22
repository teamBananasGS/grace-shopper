import Axios from 'axios'

export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
export const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'
export const GET_SINGLE_CATEGORY = 'GET_SINGLE_CATEGORY'
export const GET_USER_CART = 'GET_USER_CART'
export const UPDATE_USER_CART = 'UPDATE_USER_CART'
export const REMOVE_USER_CART = 'REMOVE_USER_CART'
export const GET_ALL_USERS = 'GET_ALL_USER'

export const getSingleProduct = productId => {
  return {
    type: GET_SINGLE_PRODUCT,
    selectedProduct: productId
  }
}

export const getSingleCategory = category => {
  return {
    type: GET_SINGLE_CATEGORY,
    selectedCategory: category
  }
}

export const allProducts = products => {
  return {
    type: GET_ALL_PRODUCTS,
    allProducts: products
  }
}

export const allUsers = users => {
  return {
    type: GET_ALL_USERS,
    allUsers: users
  }
}

export const getUserCart = cart => {
  return {
    type: GET_USER_CART,
    userCart: cart
  }
}

export const updateUserCart = cart => {
  return {
    type: UPDATE_USER_CART,
    userCart: cart
  }
}

export const removeUserCart = () => {
  return {
    type: REMOVE_USER_CART,
    userCart: []
  }
}

export const loadAllUsers = function() {
  return function(dispatch) {
    Axios.get('/api/users')
      .then(res => res.data)
      .then(users => {
        const action = allUsers(users)
        dispatch(action)
      })
      .catch(err => console.error(err))
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

export const loadSingleCategory = function(category) {
  return function(dispatch) {
    Axios.get(`/api/products/${category}`)
      .then(res => res.data)
      .then(singleCat => {
        const action = getSingleCategory(singleCat)
        dispatch(action)
      })
      .catch(err => console.error(err))
  }
}

export const loadUserCart = function(userId) {
  return function(dispatch) {
    Axios.get(`/api/cart/${userId}`)
      .then(res => res.data)
      .then(cartDetails => {
        const action = getUserCart(cartDetails)
        dispatch(action)
      })
      .catch(err => console.error(err))
  }
}

export const loadUpdatedUserCart = function(cart, productToUpdate) {
  return function(dispatch) {
    let product,
      index = 0
    const orderId = cart[0].id

    for (let obj of cart[0].products) {
      if (obj.id === productToUpdate.id) {
        product = obj
        break
      } else {
        index++
      }
    }

    if (product !== undefined) {
      const quantity = ++product.orderProduct.quantityPurchased
      Axios.put(`/api/cart/update/${productToUpdate.id}/${orderId}`, {
        data: {quantity}
      })
        .then(() => {
          cart[0].products[index].orderProduct.quantityPurchased = quantity
          dispatch(updateUserCart(cart))
        })
        .catch(err => console.error(err))
    } else {
      Axios.post(`/api/cart/update/${productToUpdate.id}`, {
        productId: productToUpdate.id,
        quantityPurchased: 1,
        pricePerItem: productToUpdate.price,
        orderId: orderId
      })
        .then(res => {
          productToUpdate.orderProduct = res.data
          cart[0].products.push(productToUpdate)
          dispatch(updateUserCart(cart))
        })
        .catch(err => console.error(err))
    }
  }
}
