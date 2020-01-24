import React from 'react';
import { Route, Switch } from 'react-router-dom'
import './App.css';
import NavBar from './NavBar/NavBar'
import LandingButtons from './LandingButtons/LandingButtons'

class App extends React.Component{
  render(){
    return (
      <>
      <nav>
        <NavBar />
      </nav>
      <header>
        <h1>N.E.T Lesson Planner</h1>
      </header>
      <main className='App'>
        <section className='description'>
          <blockquote>
            <p className='quote-body'>"If you fail to plan, you plan to fail."</p> <p className='quote-author'>- Benjiman Fraklin</p>
          </blockquote>
          <p>Welcome to N.E.T Lesson Planner. This app was designed to get you up and running
          in the English Language Classroom. This will help you create lesson plan so you will never be cause out again in the classroom. 
          This wesite let's you quickly generate lesson plans, using a vast list of activities that have been proven usedful in the Language
          learning classroom.
          </p>
        </section>
        <LandingButtons />
      </main>
      </>
    );
  }
}

export default App;
