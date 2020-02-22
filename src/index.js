import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import Modal from 'react-modal';
import 'typeface-roboto';

Modal.setAppElement('#root');

ReactDOM.render(<BrowserRouter>
                    <App/>
                </BrowserRouter>,
                document.getElementById('root')
);