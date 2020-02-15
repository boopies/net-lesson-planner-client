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
    TokenService.clearAuthToken();
    this.context.setTokenFalse()
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
    let drawClasses = 'nav-side-draw';

    if (this.props.show) {
        drawClasses = 'nav-side-draw open';
    }

    const user = this.context.currentUser

    return(

        <nav className={drawClasses} >
            <h2 className={this.context.hasToken? '' : 'hidden'}>Hello {user.username}!</h2>
            <h2 className={this.context.hasToken? 'hidden' : ''}>Welcome, Friend!</h2>
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