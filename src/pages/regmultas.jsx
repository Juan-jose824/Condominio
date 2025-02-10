import React, { useState, useEffect } from "react";
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
  const [multas, setMultas] = useState([]);

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
        fetchMultas(); // Refrescar la lista de multas
      } else {
        console.error("Error al registrar la multa");
        alert("Hubo un error al registrar la multa");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("No se pudo conectar con el servidor");
    }
  };

  const fetchMultas = async () => {
    try {
      const response = await fetch("https://apimultas.onrender.com/api/multas");
      const data = await response.json();
      
      // Ordena las multas por la fecha, de la más reciente a la más antigua
      const sortedMultas = data.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
      
      setMultas(sortedMultas); // Establece las multas ordenadas
    } catch (error) {
      console.error("Error al obtener las multas:", error);
    }
  };
  

  useEffect(() => {
    fetchMultas(); // Obtener las multas al cargar el componente
  }, []);

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
          {/* Aquí se muestra la tabla con las multas */}
          <table className="multa-table">
            <thead>
              <tr>
                <th>Coto No.</th>
                <th>Monto</th>
                <th>Fecha</th>
                <th>Descripción</th>
              </tr>
            </thead>
            <tbody>
              {multas.length > 0 ? (
                multas.map((multa, index) => (
                  <tr key={index}>
                    <td>{multa.coto}</td>
                    <td>${multa.monto}</td>
                    <td>{new Date(multa.fecha).toLocaleDateString()}</td>
                    <td>{multa.comentario}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No hay multas registradas.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="multa-right-section">

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
