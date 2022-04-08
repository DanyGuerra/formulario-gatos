import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const encuesta = {
  dia1: [
    {
      pregunta: "1. ¿Cuál olio primero?",
      opciones: ["427", "120", "693", "NINGUNA"],
    },
    {
      pregunta: "2. ¿Cuál comió primero?",
      opciones: ["427", "120", "693", "NINGUNA"],
    },
    {
      pregunta: "3. ¿De cuál código comió mas?",
      opciones: ["427", "120", "693", "NINGUNA"],
    },
    {
      pregunta: "4. ¿Cuanto comió?",
      opciones: ["NADA", "LA MITAD", "MAS DE LA MITAD"],
    },
  ],
};

const Encuesta = ({ setRespuestas, respuestas }) => {
  const [actualPreguntaN, setActualPreguntaN] = React.useState(0);
  const [actualPregunta, setActualPregunta] = React.useState(encuesta.dia1[0]);
  const [opcionSeleccionada, setOpcionSeleccionada] = React.useState("");
  const [comment, setComment] = React.useState("");

  let navigate = useNavigate();

  useEffect(() => {
    setActualPregunta(encuesta.dia1[actualPreguntaN]);
  }, [actualPreguntaN]);

  const handleSave = () => {
    if (!opcionSeleccionada) {
      return;
    }

    setRespuestas((oldArray) => [...oldArray, opcionSeleccionada]);
    setActualPreguntaN((prev) => prev + 1);
  };

  const onChangeValue = (event) => {
    setOpcionSeleccionada(event.target.value);
  };

  const handleSaveEnd = () => {
    setRespuestas((oldArray) => [...oldArray, comment]);
    navigate("/encuesta/video");
  };

  const onChangeComment = (event) => {
    setComment(event.target.value);
  };

  return (
    <>
      {actualPreguntaN < encuesta.dia1.length ? (
        <>
          <h1>Dia 1</h1>
          <p>{actualPregunta.pregunta}</p>

          <div>
            {actualPregunta.opciones.map((e) => (
              <>
                <input
                  type="radio"
                  value={e}
                  name="p1"
                  onChange={onChangeValue}
                />
                <span>{e}</span>
              </>
            ))}

            <button onClick={handleSave}> Guardar</button>
          </div>
        </>
      ) : (
        <>
          <h2>¿Tienes algun comentario final?</h2>
          <textarea onChange={onChangeComment}></textarea>
          <button onClick={handleSaveEnd}>Guardar</button>
        </>
      )}
    </>
  );
};

export default Encuesta;
