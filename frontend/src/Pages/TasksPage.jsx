import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import AppLayout from "../layouts/AppLayout";

export default function TasksPage() {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const role = localStorage.getItem("role");

  const fetchTasks = async () => {
    const res = await api.get(`/tasks/${projectId}`);
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!title) return;

    await api.post("/tasks", { title, projectId });
    setTitle("");
    fetchTasks();
  };

  const updateStatus = async (id, status) => {
    await api.put(`/tasks/${id}`, { status });
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const renderTask = (t) => (
  <div key={t.id} className="bg-white p-4 rounded-xl shadow mb-3">
    <p className="font-semibold">{t.title}</p>
    <p className="text-xs text-gray-500">{t.status}</p>

    <div className="mt-2 flex gap-2">
      <button onClick={() => updateStatus(t.id, "In Progress")} className="text-blue-500 text-sm">Start</button>
      <button onClick={() => updateStatus(t.id, "Done")} className="text-green-500 text-sm">Done</button>
    </div>
  </div>
);

  return (
    <AppLayout>
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>

      {/* Add Task */}
      {role === "admin" && (
      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 rounded w-64"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-4 rounded"
        >
          Add
        </button>
      </div>
      )}
      {/* Task List */}
      <div className="grid grid-cols-3 gap-6">

  {/* TODO */}
  <div>
    <h2 className="font-bold mb-2">Todo</h2>
    {tasks.filter(t => t.status === "Todo").map(renderTask)}
  </div>

  {/* IN PROGRESS */}
  <div>
    <h2 className="font-bold mb-2">In Progress</h2>
    {tasks.filter(t => t.status === "In Progress").map(renderTask)}
  </div>

  {/* DONE */}
  <div>
    <h2 className="font-bold mb-2">Done</h2>
    {tasks.filter(t => t.status === "Done").map(renderTask)}
  </div>

</div>
        {tasks.map((t) => (
          <div key={t.id} className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
  <p className="font-semibold text-lg">{t.title}</p>

  <span
    className={`text-xs px-2 py-1 rounded-full ${
      t.status === "Todo"
        ? "bg-gray-200"
        : t.status === "In Progress"
        ? "bg-blue-200 text-blue-700"
        : "bg-green-200 text-green-700"
    }`}
  >
    {t.status}
  </span>

  <div className="mt-3 flex gap-3">
    <button
      onClick={() => updateStatus(t.id, "In Progress")}
      className="text-blue-500 hover:underline"
    >
      Start
    </button>

    <button
      onClick={() => updateStatus(t.id, "Done")}
      className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-xl"
    >
      Done
    </button>
  </div>
</div>
        ))}
      </AppLayout>
  );
}