function ScreenWelcome({ setIsStartPoll }) {
  const startPoll = () => {
    setIsStartPoll(true);
  };

  return (
    <>
      <h1>BIENVENIDO</h1>
      <p>
        Su felino ha sido seleccionado para participar un uno de nuestro paneles
        felinos
      </p>
      <button onClick={startPoll}>Comenzar</button>
      <button>Dudas</button>
    </>
  );
}

export default ScreenWelcome;
