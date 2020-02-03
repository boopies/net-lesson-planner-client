
import React from 'react'
import { NavLink } from 'react-router-dom'
import ApiContext from '../../ApiContext'
import { countActivityForCategory } from '../helpers'

export default class ActivityListNav extends React.Component {
  static contextType = ApiContext;

  render() {
    const { categories=[], activities=[] } = this.context
    return (
      <div className='ActivityListNav'>
        <ul className='ActivityListNav__list'>
          {categories.map(category => 
            <li
            key={category.id}
            data-key={category.id}>
              <NavLink
                className='ActivityListNav__category-link'
                to={`/read/category/${category.id}`}
              >
                <span className='ActivityListNav__num-activitis'>
                  {countActivityForCategory(activities, category.id)} {' '}
                </span>
                {category.name}
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    )
  }
}
