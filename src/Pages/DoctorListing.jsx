import React, { useEffect, useState, useMemo } from "react";
import { supabase } from "../components/supabase/supabaseClient";
import { Link } from "react-router-dom";
import { updatePageMeta, seoConfig } from "../utils/seoHelper";
import {
  Star,
  Clock,
  MapPin,
  Search,
  Filter,
  ChevronDown,
  Award,
  Heart,
} from "lucide-react";
import { ImSpinner } from "react-icons/im";

const DoctorListing = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [likedDoctors, setLikedDoctors] = useState([]);

  // Filter states
  const [specialtyFilter, setSpecialtyFilter] = useState("");
  const [experienceFilter, setExperienceFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [sortBy, setSortBy] = useState("recommended");

  // Fetch doctors from Supabase
  const fetchDoctors = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("doctors").select("*");
    if (error) {
      console.error("❌ Error fetching doctors:", error.message);
    } else {
      setDoctors(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    updatePageMeta(
      seoConfig.doctorsList.title,
      seoConfig.doctorsList.description,
      seoConfig.doctorsList.keywords,
      window.location.href,
    );
  }, []);

  useEffect(() => {
    fetchDoctors();
  }, []);

  // Get unique specialties for filter
  const specialties = useMemo(() => {
    return [...new Set(doctors.map((doc) => doc.specialty))].filter(Boolean);
  }, [doctors]);

  // Filter and sort doctors
  const filteredDoctors = useMemo(() => {
    let result = doctors.filter((doctor) => {
      // Search filter - handle null/undefined values
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        (doctor.name && doctor.name.toLowerCase().includes(searchLower)) ||
        (doctor.specialty &&
          doctor.specialty.toLowerCase().includes(searchLower)) ||
        (doctor.location &&
          doctor.location.toLowerCase().includes(searchLower)) ||
        (doctor.description &&
          doctor.description.toLowerCase().includes(searchLower));

      // Specialty filter
      const matchesSpecialty =
        !specialtyFilter || doctor.specialty === specialtyFilter;

      // Experience filter
      let matchesExperience = true;
      if (experienceFilter) {
        const exp = parseInt(doctor.experience) || 0;
        if (experienceFilter === "beginner") matchesExperience = exp < 5;
        else if (experienceFilter === "intermediate")
          matchesExperience = exp >= 5 && exp < 10;
        else if (experienceFilter === "expert") matchesExperience = exp >= 10;
      }

      // Rating filter
      let matchesRating = true;
      if (ratingFilter) {
        const rating = parseFloat(doctor.rating) || 0;
        if (ratingFilter === "4plus") matchesRating = rating >= 4;
        else if (ratingFilter === "3plus") matchesRating = rating >= 3;
      }

      // Price filter
      let matchesPrice = true;
      if (priceFilter) {
        const price = parseInt(doctor.price) || 0;
        if (priceFilter === "budget") matchesPrice = price < 50;
        else if (priceFilter === "standard")
          matchesPrice = price >= 50 && price < 100;
        else if (priceFilter === "premium") matchesPrice = price >= 100;
      }

      return (
        matchesSearch &&
        matchesSpecialty &&
        matchesExperience &&
        matchesRating &&
        matchesPrice
      );
    });

    // Sort
    if (sortBy === "rating") {
      result.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
    } else if (sortBy === "price-low") {
      result.sort((a, b) => parseInt(a.price) - parseInt(b.price));
    } else if (sortBy === "price-high") {
      result.sort((a, b) => parseInt(b.price) - parseInt(a.price));
    } else if (sortBy === "experience") {
      result.sort((a, b) => parseInt(b.experience) - parseInt(a.experience));
    }

    return result;
  }, [
    doctors,
    searchTerm,
    specialtyFilter,
    experienceFilter,
    ratingFilter,
    priceFilter,
    sortBy,
  ]);

  const toggleLike = (doctorId) => {
    setLikedDoctors((prev) =>
      prev.includes(doctorId)
        ? prev.filter((id) => id !== doctorId)
        : [...prev, doctorId],
    );
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSpecialtyFilter("");
    setExperienceFilter("");
    setRatingFilter("");
    setPriceFilter("");
    setSortBy("recommended");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 text-white text-sm font-semibold">
              ✨ Expert Veterinary Services
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight">
            Meet Our Expert
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
              Veterinarians
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-3 max-w-2xl mx-auto">
            Connect with certified and experienced veterinary professionals
            ready to care for your beloved pets
          </p>
          <div className="flex justify-center gap-4 text-sm text-gray-500">
            <span>📍 Available Now</span>
            <span>•</span>
            <span>⭐ Highly Rated</span>
            <span>•</span>
            <span className="font-semibold text-orange-600">
              {filteredDoctors.length} doctors
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-10">
          <div className="relative max-w-3xl mx-auto">
            <div className="relative bg-white rounded-2xl p-0 shadow-md border border-gray-200">
              <div className="relative flex items-center bg-white rounded-2xl px-6 py-4">
                <Search className="absolute left-6 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name, specialty, location, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-1 bg-transparent focus:outline-none text-gray-900 placeholder-gray-400 text-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Filter and Sort Section */}
        <div className="space-y-6 mb-12">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center gap-2 px-5 py-3 bg-white hover:bg-gray-50 text-gray-800 rounded-xl border border-gray-300 hover:border-orange-500 transition font-medium"
            >
              <Filter className="w-4 h-4" />
              Advanced Filters
              <ChevronDown
                className={`w-4 h-4 transition ${
                  filterOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div className="flex items-center gap-3">
              <span className="text-gray-700 text-sm font-medium">
                Sort by:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-white text-gray-800 rounded-lg border border-gray-300 focus:border-orange-500 focus:outline-none"
              >
                <option value="recommended" className="bg-white">
                  Recommended
                </option>
                <option value="rating" className="bg-white">
                  ⭐ Highest Rated
                </option>
                <option value="experience" className="bg-white">
                  👨‍⚕️ Most Experienced
                </option>
                <option value="price-low" className="bg-white">
                  💰 Price: Low to High
                </option>
                <option value="price-high" className="bg-white">
                  💰 Price: High to Low
                </option>
              </select>
            </div>

            {(searchTerm ||
              specialtyFilter ||
              experienceFilter ||
              ratingFilter ||
              priceFilter) && (
              <button
                onClick={resetFilters}
                className="text-orange-600 hover:text-orange-700 font-medium text-sm px-3 py-2 rounded-lg hover:bg-orange-50 transition"
              >
                ✕ Clear Filters
              </button>
            )}
          </div>

          {/* Filter Panel */}
          {filterOpen && (
            <div className="bg-white border border-orange-100 rounded-2xl p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 shadow-sm">
              {/* Specialty Filter */}
              <div>
                <label className="block text-gray-800 font-bold mb-3 text-sm uppercase tracking-wider">
                  Specialty
                </label>
                <select
                  value={specialtyFilter}
                  onChange={(e) => setSpecialtyFilter(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none bg-white text-gray-800"
                >
                  <option value="" className="bg-white text-gray-800">
                    All Specialties
                  </option>
                  {specialties.map((specialty) => (
                    <option
                      key={specialty}
                      value={specialty}
                      className="bg-white text-gray-800"
                    >
                      {specialty}
                    </option>
                  ))}
                </select>
              </div>

              {/* Experience Filter */}
              <div>
                <label className="block text-gray-800 font-bold mb-3 text-sm uppercase tracking-wider">
                  Experience Level
                </label>
                <select
                  value={experienceFilter}
                  onChange={(e) => setExperienceFilter(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none bg-white text-gray-800"
                >
                  <option value="" className="bg-white text-gray-800">
                    All Levels
                  </option>
                  <option value="beginner" className="bg-white text-gray-800">
                    Beginner (0-5 years)
                  </option>
                  <option
                    value="intermediate"
                    className="bg-white text-gray-800"
                  >
                    Intermediate (5-10 years)
                  </option>
                  <option value="expert" className="bg-white text-gray-800">
                    Expert (10+ years)
                  </option>
                </select>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-gray-800 font-bold mb-3 text-sm uppercase tracking-wider">
                  Rating
                </label>
                <select
                  value={ratingFilter}
                  onChange={(e) => setRatingFilter(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none bg-white text-gray-800"
                >
                  <option value="" className="bg-white text-gray-800">
                    All Ratings
                  </option>
                  <option value="4plus" className="bg-white text-gray-800">
                    ⭐⭐⭐⭐ 4.0+ stars
                  </option>
                  <option value="3plus" className="bg-white text-gray-800">
                    ⭐⭐⭐ 3.0+ stars
                  </option>
                </select>
              </div>

              {/* Price Filter */}
              <div>
                <label className="block text-gray-800 font-bold mb-3 text-sm uppercase tracking-wider">
                  Price Range
                </label>
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none bg-white text-gray-800"
                >
                  <option value="" className="bg-white text-gray-800">
                    All Prices
                  </option>
                  <option value="budget" className="bg-white text-gray-800">
                    Budget (&lt;$50)
                  </option>
                  <option value="standard" className="bg-white text-gray-800">
                    Standard ($50-$100)
                  </option>
                  <option value="premium" className="bg-white text-gray-800">
                    Premium ($100+)
                  </option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Loading / Empty / Results */}
        {loading ? (
          <div className="flex flex-col justify-center items-center py-32">
            <div className="relative w-20 h-20 mb-6">
              <ImSpinner className="absolute inset-0 animate-spin text-5xl text-orange-600" />
            </div>
            <p className="text-gray-700 text-lg font-medium">
              Loading expert veterinarians...
            </p>
          </div>
        ) : filteredDoctors.length === 0 ? (
          <div className="text-center py-32 bg-white border border-gray-200 rounded-3xl shadow-sm">
            <div className="text-8xl mb-6">🔍</div>
            <h3 className="text-3xl font-bold text-gray-800 mb-3">
              No veterinarians found
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg">
              Try adjusting your search criteria or filters to find the perfect
              veterinarian for your pet
            </p>
            <button
              onClick={resetFilters}
              className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl transition font-bold text-lg shadow-md hover:shadow-lg"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <>
            {/* Results Count */}
            <div className="mb-8 text-center text-gray-600">
              <p className="text-lg">
                Showing{" "}
                <span className="font-bold text-orange-600">
                  {filteredDoctors.length}
                </span>{" "}
                veterinarian{filteredDoctors.length !== 1 ? "s" : ""}
                {searchTerm && (
                  <span>
                    {" "}
                    matching "
                    <span className="text-orange-600">{searchTerm}</span>"
                  </span>
                )}
              </p>
            </div>

            {/* Doctor Cards Grid */}
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDoctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="group relative bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-orange-400 transition-all duration-300 hover:shadow-lg"
                >
                  {/* Doctor Image */}
                  <div className="relative h-64 w-full overflow-hidden bg-gradient-to-br from-orange-100 to-orange-50">
                    <img
                      src={doctor.image_url || "/default-doctor.png"}
                      alt={doctor.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

                    {/* Rating Badge */}
                    <div className="absolute top-4 left-4 px-3 py-1 bg-white shadow-md rounded-full flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-bold text-gray-800">
                        {parseFloat(doctor.rating) || 0}
                      </span>
                    </div>

                    {/* Like Button */}
                    <button
                      onClick={() => toggleLike(doctor.id)}
                      className="absolute top-4 right-4 p-2 bg-white shadow-md rounded-full hover:bg-gray-50 transition hover:scale-110 duration-200"
                    >
                      <Heart
                        className={`w-5 h-5 transition ${
                          likedDoctors.includes(doctor.id)
                            ? "fill-red-500 text-red-500"
                            : "text-gray-400"
                        }`}
                      />
                    </button>

                    {/* Availability Badge */}
                    <div className="absolute bottom-4 left-4 px-3 py-1 bg-green-500 text-white rounded-full text-xs font-bold shadow-md">
                      ✓ Available
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    {/* Name and Specialty */}
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {doctor.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-4">
                      <Award className="w-5 h-5 text-orange-600" />
                      <p className="text-orange-600 font-semibold text-sm">
                        {doctor.specialty}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {doctor.description || "Professional veterinary services"}
                    </p>

                    {/* Info Row */}
                    <div className="space-y-3 mb-5 pb-5 border-b border-gray-200">
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <Clock className="w-4 h-4 text-orange-600" />
                        <span>
                          <strong className="text-gray-800">
                            {parseInt(doctor.experience) || 0}
                          </strong>{" "}
                          years experience
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <MapPin className="w-4 h-4 text-orange-600" />
                        <span>
                          {doctor.location || "Location not specified"}
                        </span>
                      </div>
                    </div>

                    {/* Price and Button */}
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500 font-medium">
                          Consultation
                        </span>
                        <span className="text-3xl font-bold text-orange-600">
                          ${parseInt(doctor.price) || 0}
                        </span>
                      </div>

                      <Link
                        to="/DoctorsCheckout"
                        state={{ doctor }}
                        className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-2.5 rounded-lg transition font-bold text-sm shadow-md hover:shadow-lg hover:scale-105 duration-200"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DoctorListing;
