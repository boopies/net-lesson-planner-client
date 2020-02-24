import React from 'react';
import PropTypes from 'prop-types'
import './ValidationError.css'

function ValidationError(props) {
  if(props.message) {
    return (
      <div className="error">{props.message}</div>
    );
  }

  return <></>
}

ValidationError.propTypes = {
  message: PropTypes.object
}

export default ValidationError