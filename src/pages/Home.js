import React, { useState } from 'react'
import NavSide from '../components/NavSide';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Carrusel from '../components/Carrusel';

const Home = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <NavSide isOpen={isSidebarOpen} toggleSidebar={toggle} />
      <div className={`main ${isSidebarOpen ? 'active' : ''}`}>
        <Nav isOpen={isSidebarOpen} toggleSidebar={toggle} />
        <div className="cardBox" >
          <div className="card1">
            <div className="cardHeader">
              <h2>Noticias</h2>
            </div>
          </div>
          
          <Carrusel /> 
          
        </div>

        <div className="cont">
          <div className="boletin">
            <div className="cardHeader">
              <h2>Boletín</h2>
            </div>
            <iframe title="Boletin" src="https://drive.google.com/file/d/1Jjn5AjND7KNW9hxfkd2vqH-2cB_INhkC/view?usp=sharing" className="cyb"></iframe>

          </div>

          <div className="calendario">
            <div className="cardHeader">
              <h2>Calendario</h2>
            </div>
            <iframe title="calendario" src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23005eff&ctz=America%2FBogota&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=1&showCalendars=0&src=YzIyZmY2YzU4MzEzMzk1NmE0MjBiY2JlNDk0Mjg4ZGNjNGE0YjIxZjk4MjhmNmE1NTM2M2E4YzIwYjkxMzFlMEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%233F51B5" className="cyb" scrolling="no"></iframe>
          </div>

        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Home
