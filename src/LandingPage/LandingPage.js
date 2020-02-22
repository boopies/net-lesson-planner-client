import React from 'react'
import './LandingPage.css'
import LandingButtons from './LandingButtons/LandingButtons'
import ApiContext from '../ApiContext'

export default class LandingPage extends React.Component{

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
                    <p className='landing-page___introduction'>&emsp;Welcome to N.E.T Lesson Planner. This app was designed to get you up and running
                    in the English Language Classroom. <br /> &emsp; This will help you create lesson plan so you will never be caught out again in the classroom. 
                    This website lets you quickly generate lesson plans, using a vast list of activities that have been proven useful in the Language
                    learning classroom.
                    </p>
                    <LandingButtons />
                </div>
            </section>
                
            </>
        )
    }
}