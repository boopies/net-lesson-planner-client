import React from 'react'
import AuthApiService from '../services/auth-api-service'
import './RegistrationForm.css'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import CancelIcon from '@material-ui/icons/Cancel';
import {Link} from 'react-router-dom'
import ValidationError from '../ReadActivities/ValidationError/ValidationError'

export default class RegistrationForm extends React.Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  }

  constructor(props) {
    super(props);
    this.state = {
        password:'',
        password2:'',
        showDiv: false,
        error: null
  }
}

validatePassword2(fieldValue) {
  const password = this.state.password
  const password2 = this.state.password2
  if (password !== password2) {
    return <div id="FSErrorMessage">You must input the same password</div>;
  }
}

updatePassword(password){
  this.setState({password: password});
}

updatePassword2(password2){
  this.setState({password2: password2})
}

  handleRegistrationSuccess = user => {
    const { history } = this.props
    history.push('/login')
  }

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
    const pass = this.state.password
    const lowerCaseLetters = /[a-z]/g;
    const numbers = /[0-9]/g;
    const upperCaseLetters = /[A-Z]/g;
    const special = /[-~!@#$%^&*()_+=<>.?/;:"'|{}`]/g;
    const { showDiv } = this.state;
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
                  id='RegistrationForm__password'
                  onChange={e => this.updatePassword(e.target.value)}
                  onFocus={() => this.setState({ showDiv: true })}
                  onBlur={() => this.setState({ showDiv: false })}>
                </input>
                { showDiv
                    ? <div id="message">
                  <ul>Password must contain the following:
                  <li id="letter" className={pass.match(lowerCaseLetters)?'valid':'invalid'}>A <b>lowercase</b> letter</li>
                  <li id="capital" className={pass.match(upperCaseLetters)?'valid':'invalid'}>A <b>capital (uppercase)</b> letter</li>
                  <li id="number" className={pass.match(numbers)?'valid':'invalid'}>A <b>number</b></li>
                  <li id="special" className={pass.match(special)?'valid':'invalid'}>A <b>special character</b></li>
                  <li id="length" className={pass.length >= 8 ?'valid':'invalid'}>Minimum <b>8 characters</b></li>
                  </ul>
                </div>
                : <></>}
              </div>
              <div className='registration_password'>
                <label htmlFor='RegistrationForm__password'>
                  Reenter Password
                </label>
                <input
                  className='registrationform__user-input'
                  name='password_check'
                  type='password'
                  title="Must contain at least one number and one uppercase and lowercase letter, one special character and at least 8 or more characters"
                  id='RegistrationForm__password'
                  onChange={e => this.updatePassword2(e.target.value)}>
                </input>
                {<ValidationError message={this.validatePassword2()} />}
              </div>
              <div className='gotoLogin'>
                  <h3>Already a member?
                  <Link
                  to='/login'
                  className={this.context.hasToken? 'hidden' : ''}>
                  {' '}Log in here.
                </Link></h3>
              </div>

              <div className='registration_buttons'>
              <button 
                className='button__green'
                type='submit'
                disabled={this.validatePassword2()}>
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
