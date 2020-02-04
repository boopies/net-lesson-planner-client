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

  render() {
    const { categoryId } = this.props.match.params
    const { activities=[] } = this.context
    const activityForCategory = getActivityForCategory(activities, categoryId)
    return (
      <section className='activity-list-main'>
        <ul>
          {activityForCategory.map(activity =>
            <li key={activity.id}>
              <Activity
                id={activity.id}
                name={activity.name}
                duration={activity.duration}
                groups={activity.groups}
              />
            </li>
          )}
        </ul>
          <div className='activity-list-main__button'>
          <button
            tag={Link}
            to='/read/add-activity'
            type='button'
            className='activity-list-main__add-activity-button'
            onClick={() => this.handleAddActivitiesForm()}
            
          >
            Add Activity
          </button>
        </div>
      </section>
    )
  }
}