import React from 'react'
import ApiContext from '../../ApiContext'
import { getActivityForCategory } from '../../ReadActivities/helpers'
//import InfoIcon from '@material-ui/icons/Info';
//import IconButton from '@material-ui/core/IconButton';
//import Tooltip from '@material-ui/core/Tooltip';
import config from '../../config'
import TokenService from '../../services/token-service'

export default class EditSavedPlan extends React.Component{
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
                    }
            }
         
      static defaultProps = {
        history: {
          push: () => { }
        },
      }
      
      static contextType = ApiContext;
    
      handleClickCancel = () => {
        this.props.history.goBack();
    }
    
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
                id: responseData.id,
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
      }


    validateName(fieldValue) {
      const title = this.state.title.value.trim();
      if (title.length === 0) {
        return 'Name is required';
      } else if (title.length < 2) {
        return <div id="ANErrorMessage">New Notes's name must be 3 characters long.</div>;
      }
    }
    
    updateName(name){
      this.setState({title: name});
    }

    updateDate(date){
        this.setState({date: date});
      }

   updateDay(day){
        this.setState({day: day});
      }

      updatePeriod(period){
        this.setState({period: period});
      }

    updateClassLevel(classLevel){
        this.setState({classlevel: classLevel});
      }

      updateClassSize(classSize){
        this.setState({class_size: classSize});
      }

    updateDuration(duration){
        this.setState({duration: duration});
    }

    updateGoal(goal){
        this.setState({goal: goal});
    }

    updateTopic(topic){
        this.setState({topic: topic});
    }

      updateObjectiveOne(objectiveOne){
        this.setState({objective_one: objectiveOne});
      }

      updateObjectiveTwo(objectiveTwo){
        this.setState({objective_two: objectiveTwo});
      }

      updateObjectiveThree(objectiveThree){
        this.setState({objective_three: objectiveThree});
      }

      updateMaterials(materials){
        this.setState({materials: materials});
      }


      updateReflectionOne(reflectionOne){
        this.setState({reflection_one: reflectionOne});
      }

      updateReflectionTwo(reflectionTwo){
        this.setState({reflection_two: reflectionTwo});
      }

      updateReflectionThree(reflectionThree){
        this.setState({reflection_three: reflectionThree});
      }

      updateWarmup(warmup){
        this.setState({warmup_id: warmup})
      }

      updatePresentationOne(presentation01){
        this.setState({presentation_one_id: presentation01});
      }

      updatePresentationTwo(presentation02){
        this.setState({presentation_two_id: presentation02});
      }

      updatePracticeOne(practice01){
        this.setState({practice_one_id: practice01});
      }

      updatePracticeTwo(practice02){
        this.setState({practice_two_id: practice02});
      }

      updatePracticeThree(practice03){
        this.setState({practice_three_id: practice03});
      }
      updateProductionOne(production01){
        this.setState({product_one_id: production01});
      }

      updateProductionTwo(production02){
        this.setState({product_two_id: production02});
      }

      updateCooldown(cooldown){
        this.setState({cooldown_id: cooldown});
      }

    handleSubmitForm = e => {
        e.preventDefault()
        const { savedId } = this.props.match.params
        const updatedLesson = this.state
        fetch(`${config.API_ENDPOINT}/savedlessons/${savedId}`, {
          method: 'PATCH',
          body: JSON.stringify(updatedLesson),
          headers: {
            'content-type': 'application/json',
            'authorization': `bearer ${TokenService.getAuthToken()}`,
          },
        })
          .then(res => {
            if (!res.ok)
              return res.json().then(error => Promise.reject(error))
          })
          .then(() => {
            this.context.updateLesson(updatedLesson)
            this.props.history.push(`/savedlessonplan/${savedId}`)
          })
          .catch(error => {
            console.error(error)
            this.setState({ error })
          })
      }


    renderOptions(catId){
        const { activities=[] } = this.context
        const activityForCategory = getActivityForCategory(activities, catId)
        return(
            <>
            {activityForCategory.map(activity =>
            <option 
                key={activity.id} 
                  value={activity.id}>
                {activity.title}
            </option>
            )}   
            </>
        )
    }

    renderDuration(){
        const classLength = [ '20 min',  '30 min', '40 min', 
        '45 min','50 min', '55 min', 
        '60 min', '70 min', '90 min']
        return(
            <>
            {classLength.map(length =>
            <option key={length} value={length}>{length}</option>)}
            </>
        )
    }

    renderDayofWeek(){
        let weekday = [ 'Monday', 'Tuesday', 'Wednesday',
                    'Thursday', 'Friday', 'Saturday' ]
        return(
            <>
            {weekday.map(week =>
            <option key={week} value={week}>{week}</option>)}
            </>
        )
    }

    renderClassLevel(){
        let classType = [ 'Elementry 1st grade',   'Elementry 2nd Grade', 
        'Elementry 3rd Grade', 'Elementry 4th Grade',
        'Elementry 5th Grade', 'Elementry 6th Grade', 
        'Junior High 1st Year', 'Junior High 2nd Year', 
        'Junior High 3rd Year', 'High 1st Year', 
        'High 2nd Year', 'High 3rd Year']
        return(
            <>
            {classType.map(classes =>
            <option key={classes} value={classes}>{classes}</option>)}
            </>
        )
    }

    renderClassPeriod(){
        let period = [ 'Period 01', 'Period 02', 'Period 03',
                        'Period 04', 'Period 05', 'Period 06', 'Period 07']
        return(
            <>
            {period.map(period =>
            <option key={period} value={period}>{period}</option>)}
            </>
        )
    }

    render(){
      const {  title, date, day, duration, classlevel,
               period, topic, goal, class_size,
               objective_one, objective_two, objective_three,
               materials, warmup_id, presentation_one_id,
               presentation_two_id, practice_one_id,
               practice_two_id, practice_three_id, product_one_id,
               product_two_id, cooldown_id, reflection_one,
               reflection_two, reflection_three } = this.state
        return (
            <>
            <header>
                <h1>Modify Lesson Plan</h1>
            </header>
            <section>
                <form className='create-lesson' id="create-lesson-form"
                onSubmit={this.handleSubmitForm}>
                <div className="input--class--title">
                    <label htmlFor='title'>Title: </label>
                        <input 
                        id='title'
                        type="text" 
                        value={title}
                        onChange={e => this.updateName(e.target.value)}
                        required
                        />
                </div>
                <div className="input--class--level">
                    <label htmlFor='title'>Grade: </label>
                    <select
                    id="classLevel"
                    onChange={e => this.updateClassLevel(e.target.value)}
                    required 
                    value={classlevel}>
                        <option value=''>Select a year level</option>
                        {this.renderClassLevel()}
                        </select>
                </div>
                <div className="input--class--date">
                    <label htmlFor='date'>Date: </label>
                        <input 
                        id='date'
                        type="date" 
                        placeholder="2020/01/01"
                        value={date}
                        onChange={e => this.updateDate(e.target.value)} 
                        required
                        />
                </div>

                <div className="input--class--day">
                    <label htmlFor='day-of-week'>Day: </label>
                    <select
                    id="day"
                    value={day}
                    onChange={e => this.updateDay(e.target.value)} required>
                        <option value=''>Select a day</option>
                        {this.renderDayofWeek()}
                        </select>
                </div>


                <div className='input--class--period'>
                <label htmlFor='class--period'>Period: </label>
                    <select id="period"
                    value={period}
                    onChange={e => this.updatePeriod(e.target.value)} required>
                        <option value=''>Select a Period</option>
                        {this.renderClassPeriod()}
                    </select>
                </div>

                <div className='input--topic'>
                    <label htmlFor='topic'>Topic: </label>
                        <input id='topic'
                        type='text' 
                        placeholder='Topic of lesson' 
                        value={topic}
                        onChange={e => this.updateTopic(e.target.value)}
                        required />
                </div>

                <div className='input--class-size'>    
                    <label>Class Size: </label>
                        <input 
                        id='classSize'
                        type='number' 
                        min="1" 
                        max="40" 
                        placeholder="10" 
                        value={class_size}
                        onChange={e => this.updateClassSize(e.target.value)}
                        required />
                </div>

                <div className='input--class-length'>
                    <label>Class Length: </label>
                    <select 
                        id="duration"
                        value={duration}
                        onChange={e => this.updateDuration(e.target.value)} required>
                        {this.renderDuration()}
                    </select>
                </div>

                <div className='input--class-goals'>
                    <label htmlFor='goal'>Goal: </label>
                        Finish the Sentence
                        <textarea 
                        id='goal' 
                        rows = "3"
                        cols = "60"
                        value={goal}
                        onChange={e => this.updateGoal(e.target.value)}
                        required />
                </div>

                <div className='input--class-objectives'>
                    <fieldset> 
                        <legend>Objectives</legend>
                        <label>Students should be able to: </label>
                            <input id='objectiveOne'
                            type='text' 
                            placeholder='First Objective'
                            value={objective_one}
                            onChange={e => this.updateObjectiveOne(e.target.value)}
                            required />
                        <label>Students should be able to: </label>
                            <input id='objectiveTwo'
                            type='text' 
                            placeholder='Second Objective' 
                            value={objective_two}
                            onChange={e => this.updateObjectiveTwo(e.target.value)}
                            />
                        <label>Students should be able to:: </label>
                            <input 
                            id='objectiveThree'
                            type='text' 
                            placeholder='Third Objective' 
                            value={objective_three}
                            onChange={e => this.updateObjectiveThree(e.target.value)}
                            />
                    </fieldset> 
                </div>

                <div className='input--class-materials'>
                    <fieldset> 
                        <legend>Materials</legend>
                        <textarea id = "materials"
                                rows = "10"
                                cols = "60"
                                value={materials}
                                placeholder= "List all materials here. Seperate items by a comma no space." 
                                onChange={e => this.updateMaterials(e.target.value)}
                                required />
                    </fieldset> 
                </div>
                <div className='input--warmup-phase'>
                    <fieldset> 
                        <legend>Warm-up</legend>
                        <label>Warm-up Activity: </label>
                        <select
                        id="warmupactivity"
                        value={warmup_id}
                        onChange={e => this.updateWarmup(e.target.value)} required>
                        {this.renderOptions('1')}
                        </select>
                    </fieldset>
                </div>

                <div className='input--presentation-phase'>
                    <fieldset> 
                        <legend>Presentation</legend>
                        <label>Presentation Activity 01: </label>
                        <select
                        id="presentation01"
                        value={presentation_one_id}
                        onChange={e => this.updatePresentationOne(e.target.value)} required> 
                            {this.renderOptions('2')}
                        </select>
                        <label>Presentation Activity 02: </label>
                        <select
                        id="presentation02"
                        value={presentation_two_id}
                        onChange={e => this.updatePresentationTwo(e.target.value)}>
                        {this.renderOptions('2')}
                        </select>          
                    </fieldset>
                </div>

                <div className='input--practice-phase'>
                    <fieldset> 
                        <legend>Practice</legend>
                        <label>Practice Activity 01: </label>
                        <select
                        id="practice01"
                        value={practice_one_id}
                        onChange={e => this.updatePracticeOne(e.target.value)} required>
                            {this.renderOptions('3')}
                        </select>
                        <label>Practice Activity 02:</label>
                        <select
                           id="practice02"
                           value={practice_two_id}
                        onChange={e => this.updatePracticeTwo(e.target.value)}>
                            {this.renderOptions('3')}
                        </select>
                        <label>Practice Activity 03: </label>
                        <select
                            id="practice03"
                            value={practice_three_id}
                            onChange={e => this.updatePracticeThree(e.target.value)}>                  
                            {this.renderOptions('3')}
                        </select>      
                    </fieldset>
                  </div>

                  <div className='input--production-phase'>
                    <fieldset> 
                        <legend>Production</legend>
                        <label>Production Activity 01: </label>
                        <select
                            id="production01"
                            value={product_one_id}
                            onChange={e => this.updateProductionOne(e.target.value)} required>
                            {this.renderOptions('4')}
                        </select>
                        <label>Production Activity 02: </label>
                        <select
                            id="production02"
                            value={product_two_id}
                            onChange={e => this.updateProductionTwo(e.target.value)}>
                            {this.renderOptions('4')}
                        </select>                  
                    </fieldset>
                  </div>

                  <div className='input--cooldown-phase'>
                    <fieldset> 
                        <legend>Cool Down</legend>
                        <label>Cool Down Activity 01: </label>
                        <select
                        id="cooldown"
                        value={cooldown_id}
                        onChange={e => this.updateCooldown(e.target.value)}>
                            {this.renderOptions('5')}
                        </select>         
                    </fieldset>
                    </div>

                    <div className='input--class-reflections'>
                    <fieldset> 
                        <legend>Reflection</legend>
                        <label>Reflection Question 01: </label>
                            <input 
                            id='reflectionOne'
                            type='text' 
                            placeholder='First reflection question'
                            value={reflection_one}
                            onChange={e => this.updateReflectionOne(e.target.value)}
                            required
                            />
                        <label>Reflection Question 01: </label>
                            <input 
                            id='reflectionTwo'
                            type='text' 
                            placeholder='Second reflection question' 
                            value={reflection_two}
                            onChange={e => this.updateReflectionTwo(e.target.value)}
                            />
                        <label>Reflection Question 01: </label>
                            <input 
                            id='reflectionThree'
                            type='text' 
                            placeholder='Third reflection question'
                            value={reflection_three}
                            onChange={e => this.updateReflectionThree(e.target.value)}
                            />
                    </fieldset> 
                    </div>
                    <button type='submit'>Update</button>
                    <button 
                      className="cancel--button" 
                      type='button' 
                      onClick={() => this.handleClickCancel()}>
                      Cancel</button>
                </form>
            </section>
            </>
        )
    }
}

