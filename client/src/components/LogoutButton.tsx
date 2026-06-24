import { useNavigate } from "react-router-dom";
import { logout } from "../services/authService";

interface LogoutProp {
  onLogoutSuccess: () => void;
  className?: string;
}


function LogoutButton({onLogoutSuccess, className}: LogoutProp) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(); 
      window.dispatchEvent(new Event("authChange"));
    } catch (error) {
      console.log(error);
    } finally {
      onLogoutSuccess();
      navigate("/");
    }

  };

  return (
    <button 
      onClick={handleLogout} 
      className={className || "text-lg font-medium text-red-500 hover:text-red-400 transition-colors cursor-pointer mr-5 focus:outline-none"}
    >
      Logout
    </button>
  );
}

export default LogoutButton;