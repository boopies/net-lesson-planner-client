import React from 'react'
import ApiContext from '../ApiContext'
import './CreateLesson.css'
import FormLessonInfo from './FormComponent/FormLessonInfo'
import FormLessonTGOM from './FormComponent/FormLessonTGOM'
import FormWarmup from './FormComponent/FormWarmup'
import FormPresentation from './FormComponent/FormPresentation'
import FormPractice from './FormComponent/FormPractice'
import FormProduct from './FormComponent/FormProduct'
import FormCooldown from './FormComponent/FormCooldown'
import FormReflection from './FormComponent/FormReflection'
import FormConfirmation from './FormComponent/FormConfirmation'


export default class CreateLesson extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            activities: [],
            step: 1,
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
            };
            this.handleSubmitForm = this.handleSubmitForm.bind(this);
    }
    
    static contextType = ApiContext;

// Proceed to next step
    nextStep = () => {
      const { step } = this.state;
      this.setState({
        step: step + 1
      })
    }

// Go back to previous step
    prevStep = () => {
      const { step } = this.state;
      this.setState({
        step: step - 1
      })
    }

//Handle fields change
    handleChange = input => e => {
      this.setState({
        [input]: e.target.value
      })
    }

//Handle Go back to beginning
    goToBeginning = () => {
      this.setState({
        step: 1
      })
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
    
    handleResetForm = () => { 
        document.getElementById('create-lesson-form').reset();
      }

    handleClickCancel = () => {
        this.props.history.push('/')
      };

    handleSubmitForm = e => {
        e.preventDefault()
        const state = this.state 
        this.props.history.push({
            pathname: '/lesson',
            state,
        })
        }

    renderForm(){
      const { step } = this.state
      const {title, date, day, duration, classlevel,
              period, topic, goal, class_size,
              objective_one, objective_two,
              objective_three, materials,
              warmup_id, presentation_one_id,
              presentation_two_id, practice_one_id,
              practice_two_id, practice_three_id,
              product_one_id, product_two_id,
              cooldown_id, reflection_one,
              reflection_two, reflection_three } = this.state
      const values = {title, date, day, duration, classlevel,
              period, topic, goal, class_size,
              objective_one, objective_two,
              objective_three, materials,
              warmup_id, presentation_one_id,
              presentation_two_id, practice_one_id,
              practice_two_id, practice_three_id,
              product_one_id, product_two_id,
              cooldown_id, reflection_one,
              reflection_two, reflection_three }
      const { activities } = this.context
      
      switch(step){
        case 1: 
            return(
              <>
              <h1>Create a Lesson</h1>
              <h2>Part 1 - Lesson Information</h2>
              <FormLessonInfo
                nextStep={this.nextStep}
                handleChange={this.handleChange}
                resetForm={this.handleResetForm}
                cancel={this.handleClickCancel}
                values = {values} 
                />
              </>
            )
        case 2: 
            return (
              <>
              <h1>Create a Lesson</h1>
              <h2>Part 2 - Topic, Goals, Objectives and Materials</h2>
              <FormLessonTGOM
                nextStep={this.nextStep}
                prevStep={this.prevStep}
                resetForm={this.handleResetForm}
                handleChange={this.handleChange}
                cancel={this.handleClickCancel}
                values = {values} />
              </>
            )
        case 3: return (<><h1>Create a Lesson</h1>
          <h2>Part 3 - Warmup Activity</h2>
              <FormWarmup
                nextStep={this.nextStep}
                prevStep={this.prevStep}
                resetForm={this.handleResetForm}
                handleChange={this.handleChange}
                cancel={this.handleClickCancel}
                values = {values} 
                activities = {activities}  
                />
              </>)
        case 4: return (<><h1>Create a Lesson</h1>
          <h2>Part 4 - Presenation Phase Activities</h2>
          <FormPresentation
                nextStep={this.nextStep}
                prevStep={this.prevStep}
                resetForm={this.handleResetForm}
                handleChange={this.handleChange}
                cancel={this.handleClickCancel}
                values = {values} 
                activities = {activities}  
                /></>)
        case 5: return (<><h1>Create a Lesson</h1>
          <h2>Part 5 - Practice Phase Activities</h2>
          <FormPractice
                nextStep={this.nextStep}
                prevStep={this.prevStep}
                resetForm={this.handleResetForm}
                handleChange={this.handleChange}
                cancel={this.handleClickCancel}
                values = {values} 
                activities = {activities}  
                /></>)
        case 6: return (<><h1>Create a Lesson</h1>
          <h2>Part 6 - Production Phase Activities</h2>
          <FormProduct
                nextStep={this.nextStep}
                prevStep={this.prevStep}
                resetForm={this.handleResetForm}
                handleChange={this.handleChange}
                cancel={this.handleClickCancel}
                values = {values} 
                activities = {activities}  
                /></>)
        case 7: return (<><h1>Create a Lesson</h1>
          <h2>Part 7 - Optional Cooldown phase Activities</h2>
          <FormCooldown
                nextStep={this.nextStep}
                prevStep={this.prevStep}
                resetForm={this.handleResetForm}
                handleChange={this.handleChange}
                cancel={this.handleClickCancel}
                values = {values} 
                activities = {activities}  
                /></>)
        case 8: return (<><h1>Create a Lesson</h1>
          <h2>Part 8 - Lesson Reflections</h2>
          <FormReflection
                nextStep={this.nextStep}
                prevStep={this.prevStep}
                resetForm={this.handleResetForm}
                handleChange={this.handleChange}
                cancel={this.handleClickCancel}
                values = {values} />
              </>)
        case 9: return (<><h1>Create a Lesson</h1>
          <h2>Confirm Information</h2>
          <FormConfirmation 
            values = {values}
            beginning = {this.goToBeginning}
            resetForm={this.handleResetForm}
            handleChange={this.handleChange}
            cancel={this.handleClickCancel}
            activities = {activities} 
            submit={this.handleSubmitForm}
          />
          </>)
      }
    }


    render(){
      return(
        <form className='create-lesson' id="create-lesson-form"
                onSubmit={this.handleSubmitForm}>
          {this.renderForm()}
        </form>
      )
    }



}


