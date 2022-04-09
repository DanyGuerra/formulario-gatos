import React, { useEffect } from "react";
import host from "../const";
import ScreenWelcome from "./ScreenWelcome";

const InicioSesion = ({ setIsLogin, isLogin, setUsuario, setDay }) => {
  const [correo, setCorreo] = React.useState("");
  const [contra, setContra] = React.useState("");
  const [failLog, setFailLog] = React.useState(false);

  const [mensajeLogin, setMensajeLogin] = React.useState("");

  useEffect(() => {
    setFailLog(false);
  }, []);

  const handleCorreo = (e) => {
    setCorreo(e.target.value);
  };

  const handlePass = (e) => {
    setContra(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${host.HOST}inicio-sesion`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: correo,
          password: contra,
        }),
      });
      console.log(response);

      const jsonResponse = await response.json();
      if (response.ok) {
        setUsuario(jsonResponse.usuario);
        setIsLogin(true);
        setDay(jsonResponse.dia);
      } else {
        setFailLog(true);
        setMensajeLogin(jsonResponse.mensaje);
      }
    } catch (error) {
      setFailLog(true);
    }
  };

  if (isLogin) {
    return <ScreenWelcome />;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Iniciar Sesion</h1>
        {failLog ? <h4>{mensajeLogin}</h4> : <></>}
        <div className="form-group">
          <label>Usuario</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ingresa tu usuario"
            name="user"
            onChange={handleCorreo}
          />
        </div>
        <div className="form-group">
          <label>Contrasena</label>
          <input
            type="password"
            className="form-control"
            placeholder="Ingresa Contraseña"
            name="password"
            onChange={handlePass}
          />
        </div>
        <div className="form-group"></div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default InicioSesion;
