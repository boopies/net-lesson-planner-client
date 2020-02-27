import React from 'react';
import { getActivityForCategory, findActivity } from '../../ReadActivities/helpers'
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ValidationError from '../../ReadActivities/ValidationError/ValidationError'
import CancelIcon from '@material-ui/icons/Cancel';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';


export class FormWarmup extends React.Component {    
continue = e => {
    e.preventDefault();
    this.props.nextStep();
}

back = e => {
    e.preventDefault();
    this.props.prevStep();
}

reset = e => {
    e.preventDefault();
    this.props.resetForm();
}

renderOptions(catId){
    const { activities } = this.props
    const activityForCategory = getActivityForCategory(activities, catId)
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
}

renderTooltipinfo(actId){
    const {activities} = this.props
    const activity = findActivity(activities, actId)

 return(
      <>
      <Tooltip className='tooltip' title={activity.content.split(/\\n \\r|\\n|\n|\\n \\r/).map((para, i) =>
          <p className="tooltips" key={i}>{para}</p>
        )}>
        <IconButton aria-label="check">
          <InfoIcon  />
        </IconButton>
      </Tooltip>
      </>)
  }


  validateWarmup(fieldValue) {
    const { values  } = this.props;
    const warmup = values.warmup_id;
    if (parseInt(warmup) === 1) {
      return 'Warmup Activity is Required';
    }
  }

    render() {
        const { values, handleChange } = this.props;
        return (
            <div>
                <div className="outlined">
                    <h4 id="lesson_warmup-phase">
                       Warmup Activity
                    </h4>
                        <div className='Activity-select'>
                        <select
                        id='lesson_warmup_id'
                        value={values.warmup_id}
                        onChange={handleChange('warmup_id')}
                        >
                        {this.renderOptions(1)}
                        </select>
                        {this.renderTooltipinfo(values.warmup_id)}
                        </div>
                        {<ValidationError message={this.validateWarmup()}/>}
                </div>
                    <div
                        className='All_buttons'>
                        <div className='create-create-buttons'>
                            <button                        
                                className='button__red' 
                                type='button'  
                                onClick={this.back}
                            >
                            <ChevronLeftIcon /> Back
                            </button>
                            <button
                                className='button__blue'
                                type='button'  
                                onClick={this.continue}
                                disabled={this.validateWarmup()}
                            >
                            Continue <ChevronRightIcon />
                            </button>
                    </div>
                    <button 
                        className='button__red'
                        type='button'  
                        onClick={this.props.cancel}>
                    <CancelIcon />Cancel
                    </button>
                    </div>
            </div>
        )
    }
}

export default FormWarmup