import { Routes, Route } from "react-router-dom";
import "./assets/darkTheme.css";
import NotFoundPage from "../src/pages/NotFoundPage.jsx";
import MainPage from "../src/pages/Main.jsx";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SingUpPage.jsx";
import CardDetailPage from "./pages/CardDetailPage";
import AddTaskPage from "./pages/AddTaskPage";
import LogoutPage from "./pages/LogoutPage";
import PrivateRoute from "./pages/PrivateRoute.jsx";

function AppRoutes() {
  return (
    <div className="wrapper">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <MainPage />
            </PrivateRoute>
          }
        />{" "}
        <Route
          path="/card/:id"
          element={
            <PrivateRoute>
              <CardDetailPage />
            </PrivateRoute>
          }
        />{" "}
        <Route
          path="/add"
          element={
            <PrivateRoute>
              <AddTaskPage />
            </PrivateRoute>
          }
        />{" "}
        <Route
          path="/logout"
          element={
            <PrivateRoute>
              <LogoutPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default AppRoutes;
