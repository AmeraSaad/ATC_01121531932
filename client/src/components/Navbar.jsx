import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserIcon from './icons/UserIcon';
import { useAuthStore } from '../store/authStore';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 200);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-orange-700">
              Events
            </Link>
          </div>

          <div className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
            <p
              className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
            >
              About Us
            </p>
            <p
              className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
            >
              Support
            </p>
            {isAuthenticated && user.isAdmin && (
              <Link
                to="/admin"
                className="text-orange-600 hover:text-orange-800 px-3 py-2 rounded-md text-sm font-medium"
              >
                Admin Panel
              </Link>
            )}
          </div>

          <div 
            ref={dropdownRef}
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className="flex items-center text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              <UserIcon className="w-8 h-8" />
            </button>

            {isDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Login
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
