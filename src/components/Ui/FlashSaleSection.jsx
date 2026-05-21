import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const FlashSaleSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 30,
    seconds: 45,
  });
  const [loading, setLoading] = useState(false);

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;

        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const flashSaleProducts = [
    {
      id: 1,
      name: "Premium Dog Food",
      originalPrice: 2500,
      salePrice: 1799,
      discount: 28,
      image:
        "https://images.unsplash.com/photo-1589941013453-ec89f33b7100?w=500&h=500&fit=crop",
      badge: "HOT",
    },
    {
      id: 2,
      name: "Cat Treats Bundle",
      originalPrice: 1500,
      salePrice: 899,
      discount: 40,
      image:
        "https://images.unsplash.com/photo-1603046891726-36bfd957e2af?w=500&h=500&fit=crop",
      badge: "BESTSELLER",
    },
    {
      id: 3,
      name: "Pet Grooming Kit",
      originalPrice: 3500,
      salePrice: 2299,
      discount: 34,
      image:
        "https://images.unsplash.com/photo-1516738901601-2e1b62dc0c45?w=500&h=500&fit=crop",
      badge: "LIMITED",
    },
    {
      id: 4,
      name: "Cozy Pet Bed",
      originalPrice: 2800,
      salePrice: 1599,
      discount: 43,
      image:
        "https://images.unsplash.com/photo-1545231207-51df20dd76ac?w=500&h=500&fit=crop",
      badge: "HOT",
    },
  ];

  const TimeUnit = ({ value, label }) => (
    <motion.div
      className="flex flex-col items-center"
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        key={value}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        className="bg-gradient-to-br from-red-500 to-rose-600 text-white font-bold text-2xl md:text-4xl rounded-2xl w-20 h-20 md:w-24 md:h-24 flex items-center justify-center shadow-lg border-2 border-red-400"
      >
        {String(value).padStart(2, "0")}
      </motion.div>
      <span className="text-gray-600 font-semibold mt-2 text-xs md:text-sm uppercase tracking-widest">
        {label}
      </span>
    </motion.div>
  );

  return (
    <section className="relative py-20 overflow-hidden bg-white">
      {/* Animated Background Elements */}
      <motion.div
        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 -left-20 w-80 h-80 bg-red-200/30 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute -bottom-20 -right-20 w-80 h-80 bg-orange-200/30 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border-2 border-red-200/30 rounded-full pointer-events-none"
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-4xl"
            >
              🔥
            </motion.div>
            <span className="px-4 py-2 rounded-full bg-gradient-to-r from-red-100 to-orange-100 border border-red-300 text-red-600 font-bold text-sm md:text-base">
              FLASH SALE ALERT!
            </span>
            <motion.div
              animate={{ rotate: [0, -15, 15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-4xl"
            >
              🔥
            </motion.div>
          </div>

          <h2 className="text-4xl md:text-6xl font-extrabold mb-4 text-gray-900">
            Massive
            <span className="block bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-transparent bg-clip-text">
              SAVINGS UP TO 50% OFF
            </span>
          </h2>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
            Limited time offer on premium pet products! Don't miss these
            incredible deals.
          </p>

          {/* Countdown Timer */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-center gap-4 md:gap-6 mb-10 flex-wrap"
          >
            <TimeUnit value={timeLeft.hours} label="Hours" />
            <div className="flex items-center justify-center text-3xl md:text-5xl font-bold text-red-500 mb-6">
              :
            </div>
            <TimeUnit value={timeLeft.minutes} label="Minutes" />
            <div className="flex items-center justify-center text-3xl md:text-5xl font-bold text-red-500 mb-6">
              :
            </div>
            <TimeUnit value={timeLeft.seconds} label="Seconds" />
          </motion.div>

          <motion.p
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-red-600 font-bold text-lg"
          >
            ⏰ Hurry! Offer expires soon
          </motion.p>
        </motion.div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-red-200 border-t-red-600 rounded-full"
            />
          </div>
        ) : flashSaleProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg font-semibold">
              No flash sale products available right now
            </p>
            <p className="text-gray-400 mt-2">
              Check back soon for amazing deals!
            </p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {flashSaleProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                <div className="relative rounded-3xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                  {/* Product Image */}
                  <div className="relative h-64 sm:h-72 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Top Badges */}
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 rounded-full font-bold text-sm shadow-lg"
                    >
                      {Math.round(product.discount)}% OFF
                    </motion.div>

                    <div className="absolute top-4 left-4 bg-yellow-400 text-gray-900 px-3 py-1.5 rounded-full font-bold text-xs shadow-lg">
                      {product.badge}
                    </div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                  </div>

                  {/* Product Info */}
                  <div className="p-5 sm:p-6">
                    <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-3 line-clamp-2 group-hover:text-red-600 transition-colors">
                      {product.name}
                    </h3>

                    {/* Price Section */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <motion.div
                          className="text-lg sm:text-xl font-extrabold text-red-600"
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          ₹{Math.round(product.salePrice)}
                        </motion.div>
                        <div className="text-xs sm:text-sm text-gray-400 line-through">
                          ₹{Math.round(product.originalPrice)}
                        </div>
                      </div>
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-2xl sm:text-3xl"
                      >
                        💎
                      </motion.div>
                    </div>

                    {/* Add to Cart Button */}
                    <Link to="/shop">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold py-2.5 sm:py-3 rounded-xl transition-all shadow-md hover:shadow-lg hover:shadow-red-500/40 flex items-center justify-center gap-2 text-sm sm:text-base"
                      >
                        <span>🛒</span> Grab Now
                      </motion.button>
                    </Link>
                  </div>

                  {/* Bottom Gradient Accent */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    style={{ transformOrigin: "left" }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* CTA Section */}
        {flashSaleProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link to="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 text-white font-bold px-8 sm:px-12 py-4 sm:py-5 rounded-full shadow-xl shadow-red-600/30 hover:shadow-2xl hover:shadow-red-600/50 transition-all text-base sm:text-lg flex items-center gap-2 mx-auto"
              >
                <span>⚡</span> View All Deals
                <span>→</span>
              </motion.button>
            </Link>
            <p className="text-gray-600 text-sm mt-4 font-medium">
              👉 Limited stock available. Grab yours before they run out!
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default FlashSaleSection;
