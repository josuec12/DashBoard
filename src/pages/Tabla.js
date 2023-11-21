import React, { useState } from 'react'
import NavSideA from '../components/NavSideA'
import NavA from '../components/NavA';
import User from '../components/User';
import Edit from '../components/Edit';
import AddU from '../components/AddU';
import Footer from '../components/Footer';


const Tabla = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggle= () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="body">
        <NavSideA isOpen={isSidebarOpen} toggleSidebar={toggle} />
        <div className={`main ${isSidebarOpen ? 'active' : ''}`}>
          <NavA isOpen={isSidebarOpen} toggleSidebar={toggle} />
          <div className="content" >
            <div className="dash">
              <User />
              <AddU />
              <Edit />
            </div>
          </div>
          <Footer />
        </div>  
    </div>
  )
}

export default Tabla
