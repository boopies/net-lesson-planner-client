import React from 'react';
import ApiContext from '../../ApiContext'
import './LessonPlan.css'
import { findActivity } from '../../ReadActivities/helpers'
import uuid from 'react-uuid'

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
        const materialArray = materialString.split(/[\s,]+/);
        return (
            <>
            {materialArray.map(material =>{
            return {material}.length === 0
            ? <></>
            : <li key={uuid()}>{material}</li>
            }
            )}
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
                <li key={uuid()}>{objOne}</li>
            </>)
        } else if (objTwo.length !== 0 && objThree.length === 0) {
                return (
                <>
                    <li key={uuid()}>{objOne}</li>
                    <li key={uuid()}>{objTwo}</li>
                </>)
        } else {
            return (
                <>
                    <li key={uuid()}>{objOne}</li>
                    <li key={uuid()}>{objTwo}</li>
                    <li key={uuid()}>{objThree}</li>
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
            <li key={uuid()}>{refOne}</li>
        </>)
    } else if (refTwo.length !== 0 && refThree.length === 0) {
            return (
            <>
                <li key={uuid()}>{refOne}</li>
                <li key={uuid()}>{refTwo}</li>
            </>)
    } else {
        return (
            <>
                <li key={uuid()}>{refOne}</li>
                <li key={uuid()}>{refTwo}</li>
                <li key={uuid()}>{refThree}</li>
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
               <div>
                    <div key={uuid()} className='lesson_plan__title'><h3>Activity</h3></div>
                    <div key={uuid()} className='lesson_plan__title'>{activity.title}</div>
                    <div key={uuid()} className='lesson_plan__title'><h3>Duration</h3></div>
                    <div key={uuid()} className='lesson_plan__title'>{activity.duration}</div>
                </div>
                <div>
                    <div key={uuid()} className="lesson_plan__how_to_play">
                        <p>groups:{' '}{activity.grouping}</p>
                        {activity.content.split(/\\n \\r|\\n|\n|\\n \\r/).map((para, i) =>
                            <p key={i}>{para}</p>
                        )}
                    </div>
                </div>
            </>
        )
        }
    }

    render(){
        //const lesson = this.props.location.state.state
 /*       return(
            <>
            <header>
                <h1>{lesson.name}</h1>
            </header>
            <main>
                <section id="lesson_plan__full">
                    <div className='lesson_plan date'>
                        <div className='lesson_plan__title'><h3>Date</h3></div>
                        <div className='lesson_plan__content'><p>{lesson.day}{' '}{lesson.date}</p></div>
                    </div>
                    <div className='lesson_plan period'>
                        <div className='lesson_plan__title'><h3>Period</h3></div>
                        <div className='lesson_plan__content'><p>{lesson.period}</p></div>
                    </div>
                    <div className='lesson_plan class'>
                        <div className='lesson_plan__title'><h3>Class</h3></div>
                        <div className='lesson_plan__content'><p>{lesson.classLevel}</p></div>
                    </div>
                    <div className='lesson_plan class_size'>
                        <div className='lesson_plan__title'><h3>Class Size</h3></div>
                        <div className='lesson_plan__content'><p>{lesson.classSize} {' '} Students</p></div>
                    </div>
                    <div className='lesson_plan time'>
                        <div className='lesson_plan__title'><h3>Class Length</h3></div>
                        <div className='lesson_plan__content'><p>{lesson.duration}</p></div>
                    </div>
                    <div className='lesson_plan topic'>
                        <div className='lesson_plan__title'><h3>Topic</h3></div>
                        <div className='lesson_plan__content'><p>{lesson.topic}</p></div>
                    </div>
                    <div className='lesson_plan goal'>
                        <div className='lesson_plan__title'><h3>Goal</h3></div>
                        <div className='lesson_plan__content'><p>{lesson.goal}</p></div>
                    </div>
                    <div className='lesson_plan objectives'>
                        <div className='lesson_plan__title'><h3>Objectives</h3></div>
                        <div className='lesson_plan__content'>                    
                        <ul>Students Should be able to - 
                        {this.renderObjectives()}
                    </ul></div>
                    </div>
                    <div className='lesson_plan materials'>
                        <div className='lesson_plan__title'><h3>Materials</h3></div>
                        <div className='lesson_plan__content'>                    
                        <ul> 
                        {this.renderMaterialsList()}
                        </ul>
                        </div>
                    </div>
                    <div className='lesson_plan Star-Lesson-plan'>
                        <div className='lesson_plan__title'><h2>Lesson</h2></div>              
                    </div>
                    <div className='Warm-up'>
                        {this.renderActivities(lesson.warmup)}
                    </div>
                    <div className='Presentation'>
                        {this.renderActivities(lesson.presentationOne)}
                        {this.renderActivities(lesson.presentationTwo)}
                    </div>
                    <div className='Practice'>
                        {this.renderActivities(lesson.practiceOne)}
                        {this.renderActivities(lesson.practiceTwo)}
                        {this.renderActivities(lesson.practiceThree)}
                    </div>
                    <div className='Producion'>
                        {this.renderActivities(lesson.productionOne)}
                        {this.renderActivities(lesson.productionTwo)}
                    </div>
                    <div className='Cooldown'>
                    {this.renderActivities(lesson.cooldown)}
                    </div>
                    <div className='lesson_plan class'>
                        <div className='lesson_plan__title'><h3>Reflection Questions</h3></div>
                        <div className='lesson_plan__content'>                        <ul>
                            {this.renderReflection()}
                        </ul></div>
                    </div>
                </section>
                <button type='button' onClick={() => this.handlePrintLesson('printableArea')}>Print</button>
                <button type='button' onClick={() => this.handleNewLesson()}>New Lesson</button>
                <button type='button' onClick={() => this.handleGoHome()}>Go Home</button>
            </main>
            </>
        )*/
        return(
            <>
            <header>
                <h1>Test: {this.props.history.location.state.state.title}</h1>
            </header>
            </>
        )
    }
}