import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import FormInput from "../components/FormInput";

function RegisterPage() {
  const [formData, setFormData] = useState({
      name: "",
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
    });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password || !formData.username || !formData.password_confirmation) {
        alert("Please fill all the fields");
        return;
    }

    try {
      await register(formData);
      alert("Registration successful");

      navigate("/");
      
    } catch (error) {
      console.log(error);
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-[85vh] flex flex-col justify-center items-center py-10">
      <div className="w-[400px] bg-movie-surface rounded-lg border border-[#b4b4b4] p-[30px] shadow-xl">
        <h1 className="text-center mb-6 text-2xl font-bold font-display text-movie-text-main">Register</h1>

        <form onSubmit={handleRegister}>
          <FormInput
            label="Name:"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter your name"
          />
          <FormInput
            label="Username:"
            type="text"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            placeholder="Enter your username"
          />
          <FormInput
            label="Email:"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Enter your email"
          />

          <div className="relative">
            <FormInput
              label="Password:"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Enter your password"
            />

            <span
              className="absolute right-[12px] bottom-[14px] cursor-pointer text-movie-text-sec"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>

          <div className="relative">
            <FormInput
              label="Confirm Password:"
              type={showPassword ? "text" : "password"}
              value={formData.password_confirmation}
              onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
              placeholder="Confirm password"
            />

            <span
              className="absolute right-[12px] bottom-[14px] cursor-pointer text-movie-text-sec"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          <div className="flex justify-between items-center mt-6">
            <button 
              className="px-6 py-2.5 bg-movie-accent text-movie-text-main rounded cursor-pointer hover:bg-[#1b97b2] transition-colors font-bold" 
              type="submit"
            >
              Create Account
            </button>

            <Link 
              to="/" 
              className="px-4 py-2 text-sm border border-gray-600 text-movie-text-main rounded hover:bg-movie-bg transition-colors cursor-pointer font-medium"
            >
              Back to Home
            </Link>
          </div>

        </form>

        <p className="mt-[30px] mb-0 text-sm">
          Already have an account?
          <Link className="inline-block ml-2 text-movie-accent text-sm no-underline" to="/login">
            Login
          </Link>
        </p>
        
      </div>
    </div>
  );
}


export default RegisterPage;
