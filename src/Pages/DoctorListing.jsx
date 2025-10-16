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

  // ✅ Fetch Doctors from Supabase
  const fetchDoctors = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("doctors").select("*");
    if (error) {
      console.error("❌ Error fetching doctors:", error.message);
    } else {
      console.log("✅ Doctors fetched:", data);
      setDoctors(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // ✅ Delete Doctor
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this doctor?"
    );
    if (!confirmDelete) return;

    const { error } = await supabase.from("doctors").delete().eq("id", id);
    if (error) {
      alert("❌ Error deleting doctor: " + error.message);
    } else {
      alert("✅ Doctor deleted successfully");
      fetchDoctors();
    }
  };

  // ✅ Open Edit Modal
  const openEditModal = (doctor) => {
    setEditDoctor(doctor);
    setEditForm({
      name: doctor.name,
      specialty: doctor.specialty,
      rating: doctor.rating,
      experience: doctor.experience,
      price: doctor.price,
      image: doctor.image,
      location: doctor.location,
      description: doctor.description,
    });
  };

  // ✅ Handle Edit Form Change
  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  // ✅ Submit Edit Form
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from("doctors")
      .update(editForm)
      .eq("id", editDoctor.id);

    if (error) {
      alert("❌ Error updating doctor: " + error.message);
    } else {
      alert("✅ Doctor updated successfully!");
      setEditDoctor(null);
      fetchDoctors();
    }
  };

  // ✅ UI Section
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

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <ImSpinner className="animate-spin text-3xl text-orange-500" />
          </div>
        ) : doctors.length === 0 ? (
          <p className="text-center text-gray-500">No doctors found.</p>
        ) : (
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
                      <button
                        onClick={() => openEditModal(doctor)}
                        className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(doctor.id)}
                        className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ✅ Edit Modal */}
        {editDoctor && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Edit Doctor</h2>
              <form onSubmit={handleEditSubmit} className="space-y-3">
                <input
                  name="name"
                  value={editForm.name}
                  onChange={handleEditChange}
                  className="w-full p-2 border rounded"
                  placeholder="Doctor Name"
                  required
                />
                <input
                  name="specialty"
                  value={editForm.specialty}
                  onChange={handleEditChange}
                  className="w-full p-2 border rounded"
                  placeholder="Specialty"
                />
                <input
                  name="rating"
                  value={editForm.rating}
                  onChange={handleEditChange}
                  className="w-full p-2 border rounded"
                  placeholder="Rating"
                />
                <input
                  name="experience"
                  value={editForm.experience}
                  onChange={handleEditChange}
                  className="w-full p-2 border rounded"
                  placeholder="Experience"
                />
                <input
                  name="price"
                  value={editForm.price}
                  onChange={handleEditChange}
                  className="w-full p-2 border rounded"
                  placeholder="Price"
                />
                <input
                  name="image"
                  value={editForm.image}
                  onChange={handleEditChange}
                  className="w-full p-2 border rounded"
                  placeholder="Image URL"
                />
                <input
                  name="location"
                  value={editForm.location}
                  onChange={handleEditChange}
                  className="w-full p-2 border rounded"
                  placeholder="Location"
                />
                <textarea
                  name="description"
                  value={editForm.description}
                  onChange={handleEditChange}
                  className="w-full p-2 border rounded"
                  placeholder="Description"
                ></textarea>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setEditDoctor(null)}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorListing;
