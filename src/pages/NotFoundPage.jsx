import styled from "styled-components";
import HeaderLogo from "../components/header/HeaderLogo";
import logo from "../../public/images/logo.png";
import logodark from "../../public/images/logo_dark.png";
const headerLogoStyle = {
  height: "70px",
  paddingLeft: "50px",
  paddingTop: "30px",
};

const NotPagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 94vh;
  width: 100vw;
  justify-content: center;
  background-color: #bdc0c3;
`;

const NotPageText = styled.div`
  display: flex;
  justify-content: center;
  font-family: "Helvetica", sans-serif;
  font-size: 24px;
  font-weight: 600;
  line-height: 1;
  text-transform: uppercase;
`;

const NotFoundPage = () => {
  return (
    <>
      <div style={headerLogoStyle}>
        <HeaderLogo logo={logo} logodark={logodark} />
      </div>
      <NotPagesContainer>
        <h1>404</h1>
        <NotPageText>Страница не найдена</NotPageText>
      </NotPagesContainer>
    </>
  );
};

export default NotFoundPage;
