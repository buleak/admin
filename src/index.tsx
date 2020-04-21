import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom'
import './index.scss';
import App from './App';

const supportsHistory = 'pushState' in window.history;

ReactDOM.render(
    // forceRefresh: true时，导航刷新整个页面
    <Router forceRefresh={!supportsHistory} >
        <App />
    </Router>, 
    document.getElementById('root')
);

