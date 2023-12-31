import React from 'react';
import ReactDOM from 'react-dom/client';
import FrontPage from './FrontPage';
import Login from './modules/login';
import Signup from './modules/signup';
import './core.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={<FrontPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
);
