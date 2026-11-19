import { useReducer, useEffect } from "react";
import { TasksContext } from "./TasksContext";
import TasksReducer from "../Reducer/TasksReducer";

const initialTasks = [];

export const TasksProvider = ({ children }) => {
  const [tasks, dispatch] = useReducer(TasksReducer, initialTasks, () => {
    const savedTasks = localStorage.getItem("tasks");

    return savedTasks ? JSON.parse(savedTasks) : initialTasks;
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <TasksContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TasksContext.Provider>
  );
};
