import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
 * {
    font-family: 'Roboto', sans-serif;
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  *:before,
  *:after {
    box-sizing: border-box;
  }

  a,
  a:visited {
    text-decoration: none;
    cursor: pointer;
  }

  button,
  ._btn {
    cursor: pointer;
    outline: none;
  }

  ul li {
    list-style: none;
  }

  @keyframes card-animation {
    0% {
      height: 0;
      opacity: 0;
    }
    100% {
      height: auto;
      opacity: 1;
    }
  }

  body, html {
    width: 100%;
    font-family: "Roboto", Arial, Helvetica, sans-serif;
    background: ${({ theme }) => theme.wrapperTheme};
    color: ${({ theme }) => theme.textColor};
    transition: .3s ease;
  }

  h2 {
    color: ${({ theme }) => theme.headingColor};
  }

  .wrapper {
    background: ${({ theme }) => theme.wrapperTheme}; 
    position: relative;
    top: 0;
    left: 0;
    ; 
  }


  ._hover03:hover {
    background-color: ${({ theme }) => theme.primaryColor}; 
    color: ${({ theme }) => theme.textColorOnPrimary}; 
    border-color: ${({ theme }) => theme.primaryColor};
    ; 
  }
  ; 


.main {
  width: 100%;
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
  wrapperTheme: " #EAEEF6;",
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

export const getBackgroundColor = (theme, $topic) => {
  const isDarkTheme = theme.name === "dark";
  const defaultTheme = isDarkTheme ? darkThemeС : lightThemeС;
  const themeToUse = theme[$topic] ? theme : defaultTheme;
  return themeToUse[$topic]?.background || "transparent";
};

export const getTextColor = (theme, $topic) => {
  const isDarkTheme = theme.name === "dark";
  const defaultTheme = isDarkTheme ? darkThemeС : lightThemeС;
  const themeToUse = theme[$topic] ? theme : defaultTheme;
  return themeToUse[$topic]?.color || "black";
};

export const getBackgroundColorBrowse = (theme, themeName) => {
  const themeStyles = theme[themeName] || {};
  return themeStyles.background || "transparent";
};

export const getTextColorBrowse = (theme, themeName) => {
  const themeStyles = theme[themeName] || {};
  return themeStyles.color || "black";
};

export const lightThemeС = {
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
