import React from "react";
import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";

interface UserProfile {
  name: string;
  username: string;
  email: string;
  profileImage?: string; 
}

function EditProfileModal({ isOpen, onClose, user, onSave }: { isOpen: boolean; onClose: () => void; user: UserProfile | null; onSave: (updatedUser: UserProfile) => void }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    if (user && isOpen) {
      setName(user.name);
      setUsername(user.username);
      setEmail(user.email);
      setProfileImage(user.profileImage || "");
    }
  }, [user, isOpen]);

  {/* Image to Base64 string */}
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      username,
      email,
      profileImage,
    });
  };

  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-movie-surface border border-gray-800 w-full max-w-[400px] rounded-xl p-6 shadow-2xl relative">
        <h3 className="text-2xl font-bold font-display mb-6 text-movie-text-main">Edit Profile Info</h3>
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Preview and Change Profile Image */}
          <div className="flex flex-col items-center space-y-3 mb-4">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Preview"
                className="w-24 h-24 rounded-full object-cover border-2 border-movie-accent"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-movie-bg border border-gray-700 flex items-center justify-center text-movie-text-sec">
                <FaUserCircle className="w-full h-full p-1" />
              </div>
            )}
            
            <label className="cursor-pointer text-xs font-medium text-movie-accent hover:underline">
              Choose Profile Picture
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>

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
          </div>  
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-800 mt-6">
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