import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from 'axios';  // Para manejar las peticiones HTTP
import "../styles/login.css";

function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClearPhone = () => {
    setPhone("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegisterClick = () => {
    navigate("/registro"); 
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Realiza una petición a tu API para autenticar al usuario
      const response = await axios.post('/api/auth/login', { phone, password });

      // Si la autenticación es exitosa, se recibe un token JWT
      const { token, role } = response.data;

      // Guarda el token y el rol en el localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      // Redirige según el rol
      if (role === 'administrador') {
        navigate("/administrador");
      } else if (role === 'usuario') {
        navigate("/usuarios");
      } else {
        navigate("/inicio");
      }
    } catch (error) {
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
              <span
                className="clear-icon"
                onClick={handleClearPhone}
              >
                ✖
              </span>
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
            <span
              className="toggle-password"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? "👁️" : "🙈"}
            </span>
          </div>

          <button type="submit">Entrar</button>
        </form>

        <div className="register-box">
          <p>
            ¿No tienes cuenta? Crea una cuenta
          </p>
          <button className="register-button" onClick={handleRegisterClick}>Regístrate</button>
        </div>
      </div>

      <div className="login-right">
        <h2>Condominios</h2>
        <p>
          Bienvenidos a los condominios, lugar donde podrás disfrutar de un
          vecindario cómodo y relajante, y apartamentos limpios con buenas
          comodidades.
        </p>
      </div>
    </div>
  );
}

export default Login;
