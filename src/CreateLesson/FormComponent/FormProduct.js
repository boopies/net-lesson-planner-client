import React from 'react';
import { getActivityForCategory, findActivity } from '../../ReadActivities/helpers';
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ValidationError from '../../ReadActivities/ValidationError/ValidationError';
import CancelIcon from '@material-ui/icons/Cancel';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';


export default class FormProduct extends React.Component {    
continue = e => {
    e.preventDefault();
    this.props.nextStep();
};

back = e => {
    e.preventDefault();
    this.props.prevStep();
};

reset = e => {
    e.preventDefault();
    this.props.resetForm();
};

renderOptions(catId){
    const { activities } = this.props;
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
};

validateProduct(fieldValue) {
    const { values  } = this.props;
    const product = values.product_one_id;
    if (parseInt(product) === 4) {
      return 'One production activity is required';
    }
  };


renderTooltipinfo(actId){
    const {activities} = this.props;
    const activity = findActivity(activities, actId) || {content: ' '};

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

    render() {
        const { values, handleChange } = this.props;
        return (
            <div>
                    <div className="outlined">
                    <h4 id="lesson_product-phase">
                    Product Activity One
                    </h4>
                    <div className='Activity-select'>
                        <select
                        required
                        id='lesson_product_one_id'
                        defaultValue={values.product_one_id}
                        onChange={handleChange('product_one_id')}
                        >
                        {this.renderOptions(4)}
                        </select>
                        {this.renderTooltipinfo(values.product_one_id)}</div>
                        {<ValidationError message={this.validateProduct()}/>}
                    </div>
                    <br />
                    <div className="outlined">
                    <h4 id="lesson_product-phase">
                    Product Activity Two (Optional)
                    </h4>
                    <div className='Activity-select'>
                        <select
                        id='lesson_product_two_id'
                        defaultValue={values.product_two_id}
                        onChange={handleChange('product_two_id')}
                        >
                        {this.renderOptions(4)}
                        </select>
                        {this.renderTooltipinfo(values.product_two_id)}
                        </div>
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
                            <ChevronLeftIcon fontSize="large" /> Back
                            </button>
                            <button
                                className='button__blue'
                                type='button'  
                                label='Continue'
                                onClick={this.continue}
                                disabled={this.validateProduct()}
                            >
                            Continue <ChevronRightIcon fontSize="large" />
                            </button>
                    </div>
                    <button 
                        className='button__red'
                        type='button'  
                        onClick={this.props.cancel}>
                    <CancelIcon fontSize="large" />Cancel
                    </button>
                    </div>
            </div>
        )
    };
}