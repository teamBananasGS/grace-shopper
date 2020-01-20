import React, {Component} from 'react'
import {connect} from 'react-redux'

class QuantityButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: this.props.quantity
    }
    this.increment = this.increment.bind(this)
    this.decrement = this.decrement.bind(this)
  }

  increment() {
    this.setState({
      quantity:
        this.state.quantity < this.props.stock
          ? this.state.quantity + 1
          : this.props.stock
    })
  }

  decrement() {
    this.setState({
      quantity: this.state.quantity > 0 ? this.state.quantity - 1 : 0
    })
  }

  render() {
    return (
      <div>
        <div className="quantity-input">
          <button type="button" onClick={this.decrement}>
            &mdash;
          </button>
          <input type="text" value={this.state.quantity} readOnly />
          <button type="button" onClick={this.increment}>
            &#xff0b;
          </button>
          <button
            type="button"
            value={this.state.quantity}
            onClick={() =>
              this.props.handleUpdateItem(
                this.props.productId,
                this.state.quantity
              )
            }
          >
            Update
          </button>
        </div>
      </div>
    )
  }
}

export default QuantityButton
