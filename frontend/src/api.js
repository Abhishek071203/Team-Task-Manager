import axios from "axios";

const api = axios.create({
  baseURL: "https://team-task-manager-production-e3af.up.railway.app",
});

export default api;