import { useNavigate } from "react-router-dom";

function ScreenWelcome() {
  let navigate = useNavigate();

  return (
    <>
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
      <button>Dudas</button>
    </>
  );
}

export default ScreenWelcome;
