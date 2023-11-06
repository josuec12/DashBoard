import React, { useState } from 'react'
import NavSideA from '../components/NavSideA'
import Nav from '../components/Nav';
import User from '../components/User';
import Edit from '../components/Edit';
import AddU from '../components/AddU';


const Tabla = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggle= () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <NavSideA isOpen={isSidebarOpen} toggleSidebar={toggle} />
        <div className={`main ${isSidebarOpen ? 'active' : ''}`}>
      <Nav isOpen={isSidebarOpen} toggleSidebar={toggle}/>
    <div className="content" >
        <div className="dash">
            <User/>
            <AddU/>
            <Edit/>
            </div>
            </div>
    </div>
    </div>
  )
}

export default Tabla
