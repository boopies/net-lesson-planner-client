import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Typography from '@material-ui/core/Typography';
import { getActivityForCategory, findActivity } from '../../ReadActivities/helpers'
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ValidationError from '../../ReadActivities/ValidationError/ValidationError'



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
    const activity = findActivity(activities, actId)

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
                <MuiThemeProvider>
                    <React.Fragment>
                    <FormControl variant="outlined">
                    <Typography id="lesson_practice-phase">
                    Practice Activity One
                    </Typography>
                    <div className='Activity-select'>
                        <NativeSelect
                        required
                        id='lesson_practice_one_id'
                        value={values.practice_one_id}
                        onChange={handleChange('practice_one_id')}
                        >
                        {this.renderOptions(3)}
                        </NativeSelect>
                        {this.renderTooltipinfo(values.practice_one_id)}
                        </div>
                        {<ValidationError message={this.validatePractice()}/>}
                    </FormControl>
                    <br />
                    <FormControl variant="outlined">
                    <Typography id="lesson_practice-phase">
                    Practice Activity Two
                    </Typography>
                    <div className='Activity-select'>
                        <NativeSelect
                        id='lesson_practice_two_id'
                        value={values.practice_two_id}
                        onChange={handleChange('practice_two_id')}
                        >
                        {this.renderOptions(3)}
                        </NativeSelect>
                        {this.renderTooltipinfo(values.practice_two_id)}
                        </div>
                    </FormControl>
                    <br />
                    <FormControl variant="outlined">
                    <Typography id="lesson_practice-phase">
                    Practice Activity Three
                    </Typography>
                    <div className='Activity-select'>
                        <NativeSelect
                        id='lesson_practice_three_id'
                        value={values.practice_three_id}
                        onChange={handleChange('practice_three_id')}
                        >
                        {this.renderOptions(3)}
                        </NativeSelect>
                        {this.renderTooltipinfo(values.practice_three_id)}
                        </div>
                    </FormControl>
                    <br />
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
                                disabled={this.validatePractice()}
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
                </MuiThemeProvider>
            </div>
        )
    }
}

export default FormPractice