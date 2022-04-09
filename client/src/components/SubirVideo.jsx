import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import host from "../const";
import styled from "styled-components";

const Wrapper = styled.div`
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

  form {
    display: flex;
    gap: 30px;
    flex-direction: column;
  }
`;

const SubirVideo = ({ respuestas, usuario, day }) => {
  const [sending, setSending] = useState(false);
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

  return (
    <Wrapper>
      <header></header>
      <h1>Selecciona el video</h1>
      <form enctype="multipart/form-data">
        <input
          type="file"
          name="file"
          id="input-video"
          accept="video/*"
          ref={inputEl}
          required
        />
        <button onClick={handleSendForm} disabled={sending}>
          Subir
        </button>
      </form>
    </Wrapper>
  );
};

export default SubirVideo;
