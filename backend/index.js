import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "https://team-task-manager-ten-xi.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

// TEMP USER (for testing)
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

app.get("/", (req, res) => {
  res.send("Backend running successfully");
});

// LOGIN API
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

  res.status(401).json({ message: "Invalid credentials" });
});

app.get("/test", (req, res) => {
  res.json({ message: "API working" });
});
// In-memory projects (temporary)
let projects = [];

// GET all projects
app.get("/projects", (req, res) => {
  res.json(projects);
});

// CREATE project
app.post("/projects", (req, res) => {
  const { name } = req.body;

  const newProject = {
    id: Date.now(),
    name,
  };

  projects.push(newProject);

  res.json(newProject);
});

// TEST ROUTE
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// In-memory tasks
let tasks = [];

// GET tasks by project
app.get("/tasks/:projectId", (req, res) => {
  const { projectId } = req.params;
  const projectTasks = tasks.filter(
    (t) => t.projectId == projectId
  );
  res.json(projectTasks);
});

// CREATE task
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

// UPDATE task status
app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  tasks = tasks.map((t) =>
    t.id == id ? { ...t, status } : t
  );

  res.json({ message: "Updated" });
});
// DASHBOARD STATS
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
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});