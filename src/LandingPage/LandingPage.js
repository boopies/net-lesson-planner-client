import React from 'react'
import './LandingPage.css'
import ApiContext from '../ApiContext'
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';

export default class LandingPage extends React.Component{
    handleNewLesson = () => {
        this.props.history.push('/create')
      };
    
    handleReadActivities= () => {
        this.props.history.push('/read')
      };

    static contextType = ApiContext;

    render(){
        return (
            <>
            <header className='landing-page___header'>
                <div className='landing-page__head'>
                    <h1 className='landing-page__h1'>N.E.T Lesson Plan Creator</h1>
                </div>
            </header>
            <section className='landing-page___description'>
                    <div className='landing__quote'>
                        <div className="Benjamin_Franklin">
                            <div className='Benjamin-Fanklin__Quote'>
                                <div className='landing-page__quote-body'>"If you fail to plan, <br /> you plan to fail."</div> 
                                <div className='landing-page__quote-author'>- Benjamin Franklin</div>
                            </div>
                        </div>
                    </div>
                <div className='landing-page_info'>
                    <p className='landing-page___introduction'>&emsp;&emsp;Welcome to N.E.T Lesson Planner. This app was designed to get you up and running
                    in the English Language Classroom. <br /> &emsp; &emsp;This will help you create lesson plan so you will never be caught out again in the classroom. 
                    This website lets you quickly generate lesson plans, using a vast list of activities that have been proven useful in the Language
                    learning classroom.
                    <br />&emsp;&emsp;Free users can create lessons and read activities. However please register for a full account if you want to add activities, and saved your lessons.
                    <br />
                    &emsp;&emsp;If you want to trial all the areas that the full users can access, please use this demo account. Editing lessons, and saving lessons have been
                    disabled due to it being a public account. But you can see what the saved lessons look like. </p>
                    <div className='landing-page___introduction user_info' >
                    <h3>Demo Account</h3>
                    <b>username:</b> demo
                    <br />
                    <b>password:</b> password
                    <br />
                    </div>
                    <p className='landing-page___introduction'>&emsp;&emsp;If you like what you see, and want to add to the list of activities, or have your lessons saved, please join.</p>
                    <div className='buttons-to-pages'>
                        <button
                        className="button__green"
                        type='button' 
                        onClick={() => this.handleNewLesson()}>
                        <NoteAddIcon /> Create</button>
                        
                        <button 
                        className="button__indigo"
                        type='button' 
                        onClick={() => this.handleReadActivities()}>
                        <ChromeReaderModeIcon /> Read</button>
                    </div>
                </div>
            </section>
                
            </>
        )
    }
}