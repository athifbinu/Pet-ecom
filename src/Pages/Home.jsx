import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroImage from "../assets/images/mane.png";
import aboutImage from "../assets/images/aboutus.png";
import CategorysCard from "../components/Ui/CategorysCard";
import star from "../assets/icons/star.png";
import Banner from "../assets/images/banner.png";
import HappyFace from "../assets/icons/happy-face.png";
import frame1 from "../assets/images/frame1.jpg";
import frame2 from "../assets/images/frame2.jpg";
import frame3 from "../assets/images/frame3.jpg";
import review from "../assets/Data/Review";
import Star from "../assets/icons/review.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import sliderone from "../assets/images/dogfood.jpeg";
import slidertwo from "../assets/images/cages.jpeg";
import sliderthree from "../assets/images/treats.jpeg";
import sliderfoor from "../assets/images/grooming.jpeg";
import sliderfive from "../assets/images/Litters.jpeg";
import slidersix from "../assets/images/coller.jpeg";
import sliderseven from "../assets/images/toys.jpeg";
import slidereight from "../assets/images/feeds.jpeg";
import slidernine from "../assets/images/pharmacy.jpeg";
import sliderten from "../assets/images/polutry.jpeg";

import { supabase } from "../components/supabase/supabaseClient";

const Home = () => {
  const [mainCategories, setMainCategories] = useState([]);

  // Review Slider Settings
  const reviewSliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    swipeToSlide: true,
    arrows: false,
    adaptiveHeight: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 640, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  // Category Slider Settings
  const categorySliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    swipeToSlide: true,
    arrows: false,
    adaptiveHeight: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1 } }, // tablet
      { breakpoint: 640, settings: { slidesToShow: 2, slidesToScroll: 1 } }, // mobile
    ],
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("category, image_url")
          .order("created_at", { ascending: true });

        if (error) throw error;

        const categoryMap = {};
        data.forEach((product) => {
          if (!categoryMap[product.category]) {
            categoryMap[product.category] = product.image_url;
          }
        });

        const formattedCategories = Object.entries(categoryMap).map(
          ([name, image]) => ({ name, image })
        );
        setMainCategories(formattedCategories);
      } catch (err) {
        console.error("Error fetching categories:", err.message);
      }
    };

    fetchCategories();
  }, []);

  const categorySlides = [
    { img: sliderone, label: "Dog Food", value: "Foods" },
    { img: slidertwo, label: "Cages", value: "CagesAndBagsBeds" },
    { img: sliderthree, label: "Treats", value: "Foods" },
    { img: sliderfoor, label: "Grooming", value: "Grooming" },
    { img: sliderfive, label: "Litters", value: "CatLittersitems" },
    { img: slidersix, label: "Collars", value: "CollerAndLeash" },
    { img: sliderseven, label: "Toys", value: "Toys" },
    { img: slidereight, label: "Feeds", value: "Feeders" },
    { img: slidernine, label: "Pharmacy", value: "Pharmacy" },
    { img: sliderten, label: "Poultry", value: "Polutry" },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-rose-50 via-teal-50 to-indigo-50 py-32 md:py-48 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <motion.div 
            animate={{ y: [0, -20, 0], opacity: [0.5, 0.8, 0.5] }} 
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 left-10 w-40 h-40 bg-rose-300/30 rounded-full blur-3xl"
          ></motion.div>
          <motion.div 
            animate={{ x: [0, 30, 0], opacity: [0.3, 0.6, 0.3] }} 
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-10 right-20 w-64 h-64 bg-teal-300/30 rounded-full blur-3xl"
          ></motion.div>
          <motion.div 
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }} 
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border-[1px] border-gray-200/50 rounded-full border-dashed"
          ></motion.div>
        </div>

        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center px-6 relative z-10">
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8 text-center md:text-left flex flex-col items-center md:items-start"
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-teal-100/80 border border-teal-200 text-teal-800 text-sm font-semibold tracking-wide backdrop-blur-md">
              ✨ Premium Pet Care Solutions
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-gray-900 drop-shadow-sm">
              <span className="block mb-2 text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600">MTM Veterinary</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-400">& PetShop</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-lg leading-relaxed">
              Your Pet’s Happiness is Our Priority! Discover top-quality medicines, delicious food, and fun accessories for your furry friends. 🐾
            </p>
            
            <div className="flex gap-4">
              <Link to="/shop">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-8 py-4 rounded-full shadow-xl shadow-teal-500/30 hover:shadow-2xl hover:shadow-teal-500/40 transition-all font-semibold text-lg flex items-center gap-2"
                >
                  Shop Now
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Right Content - Hero Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative flex justify-center items-center mt-10 md:mt-0"
          >
            {/* Glassmorphism Card */}
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="bg-white/40 border border-white/60 backdrop-blur-xl rounded-[2rem] shadow-2xl p-8 md:p-12 relative z-20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent rounded-[2rem] pointer-events-none"></div>
              <img
                className="w-full max-w-sm md:max-w-md drop-shadow-2xl relative z-10"
                src={heroImage}
                alt="Happy pet looking at products"
              />
            </motion.div>
            
            {/* Decorative Floating Cards */}
            <motion.div 
              animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -top-8 -right-4 md:-right-8 bg-white/90 backdrop-blur-md p-3 md:p-4 rounded-2xl shadow-xl border border-white/50 flex items-center gap-3 z-30"
            >
              <div className="bg-yellow-100 p-2 rounded-full">
                <img src={star} className="w-5 h-5 md:w-6 md:h-6" alt="Star" />
              </div>
              <div>
                <p className="text-xs md:text-sm font-bold text-gray-800">4.9/5</p>
                <p className="text-[10px] md:text-xs text-gray-500">Top Rated</p>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-6 -left-4 md:-left-8 bg-white/90 backdrop-blur-md p-3 md:p-4 rounded-2xl shadow-xl border border-white/50 flex items-center gap-3 z-30"
            >
              <div className="bg-teal-100 p-2 rounded-full">
                <img src={HappyFace} className="w-5 h-5 md:w-6 md:h-6" alt="Happy Face" />
              </div>
              <div>
                <p className="text-xs md:text-sm font-bold text-gray-800">10k+</p>
                <p className="text-[10px] md:text-xs text-gray-500">Happy Pets</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="relative bg-white py-20 sm:py-32 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-teal-50/50 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-orange-50/50 blur-3xl pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Left Image Side */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-full max-w-md mx-auto lg:max-w-none"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-teal-900/10 border-[6px] border-white z-10 group">
                <img
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                  src={aboutImage}
                  alt="About MTM Veterinary Medicals & Petshop"
                />
                <div className="absolute inset-0 bg-teal-900/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
              </div>
              
              {/* Decorative background shape */}
              <div className="absolute inset-0 bg-gradient-to-tr from-teal-400 to-emerald-300 rounded-3xl transform translate-x-6 translate-y-6 -z-10 opacity-70"></div>
              
              {/* Floating Experience Badge */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 bg-white p-4 sm:p-5 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4 z-20"
              >
                <div className="bg-orange-100 text-orange-600 p-3 rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl sm:text-2xl font-bold text-gray-900">Expert</h4>
                  <p className="text-xs sm:text-sm text-gray-500 font-medium uppercase tracking-wide">Pet Care</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="w-full lg:pl-8 flex flex-col justify-center mt-10 lg:mt-0"
            >
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-orange-600 font-semibold text-sm self-start">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                   <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                 </svg>
                 About Us
              </div>
              
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 leading-tight tracking-tight">
                Your Trusted <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-400">Partner</span> in Pet Health
              </h2>
              
              <p className="text-lg text-gray-600 mb-6 leading-relaxed font-medium">
                Welcome to <span className="text-teal-700 font-bold">MTM Veterinary Medicals & Petshop</span>. We are passionate about keeping your pets healthy and happy with top-quality products and expert care.
              </p>
              
              <div className="space-y-4 mb-10">
                {[
                  "Premium veterinary medicines and supplies",
                  "Nutritious, high-quality pet foods",
                  "Fun and engaging pet accessories"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700 font-semibold text-lg">{item}</span>
                  </div>
                ))}
              </div>

              <Link to="/Doctor">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-orange-500 to-rose-500 text-white hover:shadow-xl hover:shadow-orange-500/30 transition-all duration-300 rounded-full px-8 py-4 font-bold text-lg shadow-md self-start flex items-center gap-2"
                >
                  Consult A Doctor
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Slider */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50/50">
        <div className="container px-4">
          <div className="text-center mb-16 relative">
             <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
             >
                <div className="inline-flex items-center justify-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-teal-600 font-medium text-sm">
                   <img src={star} className="w-4 h-4 opacity-70" alt="star" />
                   Our Collections
                   <img src={star} className="w-4 h-4 opacity-70" alt="star" />
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight relative inline-block">
                  Explore Categories
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 h-1.5 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full"></div>
                </h2>
                <p className="text-gray-500 mt-8 max-w-2xl mx-auto text-lg">
                  Find everything your pet needs, carefully organized into our premium collections.
                </p>
             </motion.div>
          </div>
          
          <div className="w-full -mx-2">
            <Slider {...categorySliderSettings} className="px-2">
              {categorySlides.map((slide, index) => (
                <div key={index} className="px-3 pb-8 pt-6 outline-none">
                  <Link to={`/shop?category=${slide.value}`} className="group block focus:outline-none">
                    <div className="flex flex-col items-center">
                      <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full overflow-hidden bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] group-hover:shadow-[0_20px_40px_rgb(20,184,166,0.2)] border-[6px] border-white transition-all duration-500 ease-out group-hover:-translate-y-3 z-10">
                        {/* Overlay for depth */}
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none"></div>
                        <div className="absolute inset-0 bg-teal-900/5 group-hover:bg-transparent transition-colors duration-300 z-10 pointer-events-none"></div>
                        <img
                          src={slide.img}
                          alt={slide.label}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                      </div>
                      <div className="mt-4 bg-white border border-gray-100 shadow-sm rounded-full px-8 py-2.5 -translate-y-8 group-hover:-translate-y-10 transition-transform duration-500 z-20 group-hover:bg-gradient-to-r group-hover:from-teal-50 group-hover:to-emerald-50 group-hover:border-teal-200">
                        <h4 className="text-sm md:text-base font-bold text-gray-800 group-hover:text-teal-700 transition-colors whitespace-nowrap">
                          {slide.label}
                        </h4>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>

      {/* Shop by Foods */}
      <section>
        <div className="container mb-8">
          <div className="flex gap-4 items-center justify-center">
            <img className="w-11" src={star} alt="Star Icon" />
            <span className="text-3xl font-bold">Foods</span>
            <img className="w-11" src={star} alt="Star Icon" />
          </div>
          <br />
          <CategorysCard filterCategory="Foods" />
        </div>
      </section>

      <section>
        <div className="container mb-8">
          <div className="flex gap-4 items-center justify-center">
            <img className="w-11" src={star} alt="Star Icon" />
            <span className="text-3xl font-bold">Bags and Cages</span>
            <img className="w-11" src={star} alt="Star Icon" />
          </div>
          <br />
          <CategorysCard filterCategory="CagesAndBags" />
        </div>
      </section>

      <section>
        <div className="container mb-8">
          <div className="flex gap-4 items-center justify-center">
            <img className="w-11" src={star} alt="Star Icon" />
            <span className="text-3xl font-bold">Pharmacy</span>
            <img className="w-11" src={star} alt="Star Icon" />
          </div>
          <br />
          <CategorysCard filterCategory="Pharmacy" />
        </div>
      </section>
      <section>
        <div className="container mb-8">
          <div className="flex gap-4 items-center justify-center">
            <img className="w-11" src={star} alt="Star Icon" />
            <span className="text-3xl font-bold">Poultry</span>
            <img className="w-11" src={star} alt="Star Icon" />
          </div>
          <br />
          <CategorysCard filterCategory="Polutry" />
        </div>
      </section>
      <section>
        <div className="container mb-8">
          <div className="flex gap-4 items-center justify-center">
            <img className="w-11" src={star} alt="Star Icon" />
            <span className="text-3xl font-bold">Grooming</span>
            <img className="w-11" src={star} alt="Star Icon" />
          </div>
          <br />
          <CategorysCard filterCategory="Grooming" />
        </div>
      </section>

      {/* Banner */}
      <section>
        <div className="container mb-8">
          <img
            className="w-full rounded-xl h-60 object-cover"
            src={Banner}
            alt="Banner"
          />
        </div>
      </section>

      {/* More Categories */}
      <section>
        <div className="container mb-8">
          <div className="flex gap-4 items-center justify-center">
            <img className="w-11" src={star} alt="Star Icon" />
            <span className="text-3xl font-bold">Toys</span>
            <img className="w-11" src={star} alt="Star Icon" />
          </div>
          <br />
          <CategorysCard filterCategory="Toys" />
        </div>
      </section>

      <section>
        <div className="container mb-8">
          <div className="flex gap-4 items-center justify-center">
            <img className="w-11" src={star} alt="Star Icon" />
            <span className="text-3xl font-bold">Bags and Cages</span>
            <img className="w-11" src={star} alt="Star Icon" />
          </div>
          <br />
          <CategorysCard filterCategory="CagesAndBags" />
        </div>
      </section>

      <section>
        <div className="container mb-8">
          <div className="flex gap-4 items-center justify-center">
            <img className="w-11" src={star} alt="Star Icon" />
            <span className="text-3xl font-bold">Feeders</span>
            <img className="w-11" src={star} alt="Star Icon" />
          </div>
          <br />
          <CategorysCard filterCategory="Feeders" />
        </div>
      </section>

      {/* Doctor Consulting */}
      <section>
        <div className="container mb-8">
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <Link to="/Doctor">
                <img
                  className="cursor-pointer"
                  src={frame1}
                  alt="Consultation 1"
                />
              </Link>
            </div>
            <div>
              <img
                className="mb-2 cursor-pointer"
                src={frame2}
                alt="Consultation 2"
              />
              <img
                className="cursor-pointer"
                src={frame3}
                alt="Consultation 3"
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container mb-8">
          <div className="flex gap-4 items-center justify-center">
            <img className="w-11" src={star} alt="Star Icon" />
            <span className="text-3xl font-bold">Aquatic Items</span>
            <img className="w-11" src={star} alt="Star Icon" />
          </div>
          <br />
          <CategorysCard filterCategory="AquaticCare" />
        </div>
      </section>

      {/* Review Section */}
      <section className="bg-gradient-to-r from-rose-100 to-teal-100 py-28">
        <div className="container">
          <div className="flex gap-4 items-center justify-center mb-8">
            <img className="w-11" src={HappyFace} alt="Happy Face" />
            <span className="text-3xl font-bold">Happy Customers</span>
            <img className="w-11" src={HappyFace} alt="Happy Face" />
          </div>
          <div className="w-full overflow-hidden">
            <Slider {...reviewSliderSettings}>
              {review.map((item) => (
                <div
                  key={item.id}
                  className="relative max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md w-56 m-2"
                >
                  <div className="p-3">
                    <img
                      className="object-cover rounded-lg"
                      src={item.img}
                      alt="Customer Review"
                    />
                  </div>
                  <div className="mt-4 px-5 pb-5">
                    <p className="mb-5">{item.reviewText}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        {[...Array(item.rating)].map((_, index) => (
                          <img
                            key={index}
                            className="w-4"
                            src={Star}
                            alt="Star"
                          />
                        ))}
                      </div>
                      <p>{item.reviewerName}</p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
