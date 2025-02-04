import React, { useState } from 'react';
import "../styles/administrador.css"; 
import fpImage from '../assets/fp.jpg'; // Ajusta la ruta de la imagen según corresponda

// Componente para la barra lateral y el menú
const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="role">Administrador</div>
      <div className="menu-item"><a href="/buscador">Buscador</a></div>
      <div className="menu-item"><a href="/regpagos">Registro de pagos</a></div>
      <div className="menu-item"><a href="/regmultas">Registro de multas</a></div>
      <div className="menu-item">Gestión de permisos</div>
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

const PaymentCard = ({ status, user, date }) => {
  return (
    <div className="payment-card">
      <div className={`status ${status === 'PAGADO' ? 'paid' : 'not-paid'}`}>{status}</div>
      <div className="profile-container">
        <img src={fpImage} alt="Perfil" className="profile-image" />
        <div className="user-info">
          <div className="user-name">{user}</div>
          <div className="payment-date">{date}</div>
        </div>
      </div>
    </div>
  );
};

const NotificationList = () => {
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showMenu, setShowMenu] = useState(null);

  const notifications = [
    { title: 'Multa pagada', imageUrl: fpImage, comment: 'User 1 Pagó su multa en la fecha : 28/12/24' },
    { title: 'Multa no pagada', imageUrl: fpImage, comment: 'User 5 No pago su multa en la fecha : 08/11/24' },
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
          <div className="payment-cards">
            <PaymentCard status="PAGADO" user="User 1" date="01/01/2025" />
            <PaymentCard status="NO PAGADO" user="User 2" date="02/01/2025" />
            <PaymentCard status="PAGADO" user="User 3" date="03/01/2025" />
          </div>
          <NotificationList /> {/* Aquí se inserta la tabla de notificaciones */}
        </div>
      </div>
    </div>
  );
};

export default Inicio;
