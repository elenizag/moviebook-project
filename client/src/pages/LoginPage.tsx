import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import FormInput from "../components/FormInput";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
        alert("Please fill all the fields");
        return;
    }

    try {
      await login(formData);

      navigate("/");
      
    } catch (error) {
        console.log(error);
        alert("Login failed");
    }
  };

  return (
    <div className="min-h-[85vh] flex flex-col justify-center items-center py-10">
      <div className="w-[400px] bg-movie-surface rounded-lg border border-[#b4b4b4] p-[30px] shadow-xl">
        <h1 className="text-center mb-6 text-2xl font-bold font-display text-movie-text-main">Welcome Back</h1>

        <form onSubmit={handleLogin}>
          <FormInput
            icon={<FaUser />}
            label="Email:"
            type="text"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Email Address"
          />
          <div className="relative">
            <FormInput
              icon={<FaLock />}
              label="Password:"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Password"
            />

            <span
              className="absolute right-[12px] bottom-[14px] cursor-pointer text-movie-text-sec"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>

          <div className="flex justify-between items-center mt-6">
            <button className="px-6 py-2.5 bg-movie-accent text-movie-text-main rounded cursor-pointer hover:bg-[#1b97b2] transition-colors font-bold" type="submit">
              Login
            </button>

            <button className="px-4 py-2 text-sm border border-gray-600 text-movie-text-main rounded hover:bg-movie-bg transition-colors cursor-pointer font-medium" onClick={() => navigate("/")} type="button">
              Back to Home
            </button>
          </div>

        </form>

        <p className="mt-[30px] mb-0 text-sm">
          Don't have an account?
          <Link className="inline-block ml-2 text-movie-accent text-sm no-underline" to="/register">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}

export default LoginPage;