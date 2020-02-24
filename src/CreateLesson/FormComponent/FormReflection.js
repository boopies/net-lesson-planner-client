import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography';
import ValidationError from '../../ReadActivities/ValidationError/ValidationError'


export class FormReflection extends React.Component {

    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }


    validateReflection(fieldValue) {
        const { values  } = this.props;
        const reflection = values.reflection_one;
        if (reflection.length === 0) {
          return 'One reflection question is required.';
        } else if (reflection.length < 5) {
          return <div id="ANErrorMessage">reflection question should be longer than 5 characters.</div>;
        }
      }

    render() {
        const { values, handleChange } = this.props;
        return (
            <div>
                 <MuiThemeProvider>
                <React.Fragment>
                    <Typography id="lesson_lesson-reflection">
                        Lesson Reflection One
                    </Typography>
                    <TextField 
                        id="lesson_reflection_one"
                        defaultValue={values.reflection_one}
                        onChange={handleChange('reflection_one')}
                        margin="normal"
                        required
                        placeholder='Did the students achieve the goals?'
                        helperText="Some reflection questions to ask yourself"
                        variant="outlined"
                    />
                    {<ValidationError message={this.validateReflection()}/>}
                    <br />
                    <Typography id="lesson_lesson-reflection">
                    Lesson Reflection Two
                    </Typography>
                    <TextField 
                        id="lesson_reflection_two"
                        defaultValue={values.reflection_two}
                        onChange={handleChange('reflection_two')}
                        margin="normal"
                        placeholder='Did the students have fun?'
                        variant="outlined"
                    />
                    <br />
                    <Typography id="lesson_lesson-reflection">
                    Lesson Reflection Three
                    </Typography>
                    <TextField 
                        id="lesson_reflection_three"
                        defaultValue={values.reflection_three}
                        onChange={handleChange('reflection_three')}
                        margin="normal"
                        placeholder='What can I do to make the class work better?'
                        variant="outlined"
                    />
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
                                disabled={this.validateReflection()}
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

export default FormReflection
