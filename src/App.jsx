import "../src/assets/App.css";
import { useState, useEffect } from "react";
import "./assets/darkTheme.css";
import Header from "./components/header/Header.jsx";
import PopNewCard from "./components/popnewcard/PopNewCard.jsx";
import Popbrowse from "./components/popbrowse/PopBrowse.jsx";
import Column from "./components/column/Column.jsx";
import PopExit from "./components/popexit/PopExit.jsx";
import { cardList } from "./mock/data.js";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Имитируем загрузку данных
    const timer = setTimeout(() => {
      setTasks(cardList); // Устанавливаем tasks из cardList
      setLoading(false); // Отключаем загрузку
    }, 2000); // Имитация загрузки в течение 2 секунд

    return () => clearTimeout(timer); // Очищаем таймер при размонтировании
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
              <Column tasks={tasks} loading={loading} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
