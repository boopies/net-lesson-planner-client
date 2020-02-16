import React, {Component} from 'react'
import AuthApiService from '../services/auth-api-service'
import ApiContext from '../ApiContext'
import config from '../config'

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
            <div className="NET_Login__form">
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
                        <div className='username'>
                            <label htmlFor='LoginForm__username'>
                                Username
                            </label>
                            <input required="required" 
                            name='username' 
                            id='LoginForm__username' />
                        </div>
                        <div className='password'>
                            <label htmlFor='LoginForm__password'>
                                Password
                            </label>
                            <input
                                required="required"
                                name='password'
                                type='password'
                                id='LoginForm__password' />
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