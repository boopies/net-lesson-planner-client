import React from 'react';
import { getActivityForCategory, findActivity } from '../../ReadActivities/helpers'
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ValidationError from '../../ReadActivities/ValidationError/ValidationError'
import CancelIcon from '@material-ui/icons/Cancel';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';


export class FormPractice extends React.Component {    
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

validatePractice(fieldValue) {
    const { values  } = this.props;
    const practice = values.practice_one_id;
    if (parseInt(practice) === 3) {
      return 'A practice activity is required';
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
                    <h4 id="lesson_practice-phase">
                    Practice Activity One
                    </h4>
                    <div className='Activity-select'>
                        <select
                        required
                        id='lesson_practice_one_id'
                        defaultValue={values.practice_one_id}
                        onChange={handleChange('practice_one_id')}
                        >
                        {this.renderOptions(3)}
                        </select>
                        {this.renderTooltipinfo(values.practice_one_id)}
                        </div>
                        {<ValidationError message={this.validatePractice()}/>}
                    </div>
                    <br />
                    <div className="outlined">
                    <h4 id="lesson_practice-phase">
                    Practice Activity Two
                    </h4>
                    <div className='Activity-select'>
                        <select
                        id='lesson_practice_two_id'
                        defaultValue={values.practice_two_id}
                        onChange={handleChange('practice_two_id')}
                        >
                        {this.renderOptions(3)}
                        </select>
                        {this.renderTooltipinfo(values.practice_two_id)}
                        </div>
                    </div>
                    <br />
                    <div className="outlined">
                    <h4 id="lesson_practice-phase">
                    Practice Activity Three
                    </h4>
                    <div className='Activity-select'>
                        <select
                        id='lesson_practice_three_id'
                        defaultValue={values.practice_three_id}
                        onChange={handleChange('practice_three_id')}
                        >
                        {this.renderOptions(3)}
                        </select>
                        {this.renderTooltipinfo(values.practice_three_id)}
                        </div>
                    </div>
                    <br />
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
                                disabled={this.validatePractice()}
                            >
                            Continue <ChevronRightIcon fontSize="large" />
                            </button>
                    </div>
                    <button 
                        className='button__red'
                        onClick={this.props.cancel}>
                    <CancelIcon fontSize="large" /> Cancel
                    </button>
                    </div>
            </div>
        )
    }
}

export default FormPractice