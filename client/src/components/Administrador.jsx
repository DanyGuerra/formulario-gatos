import { useEffect, useState } from "react";
import host from "../const";
import styled from "styled-components";
import IconoVideo from "./IconoVideo";
import Header from "./Header";

const Template = styled.div`
  margin-top: 80px;
  display: flex;
  width: 100%;
  row-gap: 10px;
  column-gap: 40px;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  font-family: "Sen";

  .title {
    width: 60%;
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
  }
  .filters {
    width: 60%;
    display: flex;
    justify-content: space-between;
    .day {
      .active {
        color: white;
        width: 80px;
        height: 40px;
        background: #260f5d;
        border-radius: 4px;
      }
      button {
        color: black;
        width: 80px;
        height: 40px;
        background: white;
        border-radius: 4px;
        border: none;
      }
    }

    .download-excel {
      width: 160px;
      height: 40px;
      border: 1px solid #aa9ceb;
      box-sizing: border-box;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      a {
        font-family: "Inter";
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        color: #aa9ceb;
        text-decoration: none;
      }
    }
  }
`;

const Encuestas = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  height: 60vh;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  overflow-y: scroll;
  overflow-x: hidden;

  .header {
    background-color: #ffffff;
    position: sticky;
    top: 0;
  }

  .row:last-child {
    border-bottom: none;
  }
  .row {
    margin: 0;
    box-sizing: border-box;
    padding: 10px;
    width: 100%;
    height: 60px;
    border-bottom: 1px solid #dee2e6;
    display: grid;
    grid-template-columns: 40% 20% 40%;

    .item {
      .icon {
        display: inline;
        margin-bottom: 10px;

        :hover {
          cursor: pointer;
        }
      }
      span {
        margin-left: 10px;
        padding-top: 10px;
      }
    }
  }
`;

const Administrador = () => {
  const [encuestas, setEncuestas] = useState([]);
  const [day, setDay] = useState("1");

  useEffect(() => {
    getAllEncuestas();
  }, []);

  const getAllEncuestas = async () => {
    try {
      const response = await fetch(`${host.HOST}admin/encuestas/1`, {
        method: "GET",
      });
      const encuestas = await response.json();
      setEncuestas(encuestas.Items);
    } catch (error) {}
  };

  const handleDayClick = async (e) => {
    const dia = e.target.value;
    setDay(dia);
    try {
      const response = await fetch(`${host.HOST}admin/encuestas/${dia}`, {
        method: "GET",
      });
      const encuestasDia = await response.json();
      setEncuestas(encuestasDia.Items);
    } catch (error) {}
  };

  return (
    <>
      <Header></Header>
      <Template>
        <div className="title">
          <h1> Administrador</h1>
        </div>
        <div className="filters">
          <div className="day">
            <button
              className={`${day === "1" ? "active" : ""}`}
              value={1}
              onClick={handleDayClick}
            >
              Dia 1
            </button>
            <button
              className={`${day === "2" ? "active" : ""}`}
              value={2}
              onClick={handleDayClick}
            >
              Dia 2
            </button>
          </div>

          <div className="download-excel">
            <div className="btn-excel">
              <a
                id="link-excel"
                href={`${host.HOST}admin/descargar-excel/${day}`}
              >
                Descargar excel
              </a>
            </div>
          </div>
        </div>

        <Encuestas className="encuestas">
          <div className="row header">
            <div className="item">Usuario</div>
            <div className="item">Encuesta</div>
            <div className="item">Video</div>
          </div>

          {encuestas.map((item, index) => {
            return (
              <>
                <div key={item.user} className="row">
                  <div className="item">{item.user}</div>
                  <div className="item">{item.day}</div>
                  <div className="item">
                    <div className="icon">
                      <a href={`${host.HOST}download/${item.videoInfo.Key}`}>
                        <IconoVideo></IconoVideo>
                      </a>
                    </div>
                    <span>{item.videoInfo.Key}</span>
                  </div>
                </div>
              </>
            );
          })}
        </Encuestas>
      </Template>
    </>
  );
};

export default Administrador;
