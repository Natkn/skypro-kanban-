import "../src/assets/App.css";
import { useState, useEffect, useRef } from "react";
import "./assets/darkTheme.css";
import Header from "./components/header/Header.jsx";
import PopNewCard from "./components/popnewcard/PopNewCard.jsx";
import Popbrowse from "./components/popbrowse/PopBrowse.jsx";
import {
  ColumnStatus,
  ColumnToDo,
  ColumnInProcess,
  ColumnTest,
  ColumnReady,
} from "./components/column/Column.jsx";
import PopExit from "./components/popexit/PopExit.jsx";
import { cardList } from "./mock/data.js";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingRef = useRef(loading); // Создаем ref

  useEffect(() => {
    loadingRef.current = loading; // Обновляем ref при изменении loading
  }, [loading]);

  useEffect(() => {
    console.log("App.jsx - useEffect - Начало загрузки");
    setLoading(true); // Устанавливаем loading в true

    // Имитируем загрузку данных
    const timer = setTimeout(() => {
      console.log("App.jsx - useEffect - Загрузка завершена");
      setTasks(cardList); // Устанавливаем tasks из cardList
      setLoading(false); // Отключаем загрузку
      console.log(
        "App.jsx - useEffect - loadingRef.current:",
        loadingRef.current
      );
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  const handleCreateTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: Date.now() }]);
  };
  return (
    <>
      <div className="wrapper">
        <PopExit />
        <PopNewCard onCreateTask={handleCreateTask} />
        <Popbrowse />
        <Header />
        <main className="main">
          <div className="container">
            <div className="main__block">
              <ColumnStatus tasks={tasks} loading={loading} />
              <ColumnToDo tasks={tasks} loading={loading} />
              <ColumnInProcess tasks={tasks} loading={loading} />
              <ColumnTest tasks={tasks} loading={loading} />
              <ColumnReady tasks={tasks} loading={loading} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
