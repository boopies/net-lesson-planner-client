import React from 'react'
import AuthApiService from '../services/auth-api-service'
import './RegistrationForm.css'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import CancelIcon from '@material-ui/icons/Cancel';

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
      <>
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

              <div className='registration_username'>
                <label htmlFor='RegistrationForm__username'>
                  Username
                </label>
                <input
                className='registrationform__user-input'
                  name='username'
                  type='text'
                  id='RegistrationForm__username'>
                </input>
              </div>

              <div className='registration_email'>
                <label htmlFor='RegistrationForm__email'>
                  email
                </label>
                <input
                  className='registrationform__user-input'
                  name='email'
                  type='email'
                  id='RegistrationForm__email'>
                </input>
              </div>

              <div className='registration_password'>
                <label htmlFor='RegistrationForm__password'>
                  Password
                </label>
                <input
                  className='registrationform__user-input'
                  name='password'
                  type='password'
                  id='RegistrationForm__password'>
                </input>
              </div>
              <div className='registration_buttons'>
              <button 
                className='button__green'
                type='submit'>
                <PersonAddIcon /> Register
              </button>
              <button 
                className='button__red'
                type='button'
                onClick={() => this.props.history.push('/')}>
                <CancelIcon /> Cancel
              </button>
              </div>
            </form>
          </main>
        </>
    )
  }
}
