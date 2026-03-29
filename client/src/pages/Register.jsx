import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";
  import api from "../api/axios";
import { toast } from "react-toastify";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
 const navigate = useNavigate();

const handleRegister = async (e) => {
  e.preventDefault()
  try {
    const res = await api.post("/auth/register", {
      name: user.name,
      email: user.email,
      password: user.password,
    });
 toast.success(res.data.msg)
    navigate("/login");
  } catch (err) {
    const message =
      err.response?.data?.msg || "Something went wrong!";
    toast.error(message)
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      
      <div className="bg-white/80  shadow-2xl rounded-3xl w-full max-w-md p-8 border border-white/40">
        
        {/* Heading with Icon */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-indigo-600 text-white p-3 rounded-full shadow-lg">
            <FaUserPlus size={20} />
          </div>
          <h2 className="text-3xl font-bold text-indigo-700 mt-3">
            Create Account
          </h2>
          <p className="text-sm text-gray-500">
            Join our community today
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={user.name}
            onChange={(e) =>
              setUser({ ...user, name: e.target.value })
            }
            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <input
            type="email"
            placeholder="Email Address"
            value={user.email}
            onChange={(e) =>
              setUser({ ...user, email: e.target.value })
            }
            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) =>
              setUser({ ...user, password: e.target.value })
            }
            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition shadow-md">
            Register
          </button>
        </form>

        {/* Bottom */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;