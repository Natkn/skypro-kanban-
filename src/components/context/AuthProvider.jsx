import { useState, useCallback, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import PropTypes from "prop-types";
import { getUser } from "../../services/api";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Начинаем с isLoading = true
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Функция для получения данных пользователя (предполагается, что она у вас есть в services/auth.js)
  const loadUser = useCallback(async () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const userData = await getUser(); // Функция, которая получает данные пользователя на основе токена
        setUser(userData); // Сохраняем данные пользователя в состояние
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Ошибка при загрузке данных пользователя:", error);
        localStorage.removeItem("authToken");
        localStorage.removeItem("user"); // Также удаляем информацию о пользователе
        setIsLoggedIn(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser(); // Загружаем данные пользователя при монтировании компонента
  }, [loadUser]);

  const updateUserInfo = useCallback((userData) => {
    setUser(userData); // Просто обновляем состояние user
    localStorage.setItem("user", JSON.stringify(userData)); // Сохраняем user в localStorage
  }, []);

  const onLogin = useCallback(
    (userData) => {
      setIsLoggedIn(true);
      updateUserInfo(userData); // Обновляем информацию о пользователе и сохраняем ее в localStorage
    },
    [updateUserInfo]
  );

  const onLogout = useCallback(() => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
  }, []);

  const value = {
    user,
    isLoading,
    isLoggedIn,
    updateUserInfo,
    onLogin,
    onLogout,
  };

  return (
    <AuthContext.Provider value={value}>
      {isLoading ? <div>Загрузка...</div> : children}{" "}
      {/* Отображаем индикатор загрузки */}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
