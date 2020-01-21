import React from 'react'

const SignupForm = props => {
  const {state, handleChange, handleSubmit} = props
  return (
    <main>
      <h3 className="allProductsTitle"> Signup </h3>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="centerDiv">
          <div>
            <label htmlFor="firstName">First Name:</label>
            <input
              placeholder="This field is required!"
              onChange={handleChange}
              type="text"
              name="firstName"
              value={state.firstName}
              required
            />

            <label htmlFor="lastName">Last Name:</label>
            <input
              placeholder="This field is required!"
              onChange={handleChange}
              type="text"
              name="lastName"
              value={state.lastName}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              placeholder="This field is required!"
              onChange={handleChange}
              type="text"
              name="email"
              value={state.email}
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              placeholder="This field is required!"
              onChange={handleChange}
              type="text"
              name="password"
              value={state.password}
              required
            />
          </div>
          <div>
            <label htmlFor="address">Address:</label>
            <input
              placeholder="This field is required!"
              onChange={handleChange}
              type="text"
              name="address"
              value={state.address}
              required
            />

            <label htmlFor="telephone">Telephone:</label>
            <input
              placeholder="Address"
              onChange={handleChange}
              type="integer"
              name="telephone"
              value={state.telephone}
            />
          </div>
          <br /> <br />
        </div>
        <button type="submit">Submit</button>
      </form>
    </main>
  )
}

export default SignupForm
