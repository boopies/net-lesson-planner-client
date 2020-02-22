import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Typography from '@material-ui/core/Typography';


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

    render() {
        const { values, handleChange } = this.props;
        return (
            <MuiThemeProvider>
                <React.Fragment>
                    <AppBar title="Enter User Details" />
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
                    </FormControl>
                    <br />
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
                    </FormControl>
                    <br />
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
                                        max: "40", 
                                        step: "1", 
                                        placeholder: "20" }}
                        onChange={handleChange('class_size')}
                    />
                    <br />
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
                        color='secondary'
                        type='reset' 
                        onClick={this.props.cancel}>
                    Cancel
                    </Button>
                </React.Fragment>
            </MuiThemeProvider>
        )
    }
}

export default FormLessonInfo