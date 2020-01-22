// const { expect } = require("chai");
// import { createStore, applyMiddleware } from "redux";
// import enforceImmutableState from 'redux-immutable-state-invariant';

// import {
//   allProducts,
//   allUsers
// } from '../client/store/actioncreators'
// import allUserReducer from '../client/store/reducers'
// import allProductsReducer from '../client/store/reducers'

// const Users = [
//   {id: 2, firstName: 'Remi'},
//   {id: 1, firstName: 'Ming'},
//   {id: 3, firstName: 'Henry'}
// ]

// const Products = [
//   {id: 1, name: 'suit'},
//   {id: 2, name: 'shoe'},
//   {id: 3, name: 'watch'}
// ]

// function getRandomUser(users) {
//   return users(Math.floor(Math.random() * users.length))
// }

// describe("Action creators", () => {
//   describe("allusers", () => {
//     it("returns properly formatted action for allusers", () => {
//       const users = getRandomUser(Users);

//       expect(allUsers(users)).to.be.deep.equal({
//         type: "GET_ALL_USERS",
//         allUsers: users
//       })
//     })
//   })

//   describe("allProducts", () => {
//     it("returns properly formatted action", () => {
//       const products = getRandomUser(Products);

//       expect(allProducts(products)).to.be.deep.equal({
//         type: "GET_ALL_PRODUCTS",
//         allProducts: products
//       })
//     })
//   })
// })
