import React from 'react';
import { Link } from 'react-router-dom'
import './SideDraw.css';

const SideDraw = props => {
    let drawClasses = 'nav-side-draw';

    if (props.show) {
        drawClasses = 'nav-side-draw open';
    }

    return(
        <nav className={drawClasses} >
            <Link to='/'>HOME</Link>
            <Link to='/create'>CREATE</Link>
            <Link to='/read'>READ</Link>
        </nav>
    )
}


export default SideDraw;