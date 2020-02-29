import React from 'react';
import ReactDOM from 'react-dom';
import RegistrationForm from './RegistrationForm'
import {BrowserRouter} from "react-router-dom";


describe('Edit Lesson Component', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<BrowserRouter><RegistrationForm /></BrowserRouter>, div);
      ReactDOM.unmountComponentAtNode(div);
    });
  });