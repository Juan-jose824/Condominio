import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importamos useNavigate
import "../styles/login.css";

function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Declaramos la función navigate

  const handleClearPhone = () => {
    setPhone("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegisterClick = () => {
    navigate("/registro"); // Redirige a la página de registro
  };

  const handleLogin = (e) => {
    e.preventDefault(); // Corregir el error tipográfico

    // Datos de los usuarios establecidos
    const users = [
      { phone: "3326", password: "123", redirect: "/inicio" }, // Usuario 1
      { phone: "3330", password: "1234", redirect: "/administrador" }, // Usuario 2
      { phone: "3333", password: "12345", redirect: "/administracion" }, // Usuario 3
      { phone: "0909", password: "0909", redirect: "/usuarios" }, // Usuario 4
    ];

    // Verificamos si el teléfono y la contraseña coinciden con algún usuario
    const user = users.find((u) => u.phone === phone && u.password === password);

    if (user) {
      navigate(user.redirect); // Redirige a la página correspondiente
    } else {
      alert("Número de teléfono o contraseña incorrectos"); // Mostrar mensaje de error
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <form className="login-form" onSubmit={handleLogin}> {/* Agregamos onSubmit */}
          {/* Campo del número de teléfono */}
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

          {/* Campo de contraseña */}
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

          {/* Botón de enviar */}
          <button type="submit">Entrar</button>
        </form>

        {/* Caja de registro */}
        <div className="register-box">
          <p>
            ¿No tienes cuenta? Crea una cuenta
          </p>
          <button className="register-button" onClick={handleRegisterClick}>Regístrate</button>
        </div>
      </div>

      {/* Lado derecho */}
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
