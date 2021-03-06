import React from 'react';
import ApiContext from '../../ApiContext';
import { findActivity } from '../../ReadActivities/helpers';
import uuid from 'react-uuid';
import config from '../../config';
import TokenService from '../../services/token-service';
import PrintIcon from '@material-ui/icons/Print';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import PhotoFilterIcon from '@material-ui/icons/PhotoFilter';
import HomeIcon from '@material-ui/icons/Home';
import DeleteIcon from '@material-ui/icons/Delete';

export default class SavedLessonPlan extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
                    id: '',
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
                    warmup_id: '',
                    presentation_one_id: '',
                    presentation_two_id: '',
                    practice_one_id: '',
                    practice_two_id: '',
                    practice_three_id: '',
                    product_one_id: '',
                    product_two_id: '',
                    cooldown_id: '',
                    reflection_one: '',
                    reflection_two: '',
                    reflection_three: '', 
                    };
    };

    static contextType = ApiContext;

    handlePrintLesson = () =>{
        window.print();
    };

    componentDidMount() {
        const { savedId } = this.props.match.params
        fetch(`${config.API_ENDPOINT}/savedlessons/${savedId}`, {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'authorization': `bearer ${TokenService.getAuthToken()}`,}
          }
        )
          .then(res => {
            if (!res.ok)
              return res.json().then(error => Promise.reject(error))
            return res.json()
          })
          .then(responseData => {
            this.setState({
                id: parseInt(responseData.id),
                title: responseData.title,
                date: responseData.date,
                day: responseData.day,
                duration: responseData.duration,
                classlevel: responseData.classlevel,
                period: responseData.period,
                topic: responseData.topic,
                goal: responseData.goal,
                class_size: parseInt(responseData.class_size),
                objective_one: responseData.objective_one,
                objective_two: responseData.objective_two,
                objective_three: responseData.objective_three,
                materials: responseData.materials,
                warmup_id: parseInt(responseData.warmup_id),
                presentation_one_id: parseInt(responseData.presentation_one_id),
                presentation_two_id: parseInt(responseData.presentation_two_id),
                practice_one_id: parseInt(responseData.practice_one_id),
                practice_two_id: parseInt(responseData.practice_two_id),
                practice_three_id: parseInt(responseData.practice_three_id),
                product_one_id: parseInt(responseData.product_one_id),
                product_two_id: parseInt(responseData.product_two_id),
                cooldown_id: parseInt(responseData.cooldown_id),
                reflection_one: responseData.reflection_one,
                reflection_two: responseData.reflection_two,
                reflection_three: responseData.reflection_three,
            })
          })
          .catch(error => {
            console.error(error)
            this.setState({ error })
          })
      };

    handleNewLesson = () => {
        this.props.history.push('/create')
      };
    
    handleGoHome = () => {
        this.props.history.push('/savedlessons')
        window.location.reload()
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
    };

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
    }};

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
};

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
    };

    handleEditLesson = e => {
        e.preventDefault()
        const { savedId } = this.props.match.params
        this.props.history.push(`/editlessonplan/${savedId}`)
    };


    onDeleteLesson = () => {
        this.props.history.push('/savedlessons')
    };
  
      handleDeleteLesson = e =>{
        e.preventDefault()
        const { savedId } = this.props.match.params
        fetch(`${config.API_ENDPOINT}/savedlessons/${savedId}`, {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json',
            'authorization': `bearer ${TokenService.getAuthToken()}`,
          },
        })
          .then(res => {
            if (!res.ok)
              return res.json().then(e => Promise.reject(e))
          })
          .then(() => {
            this.context.deleteSavedLesson(savedId)
            this.onDeleteLesson()
          })
          .catch(error => {
            console.error({ error })
          })
      };

      renderButtons(){
        return (
            <>
                <button 
                    className='button__red'
                    type='button'               
                    onClick={e =>
                        window.confirm("Are you sure you wish to delete this item?") &&
                        this.handleDeleteLesson(e)
                    }>
                    <DeleteIcon /> Delete
                </button>
                <button
                    className='button__yellow'
                    type='button'
                    onClick={e =>
                    this.handleEditLesson(e)
                    }>
                    <EditOutlinedIcon /> Edit
                    </button>
                <button
                    className='button__orange'
                    type='button' 
                    onClick={() => this.handlePrintLesson('printableArea')}>
                    <PrintIcon /> Print
                </button>
                <button 
                    className='button__green'
                    type='button' 
                    onClick={() => this.handleNewLesson()}>
                    <PhotoFilterIcon /> New Lesson
                </button>
                <button 
                    className='button__red'
                    type='button' 
                    onClick={() => this.handleGoHome()}>
                    <HomeIcon />Go Back
                </button>
            </>
        )
      };

    render(){
    const savedlesson = this.state
      return(
            <>
            <header>
                <h1>{savedlesson.title}</h1>
            </header>
            <main className="full__lesson-plan">
                <section id="lesson_plan__full"> 
                    <div className="lesson_plan_D-and-P">
                        <div className='lesson_plan topic'>
                            <div className='lesson_plan__title'><h3>Topic</h3></div>
                            <div className='lesson_plan__content'><p>{savedlesson.topic}</p></div>
                        </div>
                        <div className='lesson_plan date'>
                            <div className='lesson_plan__title'><h3>Date</h3></div>
                            <div className='lesson_plan__content'><p>{savedlesson.day}{' '}{savedlesson.date}</p></div>
                        </div>
                        <div className='lesson_plan period'>
                            <div className='lesson_plan__title'><h3>Period</h3></div>
                            <div className='lesson_plan__content'><p>{savedlesson.period}</p></div>
                        </div>
                    </div>
                    <div className='lesson_plan_C-CS-CL'>
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
                    </div>

                    <div className='lesson_plan_G-O'>
                        <div className='lesson_plan goal'>
                            <div className='lesson_plan__title'><h3>Goal</h3></div>
                            <div className='lesson_plan__content goal_object'><p>{savedlesson.goal}</p></div>
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
                        {this.renderActivities(savedlesson.warmup_id)}
                    </div>
                    <div className='Presentations lesson_plan_phase'>
                        <h3>Presentation Phase</h3>
                        {this.renderActivities(savedlesson.presentation_one_id)}
                        {this.renderActivities(savedlesson.presentation_two_id)}
                    </div>
                    <div className='Practices lesson_plan_phase'>
                    <h3>Practice Phase</h3>
                        {this.renderActivities(savedlesson.practice_one_id)}
                        {this.renderActivities(savedlesson.practice_two_id)}
                        {this.renderActivities(savedlesson.practice_three_id)}
                    </div>
                    <div className='Productions lesson_plan_phase'>
                    <h3>Production Phase</h3>
                        {this.renderActivities(savedlesson.product_one_id)}
                        {this.renderActivities(savedlesson.product_two_id)}
                    </div>
                    <div className='Cooldowns lesson_plan_phase'>
                    <h3>Cooldown Phase</h3>
                    {this.renderActivities(savedlesson.cooldown_id)}
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
    };
}