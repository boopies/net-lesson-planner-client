import React from 'react'
import ActivityItem from '../ActivityItem/ActivityItem'
import ApiContext from '../../ApiContext'
import { findActivity } from '../helpers'
import PropTypes from 'prop-types'
import './ActivityPage.css'
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import EditIcon from '@material-ui/icons/Edit';

export default class ActivityPage extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    },
    history: {
      goBack: () => {}
    }
  }
  static contextType = ApiContext

  render() {
    const { activities=[], currentUser } = this.context
    const { activityId } = this.props.match.params
    const activity = findActivity(activities, activityId) || { content: '' }
    return (
      <section className='read_ActivityPage'>
        <ActivityItem
          id={activity.id}
          title={activity.title}
          duration={activity.duration}
          grouping={activity.grouping}
          authorId={activity.user_id}
          categoryId={activity.category_id}
        />
        
        <div className='ActivityPage__content'>
          <h3 className='ActivityPage__Prodesture'>Procedure</h3>
            {activity.content.split(/\\n \\r|\\n|\n|\\n \\r/).map((para, i) =>
              <p key={i}>{para}</p>
            )}
        </div>
        <div className='activities-content__buttons'>
          <button
              type='button'
              disabled={parseInt(currentUser.id) === 1? true: false}
              className={(activity.user_id === currentUser.id? 'button__yellow' : 'button__yellow hidden')}
              onClick={() => this.props.history.push(`/read/edit-activity/${activity.id}`)}>
              <EditIcon /> Edit
          </button>
          
          <button
              type='button'
              onClick={() => this.props.history.push('/read')}
              className='button__red'>
              <KeyboardReturnIcon /> Back
        </button>
      </div>
      </section>
    )
  }
}

ActivityPage.propTypes = {
  match: PropTypes.object
}
