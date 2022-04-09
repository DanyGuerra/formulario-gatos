import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import host from "../const";

const SubirVideo = ({ respuestas, usuario, setPollEnded }) => {
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
      };

      if (response.ok) {
        console.log("video enviado");
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
    sendForm();
    console.log("Sending Information");
  };

  return (
    <form enctype="multipart/form-data">
      <input
        type="file"
        name="file"
        id="input-video"
        accept="video/*"
        ref={inputEl}
      />
      <button onClick={handleSendForm}>Subir</button>
    </form>
  );
};

export default SubirVideo;
