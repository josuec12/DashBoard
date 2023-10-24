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
import NavSideA from './components/NavSideA';
import HomeA from './pages/HomeA';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/Register" element={<Register/>}/>
          <Route exact path="*" element={<Error404/>}/>
          <Route exact path="/Error500" element={<Error500/>}/>
          <Route exact path="/HomeA" element={<HomeA />} />
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