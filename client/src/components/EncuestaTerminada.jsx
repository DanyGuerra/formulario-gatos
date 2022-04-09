import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  header {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100px;
    background: #aa9ceb;
  }
`;

const EncuestaTerminada = () => {
  return (
    <Wrapper>
      <header></header>
      <div>Gracias por tu respuesta</div>
    </Wrapper>
  );
};

export default EncuestaTerminada;
