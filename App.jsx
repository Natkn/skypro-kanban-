import "./App.css";
import { useState } from "react";
import "./darkTheme.css";
import Header from "./src/components/Header";
import PopNewCard from "./src/components/PopNewCard";
import Popbrowse from "./src/components/PopBrowse";
import Column from "./src/components/Column";
import PopExit from "./src/components/PopExit";
import ThemeProvider from "./src/components/themeContent";

function App() {
  const [tasks, setTasks] = useState([]);

  const handleCreateTask = (newTask) => {
    setTasks([...tasks, newTask]);
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
              <Column tasks={tasks} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
