import React from 'react';
import ApiContext from '../ApiContext';
import './Savedlessons.css'
import {findSavedlesson} from './lessonhelper'

export default class Savedlessons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
   this.handleSubmitForm = this.handleSubmitForm.bind(this);
}

  static contextType = ApiContext

  handleSubmitForm = e => {
    e.preventDefault()
    let state = this.state
    this.props.history.push({
        pathname: '/savedlessonplan',
        state: {state},
    })
    }

  handleCreateLessonForm= () => {
    this.props.history.push('/create')
  };

  updateState(savedlesson){
    const {savedlessons=[]} = this.context
    const lesson = findSavedlesson(savedlessons, savedlesson)
    console.log(lesson)
    this.setState({state: [lesson]})
    console.log(this.state)
  }


  renderButtons(){
    return(
      <>
      <button type='submit'>Get Lesson</button>
      <button
          type='button'
          className='activity-list-main__add-activity-button'
          onClick={() => this.handleCreateLessonForm()} >
        Create a New Lesson Plan
    </button>
    <button className="go_back--button" 
    type='button' onClick={() => this.handleClickGoBack()}>
    Go Back</button>
    </>
    )
  }

  handleClickGoBack = () => {
    this.props.history.push('/')
  };

  renderMyLessonPlans(){
    const {savedlessons = []} = this.context
    return(
      <>
      {savedlessons.map(lesson =>
      <option key={lesson.id} value={lesson.id}>
      {lesson.title}
      </option>)}
      </>
    )
  }

  render() {
    return (
      <div className="saved-lessons">
      <header className="saved-lessons__header">
          <h1 className="saved-lessons__heading">
              Your Saved Lessons
          </h1>
      </header>
      <main className="saved-lessons__main">
        <form className="saved-lessons_select-forms"
        onSubmit={this.handleSubmitForm}>
          <select className="saved-lessons_select"
            id='savedlesson_lesson'
            name='savedlesson'
            onChange={e => this.updateState(e.target.value)}>
            <option value=''>Select a saved lesson plan</option>
            {this.renderMyLessonPlans()}
            </select>
        <div>
          {this.renderButtons()}
        </div>
        </form>
      </main>
  </div>
    )
  }
}