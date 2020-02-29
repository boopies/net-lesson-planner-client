import React from 'react';
import ReactDOM from 'react-dom';
import ReadActivities from './ReadActivities'
import {BrowserRouter} from "react-router-dom";


describe('Read Activity Main Page Component', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<BrowserRouter><ReadActivities /></BrowserRouter>, div);
      ReactDOM.unmountComponentAtNode(div);
    });
  });