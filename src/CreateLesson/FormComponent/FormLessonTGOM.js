import React from 'react';
import ValidationError from '../../ReadActivities/ValidationError/ValidationError';
import '../CreateLesson.css';
import CancelIcon from '@material-ui/icons/Cancel';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

export default class FormLessonTGOM extends React.Component {

    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };

    validateTopic(fieldValue) {
        const { values  } = this.props;
        const topic = values.topic;
        if (topic.length === 0) {
          return 'Topic is required.';
        } else if (topic.length < 3) {
          return <div id="ANErrorMessage">Topic mus be at least 3 characters long.</div>;
        }
      };

      validateGoal(fieldValue) {
        const { values  } = this.props;
        const goal = values.goal;
        if (goal.length === 29) {
          return 'Compete the goal sentence, please do not delete anything that is written.'
        } else if (goal.length < 32) {
          return <div id="ANErrorMessage">Add more to this sentence</div>;
        }
      };

      validateObjective(fieldValue) {
        const { values  } = this.props;
        const objective = values.objective_one;
        if (objective.length === 0) {
          return 'One objective is required.';
        } else if (objective.length < 5) {
          return <div id="ANErrorMessage">Add add one Objective</div>;
        }
      };

    render() {
        const { values, handleChange } = this.props;
        return (
            <>  
                <div className="outlined">
                    <h4 id="lesson_class-size">
                        Lesson Topic
                    </h4>
                    <input
                        id="lesson_topic"
                        defaultValue={values.topic}
                        onChange={handleChange('topic')}
                        margin="normal"
                        placeholder='I want ~.'
                    />
                    {<ValidationError message={this.validateTopic()}/>}
                    </div>
                    <br />
                    <div className="outlined">
                    <h4 id="lesson_class-size">
                        Lesson Goals
                    </h4>
                    <textarea
                        id="lesson_topic"
                        defaultValue={values.goal}
                        onChange={handleChange('goal')}
                        rows="3" 
                        />
                    {<ValidationError message={this.validateGoal()}/>}
                    </div>
                    <br />
                    <div className="outlined">
                    <h4 id="lesson_class-size">
                        Lesson Objectives One
                    </h4>
                    <p>Students should be able to ...</p>
                    <input
                        id="lesson_objective_one"
                        defaultValue={values.objective_one}
                        onChange={handleChange('objective_one')}
                        placeholder='Say what they want.'
                    />
                    {<ValidationError message={this.validateObjective()}/>}
                    </div>
                    <br />
                    <div className="outlined">
                    <h4 id="lesson_class-size">
                    Lesson Objectives Two
                    </h4>
                    <input
                        id="lesson_objective_two"
                        defaultValue={values.objective_two}
                        onChange={handleChange('objective_two')}
                        margin="normal"
                        placeholder='Know what an item is.'
                        variant="outlined"
                    />
                    </div>
                    <br />
                    <div className="outlined">
                    <h4 id="lesson_class-size">
                    Lesson Objectives Three
                    </h4>
                    <input
                        id="lesson_three"
                        defaultValue={values.objective_three}
                        onChange={handleChange('objective_three')}
                        margin="normal"
                        placeholder='Talk to freely to the teacher and other students.'
                        variant="outlined"
                    />
                    </div>
                    <br />
                    <div className="outlined">
                        <h4 id="lesson_class-size">
                        Lesson Objectives Materials
                        </h4>
                        <textarea
                            id="lesson_materials"
                            defaultValue={values.materials}
                            onChange={handleChange('materials')}
                            placeholder='Textbook, Flashcards'
                        />
                    </div>
                    <br />
                    <div
                        className='All_buttons'>
                        <div className='create-create-buttons'>
                            <button                        
                                className='button__red create-cre' 
                                type='button'  
                                onClick={this.back}
                            >
                            <ChevronLeftIcon fontSize="large" /> Back
                            </button>
                            <button
                                className='button__blue create-cre'
                                type='button'  
                                onClick={this.continue}
                                disabled={this.validateTopic()||
                                    this.validateGoal()||
                                    this.validateObjective()} 
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
            </>
        )
    };
}