import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography';

export class FormLessonTGOM extends React.Component {

    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    render() {
        const { values, handleChange } = this.props;
        return (
            <div>
            <MuiThemeProvider>
                <React.Fragment>
                    <Typography id="lesson_class-size">
                        Lesson Topic
                    </Typography>
                    <TextField 
                        id="lesson_topic"
                        defaultValue={values.topic}
                        onChange={handleChange('topic')}
                        margin="normal"
                        helperText="What is the topic of the lesson?"
                        placeholder='I want ~.'
                        variant="outlined"
                    />
                    <br />
                    <Typography id="lesson_class-size">
                        Lesson Goals
                    </Typography>
                    <TextField 
                        id="lesson_topic"
                        defaultValue={values.goal}
                        onChange={handleChange('goal')}
                        margin="normal"
                        helperText="Finish the sentence"
                        multiline
                        rows="3"
                        variant="outlined"
                    />
                    <br />
                    <Typography id="lesson_class-size">
                        Lesson Objectives One
                    </Typography>
                    <TextField 
                        id="lesson_objective_one"
                        defaultValue={values.objective_one}
                        onChange={handleChange('objective_one')}
                        margin="normal"
                        required
                        placeholder='Say what they want.'
                        helperText="What should the students be able to do?"
                        variant="outlined"
                    />
                    <br />
                    <Typography id="lesson_class-size">
                    Lesson Objectives Two
                    </Typography>
                    <TextField 
                        id="lesson_objective_two"
                        defaultValue={values.objective_two}
                        onChange={handleChange('objective_two')}
                        margin="normal"
                        placeholder='Know what an item is.'
                        variant="outlined"
                    />
                    <br />
                    <Typography id="lesson_class-size">
                    Lesson Objectives Three
                    </Typography>
                    <TextField 
                        id="lesson_three"
                        defaultValue={values.objective_three}
                        onChange={handleChange('objective_three')}
                        margin="normal"
                        placeholder='Talk to freely to the teacher and other students.'
                        variant="outlined"
                    />
                    <br />
                    <Typography id="lesson_class-size">
                    Lesson Objectives Materials
                    </Typography>
                    <TextField 
                        id="lesson_materials"
                        defaultValue={values.materials}
                        onChange={handleChange('materials')}
                        margin="normal"
                        multiline
                        rows="4"
                        placeholder='Textbook, Flashcards'
                        helperText="List all materials needed. Use a comma and space to seperate items."
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

export default FormLessonTGOM
