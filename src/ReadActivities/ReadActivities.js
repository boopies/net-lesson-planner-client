import React from 'react'
import {Route} from 'react-router-dom';
import ActivityListNav from './ActivityListNav/ActivityListNav'
import ActivityPageNav from './ActivityPageNav/ActivityPageNav'
import ActivityListMain from './ActivityListMain/ActivityListMain'
import ActivityPageMain from './ActivityPageMain/ActivityPageMain'
import AddActivity from './AddActivity/AddActivity'
import EditActivity from './EditActivity/EditActivity'
import './ReadActivities.css'
import PrivateRoute from '../Utilities/PrivateRoute'

export default class ReadActivities extends React.Component{

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
            <PrivateRoute
              path='/read/add-activity'
              component={AddActivity}
            />
            <PrivateRoute
              path='/read/edit-activity/:activityId'
              component={EditActivity}
            />
          </>
        )
      }

    render() {
        
        return (
                <div className="read-activity">
                    <header className="read-activity__header">
                        <h1 className="read-activity__heading">
                            Read About The Activities
                        </h1>
                    </header>
                    <main className="read-activity__main">
                      <div className="read-activity__categories">
                        <h2>Categories</h2>
                      {this.renderNavRoutes()}
                      </div>
                      <div className="read-activity__activities">
                      <h2>Activities</h2>
                      {this.renderMainRoutes()}
                      </div>
                    </main>
                </div>
        );
    }
}