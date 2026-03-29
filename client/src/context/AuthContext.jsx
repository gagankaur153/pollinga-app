import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isauth, setIsauth] = useState(false);
  const [display, setDisplay] = useState(false);
  const navigate = useNavigate();
  const [checkrole, setCheckrole] = useState(localStorage.getItem("role") || "user")
 
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await api.get("/auth/getuser");
        console.log(res)
        setUser(res.data.email);
        setIsauth(true);
        localStorage.setItem("login", "true");
      } catch (err) {
        setUser(null);
        setIsauth(false);
        localStorage.removeItem("login");
      }
    };
    checkLogin();
  }, []);

  // Login function
  const login = async (e, data) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", data);
      setIsauth(true);
      localStorage.setItem("login", "true");
      const ress = await api.get("/auth/getuser");
  setCheckrole(ress?.data?.role)
    setUser(ress?.data?.email);
  localStorage.setItem("role", ress?.data?.role)
      toast.success(res.data.msg);
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.msg || "Something went wrong!");
    }
  };

 

  // Register
  const register = async (data) => {
    try {
      await api.post("/auth/register", data);
      toast.success("Registration successful!");
    } catch (err) {
      toast.error(err.response?.data?.msg || "Something went wrong!");
    }
  };

  // Logout 
  const logout = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null);
      setIsauth(false);
      setDisplay(false);
      localStorage.removeItem("login");
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (err) {
      toast.error("Logout failed!");
      console.log(err.response);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isauth,checkrole, display, setDisplay, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);