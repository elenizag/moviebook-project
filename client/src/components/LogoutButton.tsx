import { useNavigate } from "react-router-dom";
import { logout } from "../services/authService";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(); 
      navigate("/"); 

    } catch (error) {
      console.log(error);
      alert("Logout failed");
    }
  };

  return (
    <button 
      onClick={handleLogout} 
      className="text-sm font-medium text-red-500 hover:text-red-400 transition-colors cursor-pointer mr-5 focus:outline-none"
    >
      Logout
    </button>
  );
}

export default LogoutButton;