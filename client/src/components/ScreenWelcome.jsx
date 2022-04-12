import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import React from "react";
import { Modal, Button } from "react-bootstrap";

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
        <header></header>
        <h1>BIENVENIDO</h1>
        <p>
          Su felino ha sido seleccionado para participar un uno de nuestro
          paneles felinos
        </p>
        <button
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
