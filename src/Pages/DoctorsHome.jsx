import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
  Home,
  Users,
  Calendar,
  Heart,
  Star,
  Clock,
  MapPin,
  Phone,
  Mail,
  Stethoscope,
  Pill,
  Activity,
  Shield,
  CheckCircle,
  ArrowRight,
  Zap,
  Award,
  TrendingUp,
} from "lucide-react";
import homeimg from "../assets/images/doctorimg.jpg";

const DoctorsHome = () => {
  const [expandedService, setExpandedService] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-orange-50 via-pink-50 to-orange-50">
      {/* Animated Background Elements */}
      <motion.div
        animate={{ float: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-20 left-10 w-72 h-72 bg-orange-300/20 rounded-full blur-3xl pointer-events-none"
      ></motion.div>
      <motion.div
        animate={{ float: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        className="absolute bottom-10 right-10 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl pointer-events-none"
      ></motion.div>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              className="space-y-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <motion.span
                  className="inline-block px-4 py-2 bg-gradient-to-r from-orange-400 to-orange-600 text-white text-sm font-semibold rounded-full mb-4"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🏥 Expert Veterinary Care
                </motion.span>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-5xl lg:text-7xl font-extrabold text-gray-800 leading-tight"
              >
                Your Pet's Health,
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-600 to-red-600">
                  {" "}
                  Our Priority
                </span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-xl text-gray-600 leading-relaxed max-w-lg"
              >
                Connect with certified veterinarians online. Get instant
                consultations, book appointments, and ensure your furry friends
                receive expert care from home. 24/7 emergency support available.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link to="/DoctorsList">
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 20px 40px rgba(249, 115, 22, 0.3)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:shadow-xl transition-all duration-200 flex items-center gap-2 group"
                  >
                    Book Appointment
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
                <Link to="/home">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 border-orange-500 text-orange-600 px-8 py-4 rounded-xl text-lg font-bold hover:bg-orange-500/10 transition-all duration-200"
                  >
                    Continue Shopping
                  </motion.button>
                </Link>
              </motion.div>

              {/* Quick Info */}
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-4 pt-4"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="text-3xl"
                >
                  ⚡
                </motion.div>
                <div>
                  <p className="text-orange-600 font-semibold">
                    10 mins average response time
                  </p>
                  <p className="text-gray-600 text-sm">
                    Available 24/7 for emergencies
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - Hero Image */}
            <motion.div
              className="relative"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                animate={{ y: [-10, 20, -10] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative"
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 rounded-3xl blur-2xl opacity-20 -z-10"></div>

                <div className="bg-gradient-to-br from-white to-orange-50 rounded-3xl p-8 shadow-2xl border border-orange-100">
                  <motion.img
                    src={homeimg}
                    alt="Professional Veterinarian"
                    className="w-full h-96 object-cover rounded-2xl shadow-lg border-4 border-orange-200"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>

              {/* Floating Badge */}
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-gradient-to-r from-orange-500 to-red-600 text-white p-4 rounded-full shadow-xl border-2 border-white"
              >
                <Heart className="h-8 w-8 fill-white" />
              </motion.div>

              {/* Stats Badge */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl border-2 border-orange-500"
              >
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600">500+</p>
                  <p className="text-xs text-gray-600 font-semibold">
                    Pets Treated
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section - Enhanced */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              variants={itemVariants}
              className="text-5xl font-extrabold text-gray-800 mb-4"
            >
              Our Veterinary{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
                Services
              </span>
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Comprehensive care from routine checkups to emergency services
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: Stethoscope,
                title: "General Check-ups",
                description: "Routine health examinations and preventive care",
                color: "from-orange-400 to-orange-500",
              },
              {
                icon: Zap,
                title: "Emergency Care",
                description: "24/7 emergency veterinary services",
                color: "from-red-400 to-orange-600",
              },
              {
                icon: Pill,
                title: "Treatment",
                description: "Medical and surgical treatments",
                color: "from-orange-500 to-pink-500",
              },
              {
                icon: Activity,
                title: "Specialized Care",
                description: "Expert care for specific conditions",
                color: "from-orange-400 to-red-400",
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ translateY: -10 }}
                className="group cursor-pointer"
                onClick={() =>
                  setExpandedService(expandedService === index ? null : index)
                }
              >
                <motion.div
                  className="h-full bg-white rounded-2xl p-8 border border-orange-100 hover:border-orange-500 transition-colors group-hover:shadow-2xl"
                  whileHover={{
                    boxShadow: "0 20px 40px rgba(249, 115, 22, 0.2)",
                  }}
                >
                  {/* Icon */}
                  <motion.div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <service.icon className="h-7 w-7 text-white" />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-orange-600 transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-4">{service.description}</p>

                  {/* Arrow */}
                  <motion.div
                    className="flex items-center gap-2 text-orange-600 font-semibold"
                    animate={{ x: expandedService === index ? 5 : 0 }}
                  >
                    Learn more
                    <ArrowRight className="h-4 w-4" />
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-gradient-to-r from-orange-100/40 to-pink-100/40 rounded-3xl mx-4 md:mx-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              variants={itemVariants}
              className="text-5xl font-extrabold text-gray-800 mb-4"
            >
              Why Choose <span className="text-orange-600">MTM Vet</span>?
            </motion.h2>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: Award,
                title: "Expert Veterinarians",
                description: "50+ certified and experienced vets ready to help",
              },
              {
                icon: Clock,
                title: "24/7 Availability",
                description: "Round-the-clock support for emergencies",
              },
              {
                icon: Shield,
                title: "Safe & Secure",
                description: "Your pet's data is protected and confidential",
              },
              {
                icon: TrendingUp,
                title: "Quick Response",
                description: "Average response time of 10 minutes",
              },
              {
                icon: Heart,
                title: "Affordable Care",
                description: "Transparent pricing with no hidden charges",
              },
              {
                icon: CheckCircle,
                title: "Quality Assured",
                description:
                  "100% satisfaction guaranteed for every consultation",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex gap-4"
              >
                <motion.div
                  className="flex-shrink-0"
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.1,
                  }}
                >
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-orange-500 to-red-600 text-white">
                    <feature.icon className="h-6 w-6" />
                  </div>
                </motion.div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section - Enhanced */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid md:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { number: "500+", label: "Happy Pets", icon: Heart },
              { number: "50+", label: "Expert Vets", icon: Users },
              { number: "24/7", label: "Support", icon: Clock },
              { number: "5★", label: "Rating", icon: Star },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.1 }}
                className="text-center"
              >
                <motion.div
                  className="inline-block mb-4"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                >
                  <div className="bg-gradient-to-r from-orange-500 to-red-600 p-4 rounded-full">
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                </motion.div>
                <motion.div
                  className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 mb-2"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-gray-700 font-semibold">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <motion.div
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2
            variants={itemVariants}
            className="text-5xl font-extrabold text-gray-800 mb-6"
          >
            Ready to Care for Your Pet?
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 mb-8"
          >
            Connect with a certified veterinarian today and give your beloved
            pet the care they deserve.
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/DoctorsList">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-10 py-4 rounded-xl text-lg font-bold shadow-xl hover:shadow-2xl transition-all"
              >
                Book Now
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-orange-500 text-orange-600 px-10 py-4 rounded-xl text-lg font-bold hover:bg-orange-500/10 transition-all"
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default DoctorsHome;
