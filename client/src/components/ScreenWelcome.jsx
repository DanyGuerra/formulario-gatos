import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import React from "react";
import { Modal, Button } from "react-bootstrap";
import Header from "./Header";
import { AiOutlineClose } from "react-icons/ai";
import image from "../assets/instrucciones-panelfelino-1.png";
import seensePath from "../assets/sense-path.png";
import Carousel from "react-bootstrap/Carousel";
import step1 from "../assets/step1.png";
import step2 from "../assets/step2.png";
import step3 from "../assets/step3.png";
import step4 from "../assets/step4.png";

const WelcomeWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    gap: 50px;
  }

  #header-title {
    font-family: "Sen";
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    color: #260f5d;
  }

  svg {
    :hover {
      cursor: pointer;
    }
  }

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
    width: 90%;
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

  const styleImg = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const imgStyle = { height: "400px", width: "auto", maxHeight: "400px" };

  return (
    <>
      <Modal
        show={show}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header className="modal-header">
          <h1
            id="header-title"
            style={{
              fontFamily: "Sen",
              fontStyle: "normal",
              fontWeight: "700",
              fontSize: "24px",
            }}
          >
            Dudas
          </h1>
          <AiOutlineClose onClick={() => setShow(false)}></AiOutlineClose>
        </Modal.Header>
        <Modal.Body>
          <Carousel variant="dark">
            <Carousel.Item>
              <div class="item peopleCarouselImg" style={styleImg}>
                <img
                  className="img-fluid"
                  src={step1}
                  alt="First slide"
                  style={imgStyle}
                />
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div class="item peopleCarouselImg" style={styleImg}>
                <img
                  className="img-fluid"
                  src={step2}
                  alt="Second slide"
                  style={imgStyle}
                />
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div class="item peopleCarouselImg" style={styleImg}>
                <img
                  className="img-fluid"
                  src={step3}
                  alt="Third slide"
                  style={imgStyle}
                />
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div class="item peopleCarouselImg" style={styleImg}>
                <img
                  className="img-fluid"
                  src={step4}
                  alt="Third slide"
                  style={imgStyle}
                />
              </div>
            </Carousel.Item>
          </Carousel>
        </Modal.Body>
      </Modal>

      <WelcomeWrapper>
        <Header></Header>
        <h1>¡BIENVENIDO!</h1>
        <p>
          Su felino ha sido seleccionado para participar en nuestro panel felino
        </p>
        <button
          id="comenzar"
          onClick={() => {
            navigate("/encuesta");
          }}
        >
          Comenzar
        </button>
        <img
          src={seensePath}
          alt="Logo Sense Path"
          style={{ position: "absolute", bottom: "5vh" }}
        />
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
