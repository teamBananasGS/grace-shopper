import axios from 'axios'
import history from '../history'
import {loadUserCart, removeUserCart} from './actioncreators'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */

export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
    if (res.data.id !== undefined) dispatch(loadUserCart(res.data.id))
  } catch (err) {
    console.error(err)
  }
}

// method = login
export const auth = (email, password, method) => async dispatch => {
  try {
    const res = await axios.post(`/auth/${method}`, {email, password})
    await dispatch(getUser(res.data))
    await dispatch(loadUserCart(res.data.id))
    history.push('/')
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    dispatch(removeUserCart())
    history.push('/')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
