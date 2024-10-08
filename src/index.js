import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BesitzProvider } from './Context/BesitzContext';
import { AdminProvider } from './Context/AdminContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode> esto es lo que hacia que el programa se corriera dos veces, tu sabes de que te hablo
  <BesitzProvider>
    <AdminProvider>
      <App />
    </AdminProvider>
  </BesitzProvider>
// </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
