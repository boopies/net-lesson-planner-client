
import React from 'react'
import { Link } from 'react-router-dom'
import ApiContext from '../../ApiContext'
import { findAuthor, findCategory } from '../helpers'
import './ActivityItem.css'

export default class ActivityItem extends React.Component {
  static contextType = ApiContext;

renderCategory(categoryId){
  const {categories =[] } = this.context
  const category = findCategory(categories, categoryId) || {title: ''}

  return(
    <>
    {category.title}
    </>
  )
}

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
    const { title, duration, grouping, id, authorId, categoryId } = this.props
    return (
      <div className={'act'+categoryId + ' activity__card'}>
            <h3 className='activity-card__title'>
            {title}
            </h3>
            <div className='activity-card__body'>
              <b>Category: {' '}</b> {this.renderCategory(categoryId)}
              <br />
              <b>Length: {' '}</b> {duration}
              <br />
              <b>Groups: {' '}</b> {grouping}
              <br />
              <b>Creator: {' '}</b> <span className='user_capitalize'>{this.renderAuthor(authorId)}</span>
            </div>
          <div className='activity-card__readmore'>
            <Link to={`/read/activity/${id}`}>
            <button className='activity-card__learnmore_button'>
            Read More</button>
            </Link>
          </div>
      </div>

    )
  }
}