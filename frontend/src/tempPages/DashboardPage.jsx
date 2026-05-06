import { useEffect, useState } from "react";
import api from "../api";
import AppLayout from "../layouts/AppLayout";

export default function DashboardPage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // get all tasks (quick hack: reuse all projects' tasks)
    api.get("/projects").then(async (res) => {
      let allTasks = [];

      for (let p of res.data) {
        const t = await api.get(`/tasks/${p.id}`);
        allTasks = [...allTasks, ...t.data];
      }

      setTasks(allTasks);
    });
  }, []);

  const total = tasks.length;
  const done = tasks.filter((t) => t.status === "Done").length;
  const pending = total - done;

  return (
    <AppLayout>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="grid grid-cols-3 gap-4">
        <Card title="Total Tasks" value={total} />
        <Card title="Completed" value={done} color="text-green-500" />
        <Card title="Pending" value={pending} color="text-red-500" />
      </div>
    </AppLayout>
  );
}

function Card({ title, value, color }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
      <h2 className="text-gray-500">{title}</h2>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
  );
}