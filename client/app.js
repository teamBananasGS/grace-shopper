import React from 'react'
import {Navbar, Login} from './components'
import Routes from './routes'
import {connect} from 'react-redux'
import {loadUserCart} from './store/actioncreators'
import Axios from 'axios'
import {Link} from 'react-router-dom'

class App extends React.Component {
  async componentDidMount() {
    //on login, check if the user exists in database
    //check to see if there is an existing 'pending' order for that user
    //load the cart related to that orderId
    if (this.props.user.id) {
      await Axios.get(`api/users/checkorder/${this.props.user.id}`)
    }
  }

  render() {
    const {user} = this.props
    return (
      <div>
        <Navbar />
        {/* <Routes /> */}
        {user.id ? (
          <h4 className="welcome">{`Welcome, ${user.firstName} ${
            user.lastName
          }!`}</h4>
        ) : (
          <div />
        )}
        <div className="homeImages">
          <img
            src="images/PowerSuitsHomePageMan.png"
            alt="image of Men wearing Suits"
          />
        </div>
        <div className="productHolder">
          <div className="leftpic">
            <Link to="/products/watch">
              <img src="http://tny.im/krj" />
            </Link>
          </div>
          <div className="midpic">
            <Link to="/products/suit">
              {' '}
              <img src="http://tny.im/kri" />
            </Link>
          </div>
          <div className="rightpic">
            <Link to="/products/shoe">
              <img src="http://tny.im/krk" />
            </Link>
          </div>
        </div>
        <div className="homeImages2">
          <img
            src="images/PowerSuitsForher.png"
            alt="image of Women wearing Suits"
          />
        </div>
        <div className="homeImages2">
          <img
            src="images/PowerSuitGuarantee.png"
            alt="image of PowerSuits Standards"
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoadUserCart: function(userId) {
      const thunk = loadUserCart(userId)
      dispatch(thunk)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
