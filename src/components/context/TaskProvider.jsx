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
      const updatedTasks = await apiAddTask(newTask); // Используем API-функцию
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Ошибка при добавлении задачи:", error);
      setError(error);
      throw error; //  Re-throw the error to be caught in PopNewCard
    }
  }, []);

  const updateTask = useCallback(async (id, updatedTask) => {
    try {
      const updatedTasks = await apiUpdateTask(id, updatedTask); // Используем API-функцию
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Ошибка при обновлении задачи:", error);
      setError(error);
      throw error; // Re-throw the error to be caught in PopBrowse
    }
  }, []);

  const deleteTask = useCallback(async (id) => {
    try {
      const updatedTasks = await apiDeleteTask(id); // Используем API-функцию
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Ошибка при удалении задачи:", error);
      setError(error);
      throw error; //  Re-throw the error to be caught in PopBrowse
    }
  }, []);

  const createTask = useCallback(
    async (newTask) => {
      try {
        await addTask(newTask); // Вызываем обернутую API-функцию
      } catch (error) {
        console.error("Ошибка при добавлении задачи:", error);
        setError(error);
        throw error; //  Re-throw the error to be caught in PopNewCard
      }
    },
    [addTask]
  );

  const updateTaskContext = useCallback(
    async (id, updatedTask) => {
      try {
        await updateTask(id, updatedTask); // Вызываем обернутую API-функцию
      } catch (error) {
        console.error("Ошибка при обновлении задачи:", error);
        setError(error);
        throw error; // Re-throw the error to be caught in PopBrowse
      }
    },
    [updateTask]
  );

  const deleteTaskContext = useCallback(
    async (id) => {
      try {
        await deleteTask(id); // Вызываем обернутую API-функцию
      } catch (error) {
        console.error("Ошибка при удалении задачи:", error);
        setError(error);
        throw error; //  Re-throw the error to be caught in PopBrowse
      }
    },
    [deleteTask]
  );

  const value = {
    tasks,
    loading,
    error,
    createTask,
    updateTask: updateTaskContext,
    deleteTask: deleteTaskContext,
    fetchTasks,
  };

  useEffect(() => {
    const delay = 500; // Задержка в миллисекундах (например, 500 мс)
    const timeoutId = setTimeout(() => {
      fetchTasks();
    }, delay);

    return () => clearTimeout(timeoutId); // Очистка timeout при размонтировании компонента
  }, [fetchTasks]);

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
TaskProvider.propTypes = {
  children: PropTypes.node.isRequired,
  isLoggedIn: PropTypes.node.isRequired,
};
export { TaskProvider };
