import React from 'react'
import ApiContext from '../../ApiContext'
import { findActivity, findCategory } from "../helpers"
import PropTypes from 'prop-types'

export default class ActivityPageNav extends React.Component {
  static defaultProps = {
    history: {
      goBack: () => { }
    },
    match: {
      params: {}
    }
  }

  static contextType = ApiContext;

  render() {
    const { activities, categories, } = this.context
    const { activityId } = this.props.match.params
    const activity = findActivity(activities, activityId) || {}
    const category = findCategory(categories, activity.category_id)
    return (
      <div className='ActivityPageNav'>
        {category && (
          <h3 className='ActivityPageNav__category-name'>
            {category.title}
          </h3>
        )}
        <button
          tag='button'
          role='link'
          onClick={() => this.props.history.push('/read')}
          className='ActivityPageNav__back-button'
        >
          Back
        </button>
      </div>
    )
  }
}

ActivityPageNav.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object
}