import React, { useEffect, useState } from "react";
import { supabase } from "../components/supabase/supabaseClient";
import { Link } from "react-router-dom";
import { Star, Clock, MapPin } from "lucide-react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ImSpinner } from "react-icons/im";

const DoctorListing = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editDoctor, setEditDoctor] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    specialty: "",
    rating: "",
    experience: "",
    price: "",
    image: "",
    location: "",
    description: "",
  });

  // Fetch doctors from Supabase
  const fetchDoctors = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("doctors").select("*");
    if (error) {
      console.error("❌ Error fetching doctors:", error.message);
    } else {
      setDoctors(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-teal-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Our Expert Veterinarians
          </h1>
          <p className="text-lg text-gray-600">
            Choose from our team of certified and experienced veterinarians
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <ImSpinner className="animate-spin text-3xl text-orange-500" />
          </div>
        ) : doctors.length === 0 ? (
          <p className="text-center text-gray-500">No doctors found.</p>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doctor, index) => (
              <div
                key={doctor.id}
                className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2"
              >
                {/* Doctor Image */}
                <div className="relative h-56 w-full">
                  <img
                    src={doctor.image_url || "/default-doctor.png"}
                    alt={doctor.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-4 left-4 px-3 py-1 bg-yellow-500 text-white rounded-full text-sm font-semibold flex items-center space-x-1">
                    <Star className="w-4 h-4" />
                    <span>{doctor.rating}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-1">
                    {doctor.name}
                  </h3>
                  <p className="text-orange-600 font-medium mb-2">
                    {doctor.specialty}
                  </p>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {doctor.description}
                  </p>

                  <div className="flex justify-between items-center mb-4 text-gray-600 text-sm">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{doctor.experience} yrs</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{doctor.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <span className="text-2xl font-bold text-orange-500">
                      ${doctor.price}
                    </span>

                    <div className="flex items-center gap-2">
                      <Link
                        to="/DoctorsCheckout"
                        state={{ doctor }}
                        className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorListing;
