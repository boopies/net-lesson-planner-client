import React from 'react';
import ReactDOM from 'react-dom';
import LoginForm from './LoginForm'
import {BrowserRouter} from "react-router-dom";


describe('Edit Lesson Component', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<BrowserRouter><LoginForm /></BrowserRouter>, div);
      ReactDOM.unmountComponentAtNode(div);
    });
  });