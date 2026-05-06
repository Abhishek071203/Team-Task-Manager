import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-60 bg-white shadow-md p-4">
      <h2 className="text-xl font-bold mb-6">Task Manager</h2>

      <nav className="flex flex-col gap-3">
        <Link to="/dashboard" className="hover:text-blue-500">
          Dashboard
        </Link>
        <Link to="/projects" className="hover:text-blue-500">
          Projects
        </Link>
      </nav>
      <button
  onClick={() => {
    localStorage.removeItem("token");
    window.location.href = "/";
  }}
  className="mt-10 text-red-500"
>
  Logout
</button>
    </div>
    
  );
}