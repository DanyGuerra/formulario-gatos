import React, { useEffect } from "react";
import host from "../const";
import ScreenWelcome from "./ScreenWelcome";
import styled from "styled-components";

const LoginWrappper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "Roboto", sans-serif;

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
    width: 297px;
    height: 263px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);

    padding-bottom: 39px;

    h1 {
      font-weight: 700;
      font-size: 20px;
      font-style: normal;
      line-height: 23px;
    }
    button,
    input {
      width: 212px;
      font-weight: 400;
      font-family: "Roboto", sans-serif;
      font-size: 15px;
    }

    input {
      background: rgba(196, 196, 196, 0.15);
      border: 1px solid #a9a9a9;
    }

    button {
      height: 35px;
      border: 1px solid #0c6dce;
      box-sizing: border-box;
      background: #ffffff;
      font-style: normal;
      font-weight: 700;
      font-size: 15px;
      color: #0c6dce;
    }
  }
`;

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

      const jsonResponse = await response.json();
      if (response.ok) {
        setUsuario(jsonResponse.usuario);
        setIsLogin(true);
        setDay(jsonResponse.dia);
      } else {
        setFailLog(true);
        setMensajeLogin(jsonResponse.mensaje);
      }
      setTimeout(() => {
        setFailLog(false);
      }, [3000]);
    } catch (error) {
      setFailLog(true);
    }
  };

  if (isLogin) {
    return <ScreenWelcome />;
  }

  return (
    <LoginWrappper>
      {failLog ? <p>{mensajeLogin}</p> : <></>}
      <form onSubmit={handleSubmit}>
        <svg
          width="100"
          height="100"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_308_198)">
            <path
              d="M86.38 40.5899V86.8199H11.48V12.0599L44.92 37.0599L68 0.579941H54.73L41.9 20.4699L15.11 0.439941H0V98.2999H97.86V21.9999L86.38 40.5899Z"
              fill="#260F5D"
            />
            <path
              d="M48.92 77.61L24.34 59.27V43.83L45.91 59.98L83.82 0H97.86L48.92 77.61Z"
              fill="#260F5D"
            />
          </g>
          <defs>
            <clipPath id="clip0_308_198">
              <rect width="97.86" height="98.3" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <h1>INICIAR SESIÓN</h1>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Nombre de usuario"
            name="user"
            onChange={handleCorreo}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Contraseña"
            name="password"
            onChange={handlePass}
          />
        </div>
        <div className="form-group"></div>
        <button type="submit">INICIAR SESIÓN</button>
      </form>
    </LoginWrappper>
  );
};

export default InicioSesion;
