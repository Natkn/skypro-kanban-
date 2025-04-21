import { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import TaskContext from "../context/TaskContext";
import {
  updateTask as apiUpdateTask,
  getTasks,
  addTask as apiAddTask,
  deleteTask as apiDeleteTask,
} from "../services/api";

const TaskProvider = ({ children, isLoggedIn }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    if (!isLoggedIn) {
      setTasks([]);
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
    fetchTasks();
  }, [fetchTasks]);

  const addTask = useCallback(async (newTask) => {
    try {
      const addedTask = await apiAddTask(newTask);
      setTasks((prevTasks) => [...prevTasks, addedTask]);
    } catch (error) {
      console.error("Ошибка при добавлении задачи:", error);
      setError(error);
      throw error;
    }
  }, []);

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
        setTasks((prevTasks) => {
          const newTasks = prevTasks.filter(
            (task) => String(task._id) !== taskIdString
          );
          return newTasks;
        });
      } catch (error) {
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
      await deleteTask(taskId);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    tasks,
    loading,
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
