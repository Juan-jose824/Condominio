import React, { useState } from "react";

import "../styles/regmultas.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="role">Administrador</div>
      <div className="menu-item"><a href="/buscador">Buscador</a></div>
      <div className="menu-item"><a href="/regpagos">Registro de pagos</a></div>
      <div className="menu-item">Gestión de permisos</div>
    </div>
  );
};

const MultaRegistro = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    coto: "",
    monto: "",
    fecha: "",
    comentario: "",
  });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://apimultas.onrender.com/api/multas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Multa registrada:", data);
        alert("Multa registrada con éxito");

        setFormData({
          coto: "",
          monto: "",
          fecha: "",
          comentario: "",
        });

        toggleForm();
      } else {
        console.error("Error al registrar la multa");
        alert("Hubo un error al registrar la multa");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("No se pudo conectar con el servidor");
    }
  };

  return (
    <div className="multa-container">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="multa-header">
        <button className="toggle-button" onClick={toggleSidebar}>
          ☰
        </button>
        <h1>Registro De Multas</h1>
        <button className="right-button" onClick={toggleForm}>
          Crear Multa
        </button>
      </div>
      <div className="multa-content">
        <div className="multa-left-section">
          <div className="multa-field">
            <label>Coto No.</label>
            <span>{formData.coto || "Esperando..."}</span>
          </div>
          <div className="multa-field">
            <label>Monto De La Multa:</label>
            <span>{formData.monto ? `$${formData.monto}` : "Esperando..."}</span>
          </div>
        </div>
        <div className="multa-right-section">
          <div className="multa-field">
            <label>Fecha De La Multa:</label>
            <span>{formData.fecha || "Esperando..."}</span>
          </div>
          <div className="multa-description">
            <label>Descripción De La Multa:</label>
            <p>{formData.comentario || "Esperando..."}</p>
          </div>
        </div>
      </div>

      {/* Formulario deslizante */}
      <div className={`multa-form-container ${isFormVisible ? "open" : ""}`}>
        <h2>Crear Nueva Multa</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="multa-field">
            <label>Coto No.</label>
            <input
              type="text"
              name="coto"
              value={formData.coto}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="multa-field">
            <label>Monto De La Multa:</label>
            <input
              type="number"
              name="monto"
              value={formData.monto}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="multa-field">
            <label>Fecha De La Multa:</label>
            <input
              type="date"
              name="fecha"
              value={formData.fecha}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="multa-field">
            <label>Descripción:</label>
            <textarea
              name="comentario"
              value={formData.comentario}
              onChange={handleInputChange}
              rows="4"
              required
            ></textarea>
          </div>
          <button type="submit">Registrar Multa</button>
        </form>
      </div>
    </div>
  );
};

export default MultaRegistro;
