import React, { useState } from 'react'
import NavSide from '../components/NavSide';
import Nav from '../components/Nav';

const Home = (isOpen, toggleSidebar) => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggle= () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <NavSide isOpen={isSidebarOpen} toggleSidebar={toggle}/>
    <div className={`main ${isSidebarOpen ? 'active' : ''}`}>
    <Nav isOpen={isSidebarOpen} toggleSidebar={toggle}/>
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
            <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%233F51B5&ctz=America%2FBogota&showTitle=0&showNav=1&showTz=1&src=YzIyZmY2YzU4MzEzMzk1NmE0MjBiY2JlNDk0Mjg4ZGNjNGE0YjIxZjk4MjhmNmE1NTM2M2E4YzIwYjkxMzFlMEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%233F51B5"  width="650" height="450" frameborder="0" scrolling="no"></iframe>
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

export default Home
