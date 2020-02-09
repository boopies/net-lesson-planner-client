import React from 'react'
import './NavBar.css'
import { Link } from 'react-router-dom'
import TokenService from '../services/token-service'
import Hamburger from './SideDraw/Hamburger'

export default class NavBar extends React.Component{
  handleLogoutClick = () => {
    TokenService.clearAuthToken()
      }
  
    renderLogoutLink() {
      return (
        <>
          <Link
            onClick={this.handleLogoutClick}
            to='/'>
            LOGOUT
          </Link>
        </>
      )
    }
  
    renderLoginLink() {
      return (
        <>
          <Link
            to='/register'>
            REGISTER
          </Link>
          <Link
            to='/login'>
            LOG IN
          </Link>
        </>
      )
    }

    render(){
        return (
            <>
            <div>
                <Hamburger click={this.props.sideClickHandler} />
            </div>
            <div className="navbar__navigation">
                <Link to='/'>HOME</Link>
                <Link to='/create'>CREATE</Link>
                <Link to='/read'>READ</Link>
                <Link to='/savedlessons'>SAVEDLESSONS</Link>
                {TokenService.hasAuthToken()
                    ? this.renderLogoutLink()
                    : this.renderLoginLink()}
            </div>
            </>
        )
    }
}
