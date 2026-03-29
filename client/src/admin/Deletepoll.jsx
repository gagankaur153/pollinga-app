import React, { useEffect, useState } from "react";
import api from "../api/axios";
import {toast }from "react-toastify"

const Deletepoll = () => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(""); // track poll being deleted

  // Fetch all polls
  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const res = await api.get("/polls"); // your endpoint
        setPolls(res.data);
      } catch (err) {
        setError(err.response?.data?.msg || "Error fetching polls");
      } finally {
        setLoading(false);
      }
    };
    fetchPolls();
  }, []);

  // Delete poll
  const handleDelete = async (id) => {
   

    try {
      setDeleting(id);
      await api.delete(`/admin/poll/${id}`);
      setPolls(polls.filter((poll) => poll._id !== id));
      toast.success("Poll removed by admin")
    } catch (err) {
      toast.error(err.response?.data?.msg || "Error deleting poll")

    } finally {
      setDeleting("");
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading polls...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">All Polls</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-left py-3 px-6">Question</th>
              <th className="text-left py-3 px-6">Options</th>
              <th className="text-left py-3 px-6">Created At</th>
              <th className="text-left py-3 px-6">Action</th>
            </tr>
          </thead>
          <tbody>
            {polls.map((poll) => (
              <tr key={poll._id} className="border-b hover:bg-gray-50">
                {/* Question */}
                <td className="py-3 px-6">{poll.question}</td>

                {/* Options as badges */}
                <td className="py-3 px-6 flex flex-wrap gap-2">
                  {poll.options.map((option) => (
                    <span
                      key={option._id}
                      className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full"
                    >
                      {option.text} ({option.votes})
                    </span>
                  ))}
                </td>

                {/* Created At */}
                <td className="py-3 px-6">
                  {new Date(poll.createdAt).toLocaleDateString()}
                </td>

                {/* Delete Button */}
                <td className="py-3 px-6">
                  <button
                    onClick={() => handleDelete(poll._id)}
                    disabled={deleting === poll._id}
                    className={`bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition ${
                      deleting === poll._id ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {deleting === poll._id ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Deletepoll;