import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { updatePageMeta, seoConfig } from "../utils/seoHelper";
import { HelpCircle, MessageSquare, Phone, Clock } from "lucide-react";

const Help = () => {
  useEffect(() => {
    // Update SEO meta tags
    updatePageMeta(
      seoConfig.help.title,
      seoConfig.help.description,
      seoConfig.help.keywords,
      window.location.href,
    );
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-orange-50 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
            Help & Support
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to your questions about our products and services
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Frequently Asked Questions
            </h2>

            {[
              {
                question: "How do I place an order?",
                answer:
                  "Visit our shop, select your items, add them to cart, and proceed to checkout. You can pay securely online.",
              },
              {
                question: "What is your return policy?",
                answer:
                  "We offer 30-day returns on unopened products. Contact support for return instructions.",
              },
              {
                question: "How long does shipping take?",
                answer:
                  "Standard shipping takes 5-7 days. Express shipping (2-3 days) is also available.",
              },
              {
                question: "Do you have veterinary consultations?",
                answer:
                  "Yes! Book a consultation with our certified veterinarians 24/7.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="bg-white p-6 rounded-lg border border-orange-100 hover:shadow-lg transition-all"
              >
                <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-orange-600" />
                  {item.question}
                </h3>
                <p className="text-gray-600">{item.answer}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Support Methods */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Need More Help?
            </h2>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-8 rounded-lg border-2 border-orange-500 text-center"
            >
              <Phone className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Call Us</h3>
              <p className="text-gray-600 mb-4">+1 (800) PET-CARE</p>
              <p className="text-sm text-gray-500">
                Available 24/7 for emergencies
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-8 rounded-lg border-2 border-orange-400 text-center"
            >
              <MessageSquare className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Email Support
              </h3>
              <p className="text-gray-600 mb-4">support@mtmvetshop.com</p>
              <p className="text-sm text-gray-500">Response within 24 hours</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-8 rounded-lg border-2 border-orange-300 text-center"
            >
              <Clock className="w-12 h-12 text-orange-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Business Hours
              </h3>
              <p className="text-gray-600 mb-2">Mon - Fri: 9:00 AM - 6:00 PM</p>
              <p className="text-gray-600">Sat - Sun: 10:00 AM - 4:00 PM</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Help;
