import React, {Component} from 'react'
import AuthApiService from '../services/auth-api-service'
import ApiContext from '../ApiContext'
import config from '../config'
import './LoginForm.css'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CancelIcon from '@material-ui/icons/Cancel';
import {Link} from 'react-router-dom'

export default class LoginForm extends Component {
    static defaultProps = {
        location: {},
        history: {
            push: () => {}
        }
    }

    static contextType = ApiContext;

    handleLoginSuccess = () => {
        this.context.setTokenTrue()
        const { location, history } = this.props
        const destination = (location.state || {}).from || '/'
        history.push(destination)
        window.location.reload()
    }

    state = {
        error: null
    }

    handleSubmitJwtAuth = ev => {
        ev.preventDefault()
        this.setState({error: null})
        const {username, password} = ev.target
        let user = username.value
        fetch(`${config.API_ENDPOINT}/users/${user}`, {
          method: 'GET',
          headers: {
              'content-type': 'application/json'
          }
      })
          .then(
              currentUserRes => (!currentUserRes.ok)
                  ? currentUserRes.json().then(e => Promise.reject(e))
                  : currentUserRes.json()
          )
          .then((currentUser) => {
              localStorage.setItem('currentUser', JSON.stringify(currentUser));
          })
          .then(this.context.setNewUser)
          .catch(res => {
            this.setState({error: res.error})
        })
        .then(AuthApiService.postLogin(
                {username: username.value, 
                password: password.value})
            .then(res => {
                username.value = ''
                password.value = ''
                this.handleLoginSuccess()
            })
            .catch(res => {
                this.setState({error: res.error})
            }))
        }

    render() {
        const {error} = this.state
        return (
            <>
                <header className="login__header">
                    <h1 className="login__heading">
                        Log In
                    </h1>
                </header>
                <main className="login__main">
                    <form className='LoginForm' onSubmit={this.handleSubmitJwtAuth}>
                        <div role='alert'>
                            {error && <p className='red'>{error}</p>}
                        </div>
                        <div className='loginform__username'>
                            <label className='loginform__user-title'>
                                Username
                            </label>
                            <input 
                            required
                            className='loginform__user-input' 
                            name='username' 
                            id='LoginForm__username' />
                        </div>
                        <div className='loginform__password'>
                            <label className='loginform__user-title'>
                                Password
                            </label>
                            <input
                                required
                                className='loginform__user-input'
                                name='password'
                                type='password'
                                id='LoginForm__password' />
                        </div>
                        <div className='gotoRegister'>
                            <h3>Not a member?
                            <Link
                            to='/register'
                            className={this.context.hasToken? 'hidden' : ''}>
                            {' '}Register here.
                            </Link></h3>
                        </div>
                        <div className='loginButtons'>
                        <button className='button__violet' type='submit'>
                            <ExitToAppIcon /> Login
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