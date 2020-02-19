import React from 'react'

const ApiContext = React.createContext({
  activities: [],
  categories: [],
  savedlessons: [],
  hasToken: '',
  users: [],
  currentUser: [],
  addActivity: () => {},
  updateActivity: () =>{},
  updateLesson: () => {},
  sidedrawClose: () => {},
  currentPage: '',
  activitiesPerPage: '',
  category: '',
  handleClick: () => {},
  handleCategoryFilter: () => {},
  setTokenTrue: () => {},
  setTokenFalse: () => {},
  removeCurrentUser: () => {},
  deleteSavedLesson: () => {},
  addSavedLesson: () => {},
})

export default ApiContext