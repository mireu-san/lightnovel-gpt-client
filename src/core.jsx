import React from 'react'
import ReactDOM from 'react-dom/client'
import FrontPage from './FrontPage'
import './core.css'
import { BrowserRouter as Router } from 'react-router-dom';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <FrontPage />
    </Router>
  </React.StrictMode>,
)
