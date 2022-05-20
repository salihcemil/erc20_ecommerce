import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Admin from './admin';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path='/' element={<App/>}/>
      <Route path='/admin' element={<Admin/>}/>
    </Routes>
  </Router>,
    //  <App />,
  document.getElementById('root')
);

