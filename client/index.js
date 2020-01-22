import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import store from './store'
import App from './app'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import history from './history'
// import {Signup} from './components/auth-form'

// establishes socket connection
import './socket'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
)
