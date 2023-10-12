import './App.scss';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login from './pages/Login';
import Nav from './components/Nav';
import NavSide from './components/NavSide';
import ReporteV from './pages/ReporteV';
import ReporteF from './pages/ReporteF';
import Register from './pages/Register';
import Home from './pages/Home';
import Tabla from './pages/Tabla';
import Password from './pages/Password';

function App() {
  return (
    <div>
      <Router>
        <div>
        <NavSide />
        </div>  
        <Routes>
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/Register" element={<Register/>}/>
          <Route exact path="/Home" element={<Home />} />
          <Route exact path="/ReporteV" element={<ReporteV />} />
          <Route exact path="/ReporteF" element={<ReporteF />} />
          <Route exact path="/Tabla" element={<Tabla />}/> 
          <Route exact path="/Password" element={<Password/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;