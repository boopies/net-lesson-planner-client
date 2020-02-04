import React, { Component } from 'react'
import ApiContext from '../../ApiContext'
import ValidationError from '../ValidationError/ValidationError'
import PropTypes from 'prop-types';
import uuid from 'react-uuid'

export default class AddActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name: {
          value: '',
          touched:false
        },
        duration: {
            value: '',
            touched:false
          },
          groups: {
            value: '',
            touched:false
          },
        content: {
          value: '',
          touched:false
        },
        categoryId: {
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

validateName(fieldValue) {
  const name = this.state.name.value.trim();
  if (name.length === 0) {
    return 'Name is required';
  } else if (name.length < 2) {
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
  const categoryID = this.state.categoryId.value.trim();
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

  validateGroups(fieldValue) {
    const groups = this.state.groups.value.trim();
    if (groups.length === 0) {
      return <div id="GSErrorMessage">You must select the groups setup.</div>;
    }
  }

updateName(name){
  this.setState({name: {value: name, touched: true}});
}

updateContent(content){
  this.setState({content: {value: content, touched: true}});
}

updateCategoryId(categoryId){
  this.setState({categoryId: {value: categoryId, touched: true}});
}

updateDuration(duration){
    this.setState({duration: {value: duration, touched: true}});
  }

updateGroups(groups){
    this.setState({groups: {value: groups, touched: true}});
  }

  handleSubmit = e => {
    e.preventDefault()
    let uniqueID = uuid()
    const newActivity = {
        id: uniqueID,
        name: e.target['name'].value,
        categoryId: e.target['categoryId'].value,
        content: e.target['content'].value,
        groups: e.target['groups'].value,
        duration: e.target['duration'].value,
    }
    fetch(`https://my-json-server.typicode.com/boopies/demo/activities`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
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
        <h2>Create a Activity</h2>
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
            onChange={e => this.updateName(e.target.value)}/>
            {this.state.name.touched && (<ValidationError message={this.validateName()}/>)}
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
                onChange={e => this.updateGroups(e.target.value)} >
              <option value=''>...</option>
              <option value='Whole Class'>Whole Class</option>
              <option value='Single'>Single</option>
              <option value='Pairs'>Pairs</option>
              <option value='Groups'>Groups</option>
            </select>
            {this.state.groups.touched && (<ValidationError message={this.validateGroups()}/>)}
          </div>
          <div className='field'>
            <label htmlFor='Activity-Category-select'>
              Category
            </label>
            <select 
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
                  {category.name}
                </option>
              )}
            </select>
            {this.state.categoryId.touched && (<ValidationError message={this.validateCategoryId()}/>)}
          </div>
          <div className='field'>
            <label htmlFor='Activity-content-input'>
             Content
            </label>
            <textarea
                type='text'
                cols='50'
                rows='10'
                id='new-activity-contents' 
                name='content'
                placeholder='Contents of Activity' 
                autoComplete='off'
                aria-label='Contents of the Activity.' 
                aria-required='true'
                aria-describedby='NCErrorMessage'
                onChange={e => this.updateContent(e.target.value)}/>
                {this.state.content.touched && (<ValidationError message={this.validateContent()}/>)}
          </div>
          <div className='buttons'>
          <button 
              type='button' 
              className='button'
              aria-label='Button to Cancel creating new Activity'
              onClick={() => this.goBack()}>
              Cancel
            </button>
            <button 
            type='submit'
              className='button'
              aria-label='submit button to create the new Activity'
              aria-describedby='buttonError'
              disabled={this.validateName()||
                this.validateContent()||
                this.validateCategoryId()||
                this.validateDuration()||
                this.validateGroups()}>
              Submit
            </button>
          </div>
          <div id='buttonError'>submit button will activate when form is filled out correctuly.</div>
        </form>
      </section>
    )
  }
}

AddActivity.defaultProps = {
  name: '',
  content:'',
  categoryId:'',
  groups:'',
  duration:''
};

AddActivity.propTypes ={
  name: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  categoryId: PropTypes.string.isRequired,
  groups: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired
}