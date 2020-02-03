import React, { Component } from 'react'
import ApiContext from '../../ApiContext'
//import config from '../config'

export default class EditActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {    
      id: '',
      name: '',
      duration: '',
      groups: '',
      categoryId: '',
      content: '',
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
    fetch(`http://localhost:9090/activities/${activityId}`, {
      method: 'GET',
      }
    )
      .then(res => {
        if (!res.ok)
          return res.json().then(error => Promise.reject(error))
        return res.json()
      })
      .then(responseData => {
        console.log(responseData)
        this.setState({
          id: responseData.id,
          name: responseData.name,
          duration: responseData.duration,
          groups: responseData.groups,
          categoryId: responseData.categoryId,
          content: responseData.content,
        }, console.log(this.state))
      })
      .catch(error => {
        console.error(error)
        this.setState({ error })
      })
  }

  goBack = () => {
    this.props.history.goBack();
}

updateName(name){
  this.setState({name: {value: name }});
}

updateContent(content){
  this.setState({content: {value: content }});
}

updateCategoryId(categoryId){
  this.setState({categoryId: {value: categoryId }});
}

updateDuration(duration){
    this.setState({duration: {value: duration }});
  }

updateGroups(groups){
    this.setState({groups: {value: groups }});
  }


  handleSubmit = e => {
    e.preventDefault()
    const { activityId } = this.props.match.params
    const updatedActivity = {         
    name: e.target['name'].value,
    categoryId: e.target['categoryId'].value,
    content: e.target['content'].value,
    groups: e.target['groups'].value,
    duration: e.target['duration'].value,}
    fetch(`http://localhost:9090/activities/${activityId}`, {
      method: 'PATCH',
      body: JSON.stringify(updatedActivity),
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(error => Promise.reject(error))
      })
      .then(() => {
        this.context.updateActivity(updatedActivity)
        this.props.history.push('/read')
      })
      .catch(error => {
        console.error(error)
        this.setState({ error })
      })
  }

  render() {
    const { name, duration, groups, categoryId, content} = this.state
    const { categories=[] } = this.context
    return (
      <section className='AddActivity'>
        <h2>Create a activity</h2>
        <form onSubmit={this.handleSubmit}>
          <div className='field'>
            <label 
            htmlFor='newActivityName'>
              Name
            </label>
            <input
            type='text' 
            id='new-activity-name-input' 
            name='name'
            placeholder="Activity Name"
            aria-label="Name of the new activity" 
            aria-required="true"
            aria-describedby="NNErrorMessage"
            defaultValue = {name}
            onChange={e => this.updateName(e.target.value)}/>
          </div>
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
                defaultOption = {duration}
                onChange={e => this.updateDuration(e.target.value)} >
              <option value='5 min'>5 min</option>
              <option value='10 min'>10 min</option>
              <option value='15 min'>15 min</option>
              <option value='20 min'>20 min</option>
              <option value='25 min'>25 min</option>
              <option value='30 min'>30 min</option>
            </select>
          </div>
          <div className='field'>
            <label 
            htmlFor='newActivityGroups'>
              Groups
            </label>
            <select 
                id='new-activity-groups' 
                name='groups'
                aria-label='Duration of the Activity' 
                aria-required='true'
                aria-describedby='FSErrorMessage'
                defaultOption = {groups}
                onChange={e => this.updateGroups(e.target.value)} >
              <option value='Whole Class'>Whole Class</option>
              <option value='Single'>Single</option>
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
                defaultOption = {categoryId}
                onChange={e => this.updateCategoryId(e.target.value)} >
              {categories.map(category =>
                <option 
                key={category.id} 
                value={category.id}
                aria-label='category names for selection' >
                  {category.name}
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