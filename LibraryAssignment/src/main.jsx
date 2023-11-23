import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App/App';
import Page from './Page/Page';
import TestAssignment from './TestAssignment/TestAssignment';
import PrivateRoute from './PrivateRoute';
import Profile from './Profile/Profile';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const rootElement = document.getElementById('root');

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/test/:testId" element={<PrivateRoute> <TestAssignment /> </PrivateRoute>} />
        <Route path='/profile' element={<PrivateRoute> <Profile></Profile> </PrivateRoute>}></Route>
        <Route path="/page" element={<PrivateRoute><Page /></PrivateRoute>} /> 
        <Route path="/" element={<App />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
