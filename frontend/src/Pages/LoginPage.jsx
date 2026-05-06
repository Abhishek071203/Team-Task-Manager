import { useState } from "react";
import api from "../api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await api.post("/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      alert("Login success ✅");

      window.location.href = "/dashboard";
    } catch (err) {
      alert("Login failed ❌");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="p-6 bg-white shadow-lg rounded-xl w-80">
        <h2 className="text-xl font-bold mb-4">Login</h2>

        <input
          className="w-full mb-2 p-2 border rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full mb-4 p-2 border rounded"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-2 rounded-xl"
        >
          Login
        </button>
      </div>
    </div>
  );
}