import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";
import TaskContext from "../context/TaskContext";

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const addTask = (title, description) => {
    setTasks([...tasks, { id: uuidv4(), title, description }]);
  };

  const updateTask = (id, updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task))
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
TaskProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export { TaskProvider };
