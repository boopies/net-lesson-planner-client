import React from 'react';
import ReactDOM from 'react-dom';
import CreateLesson from './CreateLesson'
import {BrowserRouter} from "react-router-dom";

describe('Create Lesson Component', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<BrowserRouter><CreateLesson  /></BrowserRouter>, div);
      ReactDOM.unmountComponentAtNode(div);
    });
  });