import React from 'react';
import ActivityItem from '../ActivityItem/ActivityItem';
import { Link } from 'react-router-dom';
import ApiContext from '../../ApiContext';
import { getActivityForCategory, removedBlankActivities } from '../helpers';
import './ActivityList.css';
import NoteAddIcon from '@material-ui/icons/NoteAdd';

export default class ActivityList extends React.Component {
  constructor() {
    super();
    this.state = {
                  filterCategory: ''
    };
    this.handleClick = this.handleClick.bind(this);
  };

  static defaultProps = {
    match: {
      params: {}
    }
  };

  static contextType = ApiContext

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  };

  handleFilter(filter){
    this.setState({
      filterCategory: filter})
  };

  handleAddActivitiesForm= () => {
    this.props.history.push('/read/add-activity')
  };

  renderSelectionCategory(){
    const { filterCategory } = this.state;
    switch(parseInt(filterCategory)){
    default:
        return (<h2 className='read-activity__activities_h2'>
        All Activities</h2>);
    case 1:
        return(
        <h2 className='read-activity__activities_h2'>
        Warmup Activities</h2>
        );
    case 2: 
        return(
            <h2 className='read-activity__activities_h2'>
            Presentation Activities</h2>);  
    case 3:
        return(
            <h2 className='read-activity__activities_h2'>
            Practice Activities</h2>);  
    case 4:
        return(
          <h2 className='read-activity__activities_h2'>
          Production Activities</h2>); 
    case 5:
        return(
          <h2 className='read-activity__activities_h2'>
          Cooldown Activities</h2>);  
  }
  };

  renderFilterButtons(){
    const {categories =[]} = this.context;
    return(
       <div className='activitlist_filters__all'>
          <label 
            htmlFor="filter_activities"
            className='activitlist_filters_options'
            key="all_activities">
             <input 
              type="radio" 
              value=""
              className='all-radio option-input radio'
              id="filter_activities" 
              name="filter" 
              onChange = {e => {this.context.handleCategoryFilter(e.target.value);
                                this.handleFilter(e.target.value)}}
               />
           </label>
       {categories.map((category, i)=>
         <label 
          htmlFor="filter_activities"
            className='activitlist_filters_options'
           key={category.title}>
             <input 
               type="radio" 
               className={category.title + ' option-input radio'}
               value={category.id} 
               id="filter_uploaded"
               name="filter" 
               onChange = {e => {this.context.handleCategoryFilter(e.target.value);
                                this.handleFilter(e.target.value)}}
               />
           </label>
       )}
       </div>
    )
  };

 renderActivities(){
  const {activities = [], category, currentPage, activitiesPerPage} = this.context;
  const removedBlank = removedBlankActivities(activities);
  const activityForCategory = getActivityForCategory(removedBlank, category);
  const indexOfLastActivity = currentPage * activitiesPerPage;
  const indexOfFirstActivity = indexOfLastActivity - activitiesPerPage;
  const currentActivities = activityForCategory.slice(indexOfFirstActivity, indexOfLastActivity);

  return(
    <>{currentActivities.map(activity => {
      return activity.id > 10 ?
      <li key={activity.title}>
        <ActivityItem
          id={activity.id}
          title={activity.title}
          duration={activity.duration}
          grouping={activity.grouping}
          authorId={activity.user_id}
          categoryId={activity.category_id}
          readme={true}
        />
      </li>
    :
        <li key={activity.title}>
        <div className={'act' + activity.category_id + ' activity__card blank__card'}>
        <h2 className='activity-card__title'>{activity.title}
        </h2>
        <p className='activity-card__body'>This is a blank activity for you to write in yourself
        if you have an activity not on the list.</p></div></li>

        })
      }
    </>)
  };

  renderPageNumbers(){
    const {activities = [], category='', activitiesPerPage } = this.context;
    const removedBlank = removedBlankActivities(activities)
    const activityForCategory = getActivityForCategory(removedBlank, category); 
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(activityForCategory.length / activitiesPerPage); i++) {
      pageNumbers.push(i);
    }
    const current = parseInt(this.context.currentPage)
    return (
      <>
      {pageNumbers.map(number => {
        return (
      <li
        key= {number}
        id={number}
        value={number}
        className={current === number? 'page-numbers active' : 'page-numbers'}
        onClick={e => this.context.handleClick(e.target.value)}
      >
        {number}
      </li>)
    })}
  </>
  );
}


  renderAddActivity(){
    return(
      <button
          tag={Link}
          to='/read/add-activity'
          type='button'
          className='button__green'
          onClick={() => this.handleAddActivitiesForm()} >
        <NoteAddIcon /> Add Activity
    </button>
    )
  }

  render() {
    return (
      <section className='activity-list'>
                {this.renderSelectionCategory()}
            <div className='acivities__filter-buttons'>
              <div className='acivities__filter-title'>Filter</div>
              {this.renderFilterButtons()}
            </div>
            <ul id="activities__list">
              {this.renderActivities()}
            </ul>
            <ul id="page-numbers">
              {this.renderPageNumbers()}
            </ul>
          <div className='activity-list__button'>
            <p>Share your activities.</p>
            {this.renderAddActivity()}
        </div>
      </section>
    )
  }
}