import React from 'react';
import ApiContext from '../../ApiContext';
import { getActivityForCategory, findActivity } from '../../ReadActivities/helpers';
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import './EditLesson.css'
import CancelIcon from '@material-ui/icons/Cancel';
import PublishIcon from '@material-ui/icons/Publish';

export default class EditLesson extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            date: '',
            day: '',
            duration: '',
            classlevel: '',
            period: '',
            topic: '',
            goal: 'The goal of the lesson is to ',
            class_size: '',
            objective_one: '',
            objective_two: '',
            objective_three: '',
            materials: '',
            warmup_id: 1,
            presentation_one_id: 2,
            presentation_two_id: 2,
            practice_one_id: 3,
            practice_two_id: 3,
            practice_three_id: 3,
            product_one_id: 4,
            product_two_id: 4,
            cooldown_id: 5,
            reflection_one: '',
            reflection_two: '',
            reflection_three: ''
            };
            this.handleSubmitForm = this.handleSubmitForm.bind(this);
    };
    
      static defaultProps = {
        history: {
          push: () => { }
        },
      };
      
      static contextType = ApiContext;
    
      handleClickCancel = () => {
        this.props.history.goBack();
    };
    
    componentDidMount() {
      const edit = this.props.location.state;
        this.setState({
                  title: edit.title,
                  date: edit.date,
                  day: edit.day,
                  duration: edit.duration,
                  classlevel: edit.classlevel,
                  period: edit.period,
                  topic: edit.topic,
                  goal: edit.goal,
                  class_size: parseInt(edit.class_size),
                  objective_one: edit.objective_one,
                  objective_two: edit.objective_two,
                  objective_three: edit.objective_three,
                  materials: edit.materials,
                  warmup_id: parseInt(edit.warmup_id),
                  presentation_one_id: parseInt(edit.presentation_one_id),
                  presentation_two_id: parseInt(edit.presentation_two_id),
                  practice_one_id: parseInt(edit.practice_one_id),
                  practice_two_id: parseInt(edit.practice_two_id),
                  practice_three_id: parseInt(edit.practice_three_id),
                  product_one_id: parseInt(edit.product_one_id),
                  product_two_id: parseInt(edit.product_two_id),
                  cooldown_id: parseInt(edit.cooldown_id),
                  reflection_one: edit.reflection_one,
                  reflection_two: edit.reflection_two,
                  reflection_three: edit.reflection_three,
        })
    };

    renderTooltipinfo(actId){
      const {activities = []} = this.context;
      const activity = findActivity(activities, actId) || { content: '' };
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
    };

    handleChange = input => e => {
      this.setState({
        [input]: e.target.value
      })
    };

    handleSubmitForm = e => {
        e.preventDefault();
        const state = this.state ;
        this.props.history.push({
            pathname: '/lesson',
            state,
        })
        };

    renderOptions(catId){
        const { activities=[] } = this.context;
        const activityForCategory = getActivityForCategory(activities, catId);
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

    renderDuration(){
        const classLength = [ '20 min',  '30 min', '40 min', 
        '45 min','50 min', '55 min', 
        '60 min', '70 min', '90 min'];
        return(
            <>
            {classLength.map(length =>
            <option key={length} value={length}>{length}</option>)}
            </>
        )
    };

    renderDayofWeek(){
        let weekday = [ 'Monday', 'Tuesday', 'Wednesday',
                    'Thursday', 'Friday', 'Saturday' ];
        return(
            <>
            {weekday.map(week =>
            <option key={week} value={week}>{week}</option>)}
            </>
        )
    };

    renderClassLevel(){
        let classType = [ 'Elementry 1st grade',  'Elementry 2nd Grade', 
        'Elementry 3rd Grade', 'Elementry 4th Grade',
        'Elementry 5th Grade', 'Elementry 6th Grade', 
        'Junior High 1st Year', 'Junior High 2nd Year', 
        'Junior High 3rd Year', 'High 1st Year', 
        'High 2nd Year', 'High 3rd Year'];
        return(
            <>
            {classType.map(classes =>
            <option key={classes} value={classes}>{classes}</option>)}
            </>
        )
    };

    renderClassPeriod(){
        let period = [ 'Period 01', 'Period 02', 'Period 03',
                        'Period 04', 'Period 05', 'Period 06', 
                        'Period 07'];
        return(
            <>
            {period.map(period =>
            <option key={period} value={period}>{period}</option>)}
            </>
        )
    };

    render(){
      const {  title, date, day, duration, classlevel,
               period, topic, goal, class_size,
               objective_one, objective_two, objective_three,
               materials, warmup_id, presentation_one_id,
               presentation_two_id, practice_one_id,
               practice_two_id, practice_three_id, product_one_id,
               product_two_id, cooldown_id, reflection_one,
               reflection_two, reflection_three } = this.state;
        return (
            <div className='edit_lesson-plan'>
            <header className='edit_lesson-plan-title'>
                <h1>Modify Lesson Plan</h1>
            </header>
            <section className='edit_lesson-planbody_editcreate'>
                <form 
                className='edit-created-lesson' 
                id="create-lesson-form-2"
                onSubmit={this.handleSubmitForm}>
                <div className="input--class--title modify__lessonplan">
                    <label htmlFor='title'>Title: </label>
                        <input 
                        id='title'
                        type="text" 
                        value={title}
                        onChange={this.handleChange('title')}
                        required
                        />
                </div>
                <div className="input--class--level modify__lessonplan">
                    <label htmlFor='title'>Grade: </label>
                    <select
                    id="classLevel"
                    onChange={this.handleChange('classlevel')}
                    required 
                    value={classlevel}>
                        <option value=''>Select a year level</option>
                        {this.renderClassLevel()}
                        </select>
                </div>
                <div className="input--class--date modify__lessonplan">
                    <label htmlFor='date'>Date: </label>
                        <input 
                        id='date'
                        type="date" 
                        placeholder="2020/01/01"
                        value={date}
                        onChange={this.handleChange('date')}
                        required
                        />
                </div>

                <div className="input--class--day modify__lessonplan">
                    <label htmlFor='day-of-week'>Day: </label>
                    <select
                    id="day"
                    value={day}
                    onChange={this.handleChange('day')} required>
                        <option value=''>Select a day</option>
                        {this.renderDayofWeek()}
                        </select>
                </div>


                <div className='input--class--period modify__lessonplan'>
                <label htmlFor='class--period'>Period: </label>
                    <select id="period"
                    value={period}
                    onChange={this.handleChange('period')} required>
                        <option value=''>Select a Period</option>
                        {this.renderClassPeriod()}
                    </select>
                </div>

                <div className='input--topic modify__lessonplan'>
                    <label htmlFor='topic'>Topic: </label>
                        <input id='topic'
                        type='text' 
                        placeholder='Topic of lesson' 
                        value={topic}
                        onChange={this.handleChange('topic')}
                        required />
                </div>

                <div className='input--class-size modify__lessonplan'>    
                    <label>Class Size: </label>
                        <input 
                        id='classSize'
                        type='number' 
                        min="1" 
                        max="45" 
                        placeholder="10" 
                        value={class_size}
                        onChange={this.handleChange('class_size')}
                        required />
                </div>

                <div className='input--class-length modify__lessonplan'>
                    <label>Class Length: </label>
                    <select 
                        id="duration"
                        value={duration}
                        onChange={this.handleChange('duration')} required>
                        {this.renderDuration()}
                    </select>
                </div>

                <div className='input--class-goals modify__lessonplan'>
                    <label htmlFor='goal'>Goal: </label>
                        Finish the Sentence
                        <textarea 
                        id='goal' 
                        rows = "3"
                        cols = "60"
                        value={goal}
                        onChange={this.handleChange('goal')}
                        required />
                </div>
                <hr />

                <div className='input--class-objectives modify__lessonplan'>
                        <legend>Objectives</legend>
                        <label>Students should be able to: </label>
                            <input id='objectiveOne'
                            type='text' 
                            placeholder='First Objective'
                            value={objective_one}
                            onChange={this.handleChange('objective_one')}
                            required />
                        <label>Students should be able to: </label>
                            <input id='objectiveTwo'
                            type='text' 
                            placeholder='Second Objective' 
                            value={objective_two}
                            onChange={this.handleChange('objective_two')}
                            />
                        <label>Students should be able to:</label>
                            <input 
                            id='objectiveThree'
                            type='text' 
                            placeholder='Third Objective' 
                            value={objective_three}
                            onChange={this.handleChange('objective_three')}
                            />
                </div>
            <hr />
                <div className='input--class-materials modify__lessonplan'>
                        <legend>Materials</legend>
                        <textarea id = "materials"
                                rows = "10"
                                cols = "60"
                                value={materials}
                                placeholder= "List all materials here. Seperate items by a comma no space." 
                                onChange={this.handleChange('materials')}
                                />
                </div>
                <hr />

                <div className='input--warmup-phase modify__lessonplan'>
                        <legend>Warm-up</legend>
                        <label>Warm-up Activity: </label>
                        <div className='Activity-select'>
                        <select
                        id="warmupactivity"
                        value={warmup_id}
                        onChange={this.handleChange('warmup_id')} required>
                        {this.renderOptions('1')}
                        </select>
                        <div>{this.renderTooltipinfo(this.state.warmup_id)}</div>
                        </div>
                </div>
                <hr />

                <div className='input--presentation-phase modify__lessonplan'>
                        <legend>Presentation</legend>
                        <label>Presentation Activity 01: </label>
                        <div className='Activity-select'>
                        <select
                        id="presentation01"
                        value={presentation_one_id}
                        onChange={this.handleChange('presentation_one_id')} required> 
                            {this.renderOptions('2')}
                        </select>
                        <div>{this.renderTooltipinfo(this.state.presentation_one_id)}</div>
                        </div>
                        <label>Presentation Activity 02: </label>
                        <div className='Activity-select'>
                        <select
                        id="presentation02"
                        value={presentation_two_id}
                        onChange={this.handleChange('presentation_two_id')}>
                        {this.renderOptions('2')}
                        </select>
                        <div>{this.renderTooltipinfo(this.state.presentation_two_id)}</div>   
                        </div>
                </div>
                <hr />
                <div className='input--practice-phase modify__lessonplan'>
                        <legend>Practice</legend>
                        <label>Practice Activity 01: </label>
                        <div className='Activity-select'>
                        <select
                        id="practice01"
                        value={practice_one_id}
                        onChange={this.handleChange('practice_one_id')} required>
                            {this.renderOptions('3')}
                        </select>
                        <div>{this.renderTooltipinfo(this.state.practice_one_id)}</div> 
                        </div>
                        <label>Practice Activity 02:</label>
                        <div className='Activity-select'>
                        <select
                           id="practice02"
                           value={practice_two_id}
                           onChange={this.handleChange('practice_two_id')} >
                            {this.renderOptions('3')}
                        </select>
                        <div>{this.renderTooltipinfo(this.state.practice_two_id)}</div> 
                        </div>
                        <label>Practice Activity 03: </label>
                        <div className='Activity-select'>
                        <select
                            id="practice03"
                            value={practice_three_id}
                            onChange={this.handleChange('practice_three_id')} >                  
                            {this.renderOptions('3')}
                        </select>  
                        <div>{this.renderTooltipinfo(this.state.practice_three_id)}</div> 
                        </div>        
                  </div>
                  <hr />

                  <div className='input--production-phase modify__lessonplan'>
                        <legend>Production</legend>
                        <label>Production Activity 01: </label>
                        <div className='Activity-select'>
                        <select
                            id="production01"
                            value={product_one_id}
                            onChange={this.handleChange('product_one_id')}  required>
                            {this.renderOptions('4')}
                        </select>
                        <div>{this.renderTooltipinfo(this.state.product_one_id)}</div>  
                        </div>
                        <label>Production Activity 02: </label>
                        <div className='Activity-select'>
                        <select
                            id="production02"
                            value={product_two_id}
                            onChange={this.handleChange('product_two_id')}>
                            {this.renderOptions('4')}
                        </select>
                        <div>{this.renderTooltipinfo(this.state.product_two_id)}</div>  
                        </div>                    
                  </div>
                  <hr />

                  <div className='input--cooldown-phase modify__lessonplan'>
                        <legend>Cool Down</legend>
                        <label>Cool Down Activity 01: </label>
                        <div className='Activity-select'>
                        <select
                        id="cooldown"
                        value={cooldown_id}
                        onChange={this.handleChange('cooldown_id')}>
                            {this.renderOptions('5')}
                        </select> 
                        <div>{this.renderTooltipinfo(this.state.cooldown_id)}</div>  
                        </div>             
                    </div>
                    <hr />
                    <div className='input--class-reflections modify__lessonplan'>
                        <legend>Reflection</legend>
                        <label>Reflection Question 01: </label>
                            <input 
                            id='reflectionOne'
                            type='text' 
                            placeholder='First reflection question'
                            value={reflection_one}
                            onChange={this.handleChange('reflection_one')}
                            required
                            />
                        <label>Reflection Question 01: </label>
                            <input 
                            id='reflectionTwo'
                            type='text' 
                            placeholder='Second reflection question' 
                            value={reflection_two}
                            onChange={this.handleChange('reflection_two')}
                            />
                        <label>Reflection Question 01: </label>
                            <input 
                            id='reflectionThree'
                            type='text' 
                            placeholder='Third reflection question'
                            value={reflection_three}
                            onChange={this.handleChange('reflection_three')}
                            />
                    </div>
                    <div
                      className="edit-lesson__buttons">
                        <button 
                        className="button__violet" 
                        type='submit'><PublishIcon fontSize="large" /> Submit</button>
                        <button 
                          className="button__red" 
                          type='button' 
                          onClick={() => this.handleClickCancel()}>
                          <CancelIcon fontSize="large" /> Cancel</button>
                      </div>
                </form>
            </section>
            </div>
        )
    };
}


