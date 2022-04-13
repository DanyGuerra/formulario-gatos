import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import React from "react";
import { Modal, Button } from "react-bootstrap";
import Header from "./Header";

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
    height: 60px;
    background: #aa9ceb;
  }

  h1 {
    font-family: "Sen";
    font-style: normal;
    font-weight: 700;
    font-size: 48px;
    line-height: 58px;
    text-align: center;
    color: #260f5d;
  }
  p {
    width: 640px;
    height: 64px;
    font-family: "Sen";
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 29px;
    text-align: center;
  }

  #btn-dudas {
    position: absolute;
    width: 100px;
    height: 50px;
    right: 10%;
    bottom: 10%;
    background: #ffffff;
    border: 1px solid #aa9ceb;
    box-sizing: border-box;
    border-radius: 4px;
    color: #aa9ceb;
  }

  button {
    background: #260f5d;
    border-radius: 4px;
    font-family: "Inter";
    color: #ffffff;
  }

  #comenzar {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 16px;
    width: 250px;
    height: 60px;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
  }
`;

function ScreenWelcome() {
  const [show, setShow] = useState(false);
  let navigate = useNavigate();

  return (
    <>
      <Modal
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <p>Aqui va la informacion</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      <WelcomeWrapper>
        <Header></Header>
        <h1>¡BIENVENIDO!</h1>
        <p>
          Su felino ha sido seleccionado para participar un uno de nuestro
          paneles felinos
        </p>
        <button
          id="comenzar"
          onClick={() => {
            navigate("/encuesta");
          }}
        >
          Comenzar
        </button>
        <button
          id="btn-dudas"
          onClick={() => {
            setShow(true);
          }}
        >
          Dudas
        </button>
      </WelcomeWrapper>
    </>
  );
}

export default ScreenWelcome;
