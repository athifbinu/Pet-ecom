import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Star, Clock, MapPin } from "lucide-react";

const DoctorCheckout = () => {
  const location = useLocation();
  const { doctor } = location.state || {}; // ✅ Receive doctor data here

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    petName: "",
    petType: "",
    appointmentDate: "",
    reason: "",
  });

  // handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!doctor) {
      alert("Doctor information missing!");
      return;
    }

    // ✅ Prepare WhatsApp message
    const message = `
🩺 *New Doctor Booking!*

👨‍⚕️ Doctor: ${doctor.name}
⭐ Rating: ${doctor.rating}
💼 Specialty: ${doctor.specialty}
📍 Location: ${doctor.location}
💰 Price: $${doctor.price}

📞 *Customer Details:*
👤 Name: ${formData.firstName} ${formData.lastName}
📧 Email: ${formData.email}
📱 Phone: ${formData.phone}
🐾 Pet Name: ${formData.petName}
🐶 Pet Type: ${formData.petType}
📅 Appointment Date: ${formData.appointmentDate}
📝 Reason: ${formData.reason}
`;

    // ✅ Encode message and open WhatsApp with admin number
    const adminNumber = "919876543210"; // change to your admin’s WhatsApp number
    const whatsappUrl = `https://wa.me/${adminNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-xl">
        No doctor data found. Please go back and select a doctor.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-teal-100 py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10">
        {/* Form Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Book Appointment
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                name="firstName"
                onChange={handleChange}
                value={formData.firstName}
                placeholder="First Name"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
                required
              />
              <input
                name="lastName"
                onChange={handleChange}
                value={formData.lastName}
                placeholder="Last Name"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <input
              name="email"
              onChange={handleChange}
              value={formData.email}
              placeholder="Email"
              type="email"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
              required
            />
            <input
              name="phone"
              onChange={handleChange}
              value={formData.phone}
              placeholder="Phone Number"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
              required
            />
            <input
              name="petName"
              onChange={handleChange}
              value={formData.petName}
              placeholder="Pet Name"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
            />
            <select
              name="petType"
              onChange={handleChange}
              value={formData.petType}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Select Pet Type</option>
              <option>Dog</option>
              <option>Cat</option>
              <option>Bird</option>
              <option>Rabbit</option>
              <option>Other</option>
            </select>
            <input
              name="appointmentDate"
              onChange={handleChange}
              value={formData.appointmentDate}
              type="date"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
              required
            />
            <textarea
              name="reason"
              onChange={handleChange}
              value={formData.reason}
              placeholder="Reason for visit"
              rows={4}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-transform transform hover:scale-105"
            >
              Confirm Booking
            </button>
          </form>
        </div>

        {/* Doctor Info */}
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <img
            src={doctor.image_url || "/default-doctor.png"}
            alt={doctor.name}
            className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
          />
          <h3 className="text-2xl font-bold text-gray-800">{doctor.name}</h3>
          <p className="text-orange-600 font-medium mb-2">{doctor.specialty}</p>
          <div className="flex justify-center gap-3 text-gray-500 text-sm mb-3">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500" /> {doctor.rating}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" /> {doctor.experience} yrs
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" /> {doctor.location}
            </div>
          </div>
          <div className="border-t pt-3">
            <p className="text-gray-700">
              <span className="font-semibold">Consultation Fee:</span> $
              {doctor.price}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCheckout;
