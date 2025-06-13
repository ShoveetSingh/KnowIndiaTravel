import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App.jsx'

import {Signup,Login,Update} from './components'

import { Routes,Route } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'

const root=ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App/>}></Route>
        <Route path="/Signup" element={<Signup/>}></Route>
        <Route path="/Login" element={<Login/>}></Route>
        <Route path="/Update" element={<Update/>}></Route>
      </Routes>
    </Router>
  </React.StrictMode>,
)

//reportWebVitals();