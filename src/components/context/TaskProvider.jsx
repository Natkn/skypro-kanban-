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
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchTasks();
    }
  }, [fetchTasks, isLoggedIn]);

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
        const updatedTaskFromServer = await apiUpdateTask(id, updatedTask); //Получаем обновленную задачу с сервера
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

  const deleteTask = useCallback(async (id) => {
    const taskIdString = String(id); // Приводим id к строке
    console.log("deleteTask: id =", taskIdString);
    try {
      await apiDeleteTask(taskIdString); // Просто удаляем задачу на сервере
      setTasks((prevTasks) =>
        prevTasks.filter((task) => String(task._id) !== taskIdString)
      ); // Обновляем массив, удаляя задачу
    } catch (error) {
      console.error("Ошибка при удалении задачи:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    tasks,
    loading,
    error,
    createTask: addTask,
    updateTask,
    deleteTask,
    fetchTasks,
    setLoading,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
TaskProvider.propTypes = {
  children: PropTypes.node.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
export { TaskProvider };
