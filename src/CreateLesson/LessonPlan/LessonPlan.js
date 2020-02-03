import React from 'react';
import ApiContext from '../../ApiContext'
import './LessonPlan.css'
import { findActivity } from '../../ReadActivities/helpers'

export default class LessonPlan extends React.Component{

    static contextType = ApiContext;

    handlePrintLesson = () =>{
        window.print();
    }

    handleNewLesson = () => {
        this.props.history.push('/create')
      };
    
    handleGoHome = () => {
        this.props.history.push('/')
      };

    renderMaterialsList(){
        const materialString = this.props.location.state.state.materials
        const materialArray = materialString.split(',');
        return (
            <>
            {materialArray.map(material =>
            <li>{material}</li>)}
            </>
        )
    }


    renderObjectives(){
            const objOne = this.props.location.state.state.objectiveOne
            const objTwo = this.props.location.state.state.objectiveTwo
            const objThree = this.props.location.state.state.objectiveThree

        if (objTwo.length === 0 && objThree.length === 0){
            return (
            <>
                <li>{objOne}</li>
            </>)
        } else if (objTwo.length !== 0 && objThree.length === 0) {
                return (
                <>
                    <li>{objOne}</li>
                    <li>{objTwo}</li>
                </>)
        } else {
            return (
                <>
                    <li>{objOne}</li>
                    <li>{objTwo}</li>
                    <li>{objThree}</li>
                </>)
        }
    }

    renderReflection(){
        const refOne = this.props.location.state.state.reflectionOne
        const refTwo = this.props.location.state.state.reflectionTwo
        const refThree = this.props.location.state.state.reflectionThree

    if (refTwo.length === 0 && refThree.length === 0){
        return (
        <>
            <li>{refOne}</li>
        </>)
    } else if (refTwo.length !== 0 && refThree.length === 0) {
            return (
            <>
                <li>{refOne}</li>
                <li>{refTwo}</li>
            </>)
    } else {
        return (
            <>
                <li>{refOne}</li>
                <li>{refTwo}</li>
                <li>{refThree}</li>
            </>)
    }
}

    renderActivities(actId){
        const { activities=[] } = this.context
        const activity = findActivity(activities, actId) || { content: '' }

        if(actId.length === 0){
            return <>
            </>
        } else{
        return(
            <>
               <tr>
                    <th>Activity</th>
                    <td>{activity.name}</td>
                    <th>duration</th>
                    <td>{activity.duration}</td>
                </tr>
                <tr>
                    <td colSpan="4">
                        <p>groups:{' '}{activity.groups}</p>
                        <p>
                        {activity.content}</p>
                    </td>
                </tr>
            </>
        )
        }
    }

    render(){
        const lesson = this.props.location.state.state
        return(
            <>
            <header>
                <h1>{lesson.name}</h1>
            </header>
            <main>
                <div id="printableArea">
                <table className='lesson-plan'>
                <tbody>
                <tr>
                    <th colSpan='2'>Date</th>
                    <th colSpan='2'>Period</th>
                </tr>
                <tr>
                    <td colSpan='2'>{lesson.day}{' '}{lesson.date}</td>
                    <td colSpan='2'>{lesson.period}</td>
                </tr>
                <tr>
                    <th colSpan='2'>Class</th>
                    <th colSpan='2'>Class Size</th> 
                </tr>
                <tr>
                    <td colSpan='2'>{lesson.classLevel}</td>
                    <td colSpan='2'>{lesson.classSize}{' '}Students</td> 
                </tr>
                <tr>
                    <th colSpan='2'>Time</th>
                    <th colSpan='2'>Topic</th> 
                </tr>
                <tr>
                    <td colSpan='2'>{lesson.duration}</td>
                    <td colSpan='2'>{lesson.topic}</td> 
                </tr>
                <tr>
                    <th colSpan='4'>Goal</th>
                </tr>
                <tr>
                    <td colSpan='4'>The goal of the class is to {lesson.goal}</td>
                </tr>
                <tr>
                    <th colSpan='4'>Objectives</th>
                </tr>
                <tr>
                    <td colSpan='4'>
                    <ul>Students Should be able to - 
                        {this.renderObjectives()}
                    </ul>
                    </td>
                </tr>
                <tr>
                    <th colSpan='4'>Materials</th>
                </tr>
                <tr>
                    <td colSpan='4' className="multi-column">
                    <ul> 
                        {this.renderMaterialsList()}
                    </ul>
                    </td>
                </tr>
                <tr>
                    <th colSpan='4'>Lesson</th>
                </tr>
                <tr>
                    <th colSpan='4'>Warm-up</th>
                </tr>
                    {this.renderActivities(lesson.warmup)}
                <tr>
                    <th colSpan='4'>Presentation</th>
                </tr>
                  {this.renderActivities(lesson.presentationOne)}
                  {this.renderActivities(lesson.presentationTwo)}
                <tr>
                    <th colSpan='4'>Practice</th>
                </tr>
                {this.renderActivities(lesson.practiceOne)}
                {this.renderActivities(lesson.practiceTwo)}
                {this.renderActivities(lesson.practiceThree)}
                <tr>
                    <th colSpan='4'>Perform</th>
                </tr>
                {this.renderActivities(lesson.productionOne)}
                {this.renderActivities(lesson.productionTwo)}
                <tr>
                    <th colSpan='4'>Cool Down</th>
                </tr>
                {this.renderActivities(lesson.cooldown)}
                <tr>
                    <th colSpan='4'>Reflection Questions</th>
                </tr>
                <tr>
                    <td colSpan="4">
                        <ul>
                            {this.renderReflection()}
                        </ul>
                    </td>
                </tr>
                </tbody>
                </table>
                </div>
                <button type='button' onClick={() => this.handlePrintLesson('printableArea')}>Print</button>
                <button type='button' onClick={() => this.handleNewLesson()}>New Lesson</button>
                <button type='button' onClick={() => this.handleGoHome()}>Go Home</button>
            </main>
            </>
        )
    }
}