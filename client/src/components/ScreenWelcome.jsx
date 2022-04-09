import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const WelcomeWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  header {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100px;
    background: #aa9ceb;
  }
  #btn-dudas {
    position: absolute;
    width: 100px;
    height: 50px;
    right: 20px;
    bottom: 20px;
  }
`;

function ScreenWelcome() {
  let navigate = useNavigate();

  return (
    <WelcomeWrapper>
      <header></header>
      <h1>BIENVENIDO</h1>
      <p>
        Su felino ha sido seleccionado para participar un uno de nuestro paneles
        felinos
      </p>
      <button
        onClick={() => {
          navigate("/encuesta");
        }}
      >
        Comenzar
      </button>
      <button id="btn-dudas">Dudas</button>
    </WelcomeWrapper>
  );
}

export default ScreenWelcome;
