import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt, FaCog, FaHeart, FaList, FaStar, FaUser } from "react-icons/fa";

function Navbar() {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null");

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleLogout = () => {
        setIsDropdownOpen(false);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
    <nav className="w-full bg-movie-surface border-b border-gray-800 px-6 py-4 flex justify-between items-center shadow-lg">
      <h1 
        className="text-2xl font-bold font-display text-movie-accent tracking-wide cursor-pointer select-none" 
        onClick={() => { setIsDropdownOpen(false);navigate(isLoggedIn ? "/home" : "/")}}
        >
            MovieBook
      </h1>
      
      <div className="flex items-center">
        {/* αν δεν είναι συνδεδεμένος */}
        {!isLoggedIn && (
          <>
            <button onClick={() => { setIsDropdownOpen(false); navigate("/login")}} className="px-4 py-2 text-sm text-movie-text-main hover:text-movie-accent transition-colors cursor-pointer">
              Login
            </button>
            <button onClick={() => { setIsDropdownOpen(false); navigate("/register")}} className="px-4 py-2 text-sm bg-movie-accent text-movie-text-main rounded-md font-bold cursor-pointer">
              Register
            </button>
          </>
        )}

        {/* αν είναι συνδεδεμένος */}
        {isLoggedIn && (
          <>
            {/* Search Bar */}
            <div className=" px-4 flex justify-center ">
              <input
                type="text"
                placeholder="Search movies..."
                className="w-full max-w-3xl h-14 px-5 bg-movie-surface text-white border-2 border-movie-accent rounded-xl text-center outline-none focus:ring-2 focus:ring-movie-accent/50 transition-all"
              />
            </div>
            
            <button 
                onClick={() => { setIsDropdownOpen(false); navigate("/home"); }} className="text-sm font-medium text-movie-text-main hover:text-movie-accent transition-colors cursor-pointer mr-4">
              Home
            </button>
            <button onClick={() => { setIsDropdownOpen(false); navigate("/feed"); }} className="text-sm font-medium text-movie-text-main hover:text-movie-accent transition-colors cursor-pointer mr-5">
              Feed
            </button>

            <div className="relative" ref={dropdownRef}>
            {/* Η εικόνα του χρήστη */}
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-700 text-movie-accent hover:ring-2 hover:ring-movie-accent transition-all cursor-pointer overflow-hidden focus:outline-none"
            >
              {user?.avatarUrl ? (
                <img src={user.avatarUrl} alt="profile" className="w-full h-full object-cover" />
              ) : (
                <FaUserCircle className="w-full h-full text-2xl" />
              )}
            </button>

            {/* Dropdown */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-movie-surface border border-gray-800 rounded-lg shadow-2xl py-2 flex flex-col text-sm animate-fadeIn">
                <div className="px-4 py-2 border-b border-gray-800 font-medium text-movie-text-sec text-xs tracking-wider ">
                  User Menu
                </div>
                
                <button onClick={() => { setIsDropdownOpen(false); navigate("/profile"); }} className="flex items-center space-x-3 px-4 py-2.5 text-movie-text-main hover:bg-movie-bg hover:text-movie-accent transition-colors text-left w-full">
                  <FaUser className="text-gray-500 w-4" /> <span>My Profile</span>
                </button>
                
                <button onClick={() => { setIsDropdownOpen(false); navigate("/favorites"); }} className="flex items-center space-x-3 px-4 py-2.5 text-movie-text-main hover:bg-movie-bg hover:text-movie-accent transition-colors text-left w-full">
                  <FaHeart className="text-gray-500 w-4" /> <span>Favorites</span>
                </button>
                
                <button onClick={() => { setIsDropdownOpen(false); navigate("/watchlist"); }} className="flex items-center space-x-3 px-4 py-2.5 text-movie-text-main hover:bg-movie-bg hover:text-movie-accent transition-colors text-left w-full">
                  <FaList className="text-gray-500 w-4" /> <span>Watchlist</span>
                </button>
                
                <button onClick={() => { setIsDropdownOpen(false); navigate("/my-reviews"); }} className="flex items-center space-x-3 px-4 py-2.5 text-movie-text-main hover:bg-movie-bg hover:text-movie-accent transition-colors text-left w-full">
                  <FaStar className="text-gray-500 w-4" /> <span>My Reviews</span>
                </button>
                
                <button onClick={() => { setIsDropdownOpen(false); navigate("/settings"); }} className="flex items-center space-x-3 px-4 py-2.5 text-movie-text-main hover:bg-movie-bg hover:text-movie-accent transition-colors text-left w-full">
                  <FaCog className="text-gray-500 w-4" /> <span>Settings</span>
                </button>
                
                <div className="border-t border-gray-800 my-1"></div>
                
                
              </div>
            )}
          </div>
          </>
        )}
      </div>

      
      
    </nav>
  );

}

export default Navbar;