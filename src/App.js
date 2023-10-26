import './App.scss';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login from './pages/Login';
import ReporteV from './pages/ReporteV';
import ReporteF from './pages/ReporteF';
import Register from './pages/Register';
import Home from './pages/Home';
import Tabla from './pages/Tabla';
import Password from './pages/Password';
import Error404 from './pages/Error404';
import Error500 from './pages/Error500';
import HomeA from './pages/HomeA';
import { useState } from 'react';

function App() {

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
          <Route exact path="/Register" element={<Register isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>}/>
          <Route exact path="*" element={<Error404/>}/>
          <Route exact path="/Error500" element={<Error500/>}/>
          <Route exact path="/HomeA" element={<HomeA isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>} />
          <Route exact path="/Home" element={<Home isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>} />
          <Route exact path="/ReporteV" element={<ReporteV isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>} />
          <Route exact path="/ReporteF" element={<ReporteF isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>} />
          <Route exact path="/Tabla" element={<Tabla isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>}/> 
          <Route exact path="/Password" element={<Password/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;