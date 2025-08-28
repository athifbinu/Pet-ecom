import React from "react";
import { Link } from "react-router-dom";

import {
  Home,
  Users,
  Calendar,
  ShoppingCart,
  Heart,
  Star,
  Clock,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import homeimg from "../assets/images/doctorimg.jpg";

const DoctorsHome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-teal-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fadeInLeft">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
                Your Pet's Health,
                <span className="text-orange-500"> Our Priority</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Connect with certified veterinarians online. Book appointments,
                get consultations, and ensure your furry friends receive the
                best care from the comfort of your home.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/DoctorsList">
                  <button
                    type="button"
                    className="bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Book Appointment
                  </button>
                </Link>
                <Link to="/home">
                  <button className="border-2 border-orange-500 text-orange-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-50 transition-all duration-200">
                    Back to shoping
                  </button>
                </Link>
              </div>
            </div>

            <div className="relative animate-fadeInRight">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
                <img
                  src={homeimg}
                  alt="img-test"
                  className="w-full h-96 object-cover rounded-2xl"
                />
              </div>
              <div className="absolute -top-4 -right-4 bg-orange-500 text-white p-4 rounded-full animate-bounce">
                <Heart className="h-8 w-8" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive veterinary care for all your pets
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "General Check-ups",
                description:
                  "Regular health examinations and preventive care for your pets.",
              },
              {
                icon: Calendar,
                title: "Emergency Care",
                description:
                  "24/7 emergency veterinary services for urgent medical needs.",
              },
              {
                icon: Users,
                title: "Specialized Care",
                description:
                  "Expert care for specific conditions and specialized treatments.",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fadeInUp"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <service.icon className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "500+", label: "Happy Pets" },
              { number: "50+", label: "Expert Vets" },
              { number: "24/7", label: "Support" },
              { number: "5★", label: "Rating" },
            ].map((stat, index) => (
              <div
                key={index}
                className="animate-fadeInUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl font-bold text-orange-500 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DoctorsHome;
