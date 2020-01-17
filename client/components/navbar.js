import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {removeUserCart} from '../store/actioncreators'

// import AllProducts from './allproducts'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <h1 id="powerSuitsTitle">Power Suits</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/">Home</Link>
          <Link to="/products/suit">Suits</Link>
          <Link to="/products/watch">Watches</Link>
          <Link to="/products/shoe">Shoes</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          <Link to="/checkout">Checkout</Link>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/">Home</Link>
          <Link to="/products/suit">Suits</Link>
          <Link to="/products/watch">Watches</Link>
          <Link to="/products/shoe">Shoes</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/checkout">Checkout</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
