import { useEffect, useState } from "react";
import api from "../api/axios";

const Admin = () => {
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
export default Admin