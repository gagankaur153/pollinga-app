import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreatePoll = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [duration, setDuration] = useState("10");
   const navigate = useNavigate();

  const handleOptionChange = (index, value) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const addOption = () => {
    if (options.length < 4) {
      setOptions([...options, ""]);
    }
  };

  const removeOption = (index) => {
    if (options.length <= 2) return;
    setOptions(options.filter((_, i) => i !== index));
  };

  const calculateExpiry = () => {
    const minutes = parseInt(duration);
    return new Date(Date.now() + minutes * 60000).toISOString();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     const res = await axios.post(
        "http://localhost:5000/api/polls",
        {
          question,
          options,
          expiresAt: calculateExpiry(),
        },
        { withCredentials: true }
      )
      toast.success(res?.data?.msg)
    navigate("/")
    } catch (err) {
      alert("Error creating poll");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center pt-20 pb-40">
      {/* pt + pb ensures space above and below so dropdown never flips */}
      
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Create Poll</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Poll question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full border rounded-xl px-4 py-2"
            required
          />

          {options.map((opt, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={opt}
                onChange={(e) => handleOptionChange(i, e.target.value)}
                placeholder={`Option ${i + 1}`}
                className="flex-1 border rounded-xl px-3 py-2"
                required
              />
              {options.length > 2 && (
                <button
                  type="button"
                  onClick={() => removeOption(i)}
                  className="text-red-500"
                >
                  ×
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addOption}
            disabled={options.length >= 4}
            className="text-indigo-600 text-sm"
          >
            + Add option
          </button>

          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full border rounded-xl px-4 py-2 bg-white"
          >
            <option value="10">10 Minutes</option>
            <option value="30">30 Minutes</option>
            <option value="60">1 Hour</option>
            <option value="1440">24 Hours</option>
          </select>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-xl"
          >
            Create Poll
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePoll