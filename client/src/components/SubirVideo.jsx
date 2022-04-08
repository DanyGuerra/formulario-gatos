import { useRef } from "react";
import host from "../const";

const SubirVideo = ({ respuestas }) => {
  const inputEl = useRef(null);

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
      console.log(data);
      console.log(respuestas);
      if (response.ok) {
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
