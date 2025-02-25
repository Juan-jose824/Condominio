import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';  
import "../styles/login.css";

function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClearPhone = () => setPhone("");
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const handleRegisterClick = () => navigate("/registro");

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      // Verifica qué datos estás enviando
      console.log("Datos enviados al backend:", { phone, password });
  
      // Enviar los datos al backend con los nombres correctos
      const response = await axios.post('http://localhost:5000/api/auth/login', { 
        num_cel: phone,  // Asegúrate de enviar 'num_cel' en lugar de 'phone'
        password: password 
      });
  
      const { token, role } = response.data;
  
      // Guardar token en el almacenamiento local y en el backend
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
  
      // Redirigir según el rol
      if (role === 'administrador') {
        navigate("/administrador");
      } else if (role === 'usuario') {
        navigate("/usuarios");
      } else {
        navigate("/inicio");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error.response ? error.response.data : error);
      alert("Número de teléfono o contraseña incorrectos");
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-container">
            <input
              type="text"
              placeholder="Ingrese su número de Teléfono"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            {phone && (
              <span className="clear-icon" onClick={handleClearPhone}>✖</span>
            )}
          </div>

          <div className="input-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="toggle-password" onClick={togglePasswordVisibility}>
              {showPassword ? "👁️" : "🙈"}
            </span>
          </div>

          <button type="submit">Entrar</button>
        </form>

        <div className="register-box">
          <p>¿No tienes cuenta? Crea una cuenta</p>
          <button className="register-button" onClick={handleRegisterClick}>Regístrate</button>
        </div>
      </div>

      <div className="login-right">
        <h2>Condominios</h2>
        <p>Bienvenidos a los condominios, donde podrás disfrutar de un vecindario cómodo y relajante, con apartamentos limpios y buenas comodidades.</p>
      </div>
    </div>
  );
}

export default Login;
