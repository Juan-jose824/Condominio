import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/recuperar.css";

const Recuperar = () => {
  const [correo, setcorreo] = useState("");
  const [token, setToken] = useState("");  // Estado para el token
  const [newPassword, setNewPassword] = useState("");  // Estado para la nueva contraseña
  const [isTokenSent, setIsTokenSent] = useState(false);  // Estado para saber si el token fue enviado
  const [isPasswordSet, setIsPasswordSet] = useState(false);  // Estado para saber si la contraseña se ha actualizado

  const handleSubmitEmail = (e) => {
    e.preventDefault();

    // Llamar a la API del backend para enviar el correo con el token
    fetch("http://localhost:5000/api/recuperar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correo }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert(`Se ha enviado un enlace de recuperación a: ${correo}`);
          setIsTokenSent(true);
        } else {
          alert("Correo no encontrado.");
        }
      })
      .catch((err) => alert("Hubo un error al enviar el correo"));
  };

  const handleSubmitPassword = (e) => {
    e.preventDefault();

    // Llamar a la API para actualizar la contraseña usando el token
    fetch("/api/recuperar/actualizar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correo, token, newPassword }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setIsPasswordSet(true);
          alert("Contraseña actualizada exitosamente.");
        } else {
          alert("Token inválido o expirado.");
        }
      })
      .catch((err) => alert("Hubo un error al actualizar la contraseña"));
  };

  return (
    <div className="recuperar-container">
      <h2>Recuperar Contraseña</h2>
      <p>
        Introduce tu correo electrónico y te enviaremos un enlace para
        restablecer tu contraseña.
      </p>
      {!isTokenSent ? (
        <form onSubmit={handleSubmitEmail}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={correo}
            onChange={(e) => setcorreo(e.target.value)}
            required
          />
          <button type="submit">Enviar</button>
        </form>
      ) : !isPasswordSet ? (
        <form onSubmit={handleSubmitPassword}>
          <input
            type="text"
            placeholder="Token recibido"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Nueva Contraseña"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button type="submit">Actualizar Contraseña</button>
        </form>
      ) : (
        <p>Tu contraseña ha sido actualizada correctamente.</p>
      )}
    </div>
  );
};

export default Recuperar;
