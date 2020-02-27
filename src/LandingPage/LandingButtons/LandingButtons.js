import React from 'react'
import './LandingButtons.css'
import {withRouter} from 'react-router-dom';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';

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
            <button
              className="button__green"
              type='button' 
              onClick={() => this.handleNewLesson()}>
              <NoteAddIcon /> Create a Lesson Plan</button>
              
            <button 
              className="button__indigo"
              type='button' 
              onClick={() => this.handleReadActivities()}>
              <ChromeReaderModeIcon /> Read the Activities</button>
        </section>
        )
    }
}

export default withRouter(LandingButtons)