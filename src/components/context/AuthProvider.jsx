import { useState, useCallback, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import PropTypes from "prop-types";
import { getUser } from "../../services/api";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  console.log("AuthContext user (initial):", user);
  const [isLoading, setIsLoading] = useState(true); // Начинаем с isLoading = true
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Функция для получения данных пользователя (предполагается, что она у вас есть в services/auth.js)
  const loadUser = useCallback(async () => {
    setIsLoading(true);
    try {
      const { isLoggedIn, user } = await getUser();
      console.log("Load user", user);

      if (isLoggedIn && user) {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user)); // Сохраняем пользователя в localStorage
        setIsLoggedIn(true);
      } else {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        setUser(null);
      }
    } catch (error) {
      console.error("Ошибка при загрузке данных пользователя:", error);
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const updateUserInfo = useCallback((userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // Сохраняем user в localStorage
  }, []);

  const onLogin = useCallback((userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  }, []);

  const onLogout = useCallback(() => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
  }, []);

  const value = {
    isLoggedIn,
    onLogin,
    onLogout,
    isLoading,
    user,
    updateUserInfo,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
