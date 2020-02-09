import React from 'react'

export default React.createContext({
  activities: [],
  categories: [],
  savedlessons: [],
  user: [],
  addActivity: () => {},
  updateActivity: () =>{},
  UserGet: () => {},
  sidedrawClose: () => {},
})