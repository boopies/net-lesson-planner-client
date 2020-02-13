import React from 'react'

export default React.createContext({
  activities: [],
  categories: [],
  savedlessons: [],
  hasToken: '',
  users: [],
  currentUser: [],
  addActivity: () => {},
  updateActivity: () =>{},
  sidedrawClose: () => {},
  currentPage: '',
  activitiesPerPage: '',
  category: '',
  handleClick: () => {},
  handleCategoryFilter: () => {},
  setTokenTrue: () => {},
  setTokenFalse: () => {},
})