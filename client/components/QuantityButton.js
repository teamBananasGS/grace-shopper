import React, {Component} from 'react'

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
      quantity: this.state.quantity > 1 ? this.state.quantity - 1 : 1
    })
  }

  render() {
    return (
      <div>
        <div className="quantity-input">
          <button
            type="button"
            className="addsubtractbutton"
            onClick={this.decrement}
          >
            &mdash;
          </button>
          <input
            className="cartQuantity"
            type="text"
            value={this.state.quantity}
            readOnly
          />
          <button
            type="button"
            className="addsubtractbutton"
            onClick={this.increment}
          >
            &#xff0b;
          </button>{' '}
          <span />
          <button
            className="updateQtyBtn"
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
