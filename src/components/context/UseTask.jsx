import { useContext } from "react";
import TaskContext from "../context/TaskContext";

// Хук для использования контекста
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks должен использоваться внутри TaskProvider");
  }
  return context;
};
