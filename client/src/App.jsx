import { BrowserRouter, Routes, Route } from "react-router";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Protectedroute from "./components/Protectedroute";
import MyPolls from "./components/Mypoll";
import Admindashboard from "./admin/Admindashboard";
import Alluser from "./admin/Alluser";
import Deletepoll from "./admin/Deletepoll";
import CreatePoll from "./pages/CreatePoll";

const App = () => {
  return (

    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/admin" element={
            <Protectedroute>
              <Admindashboard />
            </Protectedroute>} />
          <Route path="/alluser" element={
            <Protectedroute>
              <Alluser />
            </Protectedroute>} />
          <Route path="/deletepoll" element={
            <Protectedroute>
              <Deletepoll />
            </Protectedroute>} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/admin" element={<Admin />} />
          <Route path="/createpoll" element={<CreatePoll/>  } />
          <Route
            path="/mypolls"
            element={
              <Protectedroute>
                <MyPolls />
              </Protectedroute>
            }
          />

        </Routes>
        <ToastContainer position="top-right" autoClose={1000} />
      </AuthProvider>


    </BrowserRouter>

  );
}

export default App
