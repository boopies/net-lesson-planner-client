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
          title={activity.title}
          duration={activity.duration}
          grouping={activity.grouping}
        />
        
        <div className='ActivityPageMain__content'>
        <h3 className='ActivityPageMain__Prodesture'>Procedure</h3>
          {activity.content.split(/\\n \\r|\\n|\n|\\n \\r/).map((para, i) =>
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
