import React, { useEffect } from "react";
import host from "../const";
import ScreenWelcome from "./ScreenWelcome";
import styled from "styled-components";
import LogoSUB from "./LogoSUB";

const LoginWrappper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "Roboto", sans-serif;
  box-sizing: border-box;

  .mensaje {
    padding: 0px 20px;
    height: 50px;
    border: solid #0c6dce 2px;
    color: #0c6dce;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 10px;
  }

  form {
    padding-bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 297px;
    height: 263px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    padding: 20px 0px 39px 0px;

    h1 {
      font-weight: 700;
      font-size: 20px;
      font-style: normal;
      line-height: 23px;
      margin-bottom: 30px;
    }
    button,
    input {
      width: 212px;
      height: 35px;
      font-weight: 400;
      font-family: "Roboto", sans-serif;
      font-size: 15px;
    }

    input {
      background: rgba(196, 196, 196, 0.15);
      border: 1px solid #a9a9a9;
      border-radius: 0px;
      margin-bottom: 25px;
      font-family: "Roboto", sans-serif;
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
      :hover {
        background-color: #0c6dce;
        color: white;
      }
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
      console.log(error);
      setFailLog(true);
    }
  };

  if (isLogin) {
    return <ScreenWelcome />;
  }

  return (
    <LoginWrappper>
      {failLog ? <p className="mensaje">{mensajeLogin}</p> : <></>}
      <LogoSUB width={100} height={100}></LogoSUB>
      <form onSubmit={handleSubmit}>
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
