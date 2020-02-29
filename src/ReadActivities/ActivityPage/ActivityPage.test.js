import React from 'react';
import ReactDOM from 'react-dom';
import ActivityPage from './ActivityPage'
import {BrowserRouter} from "react-router-dom";


describe('Activity Content Component', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<BrowserRouter><ActivityPage /></BrowserRouter>, div);
      ReactDOM.unmountComponentAtNode(div);
    });
  });