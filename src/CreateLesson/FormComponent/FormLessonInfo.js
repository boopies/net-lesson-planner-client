import React from 'react';
import ValidationError from '../../ReadActivities/ValidationError/ValidationError'
import CancelIcon from '@material-ui/icons/Cancel';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';


export class FormLessonInfo extends React.Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }

    renderClassLevel(){
        const classType = [ 'Elementry 1st grade',   'Elementry 2nd Grade', 
        'Elementry 3rd Grade', 'Elementry 4th Grade',
        'Elementry 5th Grade', 'Elementry 6th Grade', 
        'Junior High 1st Year', 'Junior High 2nd Year', 
        'Junior High 3rd Year', 'High 1st Year', 
        'High 2nd Year', 'High 3rd Year']
        return(
            <>
            {classType.map(classes =>
            <option key={classes} value={classes}>{classes}</option>)}
            </>
        )
    }

    renderDayofWeek(){
        const weekday = [ 'Monday', 'Tuesday', 'Wednesday',
                    'Thursday', 'Friday', 'Saturday' , 'Sunday']
        return(
            <>
            {weekday.map(week =>
            <option key={week} value={week}>{week}</option>)}
            </>
        )
    }

    renderDuration(){
        const classLength = [ '20 min',  '30 min', '40 min', 
        '45 min','50 min', '55 min', 
        '60 min', '70 min', '90 min']
        return(
            <>
            {classLength.map(length =>
            <option key={length} value={length}>{length}</option>)}
            </>
        )
    }

    renderClassPeriod(){
        let period = [ 'Period 01', 'Period 02', 'Period 03',
                        'Period 04', 'Period 05', 'Period 06', 'Period 07']
        return(
            <>
            {period.map(period =>
            <option key={period} value={period}>{period}</option>)}
            </>
        )
    }

    validateTitle(fieldValue) {
        const { values  } = this.props;
        const titles = values.title;
        if (titles.length === 0) {
          return 'Title is required.';
        } else if (titles.length < 2) {
          return <div id="ANErrorMessage">New Lessons name must be 3 characters long.</div>;
        }
      }

      validateClasslevel(fieldValue) {
        const { values  } = this.props;
        const classLevel = values.classlevel;
        if (classLevel.length === 0) {
          return 'Year level is required.';
        } else if (classLevel.length < 0) {
          return <div id="ANErrorMessage">Choose a year level of the class.</div>;
        }
      }

      validateDate(fieldValue) {
        const { values  } = this.props;
        const date = values.date;
        if (date.length === 0) {
          return 'Date is required.';
        } else if (date.length < 2) {
          return <div id="ANErrorMessage">Add a new Date.</div>;
        }
      }

      validateDay(fieldValue) {
        const { values  } = this.props;
        const day = values.day;
        if (day.length === 0) {
          return 'Day of week is required.';
        } else if (day.length < 2) {
          return <div id="ANErrorMessage">Choose the day of the lesson.</div>;
        }
      }

      validateDuration(fieldValue) {
        const { values  } = this.props;
        const duration = values.duration;
        if (duration.length === 0) {
          return 'Lesson Duration is required.';
        } else if (duration.length < 2) {
          return <div id="ANErrorMessage">Choose the length of the lesson.</div>;
        }
      }

      validatePeriod(fieldValue) {
        const { values  } = this.props;
        const period = values.period;
        if (period.length === 0) {
          return 'Lesson Period is required.';
        } else if (period.length < 2) {
          return <div id="ANErrorMessage">Choose the period the lesson occurs</div>;
        }
      }

      validateClassSize(fieldValue) {
        const { values  } = this.props;
        const classSize = values.class_size;
        if (parseInt(classSize) === 0) {
          return 'Class Size is Required';
        } else if (classSize < 1 || classSize > 45) {
          return <div id="ANErrorMessage">Class size must be between 1 - 45.</div>;
        }
      }

    render() {
        const { values, handleChange } = this.props;
        return (
                <>
                    <div className="outlined">
                            <h4 id="lesson_class-size">
                                Title
                            </h4>
                            <input
                                required
                                id="lesson_title"
                                defaultValue={values.title}
                                onChange={handleChange('title')}
                                margin="normal"
                                placeholder="Lesson Title"
                            />
                            {<ValidationError message={this.validateTitle()}/>}
                    </div>
                    <br />
                    <div className="outlined">
                        <h4 id="lesson_year-level">
                        Year Level
                        </h4>
                            <select
                            required
                            id='lesson_year-level'
                            defaultValue={values.classlevel}
                            onChange={handleChange('classlevel')}
                            >
                            <option value="">Select A Year Level</option>
                            {this.renderClassLevel()}
                            </select>
                            {<ValidationError message={this.validateClasslevel()}/>}
                        </div>
                    <br />
                    <div className="outlined">
                        <h4 id="lesson_date">
                            Date
                        </h4>
                        <input
                            required
                            id="lesson_date"
                            type="date"
                            defaultValue={values.date}
                            onChange={handleChange('date')}
                        />
                        {<ValidationError message={this.validateDate()}/>}
                    </div>
                    <br />
                    <div className="outlined">
                    <h4 id="lesson_day">
                        Day
                    </h4>
                        <select
                        required
                        id='lesson_day'
                        defaultValue={values.day}
                        onChange={handleChange('day')}
                        >
                        <option value="">Select a Day</option>
                        {this.renderDayofWeek()}
                        </select>
                        {<ValidationError message={this.validateDay()}/>}
                    </div>
                    <br />

                    <div className="outlined">
                    <h4 id="lesson_duration">
                        Lesson Duration
                    </h4>
                        <select
                        required
                        id='lesson_duration'
                        defaultValue={values.duration}
                        onChange={handleChange('duration')}
                        >
                        <option value="">Select Lesson Length</option>
                        {this.renderDuration()}
                    </select>
                    {<ValidationError message={this.validateDuration()}/>}
                    </div>
                    <br />
                    <div className="outlined">
                      <h4 id="lesson_period">
                          Period
                      </h4>
                        <select
                        required
                        id='lesson_period'
                        defaultValue={values.period}
                        onChange={handleChange('period')}
                        >
                        <option value="">Select Period</option>
                        {this.renderClassPeriod()}
                    </select>
                    {<ValidationError message={this.validatePeriod()}/>}
                    </div>
                    <br />
                    <div className="outlined">
                      <h4 id="lesson_class-size">
                          Class Size
                      </h4>
                          <input
                              required
                              defaultValue={values.class_size}
                              id="lesson_class-size"
                              type="number"
                              min= "1" 
                              max= "45" 
                              step= "1" 
                              placeholder= "20"
                              onChange={handleChange('class_size')}
                          />
                      {<ValidationError message={this.validateClassSize()}/>}
                    </div>
                    <br />
                    <div
                        className='All_buttons'>
                    <button
                        className='button__blue'
                        type='button'
                        disabled={this.validateTitle()||
                                    this.validateClasslevel()||
                                    this.validateDate()||
                                    this.validateDay()||
                                    this.validateDuration()||
                                    this.validatePeriod()||
                                    this.validateClassSize()}
                        onClick={this.continue}>
                    Continue <ChevronRightIcon fontSize="large" />
                    </button>
                    <button
                        className='button__red'
                        type='button'
                        onClick={this.props.cancel}>
                    <CancelIcon fontSize="large" /> Cancel
                    </button>
                    </div>
                </>
        )
    }
}

export default FormLessonInfo