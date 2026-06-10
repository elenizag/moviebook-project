import { FaUserCircle } from "react-icons/fa";
import { user as getprofile, updateProfile } from "../services/authService";
import { useEffect, useState } from "react";
import EditProfileModal from "../components/EditProfileModal";

interface UserProfile {
  name: string;
  username: string;
  email: string;
  profileImage?: string; 
}

function ProfilePage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem("currentUser");
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.user || parsed;
    }
    return null
  });


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getprofile();
        setUser(data);
        localStorage.setItem("currentUser", JSON.stringify(data));
        setError("");

      } catch (err: any) {
        setError(err.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <p className="text-center mt-10 text-movie-text-sec">Loading profile...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  const handleSaveChanges = async (updatedUser: UserProfile) => {
    try {
      const savedUserFromServer = await updateProfile(updatedUser);
      setUser(savedUserFromServer);

      const savedString = localStorage.getItem("currentUser");
      if (savedString) {
      const parsed = JSON.parse(savedString);
      
      {/* για το πως αποθηκευεται ο χρηστης στο backend */}
      if (parsed.user) {
        parsed.user = savedUserFromServer;
        localStorage.setItem("currentUser", JSON.stringify(parsed));
      } else {
        localStorage.setItem("currentUser", JSON.stringify(savedUserFromServer));
      }

    } else {
      localStorage.setItem("currentUser", JSON.stringify(savedUserFromServer));
    }

    setIsModalOpen(false);
      alert("Profile updated successfully!")
    } catch (err) {
      alert("Failed to update profile ")
    }
  }

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-[360px] bg-movie-surface rounded-lg border border-[#b4b4b4] p-[30px] flex flex-col items-center">
        
        <h2 className="text-2xl font-bold font-display mb-6 text-movie-text-main">Your Profile</h2>

        {user?.profileImage && user.profileImage.trim() !== "" ? (
          <img
            src={user.profileImage}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-2 border-movie-accent mb-6"
          />
        ) : (
          <div className="w-22 h-22 rounded-full bg-movie-bg border border-gray-700 mb-6 flex items-center justify-center text-movie-accent">
            <FaUserCircle className="w-full h-full text-movie-text-sec" />
          </div>
        )}

        <div className="w-full text-left space-y-3 mb-6 bg-movie-bg/30 p-4 rounded border border-gray-700/50">    
          <p className="text-sm text-movie-text-main m-1 flex items-center">
            <strong className="text-movie-text-sec font-medium inline-block w-24 shrink-0">Name:</strong> 
            <span className="text-movie-text-main">{user?.name}</span>
          </p>
          
          <p className="text-sm text-movie-text-main m-1 flex items-center">
            <strong className="text-movie-text-sec font-medium inline-block w-24 shrink-0">Username:</strong> 
            <span className="text-movie-text-main">{user?.username}</span>
          </p>

          <p className="text-sm text-movie-text-main m-1 flex items-center">
            <strong className="text-movie-text-sec font-medium inline-block w-24 shrink-0">Email:</strong> 
            <span className="text-movie-text-main truncate">{user?.email}</span>
          </p>
          
        </div>

        <button 
          className="px-4 py-2 bg-movie-accent text-movie-text-main rounded font-medium cursor-pointer hover:bg-[#1b97b2] transition-colors"
          onClick={() => setIsModalOpen(true)}
        >
          Edit Profile
        </button>

        <EditProfileModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          user={user}
          onSave={handleSaveChanges}
        />

      </div>    
    </div>    
  );
}

export default ProfilePage;