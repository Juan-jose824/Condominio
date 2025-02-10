import React, { useState } from "react";
import '../styles/usuarios.css'; // Importa tu archivo de estilos
import { Bell } from "lucide-react"; // Icono de campana para notificaciones

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="role">Usuario</div>
    </div>
  );
};

const Usuarios = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState(3); // Ejemplo de 3 notificaciones
  const [isNotificationWindowOpen, setIsNotificationWindowOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleNotificationWindow = () => {
    setIsNotificationWindowOpen(!isNotificationWindowOpen);
  };

  return (
    <div className="usuario-container">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="usuario-header">
        <button className="toggle-button" onClick={toggleSidebar}>
          ☰
        </button>
        <h1>Vista de usuarios</h1>
        <button className="notification-button" onClick={toggleNotificationWindow}>
          <Bell size={24} />
          {notifications > 0 && <span className="notification-badge">{notifications}</span>}
        </button>
      </div>
      <div className="usuario-content">
        <div className="usuario-left-section">
          <div className="usuario-field">
            <label>Matrícula:</label>
            <span>123456</span>
          </div>
          <div className="usuario-field">
            <label>Nombre:</label>
            <span>Juan Pérez</span>
          </div>
        </div>
        <div className="usuario-right-section">
          <div className="usuario-field">
            <label>Fecha de Registro:</label>
            <span>18/12/24</span>
          </div>
          <div className="usuario-description">
            <label>Descripción:</label>
            <p>Este es un ejemplo de descripción del usuario.</p>
          </div>
        </div>
      </div>
      <div className={`notification-window ${isNotificationWindowOpen ? "open" : ""}`}>
        <h3>Notificaciones</h3>
        <ul>
          <li>Notificación 1</li>
          <li>Notificación 2</li>
          <li>Notificación 3</li>
        </ul>
      </div>
    </div>
  );
};

export default Usuarios;
