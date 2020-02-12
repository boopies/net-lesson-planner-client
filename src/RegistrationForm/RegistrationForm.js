import React from 'react'
import AuthApiService from '../services/auth-api-service'

export default class RegistrationForm extends React.Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  }

  handleRegistrationSuccess = user => {
    const { history } = this.props
    history.push('/login')
  }

  state = { error: null }

  handleSubmit = ev => {
    ev.preventDefault()
    const { email, username, password } = ev.target
    this.setState({ error: null })
    AuthApiService.postUser({
      username: username.value,
      password: password.value,
      email: email.value,
    })
      .then(user => {
        email.value = ''
        username.value = ''
        password.value = ''
        this.handleRegistrationSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  render() {
    const { error } = this.state
    return (
      <div className="NET_registration__form">
        <header className="registration__header">
            <h1 className="registration__heading">
                Register
            </h1>
        </header>
        <main className="registration__main">
            <form
              className='RegistrationForm'
              onSubmit={this.handleSubmit}
            >
              <div role='alert'>
                {error && <p className='red'>{error}</p>}
              </div>

              <div className='username'>
                <label htmlFor='RegistrationForm__username'>
                  User name
                </label>
                <input
                  name='username'
                  type='text'
                  required
                  id='RegistrationForm__username'>
                </input>
              </div>

              <div className='email'>
                <label htmlFor='RegistrationForm__email'>
                  email
                </label>
                <input
                  name='email'
                  type='email'
                  required
                  id='RegistrationForm__email'>
                </input>
              </div>

              <div className='password'>
                <label htmlFor='RegistrationForm__password'>
                  Password
                </label>
                <input
                  name='password'
                  type='password'
                  required
                  id='RegistrationForm__password'>
                </input>
              </div>

              <button type='submit'>
                Register
              </button>
            </form>
          </main>
        </div>
    )
  }
}
