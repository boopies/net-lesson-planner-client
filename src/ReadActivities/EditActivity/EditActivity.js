import React, { Component } from 'react'
import ApiContext from '../../ApiContext'
import PropTypes from 'prop-types';
import TokenService from '../../services/token-service'

export default class EditActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {    
      id: '',
      title: '',
      duration: '',
      grouping: '',
      category_id: '',
      content: '',
      user_id: '',
    };
  }

  static defaultProps = {
    history: {
      push: () => { }
    },
  }
  
  static contextType = ApiContext;

  componentDidMount() {
    const { activityId } = this.props.match.params
    fetch(`http://localhost:8000/api/activities/${activityId}`, {
      method: 'GET',
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
          duration: responseData.duration,
          grouping: responseData.grouping,
          category_id: responseData.category_id,
          content: responseData.content,
          user_id: responseData.user_id,
        })
      })
      .catch(error => {
        console.error(error)
        this.setState({ error })
      })
  }

  goBack = () => {
    this.props.history.goBack();
}

updateContent(content){
  this.setState({content: content });
}

updateCategoryId(categoryId){
  this.setState({categoryId: categoryId });
}

updateDuration(duration){
    this.setState({duration: duration });
  }

updateGrouping(grouping){
    this.setState({grouping: grouping });
  }

  handleSubmit = e => {
    e.preventDefault()
    const { activityId } = this.props.match.params
    const updatedActivity = this.state
    fetch(`http://localhost:8000/api/activities/${activityId}`, {
      method: 'PATCH',
      body: JSON.stringify(updatedActivity),
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
        this.context.updateActivity(updatedActivity)
        this.props.history.goBack()
      })
      .catch(error => {
        console.error(error)
        this.setState({ error })
      })
  }

  render() {
    const { title, duration, grouping, category_id, content} = this.state
    const { categories=[] } = this.context
    return (
      <section className='AddActivity'>
        <h2>Edit Activity: <i>{title}</i></h2>
        <form onSubmit={this.handleSubmit}>
          <div className='field'>
            <label 
            htmlFor='newActivityDurattion'>
              Duration
            </label>
            <select 
                id='new-activity-duration' 
                name='duration'
                aria-label='Duration of the Activity' 
                aria-required='true'
                aria-describedby='FSErrorMessage'
                value = {duration}
                onChange={e => this.updateDuration(e.target.value)} >
              <option value='5min'>5 min</option>
              <option value='10min'>10 min</option>
              <option value='15min'>15 min</option>
              <option value='20min'>20 min</option>
              <option value='25min'>25 min</option>
              <option value='30min'>30 min</option>
            </select>
          </div>
          <div className='field'>
            <label 
            htmlFor='newActivityGrouping'>
              Groups
            </label>
            <select 
                id='new-activity-grouping' 
                name='grouping'
                aria-label='Duration of the Activity' 
                aria-required='true'
                aria-describedby='FSErrorMessage'
                value = {grouping}
                onChange={e => this.updateGrouping(e.target.value)} >
              <option value='Whole Class'>Whole Class</option>
              <option value='Individual'>Individual</option>
              <option value='Pairs'>Pairs</option>
              <option value='Groups'>Groups</option>
            </select>
          </div>
          <div className='field'>
            <label htmlFor='activity-category-select'>
              Category
            </label>
            <select 
                id='new-activity-category' 
                name='categoryId'
                autoComplete='off'
                aria-label='category selection to add activity' 
                aria-required='true'
                aria-describedby='FSErrorMessage'
                value = { category_id }
                onChange={e => this.updateCategoryId(e.target.value)} >
              {categories.map(category =>
                <option 
                key={category.id} 
                value={category.id}
                aria-label='category names for selection' >
                  {category.title}
                </option>
              )}
            </select>
          </div>
          <div className='field'>
            <label htmlFor='activity-content-input'>
             Content
            </label>
            <textarea
                type='text'
                cols='50'
                rows='10'
                id='new-activity-contents' 
                name='content'
                placeholder='Contents of activity' 
                autoComplete='off'
                aria-label='Contents of the activity.' 
                aria-required='true'
                defaultValue = {content}
                aria-describedby='NCErrorMessage'
                onChange={e => this.updateContent(e.target.value)}/>
          </div>
          <div className='buttons'>
          <button 
              type='button' 
              className='button'
              aria-label='Button to Cancel creating new activity'
              onClick={() => this.goBack()}>
              Cancel
            </button>
            <button 
            type='submit'
              className='button'
              aria-label='submit button to create the new activity'>
              Submit
            </button>
          </div>
        </form>
      </section>
    )
  }
}

EditActivity.defaultProps = {
  name: '',
  content:'',
  category_id:'',
  grouping:'',
  duration:''
};

EditActivity.propTypes ={
  name: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  category_id: PropTypes.string.isRequired,
  grouping: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired
}