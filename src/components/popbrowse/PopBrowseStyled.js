import styled from "styled-components";
import { css } from "styled-components";
import {
  getTextColorBrowse,
  getBackgroundColorBrowse,
} from "../../assets/themes";

export const PopBrowseContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-width: 375px;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PopBrowseWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
`;

export const PopBrowseBlock = styled.div`
  display: block;
  margin: 0 auto;
  background-color: ${(props) => props.theme.PopNewCardContainercolor};

  max-width: 630px;
  width: 100%;
  padding: 40px 30px 38px;
  border-radius: 10px;
  border: 0.7px solid #d4dbe5;
  position: relative;
`;

export const PopBrowseContent = styled.div`
  display: block;
  text-align: left;

  .categories__theme {
    opacity: 1;
  }

  .theme-down {
    display: none;
    margin-bottom: 20px;
  }

  .theme-top {
    display: block;
  }
`;

export const PopBrowseTopBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
`;

export const PopBrowseTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  color: ${(props) => props.theme.textColor};
`;

export const PopBrowseTitleTheme = styled.div`
  font-family: Roboto;
  padding: 5px 14px;
  font-weight: 600;
  font-size: 14px;
  line-height: 14.21px;
  letter-spacing: 0%;
  text-align: center;
  width: 115;
  height: 30;
  border-radius: 24px;
  padding-top: 8px;
  padding-right: 20px;
  padding-bottom: 8px;
  padding-left: 20px;

  background-color: ${({ theme, themename }) =>
    getBackgroundColorBrowse(theme, themename)};
  color: ${({ theme, themename }) => getTextColorBrowse(theme, themename)};

  p {
    color: ${({ theme, themename }) => getTextColorBrowse(theme, themename)};
    margin: 0;
  }
`;

export const PopBrowseWrap = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const PopBrowseForm = styled.form`
  max-width: 370px;
  width: 100%;
  display: block;
  margin-bottom: 20px;
`;

export const PopBrowseBtnBrowse = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;

  button {
    height: 30px;
    margin-bottom: 10px;
    margin-right: 8px;
    padding: 0 14px;
    border: ${(props) => props.theme.HeaderBtnExitborder};
    color: ${(props) => props.theme.HeaderBtnExitcolor};
  }

  .btn-group button {
    margin-right: 8px;
  }
`;
export const BtnBorb = styled.div`
  display: flex;
  flex-direction: row;
  font-weight: 400;
  font-size: 14px;
  line-height: 10px;
  letter-spacing: -2%;
`;

export const BtnBc = styled.div`
  display: flex;
  font-weight: 400;
  font-size: 14px;
  line-height: 10px;
  letter-spacing: -2%;
  background: #565eef;
  color: #ffffff;
  height: 30px;
  width: 86px;
  align-content: center;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-around;
  border-radius: 4px;
`;

export const FormBrowseBlock = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 600;
  width: 136;
  height: 30;
  border-radius: 24px;
  padding-right: 14px;
  padding-bottom: 10px;
  padding-left: 14px;
`;

export const FormBrowseArea = styled.textarea`
  width: 100%;
  outline: none;
  padding: 14px;
  background-color: ${(props) => props.theme.PopNewCardContainercolor};
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  border-radius: 8px;
  font-size: 14px;
  line-height: 1;
  letter-spacing: -0.14px;
  margin-top: 14px;
  height: 200px;
  color: ${(props) => props.theme.textColor};

  &::-moz-placeholder {
    font-weight: 400;
    font-size: 14px;
    line-height: 1px;
    color: #94a6be;
    padding-top: 14px;
    font-family: Roboto;
    line-height: 100%;
    letter-spacing: 0%;
  }

  &::placeholder {
    font-weight: 400;
    font-size: 14px;
    line-height: 1px;
    color: #94a6be;
    padding-top: 14px;
    font-family: Roboto;
    line-height: 100%;
    letter-spacing: 0%;
  }
`;

export const Status = styled.div`
  margin-bottom: 11px;
`;

export const StatusP = styled.p`
  margin-bottom: 14px;
  font-weight: 600;
`;

export const StatusThemes = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const StatusTheme = styled.div`
  border-radius: 24px;
  height: 30px;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  color: #94a6be;
  padding: 8px 16px 10px;
  margin-right: 8px;
  color: #fff;
  background-color: #94a6be;
  display: ${(props) => (props.$ishide === "true" ? "none" : "block")};
  p {
    font-size: 14px;
    line-height: 1;
    letter-spacing: -0.14px;
    color: ${(props) => props.theme.StatusThemecolor};
  }

  ${(props) =>
    props.isgray &&
    css`
      color: gray;
    `}
`;

export const BtnBor = styled.button`
  border-radius: 4px;
  border: 0.7px solid var(--palette-navy-60, #565eef);
  outline: none;
  background: transparent;
  color: #565eef;

  a {
    color: #565eef;
  }

  &:hover {
    background-color: #565eef;
    color: #fff;
    a {
      color: #fff;
    }
  }
`;

export const BtnBg = styled.button`
  border-radius: 4px;
  background: #565eef;
  border: none;
  outline: none;
  color: #ffffff;

  a {
    color: #ffffff;
  }
`;

export const Hide = styled.div`
  display: none;
`;
