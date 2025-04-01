import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/recuperar.css";



const Recpass = () => {
  const [token, setToken] = useState("");  // Estado para el token
  const [newPassword, setNewPassword] = useState("");  // Estado para la nueva contraseña
  const [isTokenSent, setIsTokenSent] = useState(false);  // Estado para saber si el token fue enviado
  const [isPasswordSet, setIsPasswordSet] = useState(false);  // Estado para saber si la contraseña se ha actualizado
  
  const location = useLocation().pathname;
//   console.log(location);
  useEffect(()=> {
    if (location) {
        setIsTokenSent(location.split("/")[2])
  }},[location])
// console.log(isTokenSent);
  const handlecambiarpass = (e) => {
    e.preventDefault();

    // Llamar a la API para actualizar la contraseña usando el token
    fetch("http://localhost:5000/api/auth/cambiarpass", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${isTokenSent}`,
      },
      body: JSON.stringify({ password: newPassword }),
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
        Introduce el token recibido y tu nueva contraseña para restablecerla.
      </p>
      {!isPasswordSet ? (
        <form onSubmit={handlecambiarpass}>
          <input
            type="password"
            placeholder="Nueva Contraseña"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirma la Contraseña"
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

export default Recpass;
