import React from "react";
import { Link } from "react-router-dom";
import { Star, Clock, MapPin } from "lucide-react"; // ✅ add missing icons

const DoctorListing = () => {
  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Small Animal Surgery",
      rating: 4.9,
      experience: "8 years",
      price: 120,
      image:
        "https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=400",
      availability: ["Monday", "Wednesday", "Friday"],
      location: "Downtown Clinic",
      description:
        "Specialized in small animal surgery with extensive experience in emergency procedures.",
    },
    // ... rest of your doctors
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-teal-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Our Expert Veterinarians
          </h1>
          <p className="text-xl text-gray-600">
            Choose from our team of certified and experienced veterinarians
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor, index) => (
            <div
              key={doctor.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fadeInUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {doctor.name}
                  </h3>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-600">
                      {doctor.rating}
                    </span>
                  </div>
                </div>
                <p className="text-orange-600 font-medium mb-3">
                  {doctor.specialty}
                </p>
                <p className="text-gray-600 text-sm mb-4">
                  {doctor.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {doctor.experience} experience
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {doctor.location}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-orange-500">
                    ${doctor.price}
                  </span>

                  {/* ✅ Navigate to checkout with doctor details */}
                  <Link
                    to="/DoctorsCheckout"
                    state={{ doctor }}
                    className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-all duration-200 transform hover:scale-105"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorListing;
