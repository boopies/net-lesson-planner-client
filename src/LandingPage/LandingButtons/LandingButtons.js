import React from 'react'
import './LandingButtons.css'
import {withRouter} from 'react-router-dom';

class LandingButtons extends React.Component{
    handleNewLesson = () => {
        this.props.history.push('/create')
      };
    
    handleReadActivities= () => {
        this.props.history.push('/read')
      };

    render(){
        return (
        <section className='buttons-to-pages'>
            <button type='button' onClick={() => this.handleNewLesson()}>Create a Lesson Plan</button>
            <button type='button' onClick={() => this.handleReadActivities()}>Read About the Activities</button>
        </section>
        )
    }
}

export default withRouter(LandingButtons)