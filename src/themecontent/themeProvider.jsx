import { useState, useEffect } from "react";
import { ThemeContext } from "../themecontent/themeContext";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../assets/themes";
import PropTypes from "prop-types";
import { lightThemeС, darkThemeС } from "../assets/themes";

const getThemeFromLocalStorage = () => {
  const storedTheme = localStorage.getItem("theme");
  return storedTheme || "light";
};

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState(getThemeFromLocalStorage);

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    localStorage.setItem("theme", themeMode);
    document.body.classList.toggle("dark-theme", themeMode === "dark");
  }, [themeMode]);

  const themeObject = themeMode === "light" ? lightTheme : darkTheme;
  const themes = {
    light: lightThemeС,
    dark: darkThemeС,
  };
  const themeWithMode = { ...themeObject, name: themeMode };

  return (
    <ThemeContext.Provider
      value={{ theme: themeWithMode, toggleTheme, themeMode, themes }}
    >
      <StyledThemeProvider theme={themeWithMode}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default ThemeProvider;
