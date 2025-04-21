import "../src/assets/App.css";
import AppRoutes from "./AppRoutes.jsx";
import { ThemeProvider } from "../src/themecontent/themeProvider.jsx";
import AuthProvider from "../src/context/AuthProvider.jsx";
import { TaskProvider } from "../src/context/TaskProvider.jsx";
import { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { GlobalStyles } from "../src/assets/themes.js";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("authToken") ? true : false
  );

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
  };

  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme || "light";
  });

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  }, [theme]);

  return (
    <DndProvider backend={HTML5Backend}>
      <ThemeProvider value={{ theme, toggleTheme }}>
        <GlobalStyles />

        <AuthProvider
          onLogin={handleLogin}
          onLogout={handleLogout}
          isLoggedIn={isLoggedIn}
        >
          <TaskProvider isLoggedIn={isLoggedIn}>
            <AppRoutes isLoggedIn={isLoggedIn} />
          </TaskProvider>
        </AuthProvider>
      </ThemeProvider>
    </DndProvider>
  );
}

export default App;
