import React, { Component } from 'react'
import ApiContext from '../../ApiContext'
import ValidationError from '../ValidationError/ValidationError'
import PropTypes from 'prop-types';
import TokenService from '../../services/token-service'
import config from '../../config'
import './AddActivity.css'

export default class AddActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
        title: {
          value: '',
          touched:false
        },
        duration: {
            value: '',
            touched:false
          },
          grouping: {
            value: '',
            touched:false
          },
        content: {
          value: '',
          touched:false
        },
        category_id: {
          value: '',
          touched:false
        },
  }
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

validateTitle(fieldValue) {
  const title = this.state.title.value.trim();
  if (title.length === 0) {
    return 'Title is required';
  } else if (title.length < 2) {
    return <div id="ANErrorMessage">New activity's name must be 3 characters long.</div>;
  }
}

validateContent(fieldValue) {
  const content = this.state.content.value.trim();
  if (content.length === 0) {
    return <div id="ACErrorMessage">You must add some contents to the new Activity.</div>;
} else if (content.length < 5){
  return <div id="ACErrorMessage">The content must contain 5 or more characters.</div>;
}
}

validateCategoryId(fieldValue) {
  const categoryID = this.state.category_id.value.trim();
  if (categoryID.length === 0) {
    return <div id="FSErrorMessage">You must select a category to add the new Activity to.</div>;
  }
}

validateDuration(fieldValue) {
    const duration = this.state.duration.value.trim();
    if (duration.length === 0) {
      return <div id="DSErrorMessage">You must select the duration of the activity.</div>;
    }
  }

  validateGrouping(fieldValue) {
    const grouping = this.state.grouping.value.trim();
    if (grouping.length === 0) {
      return <div id="GSErrorMessage">You must select the groups setup.</div>;
    }
  }

updateTitle(title){
  this.setState({title: {value: title, touched: true}});
}

updateContent(content){
  this.setState({content: {value: content, touched: true}});
}

updateCategoryId(category_id){
  this.setState({category_id: {value: category_id, touched: true}});
}

updateDuration(duration){
    this.setState({duration: {value: duration, touched: true}});
  }

updateGrouping(grouping){
    this.setState({grouping: {value: grouping, touched: true}});
  }

  handleSubmit = e => {
    e.preventDefault()
    const newActivity = {
        title: e.target['title'].value,
        category_id: e.target['categoryId'].value,
        content: e.target['content'].value,
        grouping: e.target['grouping'].value,
        duration: e.target['duration'].value,
    }
    fetch(`${config.API_ENDPOINT}/activities`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(newActivity),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(newActivity => {
        this.context.addActivity(newActivity)
        this.props.history.push(`/read`)
      })
      .catch(error => {
        console.error({ error })
      })
  }
  
  render() {
    const { categories=[] } = this.context
    return (
      <section className='AddActivity'>
        <form 
          className='AddActivityForm'
          onSubmit={this.handleSubmit}>
            <h2 className='add-activity__title'>
            Create an Activity</h2>
              <div className='add-activity-input__title'>
                <label 
                htmlFor='newActivityName'>
                  Title
                </label>
                <input
                type='text' 
                id='new-activity-name-input' 
                name='title'
                placeholder="Activity Name"
                aria-label="Name of the new activity" 
                aria-required="true"
                aria-describedby="NNErrorMessage"
                onChange={e => this.updateTitle(e.target.value)}/>
                {this.state.title.touched && (<ValidationError message={this.validateTitle()}/>)}
              </div>
          <div className='add-activity-input__duration'>
            <label 
            htmlFor='newActivityDurattion'>
              Duration
            </label>
            <select 
                className="add-activity_select"
                id='new-activity-duration' 
                name='duration'
                aria-label='Duration of the Activity' 
                aria-required='true'
                aria-describedby='FSErrorMessage'
                onChange={e => this.updateDuration(e.target.value)} >
              <option value=''>...</option>
              <option value='5 min'>5 min</option>
              <option value='10 min'>10 min</option>
              <option value='15 min'>15 min</option>
              <option value='20 min'>20 min</option>
              <option value='25 min'>25 min</option>
              <option value='50 min'>30 min</option>
            </select>
            {this.state.duration.touched && (<ValidationError message={this.validateDuration()}/>)}
          </div>
          <div className='add-activity-input__groups'>
            <label 
            htmlFor='newActivityGroups'>
              Groups
            </label>
            <select
                className="add-activity_select"
                id='new-activity-groups' 
                name='grouping'
                aria-label='Duration of the Activity' 
                aria-required='true'
                aria-describedby='FSErrorMessage'
                onChange={e => this.updateGrouping(e.target.value)} >
              <option value=''>...</option>
              <option value='Whole Class'>Whole Class</option>
              <option value='Individual'>Individual</option>
              <option value='Pairs'>Pairs</option>
              <option value='Groups'>Groups</option>
            </select>
            {this.state.grouping.touched && (<ValidationError message={this.validateGrouping()}/>)}
          </div>
          <div className='add-activity-input__category'>
            <label htmlFor='Activity-Category-select'>
              Category
            </label>
            <select 
                className="add-activity_select"
                id='new-Activity-Category' 
                name='categoryId'
                autoComplete='off'
                aria-label='Category selection to add Activity' 
                aria-required='true'
                aria-describedby='FSErrorMessage'
                onChange={e => this.updateCategoryId(e.target.value)} >
              <option value=''>...</option>
              {categories.map(category =>
                <option 
                key={category.id} 
                value={category.id}
                aria-label='Category names for selection' >
                  {category.title}
                </option>
              )}
            </select>
            {this.state.category_id.touched && (<ValidationError message={this.validateCategoryId()}/>)}
          </div>
          <div className='add-activity-input__content'>
            <label htmlFor='Activity-content-input'>
             Content
            </label>
            <textarea
                type='text'
                cols='50'
                rows='10'
                className='new-activity-contents' 
                name='content'
                placeholder='Instructions of how to do the activity.' 
                autoComplete='off'
                aria-label='Contents of the Activity.' 
                aria-required='true'
                aria-describedby='NCErrorMessage'
                onChange={e => this.updateContent(e.target.value)}/>
                {this.state.content.touched && (<ValidationError message={this.validateContent()}/>)}
          </div>
          <div className='addactivitybuttons'>
            <button 
              type='submit'
              className='addActivity-submit__button'
              aria-label='submit button to create the new Activity'
              aria-describedby='buttonError'
              disabled={this.validateTitle()||
                this.validateContent()||
                this.validateCategoryId()||
                this.validateDuration()||
                this.validateGrouping()}>
              Submit
            </button>
            <button 
              className='addActivity-cancel__button' 
              type='button'
              aria-label='Button to Cancel creating new Activity'
              onClick={() => this.goBack()}>
              Cancel
            </button>
          </div>
          <div id='buttonError'>submit button will activate when form is filled out correctuly.</div>
        </form>
      </section>
    )
  }
}

AddActivity.defaultProps = {
  title: '',
  content:'',
  category_id:'',
  grouping:'',
  duration:''
};

AddActivity.propTypes ={
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  category_id: PropTypes.string.isRequired,
  grouping: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired
}