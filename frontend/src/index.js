import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

import Card from './cards/Cards';

ReactDOM.render(
  <React.StrictMode>
    <App />
    {/* <Card /> */}
  </React.StrictMode>,
  document.getElementById('root')
);

