import React from 'react'
import { findActivity } from '../../ReadActivities/helpers'
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';
import PublishIcon from '@material-ui/icons/Publish';

export default  class FormConfirmation extends React.Component {
    static defaultProps = {
        history: {
          push: () => { }
        },
      }

    renderActivityName(actId){
        const { activities } = this.props
        const activity = findActivity(activities, actId)
        return(
            <>
                {activity.title}
            </>
        )
    }

    render() {
        const { values } = this.props;
        return (
            <div>
            <form className='create-lesson' id="create-lesson-form-confirm"
                onSubmit={this.props.handleSubmitForm}>
                        <ul className='create-confirmation'>
                            <li>
                                    <h4>Lesson Title</h4>
                                    <p>{values.title}</p>
                            </li>
                            <li>
                                    <h4>Date</h4>
                                    <p>{values.date}</p>
                            </li>
                            <li>
                                    <h4>Day</h4>
                                    <p>{values.day}</p>
                            </li>
                            <li>
                                    <h4>Duration</h4>
                                    <p>{values.duration}</p>
                            </li>
                            <li>
                                    <h4>Year Level</h4>
                                    <p>{values.classlevel}</p>
                            </li>
                            <li>
                                    <h4>Period</h4>
                                    <p>{values.period}</p>
                            </li>
                            <li>
                                    <h4>Topic</h4>
                                    <p>{values.topic}</p>
                            </li>
                            <li>
                                    <h4>Goals</h4>
                                    <p>{values.goal}</p>
                            </li>
                            <li>
                                    <h4>Objective One</h4>
                                    <p>{values.objective_one}</p>
                            </li>
                            <li>
                                    <h4>Objective Two</h4>
                                    <p>{values.objective_two}</p>
                            </li>
                            <li>
                                    <h4>Objective Three</h4>
                                    <p>{values.objective_three}</p>
                            </li>
                            <li>
                                    <h4>Materials</h4>
                                    <p>{values.materials}</p>
                            </li>
                            <li>
                                    <h4>Warmup Activity</h4>
                                    <p>{this.renderActivityName(values.warmup_id)}</p>
                            </li>
                            <li>
                                    <h4>Presentation Activity One</h4>
                                    <p>{this.renderActivityName(values.presentation_one_id)}</p>
                            </li>
                            <li>
                                    <h4>Presentation Activity Two</h4>
                                    <p>{this.renderActivityName(values.presentation_two_id)}</p>
                            </li>
                            <li>
                                    <h4>Practice Activity One</h4>
                                    <p>{this.renderActivityName(values.practice_one_id)}</p>
                            </li>
                            <li>
                                    <h4>Practice Activity Two</h4>
                                    <p>{this.renderActivityName(values.practice_two_id)}</p>
                            </li>
                            <li>
                                    <h4>Practice Activity Three</h4>
                                    <p>{this.renderActivityName(values.practice_three_id)}</p>
                            </li>
                            <li>
                                    <h4>Production Activity One</h4>
                                    <p>{this.renderActivityName(values.product_one_id)}</p>
                            </li>
                            <li>
                                    <h4>Production Activity Two</h4>
                                    <p>{this.renderActivityName(values.product_two_id)}</p>
                            </li>
                            <li>
                                    <h4>CooldownActivity</h4>
                                    <p>{this.renderActivityName(values.cooldown_id)}</p>
                            </li>
                            <li>
                                    <h4>Reflection One</h4>
                                    <p>{values.reflection_one}</p>
                            </li>
                            <li>
                                    <h4>Reflection Two</h4>
                                    <p>{values.reflection_two}</p>
                            </li>
                            <li>
                                    <h4>Reflection Three</h4>
                                    <p>{values.reflection_three}</p>
                            </li>
                        </ul>
                    <div className='All_buttons'>
                        <button 
                            type='button'
                            className='button__yellow'
                            onClick={this.props.beginning}
                        >
                        <SettingsBackupRestoreIcon /> Check once more
                        </button>
                        <button
                            className='button__violet'
                            type='submit'>
                        <PublishIcon /> Confirm
                        </button>
                    </div>
            </form>               
            </div>
        )
    }
}
