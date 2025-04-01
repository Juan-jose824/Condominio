import React, { useState } from "react";
import "../styles/recuperar.css";

const Recuperar = () => {
  const [correo, setCorreo] = useState("");  // Estado para el correo
  const [isTokenSent, setIsTokenSent] = useState(false);  // Estado para saber si el token fue enviado

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
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
          <button type="submit">Enviar</button>
        </form>
      ) : (
        <p>Te hemos enviado un enlace para restablecer tu contraseña a: {correo}</p>
      )}
    </div>
  );
};

export default Recuperar;
