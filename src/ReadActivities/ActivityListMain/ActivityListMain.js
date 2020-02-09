import React from 'react'
import Activity from '../Activity/Activity'
import { Link } from 'react-router-dom'
import ApiContext from '../../ApiContext'
import { getActivityForCategory } from '../helpers'
import './ActivityListMain.css'

export default class ActivityListMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext

  handleAddActivitiesForm= () => {
    this.props.history.push('/read/add-activity')
  };

  renderAddActivity(){
    return(
      <button
          tag={Link}
          to='/read/add-activity'
          type='button'
          className='activity-list-main__add-activity-button'
          onClick={() => this.handleAddActivitiesForm()} >
        Add Activity
    </button>
    )
  }

  render() {
    const { categoryId } = this.props.match.params
    const { activities = [] } = this.context
    const activityForCategory = getActivityForCategory(activities, categoryId)
    return (
      <section className='activity-list-main'>
        <ul>
          {activityForCategory.map(activity => {
            return activity.id > 5 ?
            <li key={activity.id}>
              <Activity
                id={activity.id}
                title={activity.title}
                duration={activity.duration}
                grouping={activity.grouping}
              />
            </li>
          : <li key={activity.id}>
          <div className='activity'>
          <h2 className='activity__title'>{activity.title}
          </h2>
          <p>This is a blank activity for you to write in yourself</p></div></li>
          })}
        </ul>
          <div className='activity-list-main__button'>
          <p>Please upload your own activities to share.</p>
          {this.renderAddActivity()}
        </div>
      </section>
    )
  }
}