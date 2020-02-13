import React from 'react';
import ApiContext from '../../ApiContext'
import './SavedLessonPlan.css'
import { findActivity } from '../../ReadActivities/helpers'
import uuid from 'react-uuid'

export default class SavedLessonPlan extends React.Component{

    static contextType = ApiContext;

    handlePrintLesson = () =>{
        window.print();
    }

    handleNewLesson = () => {
        this.props.history.push('/create')
      };
    
    handleGoHome = () => {
        this.props.history.push('/savedlessons')
      };

      renderMaterialsList(){
        const materialString = this.props.location.state.state.lesson[0].materials
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
        const objOne = this.props.location.state.state.lesson[0].objective_one
        const objTwo = this.props.location.state.state.lesson[0].objective_two
        const objThree = this.props.location.state.state.lesson[0].objective_three

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
    }}

      renderReflection(){
        const refOne = this.props.location.state.state.lesson[0].reflection_one
        const refTwo = this.props.location.state.state.lesson[0].reflection_two
        const refThree = this.props.location.state.state.lesson[0].reflection_three

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

        if(parseInt(actId) < 6){
            return <>
            <div>No activity</div>
            </>
        } else{
        return(
            <>
               <div>
                    <div key={uuid()} className='lesson_plan__title'><h3>Activity</h3></div>
                    <div key={uuid()} className='lesson_plan__title'>{activity.title}</div>
                    <div key={uuid()} className='lesson_plan__title'><h3>Activity Length</h3></div>
                    <div key={uuid()} className='lesson_plan__title'>{activity.duration}</div>
                </div>
                <div>
                    <div key={uuid()} className="lesson_plan__how_to_play">
                        <p>Groups:{' '}{activity.grouping}</p>
                        <p><b>Directions:</b> {' '}</p>
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
    const savedlesson = this.props.location.state.state.lesson[0]
      return(
            <>
            <header>
                <h1>{savedlesson.title}</h1>
            </header>
            <main>
                <section id="lesson_plan__full">
                    <div className='lesson_plan date'>
                        <div className='lesson_plan__title'><h3>Date</h3></div>
                        <div className='lesson_plan__content'><p>{savedlesson.day}{' '}{savedlesson.date}</p></div>
                    </div>
                    <div className='lesson_plan period'>
                        <div className='lesson_plan__title'><h3>Period</h3></div>
                        <div className='lesson_plan__content'><p>{savedlesson.period}</p></div>
                    </div>
                    <div className='lesson_plan class'>
                        <div className='lesson_plan__title'><h3>Class</h3></div>
                        <div className='lesson_plan__content'><p>{savedlesson.classlevel}</p></div>
                    </div>
                    <div className='lesson_plan class_size'>
                        <div className='lesson_plan__title'><h3>Class Size</h3></div>
                        <div className='lesson_plan__content'><p>{savedlesson.class_size} {' '} Students</p></div>
                    </div>
                    <div className='lesson_plan time'>
                        <div className='lesson_plan__title'><h3>Class Length</h3></div>
                        <div className='lesson_plan__content'><p>{savedlesson.duration}</p></div>
                    </div>
                    <div className='lesson_plan topic'>
                        <div className='lesson_plan__title'><h3>Topic</h3></div>
                        <div className='lesson_plan__content'><p>{savedlesson.topic}</p></div>
                    </div>
                    <div className='lesson_plan goal'>
                        <div className='lesson_plan__title'><h3>Goal</h3></div>
                        <div className='lesson_plan__content'><p>{savedlesson.goal}</p></div>
                    </div>
                    <div className='lesson_plan objectives'>
                        <div className='lesson_plan__title'><h3>Objectives</h3></div>
                        <div className='lesson_plan__content'>                    
                        <ul>Students Should be able to - 
                        {this.renderObjectives()}
                    </ul></div>
                    </div>
                    <div className='lesson_plan objectives'>
                        <div className='lesson_plan__title'><h3>Objectives</h3></div>
                        <div className='lesson_plan__content'>                    
                        <ul>Students Should be able to - 
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
                        <div className='Warm-up'>
                        <h3>Warm-Up Phase</h3>
                        {this.renderActivities(savedlesson.warmup_id)}
                    </div>
                    <div className='Presentation'>
                        <h3>Presentation Phase</h3>
                        {this.renderActivities(savedlesson.presentation_one_id)}
                        {this.renderActivities(savedlesson.presentation_two_id)}
                    </div>
                    <div className='Practice'>
                    <h3>Practice Phase</h3>
                        {this.renderActivities(savedlesson.practice_one_id)}
                        {this.renderActivities(savedlesson.practice_two_id)}
                        {this.renderActivities(savedlesson.practice_three_id)}
                    </div>
                    <div className='Producion'>
                    <h3>Production Phase</h3>
                        {this.renderActivities(savedlesson.product_one_id)}
                        {this.renderActivities(savedlesson.product_two_id)}
                    </div>
                    <div className='Cooldown'>
                    <h3>Cooldown Phase</h3>
                    {this.renderActivities(savedlesson.cooldown_id)}
                    </div>            
                    </div>
                    <div className='lesson_plan class'>
                        <div className='lesson_plan__title'><h3>Reflection Questions</h3></div>
                        <div className='lesson_plan__content'>                        
                        <ul>
                            {this.renderReflection()}
                        </ul></div>
                    </div>
                </section>
                <button type='button' onClick={() => this.handlePrintLesson('printableArea')}>Print</button>
                <button type='button' onClick={() => this.handleNewLesson()}>New Lesson</button>
                <button type='button' onClick={() => this.handleGoHome()}>Go Back</button>
            </main>
            </>
        )
    }
}