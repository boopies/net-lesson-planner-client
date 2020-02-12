
import React from 'react'
import { Link } from 'react-router-dom'
import ApiContext from '../../ApiContext'
import { findAuthor} from '../helpers'
import './Activity.css'

export default class Activity extends React.Component {
  static contextType = ApiContext;

renderAuthor(authorId){
  const { users=[] } = this.context
  const author = findAuthor(users, authorId) || { username: '' }

  return(
    <>
  {author.username}
    </>
  )
}

  render() {
    const { title, duration, grouping, id, authorId } = this.props
    return (
      <div className='activity'>
        <h2 className='activity__title'>
          <Link to={`/read/activity/${id}`}>
            {title}
          </Link>
        </h2>
      <div className="activity__duration">
            <span>Length: {' '}</span> {duration}
      </div>
      <div className="activity__grouping">
            <span>Groups: {' '}</span> {grouping}
      </div>
      <div className="activity__author">
            <span>Creator: {' '}</span> {this.renderAuthor(authorId)}
      </div>
      </div>
    )
  }
}