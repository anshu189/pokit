import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // Restict mode cons -> it repeats the console log statements multiple times 
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);
