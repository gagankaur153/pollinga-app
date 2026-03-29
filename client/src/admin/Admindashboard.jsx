import React, { useEffect, useState } from "react";
import api from "../api/axios";

const Admindashboard = () => {
  const [stats, setStats] = useState({ totalUsers: 0, totalPolls: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/admin/dashboard");
        setStats(res.data);
      } catch (err) {
        setError(err.response?.data?.msg || "Error fetching stats");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading dashboard stats...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="flex flex-wrap gap-6 justify-center">
        {/* Total Users Card */}
        <div className="bg-white shadow-lg rounded-xl p-8 w-64 text-center hover:shadow-xl transition">
          <h2 className="text-xl font-medium text-gray-700">Total Users</h2>
          <p className="text-4xl font-bold text-indigo-600 mt-4">{stats.totalUsers}</p>
        </div>

        {/* Total Polls Card */}
        <div className="bg-white shadow-lg rounded-xl p-8 w-64 text-center hover:shadow-xl transition">
          <h2 className="text-xl font-medium text-gray-700">Total Polls</h2>
          <p className="text-4xl font-bold text-green-500 mt-4">{stats.totalPolls}</p>
        </div>
      </div>
    </div>
  );
};

export default Admindashboard;