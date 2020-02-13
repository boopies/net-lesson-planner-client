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

  handleClick(event) {
    this.setState({
      currentPage: Number(event)
    });
  }

  renderFilterButtons(){
    const {categories =[]} = this.context
    return(
       <> <h4>filter activities</h4>
          <label 
            htmlFor="filter_uploaded"
            key="all_activities">
             <input 
              type="radio" 
              value="" 
              id="filter_activities" 
              name="filter" 
              onChange = {e => this.context.handleCategoryFilter(e.target.value)}
               />
               All Categories
           </label>
       {categories.map(category =>
         <label htmlFor="filter_uploaded"
           key={category.title}>
             <input 
               type="radio" 
               value={category.id} 
               id="filter_uploaded" 
               name="filter" 
               onChange = {e => this.context.handleCategoryFilter(e.target.value)}
               />
           {category.title}
           </label>
       )}
       </>
    )
  }
 
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
                <div className="read-activity">
                    <header className="read-activity__header">
                        <h1 className="read-activity__heading">
                            Read About The Activities
                        </h1>
                    </header>
                    <main className="read-activity__main">
                      <div className="read-activity__activities">
                      <h2>Activities</h2>
                      <div>
                        {this.renderFilterButtons()}
                      </div>
                      <div>{this.renderMainRoutes()}</div>
                      </div>
                    </main>
                </div>
        );
    }
}