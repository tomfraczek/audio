/* global document */
// global document, stops es-lint error
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import './styles/form-rest.global.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
