import React, { useState } from 'react';
import "../styles/inicio.css";
import fpImage from '../assets/fp.jpg'; // Ajusta la ruta según la ubicación exacta de tu carpeta 'assets'

// Componentes para la barra de navegación, menú lateral y carrusel
const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="role">Dueño</div>
      <div className="menu-item">Inquilinos</div>
      <div className="menu-item">Cotos</div>
    </div>
  );
};

const Carousel = () => {
  return (
    <div className="carousel">
      <h2>Inquilinos</h2>
      <div className="carousel-images">
        <div className="carousel-item">Inquilino 1</div>
        <div className="carousel-item">Inquilino 2</div>
        <div className="carousel-item">Inquilino 3</div>
        <div className="carousel-item">Inquilino 4</div>
        <div className="carousel-item">Inquilino 5</div>
        <div className="carousel-item">Inquilino 6</div>
      </div>
    </div>
  );
};

const NotificationList = () => {
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showMenu, setShowMenu] = useState(null);

  const notifications = [
    { title: 'Coto 1', description: 'Pago: Sí', imageUrl: fpImage, comment: 'Requiere revisión en el área común.' },
    { title: 'Coto 2', description: 'Pago: No', imageUrl: fpImage, comment: 'No hay comentarios adicionales.' },
  ];

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
  };

  const handleActionClick = (action, notification) => {
    if (action === 'delete') {
      // Aquí podrías agregar la lógica para eliminar la notificación
      console.log(`Eliminar: ${notification.title}`);
    } else if (action === 'markAsRead') {
      // Aquí podrías agregar la lógica para marcar como visto
      console.log(`Marcar como visto: ${notification.title}`);
    }
    setShowMenu(null); // Cierra el menú después de hacer la acción
  };

  return (
    <div className="notification-list">
      <h3>Notificaciones</h3>
      <table>
        <tbody>
          {notifications.map((notification, index) => (
            <tr key={index} onClick={() => handleNotificationClick(notification)}>
              <td><img src={notification.imageUrl} alt={notification.title} className="notification-image" /></td>
              <td className="notification-info">
                <div className="title">{notification.title}</div>
                <div className="description">{notification.description}</div>
                <div className="comment">{notification.comment}</div>
              </td>
              <td className="menu">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMenu(showMenu === index ? null : index); // Alterna el menú desplegable
                  }}
                >
                  &#x22EE; {/* Tres puntos */}
                  {showMenu === index && (
                    <div className="dropdown-menu">
                      <button onClick={(e) => { e.stopPropagation(); handleActionClick('delete', notification); }}>Eliminar</button>
                      <button onClick={(e) => { e.stopPropagation(); handleActionClick('markAsRead', notification); }}>Marcar como visto</button>
                    </div>
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedNotification && (
        <div className="modal">
          <h4>{selectedNotification.title}</h4>
          <p><strong>Descripción:</strong> {selectedNotification.description}</p>
          <p><strong>Comentario:</strong> {selectedNotification.comment}</p>
          <button onClick={() => setSelectedNotification(null)}>Cerrar</button>
        </div>
      )}
    </div>
  );
};

const PageHeader = ({ toggleSidebar }) => {
  return (
    <header className="page-header">
      <button className="menu-toggle" onClick={toggleSidebar}>☰</button>
      <h1>Vista General</h1>
    </header>
  );
};

const Inicio = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <div className="page-container">
      <PageHeader toggleSidebar={toggleSidebar} />
      <div className="content">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="main-content">
          <Carousel />
          <NotificationList />
        </div>
      </div>
    </div>
  );
};

export default Inicio;
