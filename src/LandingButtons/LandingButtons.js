import React from 'react'
import './LandingButtons.css'
import { Link } from 'react-router-dom'

export default class LandingButtons extends React.Component{
    render(){
        return (
        <section className='buttons-to-pages'>
            <Link to='/create'><div className='buttons--to'>Create a Lesson Plan</div></Link>
            <Link to='/read'><div className='buttons--to'>Read about the Activities</div></Link>
        </section>
        )
    }
}


