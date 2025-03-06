import "./App.css";
import { useState, useEffect } from "react";
import "./darkTheme.css";
import Header from "./src/components/header/Header.jsx";
import PopNewCard from "./src/components/popnewcard/PopNewCard.jsx";
import Popbrowse from "./src/components/popbrowse/PopBrowse.jsx";
import Column from "./src/components/column/Column.jsx";
import PopExit from "./src/components/popexit/PopExit.jsx";
import { ThemeProvider } from "./src/components/themecontent/themeProvider.jsx";
import { cardList } from "./data.js";

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
        <ThemeProvider />
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
