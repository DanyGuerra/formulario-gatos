import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import host from "../const";
import styled from "styled-components";
import Header from "./Header";

const EncuestaWrapper = styled.div`
  width: 100%;
  margin-top: 40px;

  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    font-family: "Sen";

    h1 {
      font-style: normal;
      font-weight: 700;
      font-size: 40px;
      line-height: 48px;
      display: flex;
      align-items: center;
      text-align: center;
      color: #000000;
      margin-top: 60px;
      margin-bottom: 60px;
    }

    .formulario {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;
      width: 50%;
      height: 40vh;
      background: #ffffff;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      font-weight: 400;

      .form {
        width: 80%;

        .file-input {
          display: flex;
          align-items: center;
          justify-content: center;
          input {
          }
          label {
          }
        }
      }
    }
    button {
      width: 250.48px;
      height: 60px;
      background: #260f5d;
      border-radius: 4px;
      color: white;
      :disabled {
        opacity: 0.4;
        cursor: not-allowed !important;
      }
      :hover {
        cursor: pointer;
      }
    }
  }
`;

const SubirVideo = ({ respuestas, usuario, day }) => {
  const [sending, setSending] = useState(false);
  const [isVideo, setIsVideo] = useState(false);

  const inputEl = useRef(null);
  let navigate = useNavigate();

  const sendForm = async () => {
    const formData = new FormData();

    formData.append("file", inputEl.current.files[0]);

    const options = {
      method: "POST",
      body: formData,
    };

    try {
      const response = await fetch(`${host.HOST}subir`, options);
      const data = await response.json();

      const dataEncuesta = {
        usuario: usuario,
        respuestas: respuestas,
        videoInfo: data,
        dia: day,
      };

      if (response.ok) {
        const encuesta = await fetch(`${host.HOST}enviar/encuesta`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataEncuesta),
        });

        if (encuesta.ok) {
          navigate("/encuesta/terminada");
        }
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendForm = (e) => {
    e.preventDefault();
    setSending(true);
    sendForm();
  };

  const handleVideo = (e) => {
    let file = e.target.files[0];
    if (file) {
      setIsVideo(true);
    } else {
      setIsVideo(false);
    }
  };

  return (
    <>
      <Header></Header>
      <EncuestaWrapper>
        <div className="form">
          <h1>DÍA 1</h1>
          <form enctype="multipart/form-data" className="formulario">
            <p>6. Subir video</p>
            <div className="form">
              <div className="opcion file-input">
                <input
                  type="file"
                  name="file"
                  id="file"
                  className="file"
                  accept="video/*"
                  ref={inputEl}
                  onChange={handleVideo}
                />
              </div>
            </div>
            <button onClick={handleSendForm} disabled={!isVideo}>
              FINALIZAR
            </button>
          </form>
        </div>
      </EncuestaWrapper>
    </>
  );
};

export default SubirVideo;
