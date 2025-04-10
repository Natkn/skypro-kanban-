import "../src/assets/App.css";
import AppRoutes from "./AppRoutes.jsx";
import AuthProvider from "./components/context/AuthProvider.jsx";
import { TaskProvider } from "./components/context/TaskProvider.jsx";
import { useState, useEffect } from "react";

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

  return (
    <AuthProvider
      onLogin={handleLogin}
      onLogout={handleLogout}
      isLoggedIn={isLoggedIn}
    >
      <TaskProvider isLoggedIn={isLoggedIn}>
        <AppRoutes isLoggedIn={isLoggedIn} />
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
