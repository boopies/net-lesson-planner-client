import React from 'react'
import ActivityItem from '../ActivityItem/ActivityItem'
import { Link } from 'react-router-dom'
import ApiContext from '../../ApiContext'
import { getActivityForCategory, removedBlankActivities } from '../helpers'
import './ActivityList.css'

export default class ActivityList extends React.Component {
  constructor() {
    super();
    this.state = {
    };
    this.handleClick = this.handleClick.bind(this);
  }

  static defaultProps = {
    match: {
      params: {}
    }
  }

  static contextType = ApiContext

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  handleAddActivitiesForm= () => {
    this.props.history.push('/read/add-activity')
  };

 renderActivities(){
  const {activities = [], category, currentPage, activitiesPerPage} = this.context;
  const removedBlank = removedBlankActivities(activities)
  const activityForCategory = getActivityForCategory(removedBlank, category);
  const indexOfLastActivity = currentPage * activitiesPerPage;
  const indexOfFirstActivity = indexOfLastActivity - activitiesPerPage;
  const currentActivities = activityForCategory.slice(indexOfFirstActivity, indexOfLastActivity);

  return(
    <>{currentActivities.map(activity => {
      return activity.id > 10 ?
      <li key={activity.title}>
        <ActivityItem
          id={activity.id}
          title={activity.title}
          duration={activity.duration}
          grouping={activity.grouping}
          authorId={activity.user_id}
          categoryId={activity.category_id}
        />
      </li>
    :
    <li key={activity.title}>
    <div className='activity'>
    <h2 className='activity__title'>{activity.title}
    </h2>
    <p>This is a blank activity for you to write in yourself
    if you have an activity on the list</p></div></li>

      })
    }
    </>)
  }

  renderPageNumbers(){
    const {activities = [], category='', activitiesPerPage } = this.context;
    const removedBlank = removedBlankActivities(activities)
    const activityForCategory = getActivityForCategory(removedBlank, category); 
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(activityForCategory.length / activitiesPerPage); i++) {
      pageNumbers.push(i);
    }
    return (
      <>
      {pageNumbers.map(number => {
        return (
      <li
        key= {number}
        id={number}
        value={number}
        onClick={e => this.context.handleClick(e.target.value)}
      >
        {number}
      </li>)
    })}
  </>
  );
}


  renderAddActivity(){
    return(
      <button
          tag={Link}
          to='/read/add-activity'
          type='button'
          className='activity-list__add-activity-button'
          onClick={() => this.handleAddActivitiesForm()} >
        Add Activity
    </button>
    )
  }

  render() {
    return (
      <section className='activity-list'>
        <ul>
        {this.renderActivities()}
        </ul>
        <ul id="page-numbers">
        {this.renderPageNumbers()}
        </ul>
          <div className='activity-list__button'>
          <p>Please upload your own activities to share.</p>
          {this.renderAddActivity()}
        </div>
      </section>
    )
  }
}