

import { useState, useEffect } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

const PollCard = ({ poll, refresh }) => {
  const [timeLeft, setTimeLeft] = useState("");

  // Timer
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const expires = new Date(poll.expiresAt);
      const diff = expires - now;

      if (diff <= 0) {
        setTimeLeft("Expired");
        clearInterval(interval);
      } else {
        const h = Math.floor(diff / (1000 * 60 * 60));
        const m = Math.floor((diff / (1000 * 60)) % 60);
        const s = Math.floor((diff / 1000) % 60);
        setTimeLeft(`${h}h ${m}m ${s}s left`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [poll.expiresAt]);

  // Vote API
  const vote = async (index) => {
    try {
      const res = await api.post(
        `/polls/${poll._id}/vote`,
        { optionIndex: index },
        { withCredentials: true }
      );

      toast.success(res.data.msg);
      refresh(); // reload polls
    } catch (err) {
      toast.error(err.response?.data?.msg || "Already voted");
    }
  };

  // Winner logic
  const getWinner = () => {
    if (!poll.options || poll.options.length === 0) return "";

    let winner = poll.options[0];
    poll.options.forEach((opt) => {
      if (opt.votes > winner.votes) winner = opt;
    });

    return `${winner.text} (${winner.votes} votes)`;
  };

  const isExpired = new Date() > new Date(poll.expiresAt);
  const totalVotes = poll.options.reduce((sum, o) => sum + o.votes, 0);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg">
      {/* Header */}
      <div className="flex justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-800">
          {poll.question}
        </h2>

        <span
          className={`text-xs px-3 py-1 rounded-full ${
            isExpired
              ? "bg-gray-200 text-gray-600"
              : "bg-green-100 text-green-700"
          }`}
        >
          {isExpired ? "Expired" : "Active"}
        </span>
      </div>

      {/* Timer */}
      <p className="text-sm text-gray-500 mb-4">
        {isExpired ? "Poll ended" : timeLeft}
      </p>

      {/* Options */}
      <div className="space-y-4">
        {poll.options.map((opt, i) => {
          const percent = totalVotes
            ? Math.round((opt.votes / totalVotes) * 100)
            : 0;

          return (
            <div key={opt._id}>
              <div className="flex justify-between text-sm mb-1">
                <span>{opt.text}</span>
                <span>{percent}%</span>
              </div>

              <div
                onClick={() => !isExpired && vote(i)}
                className={`h-4 bg-gray-200 rounded-full overflow-hidden ${
                  isExpired ? "cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                <div
                  className="h-full bg-blue-600"
                  style={{ width: `${percent}%` }}
                />
              </div>

              <p className="text-xs text-gray-400 mt-1">
                {opt.votes} votes
              </p>
            </div>
          );
        })}
      </div>

      {/* Total votes */}
      <p className="text-sm text-gray-500 mt-4">
        Total votes: {totalVotes}
      </p>

      {/* Winner */}
      {isExpired && (
        <div className="mt-4 bg-green-100 text-green-700 text-sm font-semibold text-center py-2 rounded-lg">
          🏆 Winner: {getWinner()}
        </div>
      )}
    </div>
  );
}

export default PollCard