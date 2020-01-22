import React, {Component} from 'react'
import Axios from 'axios'
import SignupForm from './SignupForm'
import Navbar from './navbar'

class newUser extends Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      address: '',
      telephone: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  async handleSubmit(event) {
    event.preventDefault()
    await Axios.post('/api/users/', this.state)
    this.setState(this.state)
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        <SignupForm
          state={this.state}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

export default newUser
