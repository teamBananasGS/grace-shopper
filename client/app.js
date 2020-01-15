import React from 'react'

import {Navbar} from './components'
import Routes from './routes'

const App = () => {
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

export default App
