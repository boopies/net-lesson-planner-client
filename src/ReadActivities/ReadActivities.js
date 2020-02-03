import React from 'react'
import {Route, Link} from 'react-router-dom';
import ActivityListNav from './ActivityListNav/ActivityListNav'
import ActivityPageNav from './ActivityPageNav/ActivityPageNav'
import ActivityListMain from './ActivityListMain/ActivityListMain'
import ActivityPageMain from './ActivityPageMain/ActivityPageMain'
import AddActivity from './AddActivity/AddActivity'
import EditActivity from './EditActivity/EditActivity'
import ApiContext from '../ApiContext'

export default class ReadActivities extends React.Component{

   static contextType = ApiContext;

   renderNavRoutes() {
    return (
      <>
        {['/read', '/read/category/:categoryId'].map(path =>
          <Route
            exact
            key={path}
            path={path}
            component={ActivityListNav}
          />
        )}
        <Route
          path='/read/activity/:activityId'
          component={ActivityPageNav}
        />
        <Route
          path='/read/add-activity'
          component={ActivityPageNav}
        />
        <Route
          path='/read/edit-activity/:activityId'
          component={ActivityPageNav}
        />
      </>
    )
  }

    renderMainRoutes() {
        return (
          <>
            {['/read', '/read/category/:categoryId'].map(path =>
              <Route
                exact
                key={path}
                path={path}
                component={ActivityListMain}
              />
            )}
            <Route
              path='/read/activity/:activityId'
              component={ActivityPageMain}
            />   
            <Route
              path='/read/add-activity'
              component={AddActivity}
            />
            <Route
              path='/read/edit-activity/:activityId'
              component={EditActivity}
            />
          </>
        )
      }

    render() {
        
        return (
                <div className="App">
                    <header className="App__header">
                        <h1>
                            <Link to="/read">Activities</Link>{' '}
                        </h1>
                    </header>
                    <main className="App__main">
                    {this.renderNavRoutes()}
                    
                    {this.renderMainRoutes()}
                    </main>
                </div>
        );
    }
}