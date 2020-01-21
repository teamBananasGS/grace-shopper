import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Navbar} from '.'
import {loadAllUsers} from '../store/actioncreators'
import Axios from 'axios'

class AllUsers extends Component {
  // constructor() {
  //   super()
  // //   this.handleAddToInventory = this.handleAddToInventory.bind(this)
  // //   this.handleDeleteToInventory = this.handleDeleteToInventory.bind(this)
  //   // this.totalInventory = this.totalInventory.bind(this)
  // }

  componentDidMount() {
    this.props.onLoadAllUsers()
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.quantity !== this.props.quantity) {
  //     this.props.onLoadAllProducts()
  //   }
  // }

  // totalInventory() {
  //   const total = this.props.allProducts.reduce((acc, product) => {
  //     return acc + product.stock
  //   }, 0)
  //   return total
  // }

  // async handleAddToInventory(productId) {
  //   let productQuantity = this.props.allProducts.filter(
  //     element => element.id === productId
  //   )[0].stock
  //   let newQuantity = ++productQuantity

  //   try {
  //     await Axios.put(`/api/products/update/${productId}`, {
  //       data: {productId, newQuantity}
  //     })
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  // async handleDeleteToInventory(productId) {
  //   let productQuantity = this.props.allProducts.filter(
  //     element => element.id === productId
  //   )[0].stock
  //   let newQuantity = --productQuantity

  //   if (productQuantity > 0) {
  //     try {
  //       await Axios.put(`/api/products/update/${productId}`, {
  //         data: {productId, newQuantity}
  //       })
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }
  // }

  render() {
    const {allUsers} = this.props
    console.log(allUsers)
    return (
      <div>
        <Navbar />
        {allUsers.map(user => {
          return (
            <div className="adminUserContainer" key={user.id}>
              <div className="userDetails">
                <h3 id="userName">{`${user.firstName} ${user.lastName}`}</h3>
                <h3 id="email">{user.email}</h3>
                <h3 id="address">{user.address}</h3>
                <h3 id="telephone">{user.telephone}</h3>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    allUsers: state.allUsers
    // quantity: ownProps.allProducts
    // .reduce((acc, product) => {
    //   return acc + product.stock
    // }, 0)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoadAllUsers: function() {
      const thunk = loadAllUsers()
      dispatch(thunk)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers)
