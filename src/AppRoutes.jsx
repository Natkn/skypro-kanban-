import { Routes, Route } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import "./assets/darkTheme.css";
import Header from "./components/header/Header.jsx";
import PopNewCard from "./components/popnewcard/PopNewCard.jsx";
import Popbrowse from "./components/popbrowse/PopBrowse.jsx";
import Column from "./components/column/Column.jsx";
import PopExit from "./components/popexit/PopExit.jsx";
import { cardList } from "./mock/data.js";
import { theme } from "../src/mock/data.js";
import { ThemeProvider } from "styled-components";
import AuthForm from "./components/signup/SignUp.jsx";
import NotFoundPage from "../src/pages/NotFoundPage.jsx";

function AppRoutes() {
  const [isPopNewCardOpen, setIsPopNewCardOpen] = useState(false); // Состояние для контроля видимости

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const dataLoadTimer = setTimeout(() => {
      setTasks(cardList);
    }, 500);

    const loadingHideTimer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => {
      clearTimeout(dataLoadTimer);
      clearTimeout(loadingHideTimer);
    };
  }, []);
  // Оберните функцию в useCallback
  const openPopNewCardHandler = useCallback(() => {
    setIsPopNewCardOpen(true);
  }, [setIsPopNewCardOpen]);

  return (
    <ThemeProvider theme={theme}>
      <div className="wrapper">
        <Header openPopNewCard={openPopNewCardHandler} />
        <Routes>
          <Route path="/signup" element={<AuthForm isSignUp={true} />} />
          <Route path="/signin" element={<AuthForm isSignUp={false} />} />
          <Route
            path="/"
            element={
              <>
                <PopExit />
                <Popbrowse />
                <main className="main">
                  <div className="container">
                    <div className="main__block">
                      <Column
                        title={"Без статуса"}
                        tasks={tasks}
                        loading={loading}
                        status={"noStatus"}
                      />
                      <Column
                        title={"Нужно сделать"}
                        tasks={tasks}
                        loading={loading}
                        status={"needToDo"}
                      />
                      <Column
                        title={"В работе"}
                        tasks={tasks}
                        loading={loading}
                        status={"inProcess"}
                      />
                      <Column
                        title={"Тестирование"}
                        tasks={tasks}
                        loading={loading}
                        status={"test"}
                      />
                      <Column
                        title={"Готово"}
                        tasks={tasks}
                        loading={loading}
                        status={"ready"}
                      />
                    </div>
                  </div>
                </main>
              </>
            }
          />
          <Route path="*" element={<NotFoundPage />} /> {/* 404 Route */}
        </Routes>
        {isPopNewCardOpen && (
          <PopNewCard onClose={() => setIsPopNewCardOpen(false)} />
        )}
      </div>
    </ThemeProvider>
  );
}

export default AppRoutes;
