import { FaShoppingCart, FaTruck, FaTimes, FaBars, FaGem, FaUser, FaSignOutAlt } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../services/auth_Services/authservice";
import { useState, useEffect } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state);
  const { token, user } = useSelector((state) => state.auth);
  const [showTrackerDropdown, setShowTrackerDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDropdownClick = (path) => {
    setShowTrackerDropdown(false);
    setShowProfileDropdown(false);
    navigate(path);
  };

  const closeAllDropdowns = () => {
    setShowTrackerDropdown(false);
    setShowProfileDropdown(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'glass-effect shadow-luxury backdrop-blur-md' 
          : 'bg-white/95 shadow-soft'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo Section */}
            <NavLink to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <FaGem className="text-3xl gradient-text group-hover:animate-pulse" />
                <div className="absolute inset-0 diamond-sparkle opacity-0 group-hover:opacity-100"></div>
              </div>
              <div className="font-display">
                <h1 className="text-2xl font-bold gradient-text">Blue Diamonds</h1>
                <p className="text-xs text-gray-500 -mt-1">Luxury Collection</p>
              </div>
            </NavLink>

            {/* Desktop Navigation Links */}
            {token !== null && user?.accountType === "User" && (
              <div className="hidden lg:flex items-center space-x-8">
                <NavLink 
                  to="/" 
                  className={({ isActive }) => 
                    `relative font-medium transition-all duration-300 ${
                      isActive 
                        ? 'text-yellow-600' 
                        : 'text-gray-700 hover:text-yellow-600'
                    }`
                  }
                >
                  Home
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-300 group-hover:w-full"></span>
                </NavLink>
                <NavLink 
                  to="/contactus" 
                  className={({ isActive }) => 
                    `relative font-medium transition-all duration-300 ${
                      isActive 
                        ? 'text-yellow-600' 
                        : 'text-gray-700 hover:text-yellow-600'
                    }`
                  }
                >
                  Contact
                </NavLink>
                <NavLink 
                  to="/aboutus" 
                  className={({ isActive }) => 
                    `relative font-medium transition-all duration-300 ${
                      isActive 
                        ? 'text-yellow-600' 
                        : 'text-gray-700 hover:text-yellow-600'
                    }`
                  }
                >
                  About
                </NavLink>
              </div>
            )}

            {token !== null && user?.accountType === "Admin" && (
              <div className="hidden lg:flex items-center space-x-8">
                <NavLink 
                  to="/dashboard" 
                  className={({ isActive }) => 
                    `relative font-medium transition-all duration-300 ${
                      isActive 
                        ? 'text-yellow-600' 
                        : 'text-gray-700 hover:text-yellow-600'
                    }`
                  }
                >
                  Dashboard
                </NavLink>
                <NavLink 
                  to="/AdminPending" 
                  className={({ isActive }) => 
                    `relative font-medium transition-all duration-300 ${
                      isActive 
                        ? 'text-yellow-600' 
                        : 'text-gray-700 hover:text-yellow-600'
                    }`
                  }
                >
                  Pending
                </NavLink>
                <NavLink 
                  to="/AdminDispatched" 
                  className={({ isActive }) => 
                    `relative font-medium transition-all duration-300 ${
                      isActive 
                        ? 'text-yellow-600' 
                        : 'text-gray-700 hover:text-yellow-600'
                    }`
                  }
                >
                  Dispatched
                </NavLink>
                <NavLink 
                  to="/AdminDelivered" 
                  className={({ isActive }) => 
                    `relative font-medium transition-all duration-300 ${
                      isActive 
                        ? 'text-yellow-600' 
                        : 'text-gray-700 hover:text-yellow-600'
                    }`
                  }
                >
                  Delivered
                </NavLink>
              </div>
            )}

            {/* Desktop Right Section */}
            <div className="hidden lg:flex items-center space-x-6">
              {/* Cart Icon for Users */}
              {token !== null && user?.accountType === "User" && (
                <NavLink to="/cart" className="relative group">
                  <div className="p-2 rounded-full hover:bg-yellow-50 transition-colors duration-300">
                    <FaShoppingCart className="text-xl text-gray-700 group-hover:text-yellow-600 transition-colors duration-300" />
                    {cart.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs w-6 h-6 flex justify-center items-center rounded-full font-bold animate-pulse shadow-lg">
                        {cart.length}
                      </span>
                    )}
                  </div>
                </NavLink>
              )}

              {/* Order Tracker for Users */}
              {token !== null && user?.accountType === "User" && (
                <div className="relative">
                  <button
                    onClick={() => setShowTrackerDropdown(!showTrackerDropdown)}
                    className="p-2 rounded-full hover:bg-yellow-50 transition-colors duration-300 group"
                  >
                    <FaTruck className="text-xl text-gray-700 group-hover:text-yellow-600 transition-colors duration-300" />
                  </button>
                  {showTrackerDropdown && (
                    <div className="absolute right-0 mt-2 w-48 card-luxury shadow-luxury z-20">
                      <div className="py-2">
                        <button
                          onClick={() => handleDropdownClick("/pending")}
                          className="flex items-center w-full px-4 py-3 text-left text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors duration-200"
                        >
                          <div className="w-3 h-3 rounded-full bg-amber-400 mr-3"></div>
                          Pending Orders
                        </button>
                        <button
                          onClick={() => handleDropdownClick("/dispatch")}
                          className="flex items-center w-full px-4 py-3 text-left text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors duration-200"
                        >
                          <div className="w-3 h-3 rounded-full bg-purple-400 mr-3"></div>
                          Dispatched
                        </button>
                        <button
                          onClick={() => handleDropdownClick("/delivered")}
                          className="flex items-center w-full px-4 py-3 text-left text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors duration-200"
                        >
                          <div className="w-3 h-3 rounded-full bg-green-400 mr-3"></div>
                          Delivered
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Profile Section */}
              {token !== null ? (
                <div className="relative">
                  <button
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    className="flex items-center space-x-2 p-2 rounded-full hover:bg-yellow-50 transition-colors duration-300 group"
                  >
                    {user?.image ? (
                      <img
                        src={user.image}
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover border-2 border-yellow-200 group-hover:border-yellow-400 transition-colors duration-300"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 flex items-center justify-center">
                        <FaUser className="text-white text-sm" />
                      </div>
                    )}
                  </button>
                  {showProfileDropdown && (
                    <div className="absolute right-0 mt-2 w-56 card-luxury shadow-luxury z-20">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{user?.firstName} {user?.lastName}</p>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                      </div>
                      <div className="py-2">
                        <button
                          onClick={() => handleDropdownClick("/profile")}
                          className="flex items-center w-full px-4 py-3 text-left text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors duration-200"
                        >
                          <FaUser className="mr-3" />
                          My Profile
                        </button>
                        <button
                          onClick={() => {
                            logout(navigate, dispatch);
                            closeAllDropdowns();
                          }}
                          className="flex items-center w-full px-4 py-3 text-left text-red-600 hover:bg-red-50 transition-colors duration-200"
                        >
                          <FaSignOutAlt className="mr-3" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <NavLink to="/login">
                    <button className="btn-outline">
                      Sign In
                    </button>
                  </NavLink>
                  <NavLink to="/signup">
                    <button className="btn-primary">
                      Get Started
                    </button>
                  </NavLink>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-4">
              {/* Mobile Cart */}
              {token !== null && user?.accountType === "User" && (
                <NavLink to="/cart" className="relative">
                  <FaShoppingCart className="text-xl text-gray-700" />
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs w-5 h-5 flex justify-center items-center rounded-full font-bold">
                      {cart.length}
                    </span>
                  )}
                </NavLink>
              )}
              
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
              >
                {isMenuOpen ? (
                  <FaTimes className="h-6 w-6 text-gray-700" />
                ) : (
                  <FaBars className="h-6 w-6 text-gray-700" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden fixed top-0 right-0 h-full w-80 bg-white shadow-luxury z-50 transition-all duration-300 ease-in-out transform ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="p-6 pt-24">
            {/* User Profile Section */}
            {token !== null && (
              <div className="flex items-center space-x-4 mb-8 p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl">
                {user?.image ? (
                  <img
                    src={user.image}
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover border-2 border-yellow-300"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 flex items-center justify-center">
                    <FaUser className="text-white" />
                  </div>
                )}
                <div>
                  <p className="font-semibold text-gray-900">{user?.firstName} {user?.lastName}</p>
                  <p className="text-sm text-gray-600">{user?.accountType}</p>
                </div>
              </div>
            )}

            {/* Navigation Links */}
            <div className="space-y-2">
              {token !== null && user?.accountType === "User" && (
                <>
                  <NavLink 
                    to="/" 
                    className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </NavLink>
                  <NavLink 
                    to="/contactus" 
                    className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contact Us
                  </NavLink>
                  <NavLink 
                    to="/aboutus" 
                    className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    About Us
                  </NavLink>
                  
                  <div className="pt-4 pb-2">
                    <p className="px-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">Order Tracking</p>
                  </div>
                  <NavLink 
                    to="/pending" 
                    className="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="w-3 h-3 rounded-full bg-amber-400 mr-3"></div>
                    Pending Orders
                  </NavLink>
                  <NavLink 
                    to="/dispatch" 
                    className="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="w-3 h-3 rounded-full bg-purple-400 mr-3"></div>
                    Dispatched
                  </NavLink>
                  <NavLink 
                    to="/delivered" 
                    className="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="w-3 h-3 rounded-full bg-green-400 mr-3"></div>
                    Delivered
                  </NavLink>
                </>
              )}

              {token !== null && user?.accountType === "Admin" && (
                <>
                  <NavLink 
                    to="/dashboard" 
                    className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </NavLink>
                  <NavLink 
                    to="/AdminPending" 
                    className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Pending Orders
                  </NavLink>
                  <NavLink 
                    to="/AdminDispatched" 
                    className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dispatched Orders
                  </NavLink>
                  <NavLink 
                    to="/AdminDelivered" 
                    className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Delivered Orders
                  </NavLink>
                </>
              )}

              {token !== null && (
                <>
                  <div className="pt-4 pb-2">
                    <p className="px-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">Account</p>
                  </div>
                  <NavLink 
                    to="/profile" 
                    className="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FaUser className="mr-3" />
                    My Profile
                  </NavLink>
                  <button
                    onClick={() => {
                      logout(navigate, dispatch);
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center w-full px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors duration-200"
                  >
                    <FaSignOutAlt className="mr-3" />
                    Sign Out
                  </button>
                </>
              )}

              {token === null && (
                <div className="pt-6 space-y-3">
                  <NavLink 
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block"
                  >
                    <button className="w-full btn-outline">
                      Sign In
                    </button>
                  </NavLink>
                  <NavLink 
                    to="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="block"
                  >
                    <button className="w-full btn-primary">
                      Get Started
                    </button>
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Overlay */}
        <div 
          className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
            isMenuOpen ? 'opacity-100 z-40' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsMenuOpen(false)}
        />
      </nav>

      {/* Click outside to close dropdowns */}
      {(showTrackerDropdown || showProfileDropdown) && (
        <div 
          className="fixed inset-0 z-10" 
          onClick={closeAllDropdowns}
        />
      )}

      {/* Spacer for fixed navbar */}
      <div className="h-20"></div>
    </>
  );
};

export default Navbar;
