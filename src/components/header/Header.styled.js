import styled from "styled-components";

export const HeaderItem = styled.div`
  width: 100%;
  margin: 0 auto;
  background-color: #ffffff;
`;

export const HeaderBlock = styled.div`
  height: 70px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  position: relative;
  top: 0;
  left: 0;
  padding: 0 10px;
`;

export const HeaderLogo = styled.div`
  &._hidden {
    display: none;
  }
`;

export const LogoImage = styled.img`
  width: 85px;
  height: auto;
`;

export const HeaderLogoDark = styled.div`
  display: none;
  &._show {
    display: block;
  }
`;

export const HeaderNav = styled.nav`
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

export const HeaderBtn = styled.div`
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HeaderBtnMainNew = styled.button`
  height: 30px;
  border-radius: 4px;
  background-color: #565eef;
  color: #ffffff;
  border: none;
  font-size: 14px;
  line-height: 1;
  font-weight: 500;
  cursor: pointer;
  padding: 0 14px;
  transition: background-color 0.2s ease;

  a {
    color: #ffffff;
    text-decoration: none;
  }

  &:hover {
    background-color: #33399b;
  }
`;

export const HeaderUser = styled.button`
  height: 10px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 20px;
  color: #565eef;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0 14px;
  transition: color 0.2s ease;

  &::after {
    content: "";
    display: block;
    width: 6px;
    height: 6px;
    border-radius: 1px;
    border-left: 1.9px solid #565eef;
    border-bottom: 1.9px solid #565eef;
    transform: rotate(-45deg);
    margin: -6px 0 0 5px;
    padding: 0;
    transition: border-color 0.2s ease;
  }

  &:hover {
    color: #33399b;

    &::after {
      border-left-color: #33399b;
      border-bottom-color: #33399b;
    }
  }
`;

export const HeaderPopUserSet = styled.div`
  position: absolute;
  top: 61px;
  right: 0;
  width: 213px;
  height: 205px;
  border-radius: 10px;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  background: #fff;
  box-shadow: 0px 10px 39px 0px rgba(26, 56, 101, 0.21);
  padding: 34px;
  text-align: center;
  z-index: 2;
  flex-direction: column;
  gap: 10px;
  display: flex;
  align-items: center;
`;

export const PopUserSetName = styled.p`
  color: #000;
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: -0.14px;
`;

export const PopUserSetMail = styled.p`
  color: #94a6be;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.14px;
  margin-top: -5px;
`;

export const PopUserSetTheme = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  gap: 30px;
`;

export const ThemeToggleLabel = styled.p`
  color: #000;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.14px;
`;

export const ThemeToggleButton = styled.input`
  position: relative;
  width: 24px;
  height: 13px;
  border-radius: 100px;
  background: #eaeef6;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    top: 1px;
    left: 1px;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background-color: #94a6be;
    transition: 0.5s;
  }

  &:checked::before {
    left: 12px;
  }
`;

export const HeaderBtnExit = styled.button`
  width: 72px;
  height: 30px;
  padding: 4px 14px;
  background: transparent;
  color: #565eef;
  border-radius: 4px;
  border: 1px solid #565eef;
  font-size: 14px;
  transition: all 0.2s ease;

  &:hover {
    background-color: #565eef;
    color: #ffffff;
  }
`;
