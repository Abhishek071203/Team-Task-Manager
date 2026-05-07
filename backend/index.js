import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

// TEMP USERS
const users = [
  {
    email: "admin@test.com",
    password: "123456",
    role: "admin",
  },
  {
    email: "member@test.com",
    password: "123456",
    role: "member",
  },
];

// ROOT ROUTE
app.get("/", (req, res) => {
  res.send("Backend running successfully");
});

// LOGIN
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const foundUser = users.find(
    (u) => u.email === email && u.password === password
  );

  if (foundUser) {
    return res.json({
      token: "fake-jwt-token",
      user: {
        email: foundUser.email,
        role: foundUser.role,
      },
    });
  }

  res.status(401).json({
    message: "Invalid credentials",
  });
});

// PROJECTS
let projects = [];

app.get("/projects", (req, res) => {
  res.json(projects);
});

app.post("/projects", (req, res) => {
  const { name } = req.body;

  const newProject = {
    id: Date.now(),
    name,
  };

  projects.push(newProject);

  res.json(newProject);
});

// TASKS
let tasks = [];

app.get("/tasks/:projectId", (req, res) => {
  const { projectId } = req.params;

  const projectTasks = tasks.filter(
    (t) => t.projectId == projectId
  );

  res.json(projectTasks);
});

app.post("/tasks", (req, res) => {
  const { title, projectId } = req.body;

  const newTask = {
    id: Date.now(),
    title,
    projectId,
    status: "Todo",
  };

  tasks.push(newTask);

  res.json(newTask);
});

app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  tasks = tasks.map((t) =>
    t.id == id ? { ...t, status } : t
  );

  res.json({
    message: "Updated",
  });
});

// DASHBOARD
app.get("/dashboard", (req, res) => {
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (t) => t.status === "Done"
  ).length;

  const pendingTasks = tasks.filter(
    (t) => t.status !== "Done"
  ).length;

  res.json({
    totalTasks,
    completedTasks,
    pendingTasks,
  });
});

// PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});