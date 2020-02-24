import React from 'react'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import { findActivity } from '../../ReadActivities/helpers'

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
            <MuiThemeProvider>
                <React.Fragment>
                        <List className='create-confirmation'>
                            <ListItem>
                                <ListItemText
                                    primary='Lesson Title'
                                    secondary={values.title}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary='Date'
                                    secondary={values.date}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary='Day'
                                    secondary={values.day}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary='Duration'
                                    secondary={values.duration}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary='Year Level'
                                    secondary={values.classlevel}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary='Period'
                                    secondary={values.period}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary='Topic'
                                    secondary={values.topic}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary='Goals'
                                    secondary={values.goal}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary='Objective One'
                                    secondary={values.objective_one}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary='Objective Two'
                                    secondary={values.objective_two}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary='Objective Three'
                                    secondary={values.objective_three}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary='Materials'
                                    secondary={values.materials}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary='Warmup Activity'
                                    secondary={this.renderActivityName(values.warmup_id)}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary='Presentation Activity One'
                                    secondary={this.renderActivityName(values.presentation_one_id)}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary='Presentation Activity Two'
                                    secondary={this.renderActivityName(values.presentation_two_id)}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary='Practice Activity One'
                                    secondary={this.renderActivityName(values.practice_one_id)}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary='Practice Activity Two'
                                    secondary={this.renderActivityName(values.practice_two_id)}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary='Practice Activity Three'
                                    secondary={this.renderActivityName(values.practice_three_id)}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary='Production Activity One'
                                    secondary={this.renderActivityName(values.product_one_id)}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary='Production Activity Two'
                                    secondary={this.renderActivityName(values.product_two_id)}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary='CooldownActivity'
                                    secondary={this.renderActivityName(values.cooldown_id)}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary='Reflection One'
                                    secondary={values.reflection_one}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary='Reflection Two'
                                    secondary={values.reflection_two}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary='Reflection Three'
                                    secondary={values.reflection_three}
                                />
                            </ListItem>
                        </List>
                    <div>
                        <button 
                            label='Back'
                            onClick={this.props.beginning}
                        >
                        Back
                        </button>
                        <button
                            type='submit'>
                        Confirm
                        </button>
                    </div>
                </React.Fragment>
            </MuiThemeProvider> 
            </form>               
            </div>
        )
    }
}
