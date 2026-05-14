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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white text-sm font-semibold">
              ✨ Expert Veterinary Services
            </span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 leading-tight">
            Meet Our Expert
            <span className="block bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 text-transparent bg-clip-text">
              Veterinarians
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-3 max-w-2xl mx-auto">
            Connect with certified and experienced veterinary professionals
            ready to care for your beloved pets
          </p>
          <div className="flex justify-center gap-4 text-sm text-gray-400">
            <span>📍 Available Now</span>
            <span>•</span>
            <span>⭐ Highly Rated</span>
            <span>•</span>
            <span className="font-semibold text-orange-400">
              {filteredDoctors.length} doctors
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-10">
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl blur opacity-75"></div>
            <div className="relative bg-white rounded-2xl p-1">
              <div className="relative flex items-center bg-white rounded-xl px-6 py-4">
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
              className="flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/20 hover:border-orange-500 transition font-medium backdrop-blur-sm"
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
              <span className="text-white text-sm font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 focus:border-orange-500 focus:outline-none backdrop-blur-sm"
              >
                <option value="recommended" className="bg-slate-900">
                  Recommended
                </option>
                <option value="rating" className="bg-slate-900">
                  ⭐ Highest Rated
                </option>
                <option value="experience" className="bg-slate-900">
                  👨‍⚕️ Most Experienced
                </option>
                <option value="price-low" className="bg-slate-900">
                  💰 Price: Low to High
                </option>
                <option value="price-high" className="bg-slate-900">
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
                className="text-orange-400 hover:text-orange-300 font-medium text-sm px-3 py-2 rounded-lg hover:bg-white/10 transition"
              >
                ✕ Clear Filters
              </button>
            )}
          </div>

          {/* Filter Panel */}
          {filterOpen && (
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-fadeIn">
              {/* Specialty Filter */}
              <div>
                <label className="block text-white font-bold mb-3 text-sm uppercase tracking-wider">
                  Specialty
                </label>
                <select
                  value={specialtyFilter}
                  onChange={(e) => setSpecialtyFilter(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-white/20 rounded-lg focus:border-orange-500 focus:outline-none bg-white/10 text-white backdrop-blur-sm"
                >
                  <option value="" className="bg-slate-900 text-white">
                    All Specialties
                  </option>
                  {specialties.map((specialty) => (
                    <option
                      key={specialty}
                      value={specialty}
                      className="bg-slate-900 text-white"
                    >
                      {specialty}
                    </option>
                  ))}
                </select>
              </div>

              {/* Experience Filter */}
              <div>
                <label className="block text-white font-bold mb-3 text-sm uppercase tracking-wider">
                  Experience Level
                </label>
                <select
                  value={experienceFilter}
                  onChange={(e) => setExperienceFilter(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-white/20 rounded-lg focus:border-orange-500 focus:outline-none bg-white/10 text-white backdrop-blur-sm"
                >
                  <option value="" className="bg-slate-900 text-white">
                    All Levels
                  </option>
                  <option value="beginner" className="bg-slate-900 text-white">
                    Beginner (0-5 years)
                  </option>
                  <option
                    value="intermediate"
                    className="bg-slate-900 text-white"
                  >
                    Intermediate (5-10 years)
                  </option>
                  <option value="expert" className="bg-slate-900 text-white">
                    Expert (10+ years)
                  </option>
                </select>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-white font-bold mb-3 text-sm uppercase tracking-wider">
                  Rating
                </label>
                <select
                  value={ratingFilter}
                  onChange={(e) => setRatingFilter(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-white/20 rounded-lg focus:border-orange-500 focus:outline-none bg-white/10 text-white backdrop-blur-sm"
                >
                  <option value="" className="bg-slate-900 text-white">
                    All Ratings
                  </option>
                  <option value="4plus" className="bg-slate-900 text-white">
                    ⭐⭐⭐⭐ 4.0+ stars
                  </option>
                  <option value="3plus" className="bg-slate-900 text-white">
                    ⭐⭐⭐ 3.0+ stars
                  </option>
                </select>
              </div>

              {/* Price Filter */}
              <div>
                <label className="block text-white font-bold mb-3 text-sm uppercase tracking-wider">
                  Price Range
                </label>
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-white/20 rounded-lg focus:border-orange-500 focus:outline-none bg-white/10 text-white backdrop-blur-sm"
                >
                  <option value="" className="bg-slate-900 text-white">
                    All Prices
                  </option>
                  <option value="budget" className="bg-slate-900 text-white">
                    Budget (&lt;$50)
                  </option>
                  <option value="standard" className="bg-slate-900 text-white">
                    Standard ($50-$100)
                  </option>
                  <option value="premium" className="bg-slate-900 text-white">
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
              <ImSpinner className="absolute inset-0 animate-spin text-5xl text-orange-500" />
            </div>
            <p className="text-white text-lg font-medium">
              Loading expert veterinarians...
            </p>
          </div>
        ) : filteredDoctors.length === 0 ? (
          <div className="text-center py-32 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl border-2 border-dashed border-white/20">
            <div className="text-8xl mb-6 animate-bounce">🔍</div>
            <h3 className="text-3xl font-bold text-white mb-3">
              No veterinarians found
            </h3>
            <p className="text-gray-300 mb-8 max-w-md mx-auto text-lg">
              Try adjusting your search criteria or filters to find the perfect
              veterinarian for your pet
            </p>
            <button
              onClick={resetFilters}
              className="px-8 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl hover:from-orange-600 hover:to-pink-600 transition font-bold text-lg shadow-lg hover:shadow-xl"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <>
            {/* Results Count */}
            <div className="mb-8 text-center text-gray-300">
              <p className="text-lg">
                Showing{" "}
                <span className="font-bold text-orange-400">
                  {filteredDoctors.length}
                </span>{" "}
                veterinarian{filteredDoctors.length !== 1 ? "s" : ""}
                {searchTerm && (
                  <span>
                    {" "}
                    matching "
                    <span className="text-orange-400">{searchTerm}</span>"
                  </span>
                )}
              </p>
            </div>

            {/* Doctor Cards Grid */}
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDoctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden hover:border-orange-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/20"
                >
                  {/* Card Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 via-transparent to-pink-500/0 group-hover:from-orange-500/10 group-hover:to-pink-500/10 transition-all duration-300 pointer-events-none"></div>
                  {/* Doctor Image */}
                  <div className="relative h-64 w-full overflow-hidden bg-gradient-to-br from-orange-300 via-pink-300 to-purple-300">
                    <img
                      src={doctor.image_url || "/default-doctor.png"}
                      alt={doctor.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>

                    {/* Rating Badge */}
                    <div className="absolute top-4 left-4 px-3 py-1 bg-white/95 backdrop-blur rounded-full flex items-center gap-1 shadow-lg">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-bold text-gray-900">
                        {parseFloat(doctor.rating) || 0}
                      </span>
                    </div>

                    {/* Like Button */}
                    <button
                      onClick={() => toggleLike(doctor.id)}
                      className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur rounded-full shadow-lg hover:bg-white transition hover:scale-110"
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
                    <div className="absolute bottom-4 left-4 px-3 py-1 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-full text-xs font-bold shadow-lg">
                      ✓ Available
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 relative z-10">
                    {/* Name and Specialty */}
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {doctor.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-4">
                      <Award className="w-5 h-5 text-orange-400" />
                      <p className="text-orange-300 font-semibold text-sm">
                        {doctor.specialty}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {doctor.description || "Professional veterinary services"}
                    </p>

                    {/* Info Row */}
                    <div className="space-y-3 mb-5 pb-5 border-b border-white/10">
                      <div className="flex items-center gap-2 text-gray-300 text-sm">
                        <Clock className="w-4 h-4 text-orange-400" />
                        <span>
                          <strong className="text-white">
                            {parseInt(doctor.experience) || 0}
                          </strong>{" "}
                          years experience
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300 text-sm">
                        <MapPin className="w-4 h-4 text-pink-400" />
                        <span>
                          {doctor.location || "Location not specified"}
                        </span>
                      </div>
                    </div>

                    {/* Price and Button */}
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-400 font-medium">
                          Consultation
                        </span>
                        <span className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-pink-400 text-transparent bg-clip-text">
                          ${parseInt(doctor.price) || 0}
                        </span>
                      </div>

                      <Link
                        to="/DoctorsCheckout"
                        state={{ doctor }}
                        className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-6 py-2.5 rounded-lg transition font-bold text-sm shadow-lg hover:shadow-xl hover:scale-105 duration-300"
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
