import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import {connect} from 'react-redux'
import {loadUserCart} from './store/actioncreators'

class App extends React.Component {
  componentDidMount() {
    if (this.props.user.id) {
      this.props.onLoadUserCart(this.props.user.id)
    }
  }

  render() {
    return (
      <div>
        <Navbar />
        <Routes />
        <div className="homeImages">
          <h3 className="Quote">Be Your Own Hero</h3>
          <img src="http://tny.im/krh" alt="image of Women wearing Suits" />
        </div>
        <div className="productHolder">
          <div className="leftpic">
            <img src="http://tny.im/krj" />
          </div>
          <div className="midpic">
            {' '}
            <img src="http://tny.im/kri" />
          </div>
          <div className="rightpic">
            <img src="http://tny.im/krk" />
          </div>
        </div>
        <div className="homeImages2">
          <h3 className="Quote">Experience the Power Suit</h3>
          <img src="http://tny.im/krf" alt="image of Men wearing Suits" />
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

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLoadUserCart: function(userId) {
      const thunk = loadUserCart(userId)
      dispatch(thunk)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
