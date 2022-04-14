import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
      margin-bottom: 40px;
    }

    .formulario-comment {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 40%;
      height: 60vh;
      background: #ffffff;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      font-weight: 400;

      p {
        margin-bottom: 40px;
      }

      textarea {
        background: #ffffff;
        border: 1px solid #ced4da;
        box-sizing: border-box;
        border-radius: 4px;
        resize: none;
        width: 80%;
        height: 120px;
        margin-bottom: 36px;

        :hover {
          border: 1px solid #aa9ceb;
        }

        :focus {
          border: 1px solid red;
        }
      }
    }

    .formulario {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 40%;
      height: 60vh;
      background: #ffffff;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      font-weight: 400;
      p {
        text-align: center;
        width: 80%;
      }

      .form {
        display: flex;
        align-items: flex-start;
        .opcion {
          display: flex;
          align-items: center;
          font-size: 12px;
          margin-bottom: 10px;
          input:hover {
            cursor: pointer;
          }
          input[type="radio"] {
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            width: 16px;
            height: 16px;
            margin-right: 10px;
            border: 1px solid #abb5be;
            border-radius: 50%;
          }
          input[type="radio"]:checked {
            border: 5px solid #260f5d;
          }
        }
      }
    }
    button {
      width: 60%;
      height: 60px;
      border: 1px solid #aa9ceb;
      border-radius: 4px;
      font-family: "Inter";
      font-style: normal;
      font-weight: 700;
      font-size: 16px;
      line-height: 19px;
      text-align: center;
      background-color: white;
      color: #aa9ceb;
    }
  }
`;

const encuesta = {
  dia1: [
    {
      pregunta: "1. Observe a su gato y registre que muestra olió primero",
      opciones: ["427", "120", "693", "NINGUNA"],
    },
    {
      pregunta:
        "2. Ahora indíquenos ¿cuál fue el código de la muestra que comió primero?",
      opciones: ["427", "120", "693", "NINGUNA"],
    },
    {
      pregunta: "3. ¿De cuál código comió más?",
      opciones: ["427", "120", "693", "NINGUNA"],
    },
    {
      pregunta: "4. Indique por favor ¿cuánto comió?",
      opciones: ["NADA", "LA MITAD", "MAS DE LA MITAD"],
    },
  ],
};

const Encuesta = ({ setRespuestas, day }) => {
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
    setOpcionSeleccionada("");
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
      <Header></Header>
      <EncuestaWrapper>
        <div className="form">
          {actualPreguntaN < encuesta.dia1.length ? (
            <>
              <h1>DÍA {day}</h1>
              <div className="formulario">
                <p>{actualPregunta.pregunta}</p>

                <div className="form">
                  {actualPregunta.opciones.map((e, index) => (
                    <div key={e} className="opcion">
                      <input
                        type="radio"
                        value={e}
                        name={e}
                        checked={e === opcionSeleccionada}
                        onChange={onChangeValue}
                      />
                      <span>{e}</span>
                    </div>
                  ))}
                </div>
                <button onClick={handleSave}> GUARDAR</button>
              </div>
            </>
          ) : (
            <>
              <h1>DÍA {day}</h1>
              <div className="formulario-comment">
                <p>5. ¿Comentarios?</p>
                <textarea
                  onChange={onChangeComment}
                  placeholder="Deja tu comentario (opcional)"
                ></textarea>
                <button onClick={handleSaveEnd}>GUARDAR</button>
              </div>
            </>
          )}
        </div>
      </EncuestaWrapper>
    </>
  );
};

export default Encuesta;
