import React from 'react'
import ApiContext from '../ApiContext'
import './CreateLesson.css'
import { getActivityForCategory } from '../ReadActivities/helpers'

export default class CreateLesson extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            date:'',
            day: '',
            classLevel: '',
            period: '',
            topic: '',
            goal: '',
            classSize: '',
            objectiveOne:'',
            objectiveTwo:'',
            objectiveThree:'',
            duration: '',
            materials:'',
            warmup:'',
            presentationOne:'',
            presentationTwo:'',
            practiceOne: '',
            practiceTwo: '',
            practiceThree: '',
            productionOne:'',
            productionTwo:'',
            cooldown:'',
            reflectionOne:'',
            reflectionTwo:'',
            reflectionThree:'',

            };
            this.handleSubmitForm = this.handleSubmitForm.bind(this);
    }
    
      static defaultProps = {
        history: {
          push: () => { }
        },
      }
      
      static contextType = ApiContext;
    
      goBack = () => {
        this.props.history.goBack();
    }
    
    validateName(fieldValue) {
      const name = this.state.name.value.trim();
      if (name.length === 0) {
        return 'Name is required';
      } else if (name.length < 2) {
        return <div id="ANErrorMessage">New Notes's name must be 3 characters long.</div>;
      }
    }
    
    updateName(name){
      this.setState({name: name});
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
        this.setState({classLevel: classLevel});
      }

      updateClassSize(classSize){
        this.setState({classSize: classSize});
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
        this.setState({objectiveOne: objectiveOne});
      }

      updateObjectiveTwo(objectiveTwo){
        this.setState({objectiveTwo: objectiveTwo});
      }

      updateObjectiveThree(objectiveThree){
        this.setState({objectiveThree: objectiveThree});
      }

      updateMaterials(materials){
        this.setState({materials: materials});
      }


      updateReflectionOne(reflectionOne){
        this.setState({reflectionOne: reflectionOne});
      }

      updateReflectionTwo(reflectionTwo){
        this.setState({reflectionTwo: reflectionTwo});
      }

      updateReflectionThree(reflectionThree){
        this.setState({reflectionThree: reflectionThree});
      }

      updateWarmup(warmup){
        this.setState({warmup: warmup});
      }

      updatePresentationOne(presentation01){
        this.setState({presentationOne: presentation01});
      }

      updatePresentationTwo(presentation02){
        this.setState({presentationTwo: presentation02});
      }

      updatePracticeOne(practice01){
        this.setState({practiceOne: practice01});
      }

      updatePracticeTwo(practice02){
        this.setState({practiceTwo: practice02});
      }

      updatePracticeThree(practice03){
        this.setState({practiceThree: practice03});
      }
      updateProductionOne(production01){
        this.setState({productionOne: production01});
      }

      updateProductionTwo(production02){
        this.setState({productionTwo: production02});
      }

      updateCooldown(cooldown){
        this.setState({cooldown: cooldown});
      }

    handleResetForm = () => { 
        document.getElementById('create-lesson-form').reset();
      }

    handleClickCancel = () => {
        this.props.history.push('/')
      };

    handleSubmitForm = e => {
        e.preventDefault()
        let state = this.state
        this.props.history.push({
            pathname: '/lesson',
            state: { state },
        })
        }

    renderOptions(catId){
        const { activities=[] } = this.context
        const activityForCategory = getActivityForCategory(activities, catId)
        return(
            <>
            {activityForCategory.map(activity =>
            <option value={activity.id}>
                {activity.name}
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
            <option value={length}>{length}</option>)}
            </>
        )
    }

    renderDayofWeek(){
        let weekday = [ 'Monday', 'Tuesday', 'Wednesday',
                    'Thursday', 'Friday', 'Saturday' ]
        return(
            <>
            {weekday.map(week =>
            <option value={week}>{week}</option>)}
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
            <option value={classes}>{classes}</option>)}
            </>
        )
    }

    renderClassPeriod(){
        let period = [ 'Period 01', 'Period 02', 'Period 02',
                        'Period 04', 'Period 05', 'Period 01', 'Period 07']
        return(
            <>
            {period.map(period =>
            <option id={period} value={period}>{period}</option>)}
            </>
        )
    }

    render(){
        return (
            <>
            <header>
                <h1>Create a Lesson Plan</h1>
            </header>
            <section>
                <form className='create-lesson' id="create-lesson-form"
                onSubmit={this.handleSubmitForm}>
                <div className="input--class--title">
                    <label htmlFor='title'>Title: </label>
                        <input 
                        id='title'
                        type="text" 
                        placeholder="Lesson name"
                        onChange={e => this.updateName(e.target.value)}
                        />
                </div>
                <div className="input--class--level">
                    <label htmlFor='title'>Grade: </label>
                    <select
                    id="classLevel"
                    onChange={e => this.updateClassLevel(e.target.value)} >
                        <option value=''>Select a year level</option>
                        {this.renderClassLevel()}
                        </select>
                </div>
                    <label htmlFor='date'>date: </label>
                        <input 
                        id='date'
                        type="date" 
                        placeholder="2020/01/01"
                        onChange={e => this.updateDate(e.target.value)} />
                    <label htmlFor='period'>day: </label>
                    <div className="input--class--level">
                    <label htmlFor='title'>Class: </label>
                    <select
                    id="day"
                    onChange={e => this.updateDay(e.target.value)}>
                        <option value=''>Select a day</option>
                        {this.renderDayofWeek()}
                        </select>
                </div>
                <div className='input--period'>
                    <select id="period"
                    onChange={e => this.updatePeriod(e.target.value)} >
                        <option value=''>Select a Period</option>
                        {this.renderClassPeriod()}
                    </select>
                </div>
                <div className='input--topic'>
                    <label htmlFor='topic'>Topic: </label>
                        <input id='topic'
                        type='text' 
                        placeholder='Topic of lesson' 
                        onChange={e => this.updateTopic(e.target.value)}
                        />
                </div>
                <div className='input--class-size'>    
                    <label>Class Size: </label>
                        <input 
                        id='classSize'
                        type='number' 
                        min="1" 
                        max="40" 
                        placeholder="10" 
                        onChange={e => this.updateClassSize(e.target.value)}
                        />
                </div>
                <div>
                    <label>length: </label>
                    <select 
                        id="duration"
                        onChange={e => this.updateDuration(e.target.value)}>
                        {this.renderDuration()}
                    </select>
                </div>
                    <label htmlFor='goal'>Goal: </label>
                        Finish the Sentence
                        <input id='goal' 
                        type='text' 
                        defaultValue='The goal of the lesson is to' 
                        onChange={e => this.updateGoal(e.target.value)}
                        />
                    <fieldset> 
                        <legend>Objectives</legend>
                        <label>Students should be able to: </label>
                            <input id='objectiveOne'
                            type='text' 
                            placeholder='First Objective'
                            onChange={e => this.updateObjectiveOne(e.target.value)}
                            />
                        <label>Students should be able to: </label>
                            <input id='objectiveTwo'
                            type='text' 
                            placeholder='Second Objective' 
                            onChange={e => this.updateObjectiveTwo(e.target.value)}
                            />
                        <label>Students should be able to:: </label>
                            <input 
                            id='objectiveThree'
                            type='text' 
                            placeholder='Third Objective' 
                            onChange={e => this.updateObjectiveThree(e.target.value)}
                            />
                    </fieldset> 
                    <fieldset> 
                        <legend>Materials</legend>
                        <textarea id = "materials"
                                rows = "8"
                                cols = "80"
                                placeholder= "List all materials here. Seperate items by a comma an space." 
                                onChange={e => this.updateMaterials(e.target.value)}
                                />
                    </fieldset> 
                    <fieldset> 
                        <legend>Warm-up</legend>
                        <label>Warm-up Activity: </label>
                        <select
                        id="warmupactivity"
                        onChange={e => this.updateWarmup(e.target.value)}>
                        <option value=''>Choose an activity</option>
                        {this.renderOptions('1')}
                        </select>
                    </fieldset>
                    <fieldset> 
                        <legend>Presentation</legend>
                        <label>Presentation Activity 01: </label>
                        <select
                        id="presentation01"
                        onChange={e => this.updatePresentationOne(e.target.value)}>
                            <option>Choose an Activity</option>     
                            {this.renderOptions('2')}
                        </select>       
                        <label>Presentation Activity 02: </label>
                        <select
                        id="presentation02"
                        onChange={e => this.updatePresentationTwo(e.target.value)}>
                        <option>Optional Activity</option>     
                        {this.renderOptions('2')}
                        </select>                 
                    </fieldset>
                    <fieldset> 
                        <legend>Practice</legend>
                        <label>Practice Activity 01: </label>
                        <select
                        id="practice01"
                        onChange={e => this.updatePracticeOne(e.target.value)}>
                            <option>Choose an Activity</option>     
                            {this.renderOptions('3')}
                        </select>
                        <label>Practice Activity 02: </label>
                        <select
                           id="practice02"
                        onChange={e => this.updatePracticeTwo(e.target.value)}>
                            <option>Optional Activity</option>     
                            {this.renderOptions('3')}
                        </select>
                        <label>Practice Activity 03: </label>
                        <select
                            id="practice03"
                            onChange={e => this.updatePracticeThree(e.target.value)}>
                            <option>Optional Activity</option>                       
                            {this.renderOptions('3')}
                        </select>          
                    </fieldset>
                    <fieldset> 
                        <legend>Production</legend>
                        <label>Production Activity 01: </label>
                        <select
                            id="production01"
                            onChange={e => this.updateProductionOne(e.target.value)}>>
                            <option>Choose an Activity</option>  
                            {this.renderOptions('4')}
                        </select>
                        <label>Production Activity 02: </label>
                        <select
                            id="production02"
                        onChange={e => this.updateProductionTwo(e.target.value)}>
                            <option>Optional Activity</option>  
                            {this.renderOptions('4')}
                        </select>                    
                    </fieldset>
                    <fieldset> 
                        <legend>Cool Down</legend>
                        <label>Cool Down Activity 01: </label>
                        <select
                        id="cooldown"
                        onChange={e => this.updateCooldown(e.target.value)}>
                            <option>Choose an Activity</option>  
                            {this.renderOptions('5')}
                        </select>              
                    </fieldset>
                    <fieldset> 
                        <legend>Reflection</legend>
                        <label>Reflection Question 01: </label>
                            <input 
                            id='reflectionOne'
                            type='text' 
                            placeholder='First reflection question'
                            onChange={e => this.updateReflectionOne(e.target.value)}
                            />
                        <label>Reflection Question 01: </label>
                            <input 
                            id='reflectionTwo'
                            type='text' 
                            placeholder='Second reflection question' 
                            onChange={e => this.updateReflectionTwo(e.target.value)}
                            />
                        <label>Reflection Question 01: </label>
                            <input 
                            id='reflectionThree'
                            type='text' 
                            placeholder='Third reflection question' 
                            onChange={e => this.updateReflectionThree(e.target.value)}
                            />
                    </fieldset> 
                    <button type='submit'>Submit</button>
                    <button type='reset' onClick={() => this.handleResetForm()}>Reset</button>
                    <button type='button' onClick={() => this.handleClickCancel()}>Cancel</button>
                </form>
            </section>
            </>
        )
    }
}


