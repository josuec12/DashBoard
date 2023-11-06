import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login from '../pages/Login.js';
import Home from '../pages/Home.js';
import ReporteV from '../pages/ReporteV.js';
import ReporteF from '../pages/ReporteF.js';
import Password from '../pages/Password.js';
import Error404 from '../pages/Error404.js';
import Error500 from '../pages/Error500.js';
import { useState } from 'react';

const Ruta = () => {

        const [isSidebarOpen, setIsSidebarOpen] = useState(false);
      
        const toggleSidebar = () => {
          setIsSidebarOpen(!isSidebarOpen);
        };

  return (
    <div>
       <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="*" element={<Error404/>}/>
          <Route exact path="/Error500" element={<Error500/>}/>
          <Route exact path="/Home" element={<Home isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>} />
          <Route exact path="/ReporteV" element={<ReporteV isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>} />
          <Route exact path="/ReporteF" element={<ReporteF isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>} />
          <Route exact path="/Password" element={<Password/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default Ruta
