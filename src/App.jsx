//====Components====
import TodoList from "./Components/TodoList";

//====Css====
import "./App.css";

//====Context====
import { AlertProvider } from "./Contexts/AlertProvider";
import { TasksProvider } from "./Contexts/TasksProvider";

function App() {
  return (
    <div className="app">
      <TasksProvider>
        <AlertProvider>
          <TodoList />
        </AlertProvider>
      </TasksProvider>
    </div>
  );
}

export default App;
