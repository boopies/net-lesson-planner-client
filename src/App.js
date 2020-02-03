import React from 'react';
import { Route, Switch } from 'react-router-dom'
import './App.css';
import NavBar from './NavBar/NavBar'
import LandingPage from './LandingPage/LandingPage'
import CreateLesson from './CreateLesson/CreateLesson'
import LessonPlan from './CreateLesson/LessonPlan/LessonPlan'
import ReadActivities from './ReadActivities/ReadActivities'
import ApiContext from './ApiContext'

export default class App extends React.Component{
  state = {
    activities: [],
    categories: []
}

componentDidMount() {
  Promise.all([
    fetch (`http://localhost:9090/activities`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      },
    }),
    fetch (`http://localhost:9090/categories`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      },
    })
  ])
    .then(([activitiesRes, categoriesRes]) => {
      if (!activitiesRes.ok)
        return activitiesRes.json().then(e => Promise.reject(e))
      if (!categoriesRes.ok)
        return categoriesRes.json().then(e => Promise.reject(e))

      return Promise.all([
        activitiesRes.json(),
        categoriesRes.json(),
      ])
    })
    .then(([activities, categories]) => {
      this.setState({ activities, categories })
    })
    .catch(error => {
      console.error({ error })
    })
}

handleAddActivity = newActivity => {
this.setState({
  activities: [
        ...this.state.activities,
        newActivity
    ]
})
}

handleUpdateActivity = updatedActivity => {
  this.setState({
    activities: this.state.activities.map(activity =>
      (activity.id !== updatedActivity.id) ? activity : updatedActivity
    )
  })
}

  render(){
    const value = {
      activities: this.state.activities,
      categories: this.state.categories,
      addActivity: this.handleAddActivity,
      updateActivity: this.handleUpdateActivity
    }
    return (
      <ApiContext.Provider value={value}>
      <>
      <nav>
        <NavBar />
      </nav>
      <main className='App'>
        <Switch>
          <Route exact path='/' component={ LandingPage } />
          <Route exact path="/create" component={ CreateLesson } />
          <Route exact path="/lesson" component={ LessonPlan } />
          <Route exact Path="/read" component={ ReadActivities } />
        </Switch>
      </main>
      </>
      </ApiContext.Provider>
    );
  }
}
