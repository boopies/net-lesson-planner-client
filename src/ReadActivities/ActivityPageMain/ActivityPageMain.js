import React from 'react'
import Activity from '../Activity/Activity'
import ApiContext from '../../ApiContext'
import { findActivity } from '../helpers'
import PropTypes from 'prop-types'

export default class ActivityPageMain extends React.Component {
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
      <section className='ActivityPageMain'>
        <Activity
          id={activity.id}
          name={activity.name}
          duration={activity.duration}
          groups={activity.groups}
        />
        <div className='ActivityPageMain__content'>
          {activity.content.split(/\n \r|\n/).map((para, i) =>
            <p key={i}>{para}</p>
          )}
        </div>
        <div>
        <button
        tag='button'
        role='link'
        onClick={() => this.props.history.push(`/read/edit-activity/${activity.id}`)}
        className='ActivityPageNav__back-button'
      >
        edit
      </button>
        
        <button
        tag='button'
        role='link'
        onClick={() => this.props.history.goBack()}
        className='ActivityPageNav__back-button'
      >
        Back
      </button>
      </div>
      </section>
    )
  }
}

ActivityPageMain.propTypes = {
  match: PropTypes.object
}
