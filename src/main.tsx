import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Css/index.css'
import "bootstrap-icons/font/bootstrap-icons.css";
import { ToastContainer } from "react-toastify";



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App/>
    <ToastContainer/>
  </React.StrictMode>,
)
