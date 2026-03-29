
import { useEffect, useState } from "react";
import api from "../api/axios";
import PollCard from "../components/PollCard";

const Dashboard = () => {
  const [polls, setPolls] = useState([]);
  const [filter, setFilter] = useState("all");

  const fetchPolls = async () => {
    try {
      const res = await api.get("/polls", { withCredentials: true });
      const sorted = res.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setPolls(sorted);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPolls();
  }, []);

  const filteredPolls = polls.filter((p) => {
    const isExpired = new Date() > new Date(p.expiresAt);
    if (filter === "active") return !isExpired;
    if (filter === "expired") return isExpired;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Polls Dashboard
      </h1>

      {/* Filters */}
      <div className="flex justify-center gap-3 mb-8">
        {["all", "active", "expired"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              filter === f
                ? "bg-blue-600 text-white shadow"
                : "bg-white border text-gray-600 hover:bg-gray-100"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Polls */}
      <div className="max-w-2xl mx-auto space-y-5">
        {filteredPolls.length === 0 && (
          <p className="text-center text-gray-500">No polls found</p>
        )}

        {filteredPolls.map((poll) => (
          <PollCard key={poll._id} poll={poll} refresh={fetchPolls} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard