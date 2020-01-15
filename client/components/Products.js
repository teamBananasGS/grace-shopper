import React from 'react'
import Navbar from './navbar'

const Products = () => {
  return (
    <div>
      {/* <ul>
          {props.Products.map(product => (
              <div key={product.id}>
                <li>{product.name}</li>
              </div>
          ))}
        </ul> */}
      <Navbar />
    </div>
  )
}

export default Products
