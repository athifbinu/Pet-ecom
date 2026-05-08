import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { updatePageMeta, seoConfig } from "../utils/seoHelper";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    // Update SEO meta tags
    updatePageMeta(
      seoConfig.contact.title,
      seoConfig.contact.description,
      seoConfig.contact.keywords,
      window.location.href,
    );
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-orange-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-4">
            Get in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
              Touch
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions about our products or services? We're here to help!
            Reach out to our customer support team anytime.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Contact Information
            </h2>

            {/* Phone */}
            <motion.div
              whileHover={{ x: 10 }}
              className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-orange-100 hover:shadow-lg transition-all"
            >
              <div className="bg-orange-100 p-3 rounded-lg">
                <Phone className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Phone Support
                </h3>
                <p className="text-gray-600">+1 (800) PET-CARE</p>
                <p className="text-sm text-gray-500">
                  Available 24/7 for emergencies
                </p>
              </div>
            </motion.div>

            {/* Email */}
            <motion.div
              whileHover={{ x: 10 }}
              className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-orange-100 hover:shadow-lg transition-all"
            >
              <div className="bg-orange-100 p-3 rounded-lg">
                <Mail className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Email</h3>
                <p className="text-gray-600">support@mtmvetshop.com</p>
                <p className="text-sm text-gray-500">
                  Response within 24 hours
                </p>
              </div>
            </motion.div>

            {/* Location */}
            <motion.div
              whileHover={{ x: 10 }}
              className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-orange-100 hover:shadow-lg transition-all"
            >
              <div className="bg-orange-100 p-3 rounded-lg">
                <MapPin className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Location
                </h3>
                <p className="text-gray-600">123 Pet Care Lane</p>
                <p className="text-gray-500">Pet City, PC 12345</p>
              </div>
            </motion.div>

            {/* Hours */}
            <motion.div
              whileHover={{ x: 10 }}
              className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-orange-100 hover:shadow-lg transition-all"
            >
              <div className="bg-orange-100 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Business Hours
                </h3>
                <p className="text-gray-600">Mon - Fri: 9:00 AM - 6:00 PM</p>
                <p className="text-gray-500">Sat - Sun: 10:00 AM - 4:00 PM</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-lg border border-orange-100"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Send us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                  required
                />
              </motion.div>

              {/* Email */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                  required
                />
              </motion.div>

              {/* Subject */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="How can we help?"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                  required
                />
              </motion.div>

              {/* Message */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your message..."
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all resize-none"
                  required
                ></textarea>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                viewport={{ once: true }}
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 border border-orange-100"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Frequently Asked Questions
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-orange-600 mb-3">
                What are your shipping times?
              </h3>
              <p className="text-gray-600">
                We offer standard shipping (5-7 days) and express shipping (2-3
                days) for all orders. Free shipping on orders over $50.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-orange-600 mb-3">
                Do you offer veterinary consultations?
              </h3>
              <p className="text-gray-600">
                Yes! Our online veterinarians are available 24/7 for
                consultations. Book an appointment or get instant advice.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-orange-600 mb-3">
                What is your return policy?
              </h3>
              <p className="text-gray-600">
                We offer 30-day returns on all unopened products. Contact our
                support team for return instructions.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-orange-600 mb-3">
                Are your products veterinary approved?
              </h3>
              <p className="text-gray-600">
                Yes! All our products are sourced from trusted suppliers and
                approved by our veterinary team.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
