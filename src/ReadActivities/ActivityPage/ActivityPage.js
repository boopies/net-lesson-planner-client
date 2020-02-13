import React from 'react'
import ActivityItem from '../ActivityItem/ActivityItem'
import ApiContext from '../../ApiContext'
import { findActivity } from '../helpers'
import PropTypes from 'prop-types'

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
    const { activities=[] } = this.context
    const { activityId } = this.props.match.params
    const activity = findActivity(activities, activityId) || { content: '' }
    return (
      <section className='ActivityPage'>
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
        <div>
        <button
        tag='button'
        role='link'
        onClick={() => this.props.history.push(`/read/edit-activity/${activity.id}`)}
        className='ActivityPage__back-button'
      >
        edit
      </button>
        
        <button
        tag='button'
        role='link'
        onClick={() => this.props.history.goBack()}
        className='ActivityPage__back-button'
      >
        Back
      </button>
      </div>
      </section>
    )
  }
}

ActivityPage.propTypes = {
  match: PropTypes.object
}
