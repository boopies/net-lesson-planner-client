import React, { Component } from 'react'
import TokenService from '../services/token-service'
import AuthApiService from '../services/auth-api-service'
import ApiContext from '../ApiContext'

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: []
    };
  }

  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  }

  static contextType = ApiContext;

  handleLoginSuccess = () => {
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/'
    history.push(destination)
  }

  state = { error: null }

  handleSubmitBasicAuth = ev => {
    ev.preventDefault()
    const { user_name, password } = ev.target
    TokenService.saveAuthToken(
      TokenService.makeBasicAuthToken(user_name.value, password.value)
    )
    user_name.value = ''
    password.value = ''
    this.handleLoginSuccess()
  }

  handleSubmitJwtAuth = ev => {
     ev.preventDefault()
     this.setState({ error: null })
     const { user_name, password } = ev.target
     AuthApiService.postLogin({
       user_name: user_name.value,
       password: password.value,
     })
       .then(res => {
         user_name.value = ''
         password.value = ''
         TokenService.saveAuthToken(res.authToken)

       })
       .then(
        fetch(`http://localhost:8000/api/users/${user_name}`, {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(user_name),
        })
          .then(user => {
            this.setState(user)
            this.context.UserGet(user)
          }))
       .then(this.handleLoginSuccess())
       .catch(res => {
       this.setState({ error: res.error })
     })
 }

    handleGetUserInfo = e => {
      e.preventDefault()
      const { user_name } = e.target
      fetch(`http://localhost:8000/api/users/${user_name}`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(user_name),
      })
        .then(user => {
          this.setState(user)
          this.context.UserGet(user)
        })
    .catch(res => {
    this.setState({ error: res.error })
  })
}
   

  render() {
    const { error } = this.state
    return (
      <div className="NET_Login__form">
      <header className="login__header">
          <h1 className="login__heading">
              Log In
          </h1>
      </header>
        <main className="login__main">
            <form
              className='LoginForm'
              onSubmit={this.handleSubmitJwtAuth}
            >
              <div role='alert'>
                {error && <p className='red'>{error}</p>}
              </div>
              <div className='user_name'>
                <label htmlFor='LoginForm__user_name'>
                  User name
                </label>
                <input
                  required
                  name='user_name'
                  id='LoginForm__user_name'>
                </input>
              </div>
              <div className='password'>
                <label htmlFor='LoginForm__password'>
                  Password
                </label>
                <input
                  required
                  name='password'
                  type='password'
                  id='LoginForm__password'>
                </input>
              </div>
              <button type='submit'>
                Login
              </button>
            </form>
        </main>
      </div>
    )
  }
}
