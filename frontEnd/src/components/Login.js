import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import { login } from '../services/auth_Services/authservice';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const changeHandler = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const login_function = async () => {
    await login(formData, dispatch, navigate);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001f3f] via-[#023b72] to-[#00468c] flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl p-10 max-w-md w-full">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Welcome Back</h1>
        <p className="text-center text-gray-500 mb-8">Login to your account to continue</p>

        {/* Email Input */}
        <div className="mb-5">
          <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={changeHandler}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-md text-gray-700 focus:ring-[#0369a1] focus:border-[#0369a1] focus:outline-none"
          />
        </div>

        {/* Password Input */}
        <div className="mb-5">
          <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={changeHandler}
            placeholder="Enter your password"
            className="w-full px-4 py-2 border rounded-md text-gray-700 focus:ring-[#0369a1] focus:border-[#0369a1] focus:outline-none"
          />
        </div>

        {/* Login Button */}
        <button
          onClick={login_function}
          className="w-full bg-[#0369a1] text-white py-3 rounded-md hover:bg-[#014f8c] transition-colors duration-300"
        >
          Login
        </button>

        {/* Forgot Password */}
        <div className="text-right mt-4">
          <NavLink
            to="/forgot-password"
            className="text-sm text-[#0369a1] hover:underline"
          >
            Forgot password?
          </NavLink>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-gray-300"></div>

        {/* Signup Prompt */}
        <div className="text-center">
          <p className="text-gray-600">Don't have an account?</p>
          <NavLink
            to="/signup"
            className="text-[#0369a1] font-semibold hover:underline"
          >
            Sign up here
          </NavLink>
        </div>
      </div>
    </div>
  );
}
