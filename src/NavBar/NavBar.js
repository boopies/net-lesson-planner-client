import React from 'react'
import './NavBar.css'
import { Link } from 'react-router-dom'

export default class NavBar extends React.Component{
    render(){
        return (
            <div className="nav-bar">
                <Link to='/'>Home</Link>
                <Link to='/create'>Create</Link>
                <Link to='/read'>Read</Link>
            </div>
        )
    }
}
