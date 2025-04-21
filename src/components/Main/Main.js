import styled from "styled-components";

const mobileMediaQuery = `@media screen and (max-width: 495px)`;

export const MainContainer = styled.div`
  max-width: 1260px;
  width: 100%;
  margin: 0 auto;
  padding: 0 30px;

  ${mobileMediaQuery} {
    width: 100%;
    padding: 0 16px;
  }
`;

export const MainBlock = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  margin: 0 auto;
  padding: 25px 0 49px;

  @media screen and (max-width: 660px) {
    width: 100%;

    display: flex;
    flex-wrap: wrap;
  }
`;
