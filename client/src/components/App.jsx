import InicioSesion from "./InicioSesion";
import React from "react";
import ScreenWelcome from "./ScreenWelcome";

function App() {
  const [isLogin, setIsLogin] = React.useState(false);

  return (
    <>
      {isLogin ? (
        <>
          <ScreenWelcome> </ScreenWelcome>
          <div>
            <a href="http://localhost:5000/formulario">Formulario</a>
          </div>

          <form method="POST" action="/subir" enctype="multipart/form-data">
            <input type="file" name="file" id="input-video" accept="video/*" />
            <button type="submit" id="btn_subir">
              Subir
            </button>
          </form>
        </>
      ) : (
        <InicioSesion setIsLogin={setIsLogin}></InicioSesion>
      )}
    </>
  );
}

export default App;
