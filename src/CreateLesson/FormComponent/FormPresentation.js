import React from 'react';
import { getActivityForCategory, findActivity } from '../../ReadActivities/helpers'
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ValidationError from '../../ReadActivities/ValidationError/ValidationError'
import CancelIcon from '@material-ui/icons/Cancel';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

export class FormPresentation extends React.Component {    
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

validatePresentation(fieldValue) {
    const { values  } = this.props;
    const presentation = values.presentation_one_id;
    if (parseInt(presentation) === 2) {
      return 'A Presentation Activity is required';
    }
  }

renderTooltipinfo(actId){
    const {activities} = this.props
    const activity = findActivity(activities, actId) || {content: ' '}

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
  }

    render() {
        const { values, handleChange } = this.props;
        return (
            <div>
                    <div className="outlined">
                    <h4 id="lesson_presentation-phase">
                       Presentation Activity One
                    </h4>
                        <div className='Activity-select'>
                        <select
                        id='lesson_presentation_one_id'
                        defaultValue={values.presentation_one_id}
                        onChange={handleChange('presentation_one_id')}
                        >
                        {this.renderOptions(2)}
                        </select>
                        {this.renderTooltipinfo(values.presentation_one_id)}
                        </div>
                        {<ValidationError message={this.validatePresentation()}/>}
                    </div>
                    <br />
                    <div className="outlined">
                    <h4 id="lesson_presentation-phase">
                        Presentation Activity Two
                    </h4>
                        <div className='Activity-select'>
                        <select
                        id='lesson_presentation_two_id'
                        defaultValue={values.presentation_two_id}
                        onChange={handleChange('presentation_two_id')}
                        >
                        {this.renderOptions(2)}
                        </select>
                        {this.renderTooltipinfo(values.presentation_two_id)}
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
                            <ChevronLeftIcon /> Back
                            </button>
                            <button
                            type='button'
                                className='button__blue'
                                onClick={this.continue}
                                disabled={this.validatePresentation()}
                            >
                            Continue <ChevronRightIcon fontSize="large"  />
                            </button>
                    </div>
                    <button 
                        className='button__red'
                        type='button' 
                        onClick={this.props.cancel}>
                    <CancelIcon fontSize="large" /> Cancel
                    </button>
                    </div>
            </div>
        )
    }
}

export default FormPresentation