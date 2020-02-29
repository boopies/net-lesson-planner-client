import React from 'react';
import ReactDOM from 'react-dom';
import SideDraw from './SideDraw'
import {BrowserRouter} from "react-router-dom";


describe('SideDraw Component', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(
      <BrowserRouter><SideDraw /></BrowserRouter>, div);
      ReactDOM.unmountComponentAtNode(div);
    });
  });