import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import "./assets/darkTheme.css";
import AuthForm from "./components/signup/SignUp.jsx";
import NotFoundPage from "../src/pages/NotFoundPage.jsx";
import MainPage from "../src/pages/Main.jsx";

function AppRoutes() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <div className="wrapper">
      <Routes>
        <Route
          path="/signup"
          element={<AuthForm isSignUp={true} setIsAuth={setIsAuth} />}
        />
        <Route
          path="/signin"
          element={<AuthForm isSignUp={false} setIsAuth={setIsAuth} />}
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
