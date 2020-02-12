import React, { Component } from 'react'
import TokenService from '../services/token-service'
import AuthApiService from '../services/auth-api-service'
import ApiContext from '../ApiContext'

export default class LoginForm extends Component {
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


  handleSubmitJwtAuth = ev => {
    ev.preventDefault()
    this.setState({ error: null })
    const { username, password } = ev.target
    let user = username.value
    console.log(user)
    AuthApiService.postLogin({
      username: username.value,
      password: password.value,
    })
      .then(res => {
        username.value = ''
        password.value = ''
        TokenService.saveAuthToken(res.authToken)
      })
      .then(this.getUserData(user))
      .then(this.handleLoginSuccess())
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  getUserData = user => {
      fetch(`http://localhost:8000/api/users/${user}`, {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
          },
        })
          .then(currentUserRes =>
            (!currentUserRes.ok)
              ? currentUserRes.json().then(e => Promise.reject(e))
              : currentUserRes.json()
          )
          .then((currentUser) => {
              this.context.UserGet({currentUser})
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
              <div className='username'>
                <label htmlFor='LoginForm__username'>
                  Username
                </label>
                <input
                  required
                  name='username'
                  id='LoginForm__username'>
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
