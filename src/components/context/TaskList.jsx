import { useState, createContext } from "react";
import Card from "../card/Card";
import { useTasks } from "../context/UseTask";
import PopBrowse from "../popbrowse/PopBrowse";

export const CardContext = createContext(null);

function TaskList() {
  const { tasks } = useTasks();
  const [isPopBrowseOpen, setIsPopBrowseOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleCardButtonClick = (taskId) => {
    console.log("Button clicked!");
    const task = tasks.find((task) => task.id === taskId);
    setSelectedTask(task);
    console.log({ selectedTask });
    setIsPopBrowseOpen(true);
  };

  const handleClosePopBrowse = () => {
    setIsPopBrowseOpen(false);
    setSelectedTask(null);
  };

  return (
    <CardContext.Provider value={{ handleCardButtonClick }}>
      {" "}
      <>
        <ul>
          {tasks.map((task) => (
            <Card
              key={task.id}
              id={task.id}
              theme={task.theme}
              title={task.title}
              date={task.date}
              loading={false}
            />
          ))}
        </ul>
        {isPopBrowseOpen && (
          <PopBrowse task={selectedTask} onClose={handleClosePopBrowse} />
        )}
      </>
    </CardContext.Provider>
  );
}

export default TaskList;
