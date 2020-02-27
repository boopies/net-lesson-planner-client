import React from 'react';
import ValidationError from '../../ReadActivities/ValidationError/ValidationError'
import CancelIcon from '@material-ui/icons/Cancel';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';


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
                <div className='outlined'>
                    <h4 id="lesson_lesson-reflection">
                        Lesson Reflection One
                    </h4>
                    <input 
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
                </div>
                <div className="outlined">
                    <br />
                    <h4 id="lesson_lesson-reflection">
                    Lesson Reflection Two
                    </h4>
                    <input 
                        id="lesson_reflection_two"
                        defaultValue={values.reflection_two}
                        onChange={handleChange('reflection_two')}
                        margin="normal"
                        placeholder='Did the students have fun?'
                        variant="outlined"
                    />
                </div>
                <div className="outlined">
                    <br />
                    <h4 id="lesson_lesson-reflection">
                    Lesson Reflection Three
                    </h4>
                    <input 
                        id="lesson_reflection_three"
                        defaultValue={values.reflection_three}
                        onChange={handleChange('reflection_three')}
                        margin="normal"
                        placeholder='What can I do to make the class work better?'
                        variant="outlined"
                    />
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
                                disabled={this.validateReflection()}
                            >
                            Continue <ChevronRightIcon />
                            </button>
                    </div>
                    <button 
                        className='button__red'
                        type='button' 
                        onClick={this.props.cancel}>
                    <CancelIcon /> Cancel
                    </button>
                    </div>
            </div>
        )
    }
}

export default FormReflection
