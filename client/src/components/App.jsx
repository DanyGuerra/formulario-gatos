import InicioSesion from "./InicioSesion";
import React from "react";
import ScreenWelcome from "./ScreenWelcome";
import Encuesta from "./Encuesta";

function App() {
  const [isLogin, setIsLogin] = React.useState(false);
  const [isStartPoll, setIsStartPoll] = React.useState(false);

  return (
    <>
      {isLogin ? (
        <>
          {isStartPoll ? (
            <Encuesta></Encuesta>
          ) : (
            <ScreenWelcome setIsStartPoll={setIsStartPoll}> </ScreenWelcome>
          )}
          {/* <div>
            <a href="/formulario">Formulario</a>
          </div>

           */}
        </>
      ) : (
        <InicioSesion setIsLogin={setIsLogin}></InicioSesion>
      )}
    </>
  );
}

export default App;
