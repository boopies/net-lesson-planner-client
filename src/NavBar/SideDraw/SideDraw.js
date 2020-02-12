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

  handleLogoutClick = () => {
    TokenService.clearAuthToken();
    this.context.sidedrawClose();
      }

      static contextType = ApiContext;
  
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

    return(

        <nav className={drawClasses} >
            {TokenService.hasAuthToken()
                    ? <h3>Welcome back!</h3>
                    : <h3> Hello, Friend!</h3>}
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