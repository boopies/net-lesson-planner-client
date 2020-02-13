import React from 'react';
import ApiContext from '../../ApiContext'
import './LessonPlan.css'
import { findActivity } from '../../ReadActivities/helpers'
import uuid from 'react-uuid'
import TokenService from '../../services/token-service'

export default class LessonPlan extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            };
    }

    static contextType = ApiContext;

    handleSaveLesson = () => {
        const lesson = this.props.location.state.state
        const newLesson = {
                    title: `${lesson.title}`,
                    date: `${lesson.date}`,
                    day: `${lesson.day}`,
                    duration: `${lesson.duration}`,
                    classlevel: `${lesson.classlevel}`,
                    period: `${lesson.period}`,
                    topic: `${lesson.topic}`,
                    goal: `${lesson.goal}`,
                    class_size: parseInt(`${lesson.class_size}`),
                    objective_one: `${lesson.objective_one}`,
                    objective_two: `${lesson.objective_two}`,
                    objective_three: `${lesson.objective_three}`,
                    materials: `${lesson.materials}`,
                    warmup_id: parseInt(`${lesson.warmup_id}`),
                    presentation_one_id: parseInt(`${lesson.presentation_one_id}`),
                    presentation_two_id: parseInt(`${lesson.presentation_two_id}`),
                    practice_one_id: parseInt(`${lesson.practice_one_id}`),
                    practice_two_id: parseInt(`${lesson.practice_two_id}`),
                    practice_three_id: parseInt(`${lesson.practice_three_id}`),
                    product_one_id: parseInt(`${lesson.product_one_id}`),
                    product_two_id: parseInt(`${lesson.product_two_id}`),
                    cooldown_id: parseInt(`${lesson.cooldown_id}`),
                    reflection_one: `${lesson.reflection_one}`,
                    reflection_two: `${lesson.reflection_two}`,
                    reflection_three: `${lesson.reflection_three}` 
        }
        console.log(newLesson)
        fetch(`http://localhost:8000/api/savedlessons`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'authorization': `bearer ${TokenService.getAuthToken()}`,
          },
          body: JSON.stringify(newLesson),
        })
          .then(res => {
            if (!res.ok)
              return res.json().then(e => Promise.reject(e))
            return res.json()
          })
          .then(newLesson => {
            this.context.addSavedLesson(newLesson)
            this.props.history.push(`/savedlessons`)
          })
          .catch(error => {
            console.error({ error })
          })
      }

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
            const objOne = this.props.location.state.state.objective_one
            const objTwo = this.props.location.state.state.objective_two
            const objThree = this.props.location.state.state.objective_three

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
        const refOne = this.props.location.state.state.reflection_one
        const refTwo = this.props.location.state.state.reflection_two
        const refThree = this.props.location.state.state.reflection_three

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

        if(actId < 6){
            return <>
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
    const lesson = this.props.location.state.state
      return(
            <>
            <header>
                <h1>{lesson.title}</h1>
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
                        <div className='lesson_plan__content'><p>{lesson.classlevel}</p></div>
                    </div>
                    <div className='lesson_plan class_size'>
                        <div className='lesson_plan__title'><h3>Class Size</h3></div>
                        <div className='lesson_plan__content'><p>{lesson.class_size} {' '} Students</p></div>
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
                        <h3>Warm-up Phase</h3>
                        {this.renderActivities(lesson.warmup_id)}
                    </div>
                    <div className='Presentation'>
                         <h3>Presentation Phase</h3>
                        {this.renderActivities(lesson.presentation_one_id)}
                        {this.renderActivities(lesson.presentation_two_id)}
                    </div>
                    <div className='Practice'>
                        <h3>Practice Phase</h3>
                        {this.renderActivities(lesson.practice_one_id)}
                        {this.renderActivities(lesson.practice_two_id)}
                        {this.renderActivities(lesson.practice_three_id)}
                    </div>
                    <div className='Producion'>
                        <h3>Production Phase</h3>
                        {this.renderActivities(lesson.product_one_id)}
                        {this.renderActivities(lesson.product_two_id)}
                    </div>
                    <div className='Cooldown'>
                        <h3>Cooldown Phase</h3>
                    {this.renderActivities(lesson.cooldown_id)}
                    </div>
                    <div className='lesson_plan class'>
                        <div className='lesson_plan__title'><h3>Reflection Questions</h3></div>
                        <div className='lesson_plan__content'>                        <ul>
                            {this.renderReflection()}
                        </ul></div>
                    </div>
                </section>
                <button type='button' onClick={() => this.handlePrintLesson('printableArea')}>Print</button>
                {TokenService.hasAuthToken()
                    ? <button type='button' onClick={() => this.handleSaveLesson()}>Save Lesson</button>
                    : <> </>}
                <button type='button' onClick={() => this.handleNewLesson()}>New Lesson</button>
                <button type='button' onClick={() => this.handleGoHome()}>Go Home</button>
            </main>
            </>
        )
    }
}