import { FaShoppingCart, FaTruck, FaTimes, FaBars } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../services/auth_Services/authservice";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state);
  const { token, user } = useSelector((state) => state.auth);
  const [showTrackerDropdown, setShowTrackerDropdown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleDropdownClick = (path) => {
    setShowTrackerDropdown(false);
    navigate(path);
  };

  return (
    <nav className="bg-darkblue shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo Section */}
          <NavLink to="/" className="h-full flex-shrink-0">
            <img
              src="https://tse1.mm.bing.net/th?id=OIP.7Xyb8SalgYcraNsr-NAR1wHaEK&pid=Api&P=0&h=180"
              alt="Logo"
              className="h-full max-h-15 object-cover"
            
            />
          </NavLink>

          {/* Desktop Navigation Links */}
          { (token !== null && user.accountType == "User") &&
              <div className="hidden md:flex space-x-8 text-white">
              <NavLink to="/" className="hover:text-green-500">
                Home
              </NavLink>
              <NavLink to="/contactus" className="hover:text-green-500">
                Contact Us
              </NavLink>
              <NavLink to="/aboutus" className="hover:text-green-500">
                About Us
              </NavLink>
  
              {/* Cart Icon */}
              <NavLink to="/cart" className="relative">
                <FaShoppingCart className="text-2xl text-white hover:text-green-500" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-3 bg-green-500 text-xs w-5 h-5 flex justify-center items-center rounded-full text-darkblue font-bold animate-bounce">
                    {cart.length}
                  </span>
                )}
              </NavLink>
            </div>
          }
          { (token !== null && user.accountType == "Admin") &&
              <div className="hidden md:flex space-x-8 text-white">
              <NavLink to="/" className="hover:text-green-500">
                Home
              </NavLink>
              <NavLink to="/AdminPending" className="hover:text-green-500">
                Pending
              </NavLink>
              <NavLink to="/AdminDispatched" className="hover:text-green-500">
                Dispatched
              </NavLink>
              <NavLink to="/AdminDelivered" className="hover:text-green-500">
                Delivered
              </NavLink>

            </div>
          }

          {/* Mobile Right Section (Cart, Profile, Menu) */}
          <div className="flex items-center gap-2 space-x-4 md:hidden">
            {token !== null && user.accountType === "User" && (
              <NavLink to="/cart" className="relative">
                <FaShoppingCart className="text-2xl text-white hover:text-green-500" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-3 bg-green-500 text-xs w-5 h-5 flex justify-center items-center rounded-full text-darkblue font-bold animate-bounce">
                    {cart.length}
                  </span>
                )}
              </NavLink>
            )}
            
            {token !== null && (
              <NavLink to="/profile">
                {user?.image && (
                  <img
                    src={user.image}
                    alt="Profile"
                    className="w-9 h-9 rounded-full object-cover border-2 border-white"
                  />
                )}
              </NavLink>
            )}

            <button
              className="text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop Profile Section */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Tracker Icon with Dropdown */}
            {token !== null && user.accountType == "User" && (
              <div className="relative">
                <FaTruck
                  className="text-white text-2xl cursor-pointer"
                  onClick={() => setShowTrackerDropdown(!showTrackerDropdown)}
                />
                {showTrackerDropdown && (
                  <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md z-10">
                    <button
                      onClick={() => handleDropdownClick("/pending")}
                      className="block w-full text-left px-4 py-2 text-darkblue hover:bg-gray-100"
                    >
                      Pending
                    </button>
                    <button
                      onClick={() => handleDropdownClick("/dispatch")}
                      className="block w-full text-left px-4 py-2 text-darkblue hover:bg-gray-100"
                    >
                      Dispatch
                    </button>
                    <button
                      onClick={() => handleDropdownClick("/delivered")}
                      className="block w-full text-left px-4 py-2 text-darkblue hover:bg-gray-100"
                    >
                      Delivered
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Profile Image */}
            {token !== null && (
              <NavLink to="/profile">
                {user?.image && (
                  <img
                    src={user.image}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover border-2 border-white"
                    style={{ width: '35px', height: '35px' }}
                  />
                )}
              </NavLink>
            )}

            {/* Auth Buttons */}
            {token == null ? (
              <div className="flex space-x-4">
                <NavLink to="/login">
                  <button className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600">
                    Login
                  </button>
                </NavLink>
                <NavLink to="/signup">
                  <button className="border-2 border-white text-white px-4 py-2 rounded-full hover:bg-green-500">
                    Signup
                  </button>
                </NavLink>
              </div>
            ) : (
              <button
                onClick={() => logout(navigate, dispatch)}
                className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600"
              >
                Logout
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden fixed top-0 left-0 h-full w-64 bg-darkblue shadow-lg z-50 transition-all duration-500 ease-in-out transform ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="pt-16 pb-4">
            {token !== null && user.accountType === "User" && (
              <div className="flex flex-col space-y-4 px-4">
                <NavLink 
                  to="/" 
                  className="text-white hover:text-green-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </NavLink>
                <NavLink 
                  to="/contactus" 
                  className="text-white hover:text-green-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact Us
                </NavLink>
                <NavLink 
                  to="/aboutus" 
                  className="text-white hover:text-green-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About Us
                </NavLink>
                <div className="text-white">
                  <p className="mb-2">Order Tracking</p>
                  <div className="ml-4 flex flex-col space-y-2">
                    <NavLink 
                      to="/pending" 
                      className="hover:text-green-500"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Pending
                    </NavLink>
                    <NavLink 
                      to="/dispatch" 
                      className="hover:text-green-500"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dispatched
                    </NavLink>
                    <NavLink 
                      to="/delivered" 
                      className="hover:text-green-500"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Delivered
                    </NavLink>
                  </div>
                </div>
                <button
                  onClick={() => {
                    logout(navigate, dispatch);
                    setIsMenuOpen(false);
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 w-full"
                >
                  Logout
                </button>
              </div>
            )}

            {/* Admin Mobile Menu */}
            {token !== null && user.accountType === "Admin" && (
              <div className="flex flex-col space-y-4 px-4">
                <NavLink 
                  to="/AdminPending" 
                  className="text-white hover:text-green-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Pending
                </NavLink>
                <NavLink 
                  to="/AdminDispatched" 
                  className="text-white hover:text-green-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dispatched
                </NavLink>
                <NavLink 
                  to="/AdminDelivered" 
                  className="text-white hover:text-green-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Delivered
                </NavLink>
                <button
                  onClick={() => {
                    logout(navigate, dispatch);
                    setIsMenuOpen(false);
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 w-full"
                >
                  Logout
                </button>
              </div>
            )}

            {/* Login/Signup for non-authenticated users */}
            {token == null && (
              <div className="flex flex-col space-y-2 px-4">
                <NavLink 
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <button className="w-full bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600">
                    Login
                  </button>
                </NavLink>
                <NavLink 
                  to="/signup"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <button className="w-full border-2 border-white text-white px-4 py-2 rounded-full hover:bg-green-500">
                    Signup
                  </button>
                </NavLink>
              </div>
            )}
          </div>
        </div>

        {/* Overlay with fade animation */}
        <div 
          className={`fixed inset-0 bg-black transition-opacity duration-500 ease-in-out md:hidden ${
            isMenuOpen ? 'opacity-50 z-40' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsMenuOpen(false)}
        ></div>
      </div>
    </nav>
  );
};

export default Navbar;
