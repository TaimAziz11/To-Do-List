//====Components====
import "./App.css";
import TodoList from "./Components/TodoList";

//====Context====
import { TasksContext } from "./Contexts/TasksContext";

//====Use State====
import { useState, useEffect } from "react";

const initialTasks = [];

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : initialTasks;
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="app">
      <TasksContext.Provider value={{ tasks, setTasks }}>
        <TodoList />
      </TasksContext.Provider>
    </div>
  );
}

export default App;
