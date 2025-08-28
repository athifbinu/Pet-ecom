import React from "react";
import { useParams } from "react-router-dom";

const DoctorCheckout = () => {
  const { id } = useParams(); // doctor id from URL

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-teal-100 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* Booking Form */}
            <div className="p-8 lg:p-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">
                Book Appointment
              </h2>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pet Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your pet's name"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pet Type
                    </label>
                    <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200">
                      <option>Select pet type</option>
                      <option>Dog</option>
                      <option>Cat</option>
                      <option>Bird</option>
                      <option>Rabbit</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Appointment Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for Visit
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    placeholder="Describe your pet's condition or reason for visit"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-500 text-white py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-all duration-200 transform hover:scale-105"
                >
                  Confirm Booking
                </button>
              </form>
            </div>

            {/* Doctor Info */}
            {selectedDoctor && (
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 lg:p-12">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Appointment Summary
                </h3>

                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <img
                    src={selectedDoctor.image}
                    alt={selectedDoctor.name}
                    className="w-20 h-20 rounded-full object-cover mb-4"
                  />
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">
                    {selectedDoctor.name}
                  </h4>
                  <p className="text-orange-600 font-medium mb-4">
                    {selectedDoctor.specialty}
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-600">
                        {selectedDoctor.rating} Rating
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {selectedDoctor.experience} Experience
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {selectedDoctor.location}
                      </span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Consultation Fee</span>
                      <span className="font-semibold">
                        ${selectedDoctor.price}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Service Fee</span>
                      <span className="font-semibold">$10</span>
                    </div>
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-gray-800">
                          Total
                        </span>
                        <span className="text-2xl font-bold text-orange-500">
                          ${selectedDoctor.price + 10}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setCurrentPage("doctors")}
                  className="mt-6 w-full border-2 border-orange-500 text-orange-600 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-all duration-200"
                >
                  Change Doctor
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCheckout;
