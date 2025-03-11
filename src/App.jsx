import "../src/assets/App.css";
import { useState, useEffect } from "react";
import "./assets/darkTheme.css";
import Header from "./components/header/Header.jsx";
import PopNewCard from "./components/popnewcard/PopNewCard.jsx";
import Popbrowse from "./components/popbrowse/PopBrowse.jsx";
import Column from "./components/column/Column.jsx";
import PopExit from "./components/popexit/PopExit.jsx";
import { cardList } from "./mock/data.js";
import { theme } from "../src/mock/data.js";
import { ThemeProvider } from "styled-components";
function App() {
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

  const handleCreateTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: Date.now() }]);
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="wrapper">
          <PopExit />
          <PopNewCard onCreateTask={handleCreateTask} />
          <Popbrowse />
          <Header />
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
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
