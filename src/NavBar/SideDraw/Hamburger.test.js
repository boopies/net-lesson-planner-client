import React from 'react';
import ReactDOM from 'react-dom';
import Hamburger from './Hamburger'


describe('Hamburger Button Component', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(
      <Hamburger />, div);
      ReactDOM.unmountComponentAtNode(div);
    });
  });