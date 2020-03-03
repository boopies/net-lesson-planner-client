import React from 'react';
import ReactDOM from 'react-dom';
import Savedlessons from './Savedlessons'
import {BrowserRouter} from "react-router-dom";


describe('Saved Lessons Component', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<BrowserRouter><Savedlessons /></BrowserRouter>, div);
      ReactDOM.unmountComponentAtNode(div);
    });
  });