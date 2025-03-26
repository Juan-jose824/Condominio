import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate para redireccionar
import axios from 'axios';  // Importa axios para las solicitudes HTTP
import "../styles/registro.css";

function Register() {
  const [phone, setPhone] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [rol, setRol] = useState("usuario"); // Asigna un valor predeterminado a 'rol'
  const [showPassword, setShowPassword] = useState(false);
  
  // Inicializa useNavigate
  const navigate = useNavigate();

  const handleClearPhone = () => {
    setPhone("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Maneja el evento del botón "Registrar"
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir la recarga de la página al hacer submit

    // Validación simple
    if (!phone || !correo || !password || !nombre || !rol) {
      alert("Todos los campos son requeridos");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        num_cel: phone,
        correo: correo,
        password: password,
        nombre_com: nombre,
        rol: rol
      });

      // Mostrar mensaje de éxito
      alert(response.data.message);

      // Redirige a la página de login después de un registro exitoso
      navigate("/login");
    } catch (error) {
      console.error("Error al registrar el usuario:", error.response ? error.response.data : error);
      alert("Hubo un problema al registrar el usuario");
    }
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <form className="reg-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            {/* Nombre completo */}
            <input
              type="text"
              placeholder="Nombre Completo"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />

            {/* Teléfono con botón para limpiar */}
            <div className="input-container">
              <input
                type="text"
                placeholder="Número de Teléfono"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              {phone && (
                <span className="clear-icon" onClick={handleClearPhone}>
                  ✖
                </span>
              )}
            </div>

            {/* Correo */}
            <input
              type="email"
              placeholder="Correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />

            {/* Contraseña con botón para mostrar */}
            <div className="input-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="toggle-password" onClick={togglePasswordVisibility}>
                {showPassword ? "👁️" : "🙈"}
              </span>
            </div>
          </div>

          {/* Selección de perfil */}
          <select className="select-profile" value={rol} onChange={(e) => setRol(e.target.value)}>
            <option value="usuario">Usuario</option>
            <option value="administrador">Administrador</option>
            <option value="administración">Administración</option>
          </select>

          {/* Botón de registro */}
          <button type="submit" className="login-button">
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
