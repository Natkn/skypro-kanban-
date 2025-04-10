import { useContext } from "react";
import TaskContext from "../context/TaskContext";

// Хук для использования контекста
export const useTasks = () => useContext(TaskContext);
