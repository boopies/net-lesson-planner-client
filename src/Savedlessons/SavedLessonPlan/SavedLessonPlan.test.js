import React from 'react';
import ReactDOM from 'react-dom';
import SavedLessonPlan from './SavedLessonPlan'
import {BrowserRouter} from "react-router-dom";

const match = {
    isExact: true,
    params: 2,
    path: "",
    url: ""
}; 

describe('Saved Lesson Plan Component', () => {
    it('renders without crashing', () => {

      const div = document.createElement('div');
      ReactDOM.render(<BrowserRouter><SavedLessonPlan match={match} /></BrowserRouter>, div);
      ReactDOM.unmountComponentAtNode(div);
    });
  });