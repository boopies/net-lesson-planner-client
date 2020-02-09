
import React from 'react'
import { NavLink } from 'react-router-dom'
import ApiContext from '../../ApiContext'
import { countActivityForCategory } from '../helpers'
import './ActivityListNav.css'

export default class ActivityListNav extends React.Component {

  static contextType = ApiContext;
  
  render() {
    const { categories=[], activities=[] } = this.context
    return (
      <div className='ActivityListNav'> 
        <div className='ActivityListNav'>
        </div>
                <ul className='ActivityListNav__category-nav'>
                <li><NavLink exact to='/read' className='ActivityListNav__category-link'>All Categories</NavLink></li>
                  {categories.map(category => 
                    <li
                    key={category.id}
                    data-key={category.id}>
                      <NavLink
                        id={category.id}
                        className='ActivityListNav__category-link'
                        to={`/read/category/${category.id}`}
                      >
                        <span className='ActivityListNav__num-activitis'>
                          {countActivityForCategory(activities, category.id)} {' '}
                        </span>
                        {category.title}
                      </NavLink>
                    </li>
                  )}
                </ul>
      </div>
    )
  }
}
