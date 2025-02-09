import React, { useState } from 'react';
import { send_otp, sign_up } from '../services/auth_Services/authservice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaHome, FaEye, FaEyeSlash } from 'react-icons/fa';

export default function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    accountType: 'User',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    otp: '',
    contactNumber: '',
    address: '',
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const toggleConfirmPasswordVisibility = () => setConfirmPasswordVisible(!confirmPasswordVisible);

  const changeHandler = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const email_id = {
    email: formData.email,
  };

  async function send_message_otp() {
    if (formData.email) {
      await send_otp(email_id);
    } else {
      toast.error('Please enter your email');
    }
  }

  async function signup_user() {
    if (formData.password === formData.confirmPassword) {
      await sign_up(formData, navigate);
    } else {
      toast.error('Passwords do not match');
    }
  }

  return (
    <div className=" flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl w-full">
        {/* Left Section */}
        <div className="bg-blue-900 text-white flex flex-col items-center justify-center p-6 md:w-1/2">
          <h2 className="text-2xl font-bold mb-2">Welcome to Blue Diamond</h2>
          <p className="text-center mb-4 text-sm">
            Join us and experience the best services tailored just for you.
          </p>
        </div>

        {/* Right Section */}
        <div className="p-6 md:w-1/2">
          <h2 className="text-xl font-bold text-center text-gray-800 mb-4">Sign Up</h2>
          <form>
            <div className="grid grid-cols-1 gap-3">

              {/* Account Type Dropdown */}
              <div className="flex items-center border rounded-lg px-3 py-2">
                <select
                  name="accountType"
                  value={formData.accountType}
                  onChange={changeHandler}
                  className="w-full outline-none text-sm text-gray-700"
                >
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              <div className="flex items-center border rounded-lg px-3 py-2">
                <FaUser className="text-gray-500 mr-2" />
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={changeHandler}
                  placeholder="First Name"
                  className="w-full outline-none text-sm"
                />
              </div>
              <div className="flex items-center border rounded-lg px-3 py-2">
                <FaUser className="text-gray-500 mr-2" />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={changeHandler}
                  placeholder="Last Name"
                  className="w-full outline-none text-sm"
                />
              </div>
              <div className="flex items-center border rounded-lg px-3 py-2">
                <FaEnvelope className="text-gray-500 mr-2" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={changeHandler}
                  placeholder="Email"
                  className="w-full outline-none text-sm"
                />
              </div>

              {/* Password Field */}
              <div className="flex items-center border rounded-lg px-3 py-2">
                <FaLock className="text-gray-500 mr-2" />
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={changeHandler}
                  placeholder="Password"
                  className="w-full outline-none text-sm"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="ml-2 text-gray-500"
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {/* Confirm Password Field */}
              <div className="flex items-center border rounded-lg px-3 py-2">
                <FaLock className="text-gray-500 mr-2" />
                <input
                  type={confirmPasswordVisible ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={changeHandler}
                  placeholder="Confirm Password"
                  className="w-full outline-none text-sm"
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="ml-2 text-gray-500"
                >
                  {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <div className="flex items-center border rounded-lg px-3 py-2">
                <FaPhone className="text-gray-500 mr-2" />
                <input
                  type="text"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={changeHandler}
                  placeholder="Contact Number"
                  className="w-full outline-none text-sm"
                />
              </div>
              <div className="flex items-center border rounded-lg px-3 py-2">
                <FaHome className="text-gray-500 mr-2" />
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={changeHandler}
                  placeholder="Address"
                  className="w-full outline-none text-sm"
                />
              </div>
              <div className="flex items-center border rounded-lg px-3 py-2">
                <input
                  type="text"
                  name="otp"
                  value={formData.otp}
                  onChange={changeHandler}
                  placeholder="Enter OTP"
                  className="w-full outline-none text-sm"
                />
                <button
                  type="button"
                  onClick={send_message_otp}
                  className="bg-blue-500 text-white px-3 py-1 rounded-lg ml-2 text-xs hover:bg-blue-600"
                >
                  Send OTP
                </button>
              </div>
            </div>
            <button
              type="button"
              onClick={signup_user}
              className="w-full mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200 text-sm"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
