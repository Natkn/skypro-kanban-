import styled from "styled-components";

export const PopNewCardWrapper = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const PopNewCardContainer = styled.div`
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

export const PopNewCardBlock = styled.div`
  display: block;
  margin: 0 auto;
  background-color: ${(props) => props.theme.PopNewCardContainercolor};
  max-width: 630px;
  width: 100%;
  padding: 40px 30px 48px;
  border-radius: 10px;
  border: 0.7px solid #d4dbe5;
  position: relative;
`;

export const PopNewCardContent = styled.div`
  display: block;
  text-align: left;
`;

export const PopNewCardTtl = styled.h3`
  color: ${(props) => props.theme.textColor};
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  margin-bottom: 24px;
`;

export const PopNewCardClose = styled.a`
  position: absolute;
  top: 20px;
  right: 30px;
  color: #94a6be;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.textColor};
  }
`;

export const PopNewCardWrap = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const PopNewCardForm = styled.form`
  max-width: 370px;
  width: 100%;
  display: block;
`;

export const FormNewBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const FormNewInput = styled.input`
  color: ${(props) => props.theme.textColor};
  width: 100%;
  outline: none;
  padding: 14px;
  background: transparent;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  border-radius: 8px;
  font-size: 14px;
  line-height: 1;
  letter-spacing: -0.14px;

  &::placeholder {
    font-weight: 400;
    font-size: 14px;
    line-height: 1px;
    color: #94a6be;
    letter-spacing: -0.14px;
    padding: 6px;
  }
`;

export const FormNewArea = styled.textarea`
  color: ${(props) => props.theme.textColor};
  width: 100%;
  outline: none;
  padding: 14px;
  background: transparent;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  border-radius: 8px;
  font-size: 14px;
  line-height: 1;
  letter-spacing: -0.14px;
  max-width: 370px;
  height: 200px;

  &::placeholder {
    font-weight: 400;
    font-size: 14px;
    line-height: 1px;
    color: #94a6be;
    letter-spacing: -0.14px;
    padding: 6px;
  }
`;

export const FormNewCreate = styled.button`
  height: 30px;
  background-color: #565eef;
  border-radius: 4px;
  border: 0;
  outline: none;
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  color: #ffffff;
  float: right;
  cursor: pointer;
`;

export const Subttl = styled.label`
  color: ${(props) => props.theme.textColor};
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  margin-bottom: 20px;
`;

export const CategoriesP = styled.p`
  color: ${(props) => props.theme.textColor};
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  margin-bottom: 14px;
`;

export const CategoriesThemes = styled.div`
  font-family: Roboto;
  font-weight: 600;
  font-size: 14px;
  line-height: 14.21px;
  letter-spacing: 0%;
  text-align: center;
  height: 30px;
  display: flex;
`;

export const CategoriesTheme = styled.div`
  padding: 7px 14px;
  border-radius: 14px;
  border: 0.7px solid #94a6be;
  margin-right: 10px;
  cursor: pointer;

  color: ${(props) => {
    if (props.$active) {
      return props.theme[props.$category].color;
    } else {
      return "#94a6be"; // Цвет для неактивных элементов всегда
    }
  }};

  background-color: ${(props) => {
    if (props.$active) {
      return props.theme[props.$category].background;
    } else {
      //  фон для *всех* неактивных элементов используем значения из *текущей* темы
      switch (props.$category) {
        case "Research":
          return props.theme.Research.background;
        case "Copywriting":
          return props.theme.Copywriting.background;
        case "WebDesign":
          return props.theme.WebDesign.background;
        default:
          return "transparent"; // Прозрачный по умолчанию
      }
    }
  }};

  opacity: ${(props) => (props.$active ? "100%" : "40%")};
  border-color: #94a6be;
`;

export const theme = {
  WebDesign: {
    background: "#FFE4C2",
    color: "#FF6D00",
  },
  Research: {
    background: "#B4FDD1",
    color: "#06B16E",
  },
  Copywriting: {
    background: "#E9D4FF",
    color: "#9A48F1",
  },
};

export const themeD = {
  WebDesign: {
    background: "#FF6D00",
    text: "#FFE4C2",
  },
  Research: {
    background: "#06B16E",
    text: "#B4FDD1",
  },
  Copywriting: {
    background: "#9A48F1",
    text: "#E9D4FF",
  },
};
