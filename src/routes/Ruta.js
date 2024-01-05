import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import { useBesitz } from '../Context/BesitzContext.js';
import { useAdmin } from '../Context/AdminContext.js';
import Login from '../pages/Login.js';
import Home from '../pages/Home.js';
import Register from '../pages/Register.js';
import HomeA from '../pages/HomeA.js';
import Tabla from '../pages/Tabla.js';
import ReporteV from '../pages/ReporteV.js';
import ReporteF from '../pages/ReporteF.js';
import Password from '../pages/Password.js';
import Error404 from '../pages/Error404.js';
import Error500 from '../pages/Error500.js';
import TablaA from '../pages/TablaA.js';
import Loading from '../components/Loading.js';

const Ruta = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { Besitz } = useBesitz();
  const { Admin } = useAdmin();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const PrivateRoute = ({ element }) => {
    return Besitz ? element : <Navigate to="/Login" />;
  };

  const AdminRoute = ({ element }) => {
    return Admin ? element : <Navigate to="/Login" />;
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Error404" element={<Error404 />} />
          <Route path="/Error500" element={<Error500 />} />
          <Route path="/Password" element={<Password />} />
          <Route path='/Loading' element={<Loading/>} />

          {/* Rutas protegidas para clientes */}
          <Route
            path="/Home"
            element={<PrivateRoute element={<Home isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />} />}
          />
          <Route
            path="/ReporteV"
            element={<PrivateRoute element={<ReporteV isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />} />}
          />
          <Route
            path="/ReporteF"
            element={<PrivateRoute element={<ReporteF isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />} />}
          />

          {/* Rutas protegidas para administradores */}
          <Route
            path="/HomeA"
            element={<AdminRoute element={<HomeA isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />} />}
          />
          <Route
            path="/Register"
            element={<AdminRoute element={<Register isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />} />}
          />
          <Route
            path="/Tabla"
            element={<AdminRoute element={<Tabla isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />} />}
          />
          <Route
            path="/TablaA"
            element={<AdminRoute element={<TablaA isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />} />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default Ruta;
