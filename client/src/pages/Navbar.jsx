import { FiSearch, FiBell, FiUser } from "react-icons/fi";

export const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Left Section */}
        <div className="flex items-center gap-8">
          <h1 className="text-xl font-bold text-indigo-600">
            DecisionMaker
          </h1>

          <div className="hidden md:flex gap-6 text-gray-600 font-medium">
            <a href="#" className="text-indigo-600 border-b-2 border-indigo-600 pb-1">
              Home
            </a>
            <a href="#" className="hover:text-indigo-600">
              MyPolls
            </a>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          
          {/* Search */}
          <div className="hidden md:flex items-center bg-gray-100 px-3 py-2 rounded-full w-64">
            <FiSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search polls..."
              className="bg-transparent outline-none w-full text-sm"
            />
          </div>

          {/* Create Button */}
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-indigo-700 transition">
            Create
          </button>

          {/* Icons */}
          <FiBell className="text-xl text-gray-600 cursor-pointer" />
          <FiUser className="text-xl text-gray-600 cursor-pointer" />
        </div>
      </div>
    </nav>
  );
}