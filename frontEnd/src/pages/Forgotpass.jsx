import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgot_password } from '../services/auth_Services/authservice';
import { FaEnvelope } from 'react-icons/fa';

export default function Forgotpass() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: ""
  });

  const changeHandler = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const send_pass = async () => {
    await forgot_password(formData, navigate);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001f3f] via-[#023b72] to-[#00468c] flex items-center justify-center">
      <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Forgot Password?</h1>
        <p className="text-gray-600 text-center mb-8">
          Enter your email to receive password reset instructions.
        </p>

        {/* Email Input */}
        <div className="mb-5">
          <label className="block text-gray-700 text-sm font-medium mb-2">Email Address</label>
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={changeHandler}
              placeholder="Enter your email"
              className="w-full pl-10 px-4 py-2 border rounded-md text-gray-700 focus:ring-[#0369a1] focus:border-[#0369a1] focus:outline-none"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={send_pass}
          className="w-full bg-[#0369a1] text-white py-3 rounded-md hover:bg-[#014f8c] transition-colors duration-300"
        >
          Send Reset Email
        </button>
        
        {/* Back to Login */}
        <div className="text-center mt-6">
          <p className="text-gray-600">Remembered your password?</p>
          <button
            onClick={() => navigate('/login')}
            className="text-[#0369a1] font-semibold hover:underline"
          >
            Go back to Login
          </button>
        </div>
      </div>
    </div>
  );
}
