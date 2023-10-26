import React from 'react'

const Nav = ({ isOpen, toggleSidebar }) => {
  return (
    <div>
      <div className="topbar">
      <div className="toggle">
    <ion-icon onClick={toggleSidebar} name="menu-outline"></ion-icon>
  </div>  
        <div class="logo">
        {/* <img src={require('../imagenes/eagle.jpg')} /> */}
                </div>

    </div>
    </div>
  )
}

export default Nav
