import { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import TaskContext from "../context/TaskContext";
import {
  getTasks,
  addTask as apiAddTask,
  deleteTask as apiDeleteTask,
} from "../../services/api";
import { useAuth } from "../context/AuthContext";

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isLoggedIn } = useAuth();

  const fetchTasks = useCallback(async () => {
    if (!isLoggedIn) {
      setTasks([]); // Очищаем задачи, если пользователь не залогинен
      return;
    }

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
  }, [isLoggedIn]); // Добавили isLoggedIn в зависимость

  useEffect(() => {
    fetchTasks(); // Загружаем задачи при монтировании и изменении isLoggedIn
  }, [fetchTasks]);

  const addTask = useCallback(async (newTask) => {
    try {
      const addedTask = await apiAddTask(newTask);
      // Проверяем данные
      setTasks((prevTasks) => [...prevTasks, addedTask]); // Обновляем состояние
    } catch (error) {
      console.error("Ошибка при добавлении задачи:", error);
      setError(error);
      throw error;
    }
  }, []);

  const updateTask = useCallback(
    async (id, updatedTask) => {
      try {
        const updatedTaskFromServer = await (id, updatedTask); //Получаем обновленную задачу с сервера
        setTasks(
          (prevTasks) =>
            prevTasks.map((task) =>
              task.id === id ? updatedTaskFromServer : task
            ) // Обновляем задачу в массиве
        );
      } catch (error) {
        console.error("Ошибка при обновлении задачи:", error);
        setError(error);
        throw error;
      }
    },
    [] // Убрали зависимости, т.к. setTasks не меняется
  );

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

  const createTask = useCallback(
    async (newTask) => {
      try {
        await addTask(newTask);
      } catch (error) {
        console.error("Ошибка при добавлении задачи:", error);
        setError(error);
        throw error;
      }
    },
    [addTask]
  );

  const updateTaskContext = useCallback(
    async (id, updatedTask) => {
      try {
        await updateTask(id, updatedTask);
      } catch (error) {
        console.error("Ошибка при обновлении задачи:", error);
        setError(error);
        throw error;
      }
    },
    [updateTask]
  );

  const deleteTaskContext = useCallback(
    async (id) => {
      try {
        await deleteTask(id);
      } catch (error) {
        console.error("Ошибка при удалении задачи:", error);
        setError(error);
        throw error;
      }
    },
    [deleteTask]
  );
  const deleteAllTasks = useCallback(async () => {
    for (const task of tasks) {
      try {
        await deleteTask(task.id);
      } catch (error) {
        console.error(`Ошибка при удалении задачи с ID ${task.id}:`, error);
        // Обработайте ошибки удаления отдельной задачи, например, отобразите сообщение об ошибке.
      }
    }
  }, [tasks, deleteTask]);

  const value = {
    tasks,
    loading,
    error,
    addTask,
    createTask,
    updateTask: updateTaskContext,
    deleteTask: deleteTaskContext,
    fetchTasks,
    deleteAllTasks,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
TaskProvider.propTypes = {
  children: PropTypes.node.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
export { TaskProvider };
