import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  name: "light",
  bodyBackgroundColor: "#ffffff",
  textColor: "#000000",
  cardBackgroundColor: "#ffffff",
  cardTitleColor: "#000000",
  buttonBackgroundColor: "#007bff",
  buttonTextColor: "#ffffff",
  HeaderPopUserSet: "#ffffff",
  HeaderPopUserSetboxShadow: "0px 10px 39px 0px rgba(26, 56, 101, 0.21)",
  HeaderBtnExitborder: "1px solid #565eef",
  HeaderBtnExitcolor: " #565eef",
  PopNewCardContainercolor: " #ffffff",
  StatusThemecolor: " #ffffff",
  wrapperTheme: "#D4DBE5",
};

export const darkTheme = {
  name: "dark",
  bodyBackgroundColor: "#000000",
  textColor: "#ffffff",
  cardBackgroundColor: "#20202C",
  cardTitleColor: "#ffffff",
  buttonBackgroundColor: "#007bff",
  buttonTextColor: "#ffffff",
  HeaderPopUserSet: "#202229",
  HeaderPopUserSetboxShadow: "0px 10px 39px 0px rgba(148, 166, 190, 0.4)",
  HeaderBtnExitborder: "1px solid #ffffff",
  HeaderBtnExitcolor: " #ffffff",
  PopNewCardContainercolor: " #20202C",
  StatusThemecolor: " #151419",
  wrapperTheme: "#000000",
};

export const GlobalStyles = createGlobalStyle`
  body, html {
    width: 100%;
  
    font-family: "Roboto", Arial, Helvetica, sans-serif;
    background: ${({ theme }) => theme.cardBackgroundColor};
    color: ${({ theme }) => theme.textColor};
    transition: .3s ease;
  }

  h2 {
    color: ${({ theme }) => theme.headingColor};
  }

  /* Добавьте стили для wrapper */
  .wrapper {
    background: ${({ theme }) =>
      theme.wrapperTheme}; /* Используем cardBackgroundColor для wrapper */
    position: relative;
    top: 0;
    left: 0;
    ; /* Добавили точку с запятой */
  }

  /* Добавьте стили для _hover03 */
  ._hover03:hover {
    background-color: ${({ theme }) =>
      theme.primaryColor}; /*  Используем primaryColor для hover */
    color: ${({ theme }) =>
      theme.textColorOnPrimary}; /*  Используем textColorOnPrimary для hover */
    border-color: ${({ theme }) =>
      theme.primaryColor}; /*  Используем primaryColor для hover */
    ; /* Добавили точку с запятой */
  }
  ; /* Добавили точку с запятой */

  .container {
  max-width: 1260px;
  width: 100%;
  margin: 0 auto;
  padding: 0 30px;
 
}

.main {
  width: 100%;
}
.main__block {
  display: flex;
  gap: 10px;
  width: 100%;
  margin: 0 auto;
  padding: 25px 0 49px;
}
.main__content {
  width: 100%;
  display: flex;
}
.main__column {
  margin: 0 auto;
  display: block;
}
`;

export const getBackgroundColor = (theme, cardtheme) => {
  // Определяем, какая тема сейчас активна (light или dark)
  const isDarkTheme = theme.name === "dark";
  // Выбираем тему по умолчанию в зависимости от того, какая сейчас активна
  const defaultTheme = isDarkTheme ? darkThemeС : lightThemeС;
  // Проверяем, есть ли тема для данного cardtheme
  const themeToUse = theme[cardtheme] ? theme : defaultTheme;
  return themeToUse[cardtheme]?.background || "transparent";
  // Возвращаем background или transparent, если background не найден
};

export const getTextColor = (theme, cardtheme) => {
  // Определяем, какая тема сейчас активна (light или dark)
  const isDarkTheme = theme.name === "dark";
  // Выбираем тему по умолчанию в зависимости от того, какая сейчас активна
  const defaultTheme = isDarkTheme ? darkThemeС : lightThemeС;
  // Проверяем, есть ли тема для данного cardtheme
  const themeToUse = theme[cardtheme] ? theme : defaultTheme;
  return themeToUse[cardtheme]?.color || "black"; // Возвращаем color или black, если color не найден
};

// helpers.js (или где у вас хранятся вспомогательные функции)
export const getBackgroundColorBrowse = (theme, themeName) => {
  const themeStyles = theme[themeName] || {}; // Получаем стили для темы или пустой объект
  return themeStyles.background || "transparent"; // Возвращаем цвет фона или transparent по умолчанию
};

export const getTextColorBrowse = (theme, themeName) => {
  const themeStyles = theme[themeName] || {}; // Получаем стили для темы или пустой объект
  return themeStyles.color || "black"; // Возвращаем цвет текста или black по умолчанию
};

export const lightThemeС = {
  // Обратите внимание: переименовано в lightTheme
  "Web Design": {
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

export const darkThemeС = {
  // Обратите внимание: переименовано в darkTheme
  "Web Design": {
    background: "#FF6D00",
    color: "#FFE4C2",
  },
  Research: {
    background: "#06B16E",
    color: "#B4FDD1",
  },
  Copywriting: {
    background: "#9A48F1",
    color: "#E9D4FF",
  },
};

/*export function getThemeStyles(themeName, themeMode) {
  const isDarkTheme = themeMode === "dark";
  const currentTheme = isDarkTheme ? darkThemeС : lightThemeС;
  console.log("themeMode:", themeMode); // Проверяем themeMode
  console.log("currentTheme:", currentTheme);
  switch (themeName) {
    case "Web Design":
      return (
        currentTheme["Web Design"] || {
          background: "transparent",
          color: "black",
        }
      );
    case "Research":
      return (
        currentTheme.Research || { background: "transparent", color: "black" }
      );
    case "Copywriting":
      return (
        currentTheme.Copywriting || {
          background: "transparent",
          color: "black",
        }
      );
    default:
      return { background: "transparent", color: "black" };
  }
}
*/
