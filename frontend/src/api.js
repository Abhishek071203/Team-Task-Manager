import axios from "axios";

const api = axios.create({
  baseURL: "https://railway.com/project/2b5c1c1d-6caf-4c6c-bd8d-7ec8b9ca6797/service/dc1e1447-0e76-4d78-a5e0-f39b18c64659?environmentId=92df996c-5553-4c3e-9c5a-f192ba925d79",
});

export default api;