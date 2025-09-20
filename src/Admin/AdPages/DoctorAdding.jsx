import React, { useState } from "react";
import { supabase } from "../../components/supabase/supabaseClient.js";

const DoctorAdding = () => {
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    note: "",
    experience: "",
    location: "",
    price: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = "";

      if (formData.image) {
        // Upload image to Supabase storage
        const fileName = `doctors/${Date.now()}_${formData.image.name}`;
        const { error: uploadError } = await supabase.storage
          .from("doctor-images") // bucket name
          .upload(fileName, formData.image);

        if (uploadError) throw uploadError;

        // Get public URL
        const { data } = supabase.storage
          .from("doctor-images")
          .getPublicUrl(fileName);

        imageUrl = data.publicUrl;
      }

      // Insert doctor into table
      const { error: insertError } = await supabase.from("doctors").insert([
        {
          name: formData.name,
          position: formData.position,
          note: formData.note,
          experience: parseInt(formData.experience, 10),
          location: formData.location,
          price: parseFloat(formData.price),
          image_url: imageUrl,
        },
      ]);

      if (insertError) throw insertError;

      alert("✅ Doctor Added Successfully!");

      // Reset form
      setFormData({
        name: "",
        position: "",
        note: "",
        experience: "",
        location: "",
        price: "",
        image: null,
      });
    } catch (error) {
      console.error("Error adding doctor:", error.message);
      alert("❌ Failed to add doctor: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-white">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Add Doctor
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Doctor Name */}
          <div>
            <label className="block text-gray-700 font-medium">
              Doctor Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter doctor's name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400"
              required
            />
          </div>

          {/* Doctor Position */}
          <div>
            <label className="block text-gray-700 font-medium">
              Doctor Position
            </label>
            <input
              type="text"
              name="position"
              placeholder="e.g., Small Animal Surgery"
              value={formData.position}
              onChange={handleChange}
              className="w-full p-3 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400"
              required
            />
          </div>

          {/* Short Note */}
          <div>
            <label className="block text-gray-700 font-medium">
              Short Note
            </label>
            <textarea
              name="note"
              placeholder="Write a short description..."
              value={formData.note}
              onChange={handleChange}
              className="w-full p-3 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400"
              rows="3"
              required
            ></textarea>
          </div>

          {/* Experience */}
          <div>
            <label className="block text-gray-700 font-medium">
              Experience (Years)
            </label>
            <input
              type="number"
              name="experience"
              placeholder="e.g., 8"
              value={formData.experience}
              onChange={handleChange}
              className="w-full p-3 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-700 font-medium">Location</label>
            <input
              type="text"
              name="location"
              placeholder="e.g., Downtown Clinic"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-3 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-700 font-medium">Price ($)</label>
            <input
              type="number"
              name="price"
              placeholder="e.g., 120"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-3 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-700 font-medium">
              Doctor Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full p-3 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-500 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-teal-600 transition disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add Doctor"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorAdding;
