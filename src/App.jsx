import "../src/assets/App.css";
import AppRoutes from "./AppRoutes.jsx";
import { ThemeProvider } from "../src/components/themecontent/themeProvider.jsx";
import AuthProvider from "./components/context/AuthProvider.jsx";
import { TaskProvider } from "./components/context/TaskProvider.jsx";
import { useState, useEffect } from "react";
//mport { ThemeContext } from "../src/components/themecontent/themeContext.js";
import { GlobalStyles } from "../src/assets/themes.js";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("authToken") ? true : false
  );

  useEffect(() => {
    // Check if the token exists on component mount
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token); // Set to true if token exists, false otherwise
  }, []); // Run only once on mount

  const handleLogin = () => {
    // Function to call after successful login
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Function to call after successful logout
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
  };

  // Добавь состояние theme
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme || "light";
  });

  // Добавь функцию toggleTheme
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
  );
}

export default App;
