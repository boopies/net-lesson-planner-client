import React from 'react'

export default React.createContext({
  activities: [],
  categories: [],
  savedlessons: [],
  users: [],
  currentUser: [],
  addActivity: () => {},
  updateActivity: () =>{},
  UserGet: () => {},
  sidedrawClose: () => {},
})