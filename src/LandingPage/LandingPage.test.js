import React from 'react';
import ReactDOM from 'react-dom';
import LandingPage from './LandingPage'
import LandingButtons from '../LandingButtons/LandingButtons'
import {BrowserRouter} from "react-router-dom";


describe('Landing Page Component', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<BrowserRouter><LandingPage />q</BrowserRouter>, div);
      ReactDOM.unmountComponentAtNode(div);
    });
  });