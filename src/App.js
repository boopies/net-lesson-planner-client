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
import TokenService from './services/token-service'
import SavedLessonPlan from './Savedlessons/SavedLessonPlan/SavedLessonPlan'
import config from './config'

export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    activities: [],
    categories: [],
    users: [],
    savedlessons: [],
    currentUser: [],
    currentPage: 1,
    activitiesPerPage: 5,
    category: '',
    sideDrawOpen: false,
    hasToken: false,
    }}

   
onUserGet = () => {
     const currentUser = JSON.parse(localStorage.getItem('currentUser'))
     this.setState({currentUser})
    }

handleCategoryFilter = (category) =>{
      this.setState({
              category: category,
              currentPage: 1})
    }

 handleClick = (event) => {
      this.setState({ currentPage: event});
    }

checkToken = () =>{
  TokenService.hasAuthToken()
        ? this.setState({hasToken: true})
        : this.setState({hasToken: false})
}

setTokenTrue = () => {
  this.setState({hasToken: true})
}

setTokenFalse =() =>{
  this.setState({hasToken: false})
}
    
componentDidMount() {
  Promise.all([
    fetch (`${config.API_ENDPOINT}/activities`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      },
    }),
    fetch (`${config.API_ENDPOINT}/categories`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      },
    }),
    fetch (`${config.API_ENDPOINT}/users`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      },
    }),
    fetch (`${config.API_ENDPOINT}/savedlessons`, {
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
    .then(this.onUserGet())
    .then(this.checkToken())
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
      hasToken: this.state.hasToken,
      currentUser: this.state.currentUser,
      savedlessons: this.state.savedlessons,
      addActivity: this.handleAddActivity,
      updateActivity: this.handleUpdateActivity,
      addSavedLesson: this.handleAddSavedLesson,
      sidedrawClose: this.sidedrawClose,
      currentPage: this.state.currentPage,
      activitiesPerPage: this.state.activitiesPerPage,
      category: this.state.category,
      handleClick: this.handleClick,
      handleCategoryFilter: this.handleCategoryFilter,
      setTokenTrue: this.setTokenTrue,
      setTokenFalse: this.setTokenFalse,
    }
    console.log(this.state.hasToken)
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
