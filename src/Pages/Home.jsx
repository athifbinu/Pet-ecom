import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
      <section className="relative bg-gradient-to-r from-rose-100 via-pink-50 to-teal-100 py-40 overflow-hidden">
        <div className="container mx-auto grid md:grid-cols-2 gap-10 items-center px-6">
          {/* Left Content */}
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-800">
              Mtm Veterinary Medicines <br />
              <span className="text-primary">& PetShop</span>
            </h1>
            <p className="text-lg text-gray-600">
              Your Pet’s Happiness, Our Priority 🐾
            </p>
            <Link to="/shop">
              <button className="bg-primary text-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg hover:bg-primary/90 transition-all">
                Shop Now
              </button>
            </Link>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative flex justify-center items-center">
            <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-6">
              <img
                className="w-full max-w-sm drop-shadow-lg animate-bounce-slow"
                src={heroImage}
                alt="Hero"
              />
            </div>
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-primary/20 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-200/20 rounded-full blur-3xl"></div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="bg-white py-16 sm:py-28">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="w-full">
              <img
                className="rounded-lg shadow-md"
                src={aboutImage}
                alt="About Us"
              />
            </div>
            <div className="w-full md:pl-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-5">About Us</h2>
              <p className="text-base md:text-lg mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                vel felis a nunc rutrum dignissim.
              </p>
              <p className="text-base md:text-lg mb-6">
                Integer vehicula eu nisi vel convallis. Sed euismod lorem a
                tortor varius, vel aliquam augue malesuada.
              </p>
              <Link to="/about">
                <button className="bg-primary text-white hover:bg-primary-dark rounded-md px-6 py-3">
                  Learn More
                </button>
              </Link>
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

      {/* Add other category sections (CollerAndLeash, Grooming, etc.) same like above */}

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
