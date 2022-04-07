import React, { useEffect } from "react";

const InicioSesion = ({ setIsLogin }) => {
  const [correo, setCorreo] = React.useState("");
  const [contra, setContra] = React.useState("");
  const [failLog, setFailLog] = React.useState(false);

  useEffect(() => {
    setFailLog(false);
  }, []);

  const handleCorreo = (e) => {
    setCorreo(e.target.value);
  };

  const handlePass = (e) => {
    setContra(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/inicio-sesion", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: correo,
        password: contra,
      }),
    }).then((response) => {
      if (response.ok) {
        setFailLog(true);
        setIsLogin(true);
      } else {
      }
      console.log(response);
      console.log(response.ok);
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h3>Iniciar Sesion</h3>
        {failLog ? <h2>Tu correo o contrasena son incorrectos</h2> : <></>}
        <div className="form-group">
          <label>Usuario</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ingresa tu correo"
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
