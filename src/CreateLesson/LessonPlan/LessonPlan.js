import React from 'react';
import ApiContext from '../../ApiContext'
import './LessonPlan.css'
import { findActivity } from '../../ReadActivities/helpers'
import uuid from 'react-uuid'
import TokenService from '../../services/token-service'
import config from '../../config'
import PrintIcon from '@material-ui/icons/Print';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import PhotoFilterIcon from '@material-ui/icons/PhotoFilter';
import HomeIcon from '@material-ui/icons/Home';

export default class LessonPlan extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
                    title: '',
                    date: '',
                    day: '',
                    duration: '',
                    classlevel: '',
                    period: '',
                    topic: '',
                    goal: 'The goal of the lesson is to ',
                    class_size: '',
                    objective_one: '',
                    objective_two: '',
                    objective_three: '',
                    materials: '',
                    warmup_id: 1,
                    presentation_one_id: 2,
                    presentation_two_id: 2,
                    practice_one_id: 3,
                    practice_two_id: 3,
                    practice_three_id: 3,
                    product_one_id: 4,
                    product_two_id: 4,
                    cooldown_id: 5,
                    reflection_one: '',
                    reflection_two: '',
                    reflection_three: '',
                    activities: [],
        };
    }

    static contextType = ApiContext;

    componentDidMount() {
        const lesson = this.props.location.state
          this.setState({
                    title: lesson.title,
                    date: lesson.date,
                    day: lesson.day,
                    duration: lesson.duration,
                    classlevel: lesson.classlevel,
                    period: lesson.period,
                    topic: lesson.topic,
                    goal: lesson.goal,
                    class_size: parseInt(lesson.class_size),
                    objective_one: lesson.objective_one,
                    objective_two: lesson.objective_two,
                    objective_three: lesson.objective_three,
                    materials: lesson.materials,
                    warmup_id: parseInt(lesson.warmup_id),
                    presentation_one_id: parseInt(lesson.presentation_one_id),
                    presentation_two_id: parseInt(lesson.presentation_two_id),
                    practice_one_id: parseInt(lesson.practice_one_id),
                    practice_two_id: parseInt(lesson.practice_two_id),
                    practice_three_id: parseInt(lesson.practice_three_id),
                    product_one_id: parseInt(lesson.product_one_id),
                    product_two_id: parseInt(lesson.product_two_id),
                    cooldown_id: parseInt(lesson.cooldown_id),
                    reflection_one: lesson.reflection_one,
                    reflection_two: lesson.reflection_two,
                    reflection_three: lesson.reflection_three, 
          })
      }

    handleSaveLesson = () => {
        const lesson = this.state
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
        fetch(`${config.API_ENDPOINT}/savedlessons`, {
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

    handleEdit = () => {
        const state = this.state
        this.props.history.push({
            pathname: '/edit',
            state,
        })
      };

    renderMaterialsList(){
        const materialString = this.state.materials
        const materialArray = materialString.split(/[,]+/);
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
            const objOne = this.state.objective_one
            const objTwo = this.state.objective_two
            const objThree = this.state.objective_three

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
        const refOne = this.state.reflection_one
        const refTwo = this.state.reflection_two
        const refThree = this.state.reflection_three

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
            <div>No extra activity</div>
            </>
        } else{
        return(
            <> 
            <div>
               <div className='lesson_plan__info'>
                    <div className='lesson_plan__info_name'>
                        <div key={uuid()} className='lesson_plan__title'><h3>Activity</h3></div>
                        <div key={uuid()} className='lesson_plan__title'>{activity.title}</div>
                    </div>
                    <div className='lesson_plan__info_dur'>
                        <div key={uuid()} className='lesson_plan__title'><h3>Activity Length</h3></div>
                        <div key={uuid()} className='lesson_plan__title'>{activity.duration}</div>
                    </div>
                    <div className='lesson_plan__info_group'>
                        <div key={uuid()} className='lesson_plan__title'><h3>Activity grouping</h3></div>
                        <div key={uuid()} className='lesson_plan__title'>{activity.grouping}</div>
                    </div>
                </div>
                </div>
                <div>
                    <div key={uuid()} className="lesson_plan__how_to_play">
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

    renderButtons(){
        const { currentUser } = this.context
        return(
        <>
            <button
                className='button__orange'
                type='button' 
                onClick={() => this.handlePrintLesson('printableArea')}>
                <PrintIcon fontSize="large" />
                {' '}
                Print
            </button>
            <button 
                className='button__yellow'
                type='button' 
                onClick={() => this.handleEdit()}>
                <EditOutlinedIcon fontSize="large" />
                {' '}
                Modify Lesson
            </button>
            {TokenService.hasAuthToken()
                ?   <button 
                        className='button__blue'
                        type='button' 
                        disabled={(parseInt(currentUser.id) === 1? true: false)}
                        onClick={() => this.handleSaveLesson()}>
                        <SaveOutlinedIcon fontSize="large" />
                        {' '}
                        Save Lesson
                    </button>
                : <> </>}
            <button 
                className='button__green'
                type='button' 
                onClick={() => this.handleNewLesson()}>
                <PhotoFilterIcon fontSize="large" />
                {' '}
                New Lesson
            </button>
            <button 
                className='button__red'
                type='button' 
                onClick={() => this.handleGoHome()}>
                <HomeIcon fontSize="large" />
                {' '}
                Go Home
            </button>
        </>
        )
    }

    render(){
        
        const lesson = this.state
          return(
                <>
                <header>
                    <h1>{lesson.title}</h1>
                </header>
                <main className="full__lesson-plan">
                    <section id="lesson_plan__full"> 
                        <div className="lesson_plan_D-and-P">
                            <div className='lesson_plan topic'>
                                <div className='lesson_plan__title'><h3>Topic</h3></div>
                                <div className='lesson_plan__content'><p>{lesson.topic}</p></div>
                            </div>
                            <div className='lesson_plan date'>
                                <div className='lesson_plan__title'><h3>Date</h3></div>
                                <div className='lesson_plan__content'><p>{lesson.day}{' '}{lesson.date}</p></div>
                            </div>
                            <div className='lesson_plan period'>
                                <div className='lesson_plan__title'><h3>Period</h3></div>
                                <div className='lesson_plan__content'><p>{lesson.period}</p></div>
                            </div>
                        </div>
                        <div className='lesson_plan_C-CS-CL'>
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
                        </div>
    
                        <div className='lesson_plan_G-O'>
                            <div className='lesson_plan goal'>
                                <div className='lesson_plan__title'><h3>Goal</h3></div>
                                <div className='lesson_plan__content goal_object'><p>{lesson.goal}</p></div>
                            </div>
                            <div className='lesson_plan objectives'>
                                <div className='lesson_plan__title'><h3>Objectives</h3></div>
                                <div className='lesson_plan__content goal_object'>                    
                                <ul>Students Should be able to - 
                                {this.renderObjectives()}
                            </ul></div>
                        </div>
                        </div>
    
                        <div className='lesson_plan_mats'>
                            <div className='lesson_plan materials'>
                                <div className='lesson_plan__title'>
                                    <h3>Materials</h3>
                                </div>
                                <div className='lesson_plan__content material'>                    
                                    <ul> 
                                    {this.renderMaterialsList()}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className='lesson_plan Star-Lesson-plan'>
                            <div className='lesson_plan__title'><h2>Lesson</h2></div>
                            <div className='Warmups lesson_plan_phase'>
                            <h3>Warm-Up Phase</h3>
                            {this.renderActivities(lesson.warmup_id)}
                        </div>
                        <div className='Presentations lesson_plan_phase'>
                            <h3>Presentation Phase</h3>
                            {this.renderActivities(lesson.presentation_one_id)}
                            {this.renderActivities(lesson.presentation_two_id)}
                        </div>
                        <div className='Practices lesson_plan_phase'>
                        <h3>Practice Phase</h3>
                            {this.renderActivities(lesson.practice_one_id)}
                            {this.renderActivities(lesson.practice_two_id)}
                            {this.renderActivities(lesson.practice_three_id)}
                        </div>
                        <div className='Productions lesson_plan_phase'>
                        <h3>Production Phase</h3>
                            {this.renderActivities(lesson.product_one_id)}
                            {this.renderActivities(lesson.product_two_id)}
                        </div>
                        <div className='Cooldowns lesson_plan_phase'>
                        <h3>Cooldown Phase</h3>
                        {this.renderActivities(lesson.cooldown_id)}
                        </div>            
                        </div>
                        <div className="lesson_plan_ref">
                            <div className='lesson_plan reflections'>
                                <div className='lesson_plan__title'><h3>Reflection Questions</h3></div>
                                <div className='lesson_plan__content'>                        
                                <ul>
                                    {this.renderReflection()}
                                </ul></div>
                            </div>
                        </div>
                        <div className="saved-lessons__buttons">
                            {this.renderButtons()}
                        </div>
                    </section>
                </main>
                </>
            )
        }
    }