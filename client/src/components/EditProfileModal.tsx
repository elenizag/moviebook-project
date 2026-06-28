import React from "react";
import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";


interface UserProfile {
  name: string;
  username: string;
  email: string;
}

function EditProfileModal({ isOpen, onClose, user, onSave }: { isOpen: boolean; onClose: () => void; user: UserProfile | null; onSave: (updatedUser: UserProfile, password?: string) => void }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user && isOpen) {
      setName(user.name);
      setUsername(user.username);
      setEmail(user.email);
      setPassword("");
    }
  }, [user, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      username,
      email,
    }, password || undefined);
  };

  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-movie-surface border border-gray-800 w-full max-w-[400px] rounded-xl p-6 shadow-2xl relative">
        <h3 className="text-2xl font-bold font-display mb-6 text-movie-text-main">Edit Profile Info</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-movie-text-sec mb-1">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value) }
              className="w-full px-3 py-2 bg-movie-bg border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-movie-accent text-movie-text-main mb-2"
            />
            <label className="block text-sm font-medium text-movie-text-sec mb-1">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value) }
              className="w-full px-3 py-2 bg-movie-bg border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-movie-accent text-movie-text-main mb-2"
            />
            <label className="block text-sm font-medium text-movie-text-sec mb-1">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value) }
              className="w-full px-3 py-2 bg-movie-bg border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-movie-accent text-movie-text-main mb-2"
            />    
            <div className="relative">
              <label className="block text-sm font-medium text-movie-text-sec mb-1 mt-3">Change Password:</label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-movie-bg border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-movie-accent text-movie-text-main pr-10"              />
              <span
                className="absolute right-[12px] bottom-[12px] cursor-pointer text-movie-text-sec"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>    
          </div>  
           
          <div className="flex justify-end gap-3 pt-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm border border-gray-700 text-movie-text-main rounded hover:bg-movie-bg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm bg-movie-accent text-movie-text-main font-bold rounded hover:bg-[#1b97b2] transition-colors cursor-pointer"
            >
              Save Changes
            </button>
          </div>

        </form>

      </div>
    </div>
  );

}


export default EditProfileModal;