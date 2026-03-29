import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const  MyPolls = () => {
  const [polls, setPolls] = useState([]);
  const { isauth } = useAuth();
  const [timeLeft, setTimeLeft] = useState({});

  const fetchPolls = async () => {
    try {
      const res = await api.get("/polls/mypolls", { withCredentials: true });
      const sorted = res.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setPolls(sorted);

      const initialTimes = {};
      sorted.forEach((p) => {
        initialTimes[p._id] = getTimeRemaining(p.expiresAt);
      });
      setTimeLeft(initialTimes);
    } catch (err) {
      console.log(err.response?.data || err);
    }
  };

  useEffect(() => {
    if (isauth) fetchPolls();
  }, [isauth]);

  // Live timer
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedTimes = {};
      polls.forEach((p) => {
        updatedTimes[p._id] = getTimeRemaining(p.expiresAt);
      });
      setTimeLeft(updatedTimes);
    }, 1000);
    return () => clearInterval(interval);
  }, [polls]);

  const getTimeRemaining = (expiresAt) => {
    const now = new Date();
    const end = new Date(expiresAt);
    const diff = end - now;
    if (diff <= 0) return "Expired";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    let str = "";
    if (days > 0) str += `${days}d `;
    if (hours > 0) str += `${hours}h `;
    str += `${minutes}m ${seconds}s`;
    return str;
  };

  if (!isauth)
    return <p className="text-center mt-8 text-gray-500">Please login to see your polls</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 pt-12 space-y-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">My Polls</h2>

      {polls.length === 0 ? (
        <p className="text-center text-gray-500">You haven't created any polls.</p>
      ) : (
        polls.map((poll) => {
          const isExpired = new Date() > new Date(poll.expiresAt);
          const totalVotes = poll.options.reduce((sum, o) => sum + o.votes, 0);

          const getWinner = () => {
            if (!poll.options || poll.options.length === 0) return "";
            return poll.options.reduce((prev, curr) =>
              curr.votes > prev.votes ? curr : prev
            ).text;
          };

          return (
            <div
              key={poll._id}
              className={`relative p-5 rounded-xl shadow-lg bg-white transition hover:shadow-xl ${
                isExpired ? "opacity-70 border border-gray-300" : ""
              }`}
            >
              {/* Timer */}
              <div
                className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${
                  isExpired ? "bg-gray-400 text-white" : " border border-blue-100 text-gray-600"
                }`}
              >
                {timeLeft[poll._id]}
              </div>

              {/* Question */}
              <h2 className="text-xl font-bold text-gray-800 mb-4">{poll.question}</h2>

              {/* Options with vote bars */}
              <div className="space-y-4">
                {poll.options.map((opt, idx) => {
                  const percent = totalVotes ? Math.round((opt.votes / totalVotes) * 100) : 0;

                  const barColor =
                    percent > 50
                      ? "bg-blue-600"
                      : percent > 30
                      ? "bg-blue-400"
                      : "bg-blue-300";

                  return (
                    <div key={idx}>
                      {/* Option label + percent */}
                      <div className="flex justify-between items-center text-sm mb-1">
                        <span className="font-medium text-gray-700">{opt.text}</span>
                        <span className="text-gray-500">{percent}%</span>
                      </div>

                      {/* Progress bar */}
                      <div className="h-4 rounded-full bg-gray-200 overflow-hidden">
                        <div
                          className={`${barColor} h-full rounded-full text-xs text-white flex items-center justify-end pr-2 transition-all`}
                          style={{ width: `${percent}%` }}
                        >
                          {percent > 10 && <span>{percent}%</span>}
                        </div>
                      </div>

                      {/* Votes count */}
                      <p className="text-xs text-gray-400 mt-1">{opt.votes} votes</p>
                    </div>
                  );
                })}
              </div>

              {/* Winner */}
              {isExpired && totalVotes > 0 && (
                <div className="mt-6 bg-green-100 text-green-700 text-sm font-semibold text-center py-2 rounded-lg border border-green-200">
                  🏆 Winner: {getWinner()}
                </div>
              )}

              {/* Created date */}
              <p className="text-xs text-gray-500 mt-3">
                Created: {new Date(poll.createdAt).toLocaleDateString()}
              </p>
            </div>
          );
        })
      )}
    </div>
  );
}
export default MyPolls