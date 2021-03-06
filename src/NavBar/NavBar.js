import React from 'react';
import './NavBar.css';
import {Link} from 'react-router-dom';
import TokenService from '../services/token-service';
import Hamburger from './SideDraw/Hamburger';
import ApiContext from '../ApiContext';

export default class NavBar extends React.Component {

  static contextType = ApiContext;

    handleLogoutClick = () => {
        TokenService.clearAuthToken()
        localStorage.clear();
        this.context.setTokenFalse()
        this.forceUpdate()
        this.context.removeCurrentUser();
    };

    renderLogoutLink() {
        return (
        <> 
            <Link 
              onClick = {this.handleLogoutClick}
              to = '/' 
              className={this.context.hasToken? '' : 'hidden'}
              > 
                LOGOUT 
            </Link>
        </>)
    };

    renderLoginLink() {
        return (
            <>
              <Link 
              to = '/register'
              className={this.context.hasToken? 'hidden' : ''}> 
                REGISTER 
              </Link>
              <Link
                to='/login'
                className={this.context.hasToken? 'hidden' : ''}>
                LOG IN 
              </Link>
            </>
        )
    };

    render() {
        return (
            <> 
              <div>
                <Hamburger click={this.props.sideClickHandler}/>
              </div>
              <div className="navbar__navigation">
                <Link to='/'>HOME</Link>
                <Link to='/create'>CREATE</Link>
                <Link to='/read'>READ</Link>
                <Link to='/savedlessons'>SAVEDLESSONS</Link>
                    {this.renderLogoutLink()}
                    {this.renderLoginLink()} 
              </div>
            </>
        )
    };
}