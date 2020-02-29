import React from 'react';
import ReactDOM from 'react-dom';
import FormCooldown from './FormCooldown'
import {BrowserRouter} from "react-router-dom";

const values = {
              title: 'test',
              date: 'test',
              day: 'test',
              duration: 'test',
              classlevel: 'test',
              period: 'test',
              topic: 'test',
              goal: 'The goal of the lesson is to test',
              class_size: 24,
              objective_one: 'test',
              objective_two: 'test',
              objective_three: 'test',
              materials: '',
              warmup_id: 1,
              presentation_one_id: 2,
              presentation_two_id: 2,
              practice_one_id: 3,
              practice_two_id: 3,
              practice_three_id: 3,
              product_one_id: 4,
              product_two_id: 4,
              cooldown_id: 5,
              reflection_one: 'test',
              reflection_two: 'test',
              reflection_three: 'test',
    }

const activities = [{id: 1,
    title: 'test',
    content: 'test',
    category_id: 1,
    groups: 'test',
    duration: 'test',
    author_id: 'test'}]

const handleChange = () => {}
  
describe('Form Cooldown Selection Component', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<BrowserRouter>
                            <FormCooldown
                                values={values} 
                                activities={activities} 
                                handleChange={handleChange}
                                />
                        </BrowserRouter>, div);
      ReactDOM.unmountComponentAtNode(div);
    });
  });