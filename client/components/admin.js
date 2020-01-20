import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import AllProducts from './allproducts'

class Admin extends Component {
  render() {
    return <AllProducts />
  }
}

export default connect(null, null)(Admin)
