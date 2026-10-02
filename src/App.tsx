import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { TasksProvider } from "./context/TasksContext";
import Tasks from "./pages/Tasks";
import AddTask from "./pages/AddTask";
import TaskDetail from "./pages/TaskDetail";
import EditTask from "./pages/EditTask";
import {AuthProvider} from "./context/AuthContext";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <TasksProvider>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/add-task" element={<AddTask />} />
          <Route path="/tasks/:id" element={<TaskDetail />} />
          <Route path="/tasks/:id/edit" element={<EditTask />} />
        </Routes>
      </BrowserRouter>
    </TasksProvider>
    </AuthProvider>
  );
};

export default App;