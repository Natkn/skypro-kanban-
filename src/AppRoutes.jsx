import { Routes, Route, Navigate } from "react-router-dom";
import "./assets/darkTheme.css";
import { useContext } from "react";
import AuthForm from "./components/signup/SignUp.jsx";
import NotFoundPage from "../src/pages/NotFoundPage.jsx";
import MainPage from "../src/pages/Main.jsx";
import { AuthContext } from "../src/components/context/AuthContext.js";

function AppRoutes() {
  const { user } = useContext(AuthContext); // Получаем user из AuthContext
  const isAuth = !!user; // Определяем isAuth на основе наличия user

  return (
    <div className="wrapper">
      <Routes>
        <Route
          path="/signup"
          element={<AuthForm isSignUp={true} />} // Убираем setIsAuth
        />
        <Route
          path="/signin"
          element={<AuthForm isSignUp={false} />} // Убираем setIsAuth
        />
        <Route
          path="/"
          element={isAuth ? <MainPage /> : <Navigate to="/signin" replace />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default AppRoutes;
