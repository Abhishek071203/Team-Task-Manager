import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ProjectsPage from "./pages/ProjectsPage";
import TasksPage from "./pages/TasksPage";

function App() {
  const isLoggedIn = !!localStorage.getItem("token");
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={isLoggedIn ? <DashboardPage /> : <LoginPage />} />
      <Route path="/projects" element={isLoggedIn ? <ProjectsPage /> : <LoginPage />} />
      <Route path="/tasks/:projectId" element={<TasksPage />} />
    </Routes>
  );
}

export default App;