import React from 'react';
import ReactDOM from 'react-dom';
import EditActivity from './EditActivity'
import {BrowserRouter} from "react-router-dom";

const match = {
  isExact: true,
  params: 2,
  path: "",
  url: ""
}; 

describe('Edit Activities Component', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<BrowserRouter><EditActivity match={match}/></BrowserRouter>, div);
      ReactDOM.unmountComponentAtNode(div);
    });
  });