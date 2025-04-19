import { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import TaskContext from "../context/TaskContext";
import {
  updateTask as apiUpdateTask,
  getTasks as apiGetTasks,
  addTask as apiAddTask,
  deleteTask as apiDeleteTask,
} from "../../services/api";

const TaskProvider = ({ children, isLoggedIn }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    setLoading(isLoggedIn); // Тут мы при монтировании сразу задаем значение
    setLoading(false);
    if (!isLoggedIn) {
      setTasks([]); // Очищаем задачи, если пользователь не залогинен
      return;
    }
    try {
      setLoading(true);
      const fetchedTasks = await apiGetTasks();
      const tasksWithId = fetchedTasks.map((task) => ({
        ...task,
        id: task._id,
      }));
      setTasks(tasksWithId);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [isLoggedIn, setLoading, setTasks, setError]);

  useEffect(() => {
    //   Теперь эта функция просто наблюдает за isLoggedIn и, если он true,
    // вызывает fetchTasks.
    if (isLoggedIn) {
      fetchTasks();
    }
  }, [isLoggedIn, fetchTasks]);

  const addTask = useCallback(
    async (newTask) => {
      try {
        setLoading(true);
        const addedTask = await apiAddTask(newTask);
        setTasks((prevTasks) => [...prevTasks, addedTask]);
      } catch (error) {
        setError(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [setTasks, setError]
  );

  const updateTask = useCallback(
    async (taskId, taskData) => {
      try {
        setLoading(true);
        const updatedTask = await apiUpdateTask(taskId, taskData);
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskId ? { ...task, ...updatedTask } : task
          )
        );
        return updatedTask;
      } catch (error) {
        setError(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [setTasks, setError]
  );

  const deleteTask = useCallback(
    async (_id) => {
      try {
        setLoading(true);
        const taskIdString = String(_id);

        await apiDeleteTask(taskIdString);

        // Обновляем массив, удаляя задачу, и возвращаем новый массив
        setTasks((prevTasks) => {
          const newTasks = prevTasks.filter(
            (task) => String(task._id) !== taskIdString
          );
          return newTasks;
        });
      } catch (error) {
        console.error("Ошибка при удалении задачи:", error);
        setError(error);
        alert("Произошла ошибка при удалении задачи.");
      } finally {
        setLoading(false);
      }
    },
    [setTasks, setError]
  );

  const deleteTaskContext = async (taskId) => {
    try {
      setLoading(true);
      await deleteTask(taskId); // Просто вызываем deleteTask
    } finally {
      setLoading(false);
    }
  };

  const value = {
    tasks,
    loading, //  Теперь loading экспортируется
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
