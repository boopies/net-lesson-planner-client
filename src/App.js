import React from 'react';
import { Route, Switch } from 'react-router-dom'
import './App.css';
import NavBar from './NavBar/NavBar'
import LandingPage from './LandingPage/LandingPage'
import CreateLesson from './CreateLesson/CreateLesson'
import LessonPlan from './CreateLesson/LessonPlan/LessonPlan'
import ReadActivities from './ReadActivities/ReadActivities'
import SideDraw from './NavBar/SideDraw/SideDraw'
import BackDrop from './BackDrop/BackDrop'
import ApiContext from './ApiContext'
import RegistrationForm from './RegistrationForm/RegistrationForm'
import LoginForm from './LoginForm/LoginForm'
import Savedlessons from './Savedlessons/Savedlessons'
import PrivateRoute from './Utilities/PrivateRoute'
import SavedLessonPlan from './Savedlessons/SavedLessonPlan/SavedLessonPlan'

export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    activities: [],
    categories: [],
    users: [],
    savedlessons: [],
    currentUser: [],
    sideDrawOpen: false
    }}

   
onUserGet = (currentUser) => {
      this.setState( 
         { currentUser } );
    }

componentDidMount() {
  Promise.all([
    fetch (`http://localhost:8000/api/activities`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      },
    }),
    fetch (`http://localhost:8000/api/categories`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      },
    }),
    fetch (`http://localhost:8000/api/users`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      },
    }),
    fetch (`http://localhost:8000/api/savedlessons`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      },
    }),
  ])
    .then(([activitiesRes, categoriesRes, usersRes, savedlessonsRes,]) => {
      if (!activitiesRes.ok)
        return activitiesRes.json().then(e => Promise.reject(e))
      if (!categoriesRes.ok)
        return categoriesRes.json().then(e => Promise.reject(e))
      if (!usersRes.ok)
        return usersRes.json().then(e => Promise.reject(e))
      if (!savedlessonsRes.ok)
        return savedlessonsRes.json().then(e => Promise.reject(e))
      return Promise.all([
        activitiesRes.json(),
        categoriesRes.json(),
        usersRes.json(),
        savedlessonsRes.json(),
      ])
    })
    .then(([activities, categories, users, savedlessons]) => {
      this.setState({ activities, categories, users, savedlessons })
    })
    .catch(error => {
      console.error({ error })
    })
}

sideMenuClickHandler = () => {
  this.setState((prevState) => { 
    return {sideDrawOpen: !prevState.sideDrawOpen};
  });
}

backdropClickHandler = () => {
  this.setState({sideDrawOpen: false});
}

sidedrawClose = () => {
  this.setState({sideDrawOpen: false});
}


handleAddActivity = newActivity => {
this.setState({
  activities: [
        ...this.state.activities,
        newActivity
    ]
})
}

handleAddSavedLesson = newSavedLesson => {
  this.setState({
    savedlessons: [
          ...this.state.savedlessons,
          newSavedLesson
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
    let backdrop;

    if (this.state.sideDrawOpen){
      backdrop = <BackDrop click={this.backdropClickHandler} />
    }

    const value = {
      activities: this.state.activities,
      categories: this.state.categories,
      users: this.state.users,
      savedlessons: this.state.savedlessons,
      addActivity: this.handleAddActivity,
      updateActivity: this.handleUpdateActivity,
      addSavedLesson: this.handleAddSavedLesson,
      currentUser: this.state.currentUser,
      UserGet: this.onUserGet,
      sidedrawClose: this.sidedrawClose,
    }
    return (
      <ApiContext.Provider value={value}>
      <div style={{height:'100%'}} className="App">
      <nav className='app__navbar'>
        <NavBar sideClickHandler={this.sideMenuClickHandler} />
        <SideDraw show={this.state.sideDrawOpen} />
        { backdrop }
      </nav>
      <main className='app__main'>
        <Switch>
          <Route exact path='/' component={ LandingPage } />
          <Route path='/create' component={ CreateLesson } />
          <Route path='/lesson' component={ LessonPlan } />
          <Route path='/read' component={ ReadActivities } />
          <Route path='/register' component={ RegistrationForm } />
          <Route path='/login' component={ LoginForm } />
          <PrivateRoute path='/savedlessons' component={ Savedlessons } />
          <PrivateRoute path='/savedlessonplan' component={ SavedLessonPlan } />
        </Switch>
      </main>
      </div>
      </ApiContext.Provider>
    );
  }
}
