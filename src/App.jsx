import "../src/assets/App.css";
import { useState, useEffect } from "react";
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setTasks(cardList);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }, 500);

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
