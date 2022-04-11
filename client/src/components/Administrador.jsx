import { useEffect, useState } from "react";
import host from "../const";
import styled from "styled-components";
import IconoVideo from "./IconoVideo";

const Template = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;

  header {
    position: fixed;
    top: 0;
    width: 100%;
    height: 80px;
    background: #aa9ceb;
  }
`;

const Encuestas = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 400px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

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

  useEffect(() => {
    getAllEncuestas();
  }, []);

  const getAllEncuestas = async () => {
    try {
      const response = await fetch(`${host.HOST}admin/encuestas`, {
        method: "GET",
      });
      const encuestas = await response.json();
      setEncuestas(encuestas.Items);
    } catch (error) {}
  };

  return (
    <Template>
      <header></header>
      <Encuestas>
        <div className="row">
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
  );
};

export default Administrador;
