import { useContext } from "react";
import { TasksContext } from "../Contexts/TasksContext";

export const useTasks = () => {
  return useContext(TasksContext);
};
