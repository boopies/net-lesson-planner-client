import React from 'react';
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Typography from '@material-ui/core/Typography';
import ValidationError from '../../ReadActivities/ValidationError/ValidationError'


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
          return 'Date is required. Use YYYY/MM/DD.';
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
                <React.Fragment>
                    <FormControl variant="outlined">
                            <Typography id="lesson_class-size">
                                Title
                            </Typography>
                            <TextField
                                required
                                id="lesson_title"
                                defaultValue={values.title}
                                onChange={handleChange('title')}
                                margin="normal"
                                placeholder="Lesson Title"
                                variant="outlined"
                            />
                            {<ValidationError message={this.validateTitle()}/>}
                    </FormControl>
                    <br />
                    <FormControl variant="outlined">
                        <Typography id="lesson_year-level">
                        Year Level
                        </Typography>
                            <NativeSelect
                            required
                            id='lesson_year-level'
                            value={values.classlevel}
                            onChange={handleChange('classlevel')}
                            >
                            <option value="">Select A Year Level</option>
                            {this.renderClassLevel()}
                            </NativeSelect>
                            {<ValidationError message={this.validateClasslevel()}/>}
                        </FormControl>
                    <br />
                    <FormControl variant="outlined">
                        <Typography id="lesson_date">
                            Date
                        </Typography>
                        <TextField
                            required
                            id="lesson_date"
                            type="date"
                            defaultValue="2020-02-24"
                            onChange={handleChange('date')}
                            variant="outlined"
                        />
                        {<ValidationError message={this.validateDate()}/>}
                    </FormControl>
                    <br />
                    <Typography id="lesson_day">
                        Day
                    </Typography>
                    <FormControl variant="outlined">
                        <NativeSelect
                        required
                        id='lesson_day'
                        value={values.day}
                        onChange={handleChange('day')}
                        >
                        <option value="">Select a Day</option>
                        {this.renderDayofWeek()}
                        </NativeSelect>
                        {<ValidationError message={this.validateDay()}/>}
                    </FormControl>
                    <br />
                    <Typography id="lesson_duration">
                        Lesson Duration
                    </Typography>
                    <FormControl variant="outlined">
                        <NativeSelect
                        required
                        id='lesson_duration'
                        value={values.duration}
                        onChange={handleChange('duration')}
                        >
                        <option value="">Select Lesson Length</option>
                        {this.renderDuration()}
                    </NativeSelect>
                    {<ValidationError message={this.validateDuration()}/>}
                    </FormControl>
                    <br />
                    <Typography id="lesson_period">
                        Period
                    </Typography>
                    <FormControl variant="outlined">
                        <NativeSelect
                        required
                        id='lesson_period'
                        value={values.period}
                        onChange={handleChange('period')}
                        >
                        <option value="">Select Period</option>
                        {this.renderClassPeriod()}
                    </NativeSelect>
                    {<ValidationError message={this.validatePeriod()}/>}
                    </FormControl>
                    <br />
                    <FormControl variant="outlined">
                    <Typography id="lesson_class-size">
                        Class Size
                    </Typography>
                        <TextField
                            required
                            value={values.class_size}
                            id="lesson_class-size"
                            type="number"
                            variant="outlined"
                            inputProps={{ 
                                            min: "1", 
                                            max: "45", 
                                            step: "1", 
                                            placeholder: "20" }}
                            onChange={handleChange('class_size')}
                        />
                    {<ValidationError message={this.validateClassSize()}/>}
                    </FormControl>
                    <br />
                    <div
                        className='All_buttons'>
                    <button
                        className='ActivityPage__edit-button'
                        type='button'
                        onClick={this.continue}>
                    Continue
                    </button>
                    <button
                        className='savedlesson__go-back'
                        type='button'
                        onClick={this.props.cancel}>
                    Cancel
                    </button>
                    </div>
                </React.Fragment>
        )
    }
}

export default FormLessonInfo

/*
                        disabled={this.validateTitle()||
                                    this.validateClasslevel()||
                                    this.validateDate()||
                                    this.validateDay()||
                                    this.validateDuration()||
                                    this.validatePeriod()||
                                    this.validateClassSize()}
                                    */