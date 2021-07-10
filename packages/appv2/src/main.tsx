import React from 'react';
import ReactDOM from 'react-dom';
import 'virtual:windi.css';
import '@purge-icons/generated';
import App from 'src/App';
import 'src/styles/index.scss';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
