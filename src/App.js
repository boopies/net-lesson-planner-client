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

export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    activities: [],
    categories: [],
    user: [],
    sideDrawOpen: false
    }}

onUserGet = (userinfo) => {
      this.setState({ 
        user: userinfo
      });
      console.log(this.state.user)
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
      user: this.state.username,
      addActivity: this.handleAddActivity,
      updateActivity: this.handleUpdateActivity,
      UserGet: this.onUserGet,
      sidedrawClose: this.sidedrawClose
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
        </Switch>
      </main>
      </div>
      </ApiContext.Provider>
    );
  }
}
