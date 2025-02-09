import { FaShoppingCart, FaTruck } from "react-icons/fa";
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

  const handleDropdownClick = (path) => {
    setShowTrackerDropdown(false);
    navigate(path);
  };

  return (
    <nav className="bg-darkblue shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo Section */}
          <NavLink to="/" className="h-full">
            <img
              src="https://tse1.mm.bing.net/th?id=OIP.7Xyb8SalgYcraNsr-NAR1wHaEK&pid=Api&P=0&h=180"
              alt="Logo"
              className="h-full max-h-20 object-cover"
            />
          </NavLink>

          {/* Navigation Links */}

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

          {/* Profile, Tracker, and Authentication */}
          <div className="flex items-center space-x-4 relative">
            {/* Tracker Icon with Dropdown */}
            {
              (token !== null && user.accountType == "User") &&
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
            }
            

            {/* Profile Image */}
            {token !== null && user?.image && (
              <img
                src={user.image}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border-2 border-white"
              />
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
      </div>
    </nav>
  );
};

export default Navbar;
