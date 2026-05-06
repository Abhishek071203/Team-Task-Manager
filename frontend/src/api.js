import axios from "axios";

const api = axios.create({
  baseURL: "https://team-task-manager-production-f4a1.up.railway.app/",
});

export default api;