import React from 'react';
import ReactDOM from 'react-dom';
import ActivityList from './ActivityList'
import {BrowserRouter} from "react-router-dom";


describe('Activity List and Filter Component', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<BrowserRouter><ActivityList /></BrowserRouter>, div);
      ReactDOM.unmountComponentAtNode(div);
    });
  });