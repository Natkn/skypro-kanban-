import { useState, useCallback } from "react";
import PropTypes from "prop-types";
import TaskContext from "../context/TaskContext";
import {
  getTasks as apiGetTasks,
  addTask as apiAddTask,
  updateTask as apiUpdateTask,
  deleteTask as apiDeleteTask,
} from "../../services/api";

const TaskProvider = ({ children, isLoggedIn }) => {
  const [tasks, setTasks] = useState([]);
  const [setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    if (!isLoggedIn) {
      setTasks([]); // Очищаем задачи, если пользователь не залогинен
      return;
    }
    try {
      const fetchedTasks = await apiGetTasks();
      setTasks(fetchedTasks);
    } catch (error) {
      setError(error);
    }
  }, [isLoggedIn]);

  const addTask = useCallback(async (newTask) => {
    try {
      const addedTask = await apiAddTask(newTask);
      // Проверяем данные
      setTasks((prevTasks) => [...prevTasks, addedTask]); // Обновляем состояние
    } catch (error) {
      setError(error);
      throw error;
    }
  }, []);

  const updateTask = useCallback(async (id, updatedTask) => {
    try {
      const updatedTaskFromServer = await apiUpdateTask(id, updatedTask); //Получаем обновленную задачу с сервера
      setTasks(
        (prevTasks) =>
          prevTasks.map((task) =>
            task.id === id ? updatedTaskFromServer : task
          ) // Обновляем задачу в массиве
      );
    } catch (error) {
      setError(error);
      throw error;
    }
  }, []);

  const deleteTask = useCallback(
    async (id) => {
      const taskIdString = String(id); // Приводим id к строке

      try {
        await apiDeleteTask(taskIdString); // Просто удаляем задачу на сервере
        setTasks((prevTasks) =>
          prevTasks.filter((task) => String(task._id) !== taskIdString)
        ); // Обновляем массив, удаляя задачу
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    },
    [setLoading]
  );

  const deleteTaskContext = async (taskId) => {
    // Передаем _id задачи
    {
      const updatedTasks = await deleteTask(taskId); // Передаем _id в API
      setTasks(updatedTasks.tasks);
    }
  };

  const value = {
    tasks,

    error,
    createTask: addTask,
    updateTask,
    deleteTask: deleteTaskContext,
    fetchTasks,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
TaskProvider.propTypes = {
  children: PropTypes.node.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
export { TaskProvider };
