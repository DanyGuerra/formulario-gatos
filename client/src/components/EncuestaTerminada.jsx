import styled from "styled-components";
import Header from "./Header";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #aa9ceb;
  @media (max-width: 768px) {
    align-items: flex-start;
    #mensaje {
      font-weight: 700;
      font-size: 30px;
      line-height: 40px;
      width: 20%;
      margin-left: 30%;
    }
  }
  .mensaje {
    text-align: center;
    font-family: "Sen";
    font-style: normal;
    font-weight: 700;
    font-size: 50px;
    line-height: 60px;
    width: 40%;
  }
`;

const EncuestaTerminada = () => {
  return (
    <>
      <Header></Header>
      <Wrapper>
        <div className="mensaje" id="mensaje">
          ¡GRACIAS POR TUS RESPUESTAS!
        </div>
      </Wrapper>
    </>
  );
};

export default EncuestaTerminada;
