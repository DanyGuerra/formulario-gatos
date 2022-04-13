import InicioSesion from "./InicioSesion";
import React from "react";
import SubirVideo from "./SubirVideo";
import Encuesta from "./Encuesta";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EncuestaTerminada from "./EncuestaTerminada";
import Administrador from "./Administrador";
import InicioAdmin from "./InicioAdmin";

function App() {
  const [isLogin, setIsLogin] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [respuestas, setRespuestas] = React.useState([]);
  const [usuario, setUsuario] = React.useState("");
  const [day, setDay] = React.useState(0);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <InicioSesion
              setIsLogin={setIsLogin}
              isLogin={isLogin}
              setUsuario={setUsuario}
              setDay={setDay}
            />
          }
        />
        <Route
          path="/encuesta"
          element={
            isLogin ? (
              <Encuesta
                isLogin={isLogin}
                setRespuestas={setRespuestas}
                day={day}
              />
            ) : (
              <></>
            )
          }
        />

        <Route
          path="/encuesta/video"
          element={
            isLogin ? (
              <SubirVideo
                respuestas={respuestas}
                usuario={usuario}
                day={day}
              ></SubirVideo>
            ) : (
              <></>
            )
          }
        />

        <Route path="/encuesta/terminada" element={<EncuestaTerminada />} />
        <Route
          path="/administrador"
          element={
            <InicioAdmin
              setIsAdmin={setIsAdmin}
              isAdmin={isAdmin}
            ></InicioAdmin>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
