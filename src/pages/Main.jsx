import styled from "styled-components";
import Header from "../components/header";
import { Outlet } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
`;

const MainPage = () => {
  return (
    <Container>
      <Header />
      <Outlet />
    </Container>
  );
};

export default MainPage;
