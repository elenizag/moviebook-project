import {logout} from "../services/authService"

async function LogoutButton() {
  return (
    <button onClick={logout} className="flex items-center space-x-3 px-4 py-2.5 text-[#eb5959] hover:bg-movie-bg font-medium transition-colors text-left w-full">
      Logout
    </button>
  )
}

export default LogoutButton