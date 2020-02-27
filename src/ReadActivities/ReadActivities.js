import React from 'react'
import {Route} from 'react-router-dom';
import ActivityList from './ActivityList/ActivityList'
import ActivityPage from './ActivityPage/ActivityPage'
import AddActivity from './AddActivity/AddActivity'
import EditActivity from './EditActivity/EditActivity'
import './ReadActivities.css'
import PrivateRoute from '../Utilities/PrivateRoute'
import ApiContext from '../ApiContext'

export default class ReadActivities extends React.Component{
  static defaultProps = {
    match: {
      params: {}
    }
  }

  static contextType = ApiContext
 
    renderMainRoutes() {
        return (
          <>
            <Route
                exact
                path='/read'
                component={ActivityList}
              />
            <Route
              path='/read/activity/:activityId'
              component={ActivityPage}
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
                <>
                    <header className="read-activity__header">
                        <h1 className="read-activity__heading">
                            Read the Activities
                        </h1>
                    </header>
                    <main className="read-activity__main">
                      <div className="read-activity__activities">
                          <div>{this.renderMainRoutes()}</div>
                        </div>
                    </main>
                </>
        );
    }
}