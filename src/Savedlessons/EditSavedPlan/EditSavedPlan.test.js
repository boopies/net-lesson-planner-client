import React from 'react';
import ReactDOM from 'react-dom';
import EditSavedPlan from './EditSavedPlan'
import {BrowserRouter} from "react-router-dom";

const match = {
    isExact: true,
    params: 2,
    path: "",
    url: ""
}; 

describe('Edit Lesson Component', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<BrowserRouter><EditSavedPlan match={match} /></BrowserRouter>, div);
      ReactDOM.unmountComponentAtNode(div);
    });
  });