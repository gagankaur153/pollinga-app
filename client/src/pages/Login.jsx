import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";

import { useAuth } from "../context/AuthContext";

const Login = () => {

  const {login} = useAuth()

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      
      <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl w-full max-w-md p-8 border border-white/40">
        
        {/* Heading with Icon */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-indigo-600 text-white p-3 rounded-full shadow-lg">
            <FaSignInAlt size={20} />
          </div>
          <h2 className="text-3xl font-bold text-indigo-700 mt-3">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-500">
            Login to continue
          </p>
        </div>

        {/* Form */}
        <form onSubmit={(e) =>
    login(e, {
      email: user.email,
      password: user.password,
    })
  } className="space-y-4">
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

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition shadow-md"
          >
            Login
          </button>
        </form>

        {/* Bottom Register Line */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;