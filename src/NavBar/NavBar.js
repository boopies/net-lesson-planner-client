import React from 'react'
import './NavBar.css'
import { Link } from 'react-router-dom'
import Hamburger from './SideDraw/Hamburger'

export default class NavBar extends React.Component{
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
            </div>
            </>
        )
    }
}
