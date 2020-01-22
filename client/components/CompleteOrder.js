import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class CompleteOrder extends Component {
  render() {
    const details = this.props.match.params
    return (
      <div>
        <div>
          <h3>{`Your order #${details.order} has been placed!`}</h3>
          <h3>
            Thank you for your purchase, {details.first + ' ' + details.last}!
          </h3>
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

export default CompleteOrder
