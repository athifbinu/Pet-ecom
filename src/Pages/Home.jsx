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

  const sliderImages = [
    sliderone,
    slidertwo,
    sliderthree,
    sliderfoor,
    sliderfive,
    slidersix,
    sliderseven,
    slidereight,
    slidernine,
    sliderten,
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

      <section className="bg-white py-16 sm:py-28">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left Image */}
            <div className="w-full">
              <img
                className="rounded-lg shadow-lg"
                src={aboutImage}
                alt="About MTM Veterinary Medicals & Petshop"
              />
            </div>

            {/* Right Content */}
            <div className="w-full md:pl-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-5">
                About <span className="text-orange-400">Us</span>
              </h2>
              <p className="text-base md:text-lg text-gray-600 mb-6 leading-relaxed">
                Welcome to{" "}
                <span className="font-semibold">
                  MTM Veterinary Medicals & Petshop
                </span>
                , your trusted destination for all veterinary medicines, pet
                foods, and accessories. We are passionate about keeping your
                pets healthy and happy with top-quality products and expert
                care.
              </p>
              <p className="text-base md:text-lg text-gray-600 mb-6 leading-relaxed">
                From essential veterinary supplies to nutritious foods and fun
                accessories, we bring everything under one roof. With years of
                experience, we are proud to serve our community and support pet
                parents with love and dedication.
              </p>

              <button className="bg-orange-600 text-white hover:bg-orange-500 transition rounded-md px-6 py-3 font-medium shadow-md">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Slider */}
      <section>
        <div className="container mb-8 px-4">
          <h3 className="text-2xl font-bold mb-6 text-center text-gray-700">
            Explore Categories
          </h3>
          <div className="w-full overflow-hidden">
            <Slider {...categorySliderSettings}>
              {sliderImages.map((img, index) => (
                <div key={index} className="px-4 flex justify-center">
                  <Link to="/shop">
                    <div className="w-52 h-52 rounded-full overflow-hidden   flex items-center justify-center">
                      <img
                        src={img}
                        alt={`category-${index}`}
                        className="w-full h-full object-cover"
                      />
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
