import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {removeUserCart} from '../store/actioncreators'

// import AllProducts from './allproducts'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link id="powerSuitsTitle" to="/">
            PowerSuits
          </Link>
          <Link to="/products/suit">Suits</Link>
          <Link to="/products/watch">Watches</Link>
          <Link to="/products/shoe">Shoes</Link>
          <a href="/" onClick={handleClick}>
            Logout
          </a>
          <Link to="/cart">Cart</Link>
          <a href="/social" className="fa fa-google">
            {' '}
          </a>
          <a href="/social" className="fa fa-facebook">
            {' '}
          </a>
          <a href="/social" className="fa fa-instagram">
            {' '}
          </a>
          <a href="/social" className="fa fa-twitter">
            {' '}
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link id="powerSuitsTitle" to="/">
            PowerSuits
          </Link>
          <Link to="/products/suit">Suits</Link>
          <Link to="/products/watch">Watches</Link>
          <Link to="/products/shoe">Shoes</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/cart">Cart</Link>
          <a href="/social" className="fa fa-google">
            {' '}
          </a>
          <a href="/social" className="fa fa-facebook">
            {' '}
          </a>
          <a href="/social" className="fa fa-instagram">
            {' '}
          </a>
          <a href="/social" className="fa fa-twitter">
            {' '}
          </a>
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
      dispatch(removeUserCart())
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
