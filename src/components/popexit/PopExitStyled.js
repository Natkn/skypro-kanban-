import styled from "styled-components";

export const PopWrap = styled.div`
  position: relative;
  top: 0;
  left: 0;
`;

export const PopExitStyled = styled.div`
  display: none;
  &.active {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    z-index: 5;
  }

  min-width: 320px;
  min-height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
`;

export const PopExitContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const PopExitBlock = styled.div`
  display: block;
  margin: 0 auto;
  background-color: #ffffff;
  max-width: 370px;
  width: 100%;
  padding: 50px 60px;
  border-radius: 10px;
  border: 0.7px solid #d4dbe5;
  box-shadow: 0px 4px 67px -12px rgba(0, 0, 0, 0.13);
  background-color: ${(props) => props.theme.HeaderPopUserSet};
`;

export const PopExitTtl = styled.div`
  h2 {
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    line-height: 30px;
    letter-spacing: -0.4px;
    margin-bottom: 20px;
    border: ${(props) => props.theme.textColor};
  }
`;

export const PopExitExitYes = styled.button`
  width: 153px;
  height: 30px;
  background-color: #565eef;
  border-radius: 4px;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 21px;
  font-weight: 500;
  letter-spacing: -0.14px;
  color: #ffffff;
  margin-right: 10px;
  cursor: pointer;

  a {
    width: 100%;
    height: 100%;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
  }
`;

export const PopExitExitNo = styled.button`
  width: 153px;
  height: 30px;
  background-color: transparent;
  border-radius: 4px;
  border: 0.7px solid var(--palette-navy-60);
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 21px;
  font-weight: 500;
  letter-spacing: -0.14px;
  border: ${(props) => props.theme.HeaderBtnExitborder};

  cursor: pointer;

  a {
    width: 100%;
    height: 100%;
    color: ${(props) => props.theme.HeaderBtnExitcolor};
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
  }
`;

export const PopExitFormGroup = styled.div`
  width: 104%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
