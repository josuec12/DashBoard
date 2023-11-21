import React, {useState} from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import HomeA from '../pages/HomeA.js';
import Register from '../pages/Register.js';
import Tabla from '../pages/Tabla.js';
import Error404 from '../pages/Error404.js';
import Error500 from '../pages/Error500.js';
import Password from '../pages/Password.js';
import Login from '../pages/Login.js';
 


const RutaA = () => {

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
        <Route exact path="/HomeA" element={<HomeA isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>} />
        <Route exact path="/Register" element={<Register isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>}/>
        <Route exact path="/Tabla" element={<Tabla isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>}/> 
        <Route exact path="*" element={<Error404/>}/>
        <Route exact path="/Error500" element={<Error500/>}/>
        <Route exact path="/Password" element={<Password/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default RutaA
