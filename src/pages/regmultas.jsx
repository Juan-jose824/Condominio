import React, { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group"; // Import CSSTransition
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
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility
  const [modalMessage, setModalMessage] = useState(""); // Modal message

  const formRef = useRef(null); // Refs to detect clicks outside the form

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
    setIsLoading(true); // Show loading
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
        setModalMessage("Multa registrada con éxito");
        setModalVisible(true);
        setFormData({
          coto: "",
          monto: "",
          fecha: "",
          comentario: "",
        });

        // Agregar la nueva multa al principio del array
        setMultas((prevMultas) => [data, ...prevMultas]);

      } else {
        console.error("Error al registrar la multa");
        setModalMessage("Hubo un error al registrar la multa");
        setModalVisible(true);
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      setModalMessage("No se pudo conectar con el servidor");
      setModalVisible(true);
    } finally {
      setIsLoading(false); // Hide loading
    }
  };

  const fetchMultas = async () => {
    try {
      const response = await fetch("https://apimultas.onrender.com/api/multas");
      const data = await response.json();
      
      // Ordenar las multas por fecha de forma descendente (más reciente primero)
      const sortedMultas = data.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
      
      setMultas(sortedMultas); // Establece las multas ordenadas
    } catch (error) {
      console.error("Error al obtener las multas:", error);
    }
  };

  // Close form if click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setIsFormVisible(false); // Close form
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
      </div>

      {/* Formulario deslizante */}
      <div
        ref={formRef}
        className={`multa-form-container ${isFormVisible ? "open" : ""}`}
      >
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
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Cargando..." : "Registrar Multa"}
          </button>
        </form>
      </div>

      {/* Transition for loading and modal */}
      <CSSTransition in={isLoading} timeout={300} classNames="fade" unmountOnExit>
        <div className="loading-overlay">
          <span>Cargando...</span>
        </div>
      </CSSTransition>

      <CSSTransition in={modalVisible} timeout={300} classNames="fade" unmountOnExit>
        <div className="modal">
          <div className="modal-content">
            <p>{modalMessage}</p>
            <button onClick={() => setModalVisible(false)}>Cerrar</button>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};

export default MultaRegistro;
