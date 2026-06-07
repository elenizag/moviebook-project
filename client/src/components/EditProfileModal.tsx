import React from "react";
import { useState, useEffect } from "react";

interface UserProfile {
  name: string;
  username: string;
  email: string;
  profileImage?: string; 
}

function EditProfileModal({ isOpen, onClose, user, onSave }: { isOpen: boolean; onClose: () => void; user: UserProfile | null; onSave: (updatedUser: UserProfile) => void }) {
  const [editForm, setEditForm] = useState({
    name: "",
    username: "",
    email: "",
    profileImage: "",
  });

  useEffect(() => {
    if (user) {
      setEditForm({
        name: user.name || "",
        username: user.username || "",
        email: user.email || "",
        profileImage: user.profileImage || "",
      });
    }
  }, [user, isOpen]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(editForm);
    onClose();
  };
    
  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-movie-surface border border-gray-800 w-full max-w-[400px] rounded-xl p-6 shadow-2xl relative">
        <h3 className="text-2xl font-bold font-display mb-6 text-movie-text-main">Edit Profile Info</h3>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-movie-text-sec mb-1">Name:</label>
            <input
              type="text"
              value={editForm.name}
              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              className="w-full px-3 py-2 bg-movie-bg border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-movie-accent text-movie-text-main mb-2"
            />
            <label className="block text-sm font-medium text-movie-text-sec mb-1">Username:</label>
            <input
              type="text"
              value={editForm.username}
              onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
              className="w-full px-3 py-2 bg-movie-bg border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-movie-accent text-movie-text-main mb-2"
            />
            <label className="block text-sm font-medium text-movie-text-sec mb-1">Email:</label>
            <input
              type="email"
              value={editForm.email}
              onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
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