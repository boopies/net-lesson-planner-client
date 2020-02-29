import React from 'react';
import ReactDOM from 'react-dom';
import AddActivity from './AddActivity'
import {BrowserRouter} from "react-router-dom";


describe('Add Activity Component', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<BrowserRouter><AddActivity /></BrowserRouter>, div);
      ReactDOM.unmountComponentAtNode(div);
    });
  });