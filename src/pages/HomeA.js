import React, { useState } from 'react'
import NavSideA from '../components/NavSideA'

const HomeA = () => { 
  const [sidebarClose, setSidebarOpen] = useState(false);

 const toggleSidebar = () => {
    setSidebarOpen(!sidebarClose);
 };
  return (
    <div>
      <NavSideA isOpen={sidebarClose} />
    <div className="main">
         <div className="topbar">
         <div className="toggle">
            <ion-icon onClick={toggleSidebar} name="menu-outline"></ion-icon>
        </div>
        <div class="logo"> 
        {/* <img src={require('../imagenes/eagle.jpg')} /> */}
                </div>

    </div>
          <div className="cardBox" >
        <div className="card1">
            <div className="cardHeader">
            <h2>Boletín</h2>
            </div>
        </div>
     </div>

        <div className="cont">
          <div className="calendario">
            <div className="cardHeader">
            <h2>Calendario</h2>
            </div>
            <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%233F51B5&ctz=America%2FBogota&showTitle=0&showNav=1&showTz=1&src=YzIyZmY2YzU4MzEzMzk1NmE0MjBiY2JlNDk0Mjg4ZGNjNGE0YjIxZjk4MjhmNmE1NTM2M2E4YzIwYjkxMzFlMEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%233F51B5"  width="580" height="450" frameborder="0" scrolling="no"></iframe>
          </div>
          
          <div class="recentCustomers">
                    <div class="cardHeader">
                        <h2>....</h2>
                    </div>

               </div>

        </div>

    </div>
    </div>
  
  )
}

export default HomeA
