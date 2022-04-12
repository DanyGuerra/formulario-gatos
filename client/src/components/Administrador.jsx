import { useEffect, useState } from "react";
import host from "../const";
import styled from "styled-components";
import IconoVideo from "./IconoVideo";

const Template = styled.div`
  display: grid;
  width: 100%;
  height: 100vh;
  row-gap: 10px;
  column-gap: 40px;

  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(7, 1fr);

  header {
    grid-column-start: 1;
    grid-column-end: 6;
    grid-row-start: 1;
    grid-row-end: 2;
    background: #aa9ceb;
  }
  .l-side {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 2;
    grid-row-end: 6;
  }
  .r-side {
    grid-column-start: 5;
    grid-column-end: 6;
    grid-row-start: 2;
    grid-row-end: 6;
  }
  .title-1 {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 3;
    grid-row-end: 4;
    background: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
  .title-2 {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 4;
    grid-row-end: 5;
    /* background: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); */
  }
  .download-excel {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 5;
    grid-row-end: 6;
    display: flex;
    flex-direction: column-reverse;

    .btn-excel {
      height: 66px;
      border: 1px solid #000000;
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;

      #link-excel {
        text-decoration: none;
        color: black;
      }
    }
  }
  .filters {
    grid-column-start: 3;
    grid-column-end: 4;
    grid-row-start: 2;
    grid-row-end: 3;
    button {
      margin-right: 20px;
      background-color: white;
      border: 1px solid #000000;
      box-sizing: border-box;
      border-radius: 10px;
    }
  }
  .encuestas {
    grid-column-start: 3;
    grid-column-end: 4;
    grid-row-start: 3;
    grid-row-end: 6;
  }
  .pagination {
    grid-column-start: 3;
    grid-column-end: 4;
    grid-row-start: 6;
    grid-row-end: 7;
  }
  footer {
    grid-column-start: 1;
    grid-column-end: 5;
    grid-row-start: 7;
    grid-row-end: 8;
  }
`;

const Encuestas = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 400px;
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
    border-bottom: solid black 1px;
    display: grid;
    grid-template-columns: 20% 20% 60%;

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
  const [day, setDay] = useState(1);

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
    <Template>
      <header></header>
      <div className="filters">
        <button value={1} onClick={handleDayClick}>
          Dia 1
        </button>
        <button value={2} onClick={handleDayClick}>
          Dia 2
        </button>
      </div>
      <div className="l-side"></div>
      <div className="title-1">Numero total de encuestas</div>
      <div className="title-2"></div>
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

      <div className="r-side"></div>
      <div className="pagination"></div>
      <div className="download-excel">
        <div className="btn-excel">
          <a id="link-excel" href={`${host.HOST}admin/descargar-excel/${day}`}>
            Descargar excel
          </a>
        </div>
      </div>
      <footer></footer>
    </Template>
  );
};

export default Administrador;
