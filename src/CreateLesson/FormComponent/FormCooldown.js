import React from 'react';
import { getActivityForCategory, findActivity } from '../../ReadActivities/helpers'
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CancelIcon from '@material-ui/icons/Cancel';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

export default class FormCooldown extends React.Component {    
continue = e => {
    e.preventDefault();
    this.props.nextStep();
};

back = e => {
    e.preventDefault();
    this.props.prevStep();
};

renderOptions(catId){
    const { activities } = this.props;
    const activityForCategory = getActivityForCategory(activities, catId);
    return(
        <>
        {activityForCategory.map(activity =>
        <option 
            key={activity.id} 
              value={activity.id}>
            {activity.title}
        </option>
        )}   
        </>
    )
};

renderTooltipinfo(actId){
    const {activities} = this.props;
    const activity = findActivity(activities, actId) || { content: '' };

 return(
      <>
      <Tooltip title={activity.content.split(/\\n \\r|\\n|\n|\\n \\r/).map((para, i) =>
          <p className="tooltips" key={i}>{para}</p>
        )}>
        <IconButton aria-label="check">
          <InfoIcon  />
        </IconButton>
      </Tooltip>
      </>)
  };

    render() {
        const { values, handleChange } = this.props;
        return (
            <div>
                    <div className="outlined">
                    <h4 id="lesson_product-phase">
                    Cooldown Activity
                    </h4>
                    <div className='Activity-select'>
                        <select
                        required
                        id='lesson_cooldown_id'
                        defaultValue={values.cooldown_id}
                        onChange={handleChange('cooldown_id')}
                        >
                        {this.renderOptions(5)}
                        </select>
                        {this.renderTooltipinfo(values.cooldown_id)}
                        </div>
                    </div>
                    <br />
                    <div
                        className='All_buttons'>
                        <div className='create-create-buttons'>
                            <button 
                                type='button'                         
                                className='button__red' 
                                onClick={this.back}
                            >
                            <ChevronLeftIcon fontSize="large" /> Back
                            </button>
                            <button
                                type='button'  
                                className='button__blue'
                                onClick={this.continue}
                            >
                            Continue <ChevronRightIcon fontSize="large" />
                            </button>
                    </div>
                    <button
                    type='button'   
                        className='button__red'
                        onClick={this.props.cancel}>
                    <CancelIcon fontSize="large" />Cancel
                    </button>
                    </div>
            </div>
        )
    };
}