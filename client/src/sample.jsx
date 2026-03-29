// React Frontend Folder Structure (MERN Polling System)
// Split into components, pages, and context

/*
client/
│
├── src/
│   ├── api/axios.js
│   ├── context/AuthContext.jsx
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── PollCard.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   └── Admin.jsx
│   ├── App.jsx
│   └── main.jsx
*/

// ================= api/axios.js =================
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true
});

export default instance;

// ================= context/AuthContext.jsx =================
import { createContext, useContext, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (data) => {
    const res = await api.post("/auth/login", data);
    setUser(res.data.user);
  };

  const register = async (data) => {
    await api.post("/auth/register", data);
  };

  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// ================= components/Navbar.jsx =================
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between">
      <h1 className="font-bold">Polling App</h1>
      {user && (
        <button onClick={logout} className="bg-red-500 px-3 py-1">
          Logout
        </button>
      )}
    </div>
  );
}

// ================= components/PollCard.jsx =================
import api from "../api/axios";

export default function PollCard({ poll, refresh }) {
  const vote = async (index) => {
    await api.post(`/polls/${poll._id}/vote`, { optionIndex: index });
    refresh();
  };

  return (
    <div className="border p-4 mb-2">
      <h3 className="font-semibold">{poll.question}</h3>
      {poll.options.map((opt, i) => (
        <button
          key={i}
          onClick={() => vote(i)}
          className="block bg-gray-200 px-2 py-1 mt-1"
        >
          {opt.text} ({opt.votes})
        </button>
      ))}
    </div>
  );
}

// ================= pages/Login.jsx =================
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useAuth();

  return (
    <div className="p-10">
      <input
        placeholder="Email"
        className="border p-2 block mb-2"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 block mb-2"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button onClick={() => login(form)} className="bg-blue-500 text-white px-4 py-2">
        Login
      </button>
    </div>
  );
}

// ================= pages/Register.jsx =================
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { register } = useAuth();

  return (
    <div className="p-10">
      <input
        placeholder="Email"
        className="border p-2 block mb-2"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 block mb-2"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button onClick={() => register(form)} className="bg-green-500 text-white px-4 py-2">
        Register
      </button>
    </div>
  );
}

// ================= pages/Dashboard.jsx =================
import { useEffect, useState } from "react";
import api from "../api/axios";
import PollCard from "../components/PollCard";

export default function Dashboard() {
  const [polls, setPolls] = useState([]);

  const fetchPolls = async () => {
    const res = await api.get("/polls");
    setPolls(res.data);
  };

  useEffect(() => {
    fetchPolls();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl mb-2">All Polls</h2>
      {polls.map((p) => (
        <PollCard key={p._id} poll={p} refresh={fetchPolls} />
      ))}
    </div>
  );
}

// ================= pages/Admin.jsx =================
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Admin() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    api.get("/admin/dashboard").then((res) => setStats(res.data));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl">Admin Dashboard</h2>
      <p>Total Users: {stats.users}</p>
      <p>Total Polls: {stats.polls}</p>
    </div>
  );
}

// ================= App.jsx =================
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Login from "./pages/Navbar";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

// ================= main.jsx =================
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
