
import React from 'react'
import { NavLink } from 'react-router-dom'
import ApiContext from '../../ApiContext'
import { countActivityForCategory } from '../helpers'
import './ActivityListNav.css'

export default class ActivityListNav extends React.Component {
  constructor(){
    super(); 
    this.state = {
          displayMenu: false,
        };
     this.showDropdownMenu = this.showDropdownMenu.bind(this);
     this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
   };
   

  static contextType = ApiContext;

  showDropdownMenu(event) {
    event.preventDefault();
    this.setState({ displayMenu: true }, () => {
    document.addEventListener('click', this.hideDropdownMenu);
    });
  }

  hideDropdownMenu() {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener('click', this.hideDropdownMenu);
    });
  }

  render() {
    const { categories=[], activities=[] } = this.context
    return (
      <div className='ActivityListNav' style = {{background:"red",width:"200px"}}> 
        <div className='ActivityListNav__dropdownbutton' onClick={this.showDropdownMenu}>
        <span>Select a Category</span> 
        </div>
        { this.state.displayMenu ? (
                <ul className='ActivityListNav__list'>
                <li><NavLink to='/read' >All Categories</NavLink></li>
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
                        {category.name}
                      </NavLink>
                    </li>
                  )}
                </ul>
                ):
        (
          null
        )
        }

      </div>
    )
  }
}
