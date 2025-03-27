import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/recuperar.css";

const Recuperar = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Se ha enviado un enlace de recuperación a: ${email}`);
    // Aquí puedes agregar la lógica para enviar la solicitud al backend
  };

  return (
    <div className="recuperar-container">
      <h2>Recuperar Contraseña</h2>
      <p>Introduce tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Recuperar;
