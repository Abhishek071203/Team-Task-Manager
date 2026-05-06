import { useEffect, useState } from "react";
import api from "../api";
import AppLayout from "../layouts/AppLayout";
import { Link } from "react-router-dom";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const role = localStorage.getItem("role");

  const fetchProjects = async () => {
    const res = await api.get("/projects");
    setProjects(res.data);
  };

  const addProject = async () => {
    if (!name) return;

    await api.post("/projects", { name });
    setName("");
    fetchProjects();
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <AppLayout>
      <h1 className="text-2xl font-bold mb-4">Projects</h1>

      {/* Add Project */}
      {role === "admin" && (
      <div className="mb-4 flex gap-2">
        <input
          className="border p-2 rounded w-64"
          placeholder="Project name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          onClick={addProject}
          className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-xl"
        >
          Add
        </button>
      </div>
      )}
      {/* Project List */}
      <div className="grid grid-cols-3 gap-4">
{projects.map((p) => (
  <div key={p.id} className="bg-white p-4 rounded shadow">
    <p className="font-semibold">{p.name}</p>

    <Link
      to={`/tasks/${p.id}`}
      className="text-blue-500 text-sm"
    >
      View Tasks →
    </Link>
  </div>
))}
      </div>
    </AppLayout>
  );
}