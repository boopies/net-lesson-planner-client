import React from 'react'
import './LandingPage.css'
import LandingButtons from './LandingButtons/LandingButtons'

export default class LandingPage extends React.Component{
    render(){
        return (
            <>
            <header className='landing-page___header'>
                <h1>N.E.T Lesson Plan Creator</h1>
            </header>
            <section className='landing-page___description'>
              <blockquote className='landing-page__quote'>
                <p className='landing-page__quote-body'>"If you fail to plan, you plan to fail."</p> <p className='landing-page__quote-author'>- Benjamin Franklin</p>
              </blockquote>
              <p className='landing-page___introduction'>Welcome to N.E.T Lesson Planner. This app was designed to get you up and running
              in the English Language Classroom. This will help you create lesson plan so you will never be cause out again in the classroom. 
              This wesite let's you quickly generate lesson plans, using a vast list of activities that have been proven usedful in the Language
              learning classroom.
              </p>
            </section>
                <LandingButtons />
            </>
        )
    }
}