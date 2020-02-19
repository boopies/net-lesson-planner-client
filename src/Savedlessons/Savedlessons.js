import React from 'react';
import ApiContext from '../ApiContext';
import './Savedlessons.css'
import {findSavedlesson, getUserSavedlesson} from './lessonhelper'
import config from '../config'
import TokenService from '../services/token-service'

export default class Savedlessons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lesson: [],
            button: true
        };
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
    }

    static contextType = ApiContext 
    
    handleSubmitForm = e => {
        e.preventDefault()
        const lessonId = this.state.lesson[0].id
        this.props.history.push(`/savedlessonplan/${lessonId}`)
    }

    handleCreateLessonForm = () => {
        this.props.history.push('/create')
    };

    updateState(savedlesson) {
        const { savedlessons = [] } = this.context
        const lesson = findSavedlesson(savedlessons, savedlesson)
        if (!lesson) {
            this.setState({button: true})
        } else {
            this.setState({lesson: [lesson], button: false})
        }
    }

    onDeleteLesson = () => {
      this.props.history.push('/savedlessons')
  };

    handleDeleteLesson = e =>{
      e.preventDefault()
      const savedId = this.state.lesson[0].id
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
        .catch(error => console.error({ error }))
    }

    renderButtons() {
        return (
          <> 
            <button 
              type = 'submit' 
              disabled = { this.state.button} > 
                Get Lesson
              </button> 
              <button 
              type = 'button' 
              disabled = { this.state.button}
              className = 'activity-list-main__add-activity-button' 
              onClick={e =>
                      window.confirm("Are you sure you wish to delete this item?") &&
                      this.handleDeleteLesson(e)
                  }> 
                Delete Saved Lesson
              </button>
            <button 
              type = 'button' 
              className = 'activity-list-main__add-activity-button' 
              onClick = {() => this.handleCreateLessonForm()} > 
                Create a New Lesson Plan 
              </button>
            <button 
              className="go_back--button" 
              type='button' 
              onClick={() => this.handleClickGoBack()}>
                Go Back
              </button> 
          </>
        )
    }

    handleClickGoBack = () => {
        this.props.history.push('/')
    };

    renderMyLessonPlans() {
        const { savedlessons = [], currentUser=[] } = this.context
        const userId = currentUser.id
        const mylesson = getUserSavedlesson(savedlessons, userId)
        return (
            <> 
              {mylesson.map(lesson => 
              <option 
                key={lesson.id} 
                value={lesson.id}>
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
          </h1 > </header>
        <main className="saved-lessons__main">
            <form 
              className="saved-lessons_select-forms" 
              onSubmit={this.handleSubmitForm}>
                <select
                    className="saved-lessons_select"
                    id='savedlesson_lesson'
                    name='savedlesson'
                    onChange={e => this.updateState(e.target.value)}>
                    <option value=''>
                        Select a saved lesson plan</option>
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