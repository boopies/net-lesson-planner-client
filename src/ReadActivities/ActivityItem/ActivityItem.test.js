import React from 'react';
import ReactDOM from 'react-dom';
import ActivityItem from './ActivityItem'
import {BrowserRouter} from "react-router-dom";


describe('Activity Item Component', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<BrowserRouter><ActivityItem /></BrowserRouter>, div);
      ReactDOM.unmountComponentAtNode(div);
    });
  });