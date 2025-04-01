import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Registro from './pages/registro'; // Asegúrate de importar el componente de registro
import Inicio from './pages/inicio';
import Administrador from './pages/administrador';
import Buscador from './pages/buscador';
import Regpagos from './pages/regpagos';
import Regmultas from './pages/regmultas';
import Usuarios from './pages/usuarios';
import Recuperar from './pages/recuperar';
import Recpass from './pages/recpass';
// import Gespermisos from './pages/gespermisos';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/inicio" element={<Inicio />} />
      <Route path="/administrador" element={<Administrador />} />
      <Route path="/buscador" element={<Buscador />} />
      <Route path="/regpagos" element={<Regpagos />} />
      <Route path="/regmultas" element={<Regmultas />} />
      <Route path='/usuarios' element={<Usuarios />} />
      <Route path='/recuperar' element={<Recuperar />} />
      <Route path='/recuperar/:token' element={<Recpass />} />

     {/* <Route path="/gespermisos" element={<Gespermisos />} /> */}
    </Routes>
  </Router>
);

export default App;


