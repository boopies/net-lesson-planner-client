import React from 'react';
import { Link } from 'react-router-dom'
import './SideDraw.css';
import TokenService from '../../services/token-service'
import ApiContext from '../../ApiContext'

class SideDraw extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    sideDrawOpen: false
    }}

    static contextType = ApiContext;

  handleLogoutClick = () => {
    TokenService.clearAuthToken()
    localStorage.clear();
    this.context.setTokenFalse()
    this.forceUpdate()
    this.context.removeCurrentUser();
      }

    renderLogoutLink() {
      return (
        <> 
          <Link
            onClick={this.handleLogoutClick}
            to='/'
            className={this.context.hasToken? '' : 'hidden'}>
            LOGOUT
          </Link>
        </>
      )
    }
  
    renderLoginLink() {
      return (
        <> 
          <Link
            to='/register'
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
    }

render(){
    let drawClasses = 'nav-side-draw';

    if (this.props.show) {
        drawClasses = 'nav-side-draw open';
    }
    return(
        <nav className={drawClasses} >
            <Link to='/'>HOME</Link>
            <Link to='/create'>CREATE</Link>
            <Link to='/read'>READ</Link>
            <Link to='/savedlessons'>SAVEDLESSONS</Link>
            {TokenService.hasAuthToken()
                    ? this.renderLogoutLink()
                    : this.renderLoginLink()}
        </nav>
    )
}
}


export default SideDraw;