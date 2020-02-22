import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Typography from '@material-ui/core/Typography';
import { getActivityForCategory, findActivity } from '../../ReadActivities/helpers'
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';


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
                    <Typography id="lesson_presentation-phase">
                       Presentation Activity One
                    </Typography>
                        <NativeSelect
                        id='lesson_presentation_one_id'
                        value={values.presentation_one_id}
                        onChange={handleChange('presentation_one_id')}
                        >
                        {this.renderOptions(2)}
                        </NativeSelect>
                        {this.renderTooltipinfo(values.presentation_one_id)}
                    </FormControl>
                    <br />
                    <FormControl variant="outlined">
                    <Typography id="lesson_presentation-phase">
                        Presentation Activity Two
                    </Typography>
                        <NativeSelect
                        id='lesson_presentation_two_id'
                        value={values.presentation_two_id}
                        onChange={handleChange('presentation_two_id')}
                        >
                        {this.renderOptions(2)}
                        </NativeSelect>
                        {this.renderTooltipinfo(values.presentation_two_id)}
                    </FormControl>
                    <br />
                    <Button                         
                        variant="outlined" 
                        color="secondary"
                        label='Back'
                        onClick={this.back}
                    >
                    Back
                    </Button>
                    <Button 
                        variant="outlined" 
                        color="primary"
                        label='Continue'
                        onClick={this.continue}
                    >
                    Continue
                    </Button>
                    <Button 
                        variant="outlined" 
                        type='reset' 
                        onClick={this.props.cancel}>
                    Cancel
                    </Button>
                    </React.Fragment>
                </MuiThemeProvider>
            </div>
        )
    }
}

export default FormPresentation