import React from 'react';
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography';
import ValidationError from '../../ReadActivities/ValidationError/ValidationError'

export class FormLessonTGOM extends React.Component {

    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    validateTopic(fieldValue) {
        const { values  } = this.props;
        const topic = values.topic;
        if (topic.length === 0) {
          return 'Topic is required.';
        } else if (topic.length < 5) {
          return <div id="ANErrorMessage">Topic mus be at least 5 characters long.</div>;
        }
      }

      validateGoal(fieldValue) {
        const { values  } = this.props;
        const goal = values.goal;
        if (goal.length === 29) {
          return 'Compete the goal sentence, please do not delete anything that is written.'
        } else if (goal.length < 32) {
          return <div id="ANErrorMessage">Add more to this sentence</div>;
        }
      }

      validateObjective(fieldValue) {
        const { values  } = this.props;
        const objective = values.objective_one;
        if (objective.length === 0) {
          return 'One objective is required.';
        } else if (objective.length < 5) {
          return <div id="ANErrorMessage">Add add one Objective</div>;
        }
      }

    render() {
        const { values, handleChange } = this.props;
        return (
            <div>
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
                    {<ValidationError message={this.validateTopic()}/>}
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
                    {<ValidationError message={this.validateGoal()}/>}
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
                        label="Required"
                        placeholder='Say what they want.'
                        helperText="Answer this question. What should the students be able to do?"
                        variant="outlined"
                    />
                    {<ValidationError message={this.validateObjective()}/>}
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

export default FormLessonTGOM

/* disabled={this.validateTopic()||
                                    this.validateGoal()||
                                    this.validateObjective()} */