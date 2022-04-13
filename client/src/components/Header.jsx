import LogoSUB from "./LogoSUB";
import styled from "styled-components";

const Wrapper = styled.div`
  header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background: #aa9ceb;
    display: flex;
    align-items: center;
    padding-left: 5%;
  }
`;

const Header = () => {
  return (
    <Wrapper>
      <header>
        <LogoSUB width={35} height={35}></LogoSUB>
      </header>
    </Wrapper>
  );
};

export default Header;
