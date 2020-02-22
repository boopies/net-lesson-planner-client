import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography';

export class FormReflection extends React.Component {

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

export default FormReflection
