import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Typography from '@material-ui/core/Typography';
import { getActivityForCategory, findActivity } from '../../ReadActivities/helpers'
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ValidationError from '../../ReadActivities/ValidationError/ValidationError'


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
                    <React.Fragment>
                    <FormControl variant="outlined">
                    <Typography id="lesson_warmup-phase">
                       Warmup Activity
                    </Typography>
                        <div className='Activity-select'>
                        <NativeSelect
                        id='lesson_warmup_id'
                        value={values.warmup_id}
                        onChange={handleChange('warmup_id')}
                        >
                        {this.renderOptions(1)}
                        </NativeSelect>
                        {this.renderTooltipinfo(values.warmup_id)}
                        </div>
                        {<ValidationError message={this.validateWarmup()}/>}
                    </FormControl>
                    <div
                        className='All_buttons'>
                        <div className='create-create-buttons'>
                            <button                        
                                className='savedlesson__delete-activity-button' 
                                variant="outlined" 
                                color="secondary"
                                label='Back'
                                onClick={this.back}
                            >
                            Back
                            </button>
                            <button
                                className='ActivityPage__edit-button'
                                variant="outlined" 
                                color="primary"
                                label='Continue'
                                onClick={this.continue}
                                disabled={this.validateWarmup()}
                            >
                            Continue
                            </button>
                    </div>
                    <button 
                        className='savedlesson__go-back'
                        variant="outlined" 
                        type='reset' 
                        onClick={this.props.cancel}>
                    Cancel
                    </button>
                    </div>
                    </React.Fragment>
            </div>
        )
    }
}

export default FormWarmup