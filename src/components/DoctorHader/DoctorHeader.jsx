import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Users, Heart, Menu, X } from "lucide-react";

const DoctorHeader = () => {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Helper to check active route
  const isActive = (path) =>
    location.pathname.toLowerCase().includes(path.toLowerCase());

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/Doctor" className="flex items-center space-x-2">
            <div className="bg-orange-500 p-2 rounded-lg">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-800">
              Mtm PetCare
            </span>
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/Doctor"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                isActive("/Doctor")
                  ? "bg-orange-100 text-orange-600"
                  : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"
              }`}
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>

            <Link
              to="/DoctorsList"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                isActive("/DoctorsList")
                  ? "bg-orange-100 text-orange-600"
                  : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"
              }`}
            >
              <Users className="h-5 w-5" />
              <span>Our Doctors</span>
            </Link>

            <Link
              to="/DoctorsCheckout"
              className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-all duration-200 transform hover:scale-105"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="text-gray-600 hover:text-orange-600"
            >
              {isMobileOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {isMobileOpen && (
        <div className="md:hidden bg-white shadow-lg px-4 py-3 space-y-2">
          <Link
            to="/Doctor"
            onClick={() => setIsMobileOpen(false)}
            className={`block px-3 py-2 rounded-lg ${
              isActive("/Doctor")
                ? "bg-orange-100 text-orange-600"
                : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"
            }`}
          >
            Home
          </Link>
          <Link
            to="/DoctorsList"
            onClick={() => setIsMobileOpen(false)}
            className={`block px-3 py-2 rounded-lg ${
              isActive("/DoctorsList")
                ? "bg-orange-100 text-orange-600"
                : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"
            }`}
          >
            Our Doctors
          </Link>
          <Link
            to="/DoctorsCheckout"
            onClick={() => setIsMobileOpen(false)}
            className="block px-3 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600"
          >
            Book Now
          </Link>
        </div>
      )}
    </nav>
  );
};

export default DoctorHeader;
