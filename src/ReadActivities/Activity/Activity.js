
import React from 'react'
import { Link } from 'react-router-dom'
import ApiContext from '../../ApiContext'
import './Activity.css'

export default class Activity extends React.Component {
  static contextType = ApiContext;
  render() {
    const { name, duration, groups, id } = this.props
    return (
      <div className='activity'>
        <h3 className='activity__title'>
          <Link to={`/read/activity/${id}`}>
            {name}
          </Link>
        </h3>
      <div className="activity__duration">
            <span>Length: {' '}</span> {duration}
      </div>
      <div className="activity__grouping">
            <span>Groups: {' '}</span> {groups}
      </div>
      </div>
    )
  }
}