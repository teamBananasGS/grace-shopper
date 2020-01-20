import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class GuestCompleteOrder extends Component {
  render() {
    return (
      <div>
        <div>
          <h3>{`Your order #${
            this.props.match.params.orderId
          } has been placed!`}</h3>
          <h3>Thank you for your purchase, Guest!</h3>
        </div>
        <div>
          <Link to="/">
            <button type="button">Return to Powersuits</button>
          </Link>
        </div>
      </div>
    )
  }
}

export default GuestCompleteOrder
