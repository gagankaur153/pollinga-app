import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiBell, FiUser } from "react-icons/fi";

const  Navbar = () => {
  const { user, isauth, display, setDisplay, logout, checkrole } = useAuth();
  const gettoken = localStorage.getItem("login");
  return (
    <nav className="w-full sticky py-2 lg:py-3 top-0 z-50 backdrop-blur-lg bg-white/70 border-b border-white/40 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* LEFT */}
          {
  checkrole === "user" ? (
   <div className="flex items-center gap-8">
          <NavLink to="/" className="cursor-pointer text-xl font-bold text-blue-600 tracking-tight">
            DecisionMaker
          </NavLink>

          <div className="flex gap-6 text-gray-600 text-sm font-medium">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                  : "hover:text-blue-600 transition"
              }
            >
              Home
            </NavLink>

            {isauth && (
              <>
                <NavLink to="/mypolls" className="hover:text-blue-600 transition">
                  MyPolls
                </NavLink>

                {user?.role === "admin" && (
                  <>
                    <NavLink to="/allusers" className="hover:text-blue-600 transition">
                      All Users
                    </NavLink>
                    <NavLink to="/allpolls" className="hover:text-blue-600 transition">
                      All Polls
                    </NavLink>
                  </>
                )}
              </>
            )}
          </div>
        </div>
  ) : (
    <div className="flex items-center gap-8">
          <NavLink to="/" className="cursor-pointer text-xl font-bold text-blue-600 tracking-tight">
            DecisionMaker
          </NavLink>

         
        </div>
  )
}
       

        {/* RIGHT */}
       {gettoken ? (
  checkrole === "user" ? (
    <div className="flex items-center gap-9">
            <NavLink
              to="/createpoll"
              className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm hover:bg-blue-700 transition shadow"
            >
              Create
            </NavLink>

            <FiBell className="text-lg text-gray-600 cursor-pointer hover:text-blue-600 transition" />
            <FiUser
              className="text-lg text-gray-600 cursor-pointer hover:text-blue-600 transition"
              onClick={() => setDisplay(!display)}
            />
          </div>
  ) : (
      <div className="flex items-center gap-9">

         <NavLink
              to="/admin"
              className=" text-black hover:text-white px-4 py-1.5 rounded-full text-sm hover:bg-blue-700 transition shadow"
            >
           Admin
            </NavLink>
            <NavLink
              to="/alluser"
              className="hover:text-white text-black px-4 py-1.5 rounded-full text-sm hover:bg-blue-700 transition shadow"
            >
             All user
            </NavLink>

           <NavLink
              to="/deletepoll"
              className="hover:text-white text-black px-4 py-1.5 rounded-full text-sm hover:bg-blue-700 transition shadow"
            >
            Delete Poll
            </NavLink>
          
            <FiUser
              className="text-lg text-gray-600 cursor-pointer hover:text-blue-600 transition"
              onClick={() => setDisplay(!display)}
            />
          </div>
  )
) : (
          <div className="flex items-center gap-3">
            <NavLink
              to="/login"
              className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm hover:bg-blue-700 transition"
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className="border border-blue-600 text-blue-600 px-4 py-1.5 rounded-full text-sm hover:bg-blue-50 transition"
            >
              Register
            </NavLink>
          </div>
        )}
      </div>

      {/* DROPDOWN */}
      {display && (
        <div className="absolute right-6 top-16 w-56 backdrop-blur-xl bg-white/80 border border-white/40 rounded-2xl shadow-xl overflow-hidden animate-fadeIn">
          <div className="px-4 py-3 border-b bg-gray-50/70">
            <p className="text-xs text-gray-500">Signed in as</p>
            <p className="text-sm font-semibold text-gray-800 truncate">
              {user}
            </p>
          </div>

          <ul className="text-sm ">
            <li
              className="px-4 py-2 text-red-500 hover:bg-red-50 cursor-pointer"
              onClick={logout}
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar

 