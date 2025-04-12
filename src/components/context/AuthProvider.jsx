import { useState, useCallback, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import PropTypes from "prop-types";

export const AuthProvider = ({ children }) => {
  const [user] = useState(null);
  console.log("AuthContext user (initial):", user);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("authToken") ? true : false
  );
  const [userInfo, setUserInfo] = useState(null);

  const fetchUserInfo = useCallback(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      try {
        setUserInfo(JSON.parse(storedUserInfo));
      } catch (error) {
        console.error("Ошибка при парсинге userInfo из localStorage:", error);
        // Очищаем некорректные данные
        localStorage.removeItem("userInfo");
        setUserInfo(null);
      }
    }
  }, []);

  const handleLogin = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userInfo");
    setIsLoggedIn(false);
    setUserInfo(null);
  }, []);

  const updateUserInfo = useCallback((userData) => {
    setUserInfo(userData);
    localStorage.setItem("userInfo", JSON.stringify(userData));
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserInfo();
    }
  }, [isLoggedIn, fetchUserInfo]); //fetchUserInfo добавлена как зависимость

  // Загружаем userInfo при первом рендере
  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  const value = {
    isLoggedIn,
    onLogin: handleLogin,
    onLogout: handleLogout,
    userInfo,
    updateUserInfo,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
