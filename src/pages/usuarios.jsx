import React, { useState } from "react";  
import '../styles/usuarios.css'; // Importa tu archivo de estilos


const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="role">Administrador</div>
      <div className="menu-item"><a href="/buscador">Buscador</a></div>
      {/* <div className="menu-item"><a href="/pagos">Registro de pagos</a></div> */}
      <div className="menu-item"><a href="/regmultas">Registro de multas</a></div>
      <div className="menu-item">Gestión de permisos</div>
    </div>
  );
};

const Usuarios = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="pago-container">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="pago-header">
        <button className="toggle-button" onClick={toggleSidebar}>
          ☰
        </button>
        <h1>Registro De Pagos</h1>
      </div>
      <div className="pago-content">
        <div className="pago-left-section">
          <div className="pago-field">
            <label>Coto No.</label>
            <span>54</span>
          </div>
          <div className="pago-field">
            <label>Pagó:</label>
            <span>$2,500.°°</span>
          </div>
        </div>
        <div className="pago-right-section">
          <div className="pago-field">
            <label>Fecha Del Pago:</label>
            <span>18/12/24</span>
          </div>
          <div className="pago-description">
            <div className="pago-field">
              <label>Pagó con:</label>
              <span>En efectivo</span>
            </div>
            <div className="pago-image-container">
              <img src={fpImage} alt="Imagen" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Usuarios;
