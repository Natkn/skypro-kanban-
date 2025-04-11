import { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import TaskContext from "../context/TaskContext";
import {
  getTasks,
  addTask as apiAddTask,
  updateTask as apiUpdateTask,
  deleteTask as apiDeleteTask,
} from "../../services/api";

const TaskProvider = ({ children, isLoggedIn }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Ошибка при загрузке задач:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetchTasks();
    }
  }, [fetchTasks, isLoggedIn]);

  const addTask = useCallback(async (newTask) => {
    try {
      const addedTask = await apiAddTask(newTask);
      localStorage.setItem("lastSyncDate", new Date().toISOString());
      setTasks((prevTasks) => [...prevTasks, addedTask]); // Обновляем состояние
    } catch (error) {
      console.error("Ошибка при добавлении задачи:", error);
      setError(error);
      throw error;
    }
  }, []);

  const updateTask = useCallback(async (id, updatedTask) => {
    try {
      const updatedTaskFromServer = await apiUpdateTask(id, updatedTask);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id ? updatedTaskFromServer : task
        )
      );
    } catch (error) {
      console.error(`Ошибка при обновлении задачи с ID ${id}:`, error);
      setError(error);
      throw error;
    }
  }, []);

  const deleteTask = useCallback(
    async (id) => {
      try {
        await apiDeleteTask(id); // Просто удаляем задачу на сервере
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id)); // Обновляем массив, удаляя задачу
      } catch (error) {
        console.error("Ошибка при удалении задачи:", error);
        setError(error);
        throw error;
      }
    },
    [] // Убрали зависимости, т.к. setTasks не меняется
  );

  const value = {
    tasks,
    loading,
    error,
    createTask: addTask,
    updateTask,
    deleteTask,
    fetchTasks,
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchTasks();
    }
  }, [fetchTasks, isLoggedIn]);
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
TaskProvider.propTypes = {
  children: PropTypes.node.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
export { TaskProvider };
