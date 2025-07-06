import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import heroImage from "../assets/images/mane.png";
import aboutImage from "../assets/images/about.png";
import test from "../assets/categoys/7413369.png";
import test1 from "../assets/categoys/7413375.png";
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
import { FaCartArrowDown } from "react-icons/fa6";

import testimg from "../assets/categoys/dogCategoryimage.jpg";

import { supabase } from "../components/supabase/supabaseClient";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [mainCategories, setMainCategories] = useState([]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    pauseOnHover: true,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
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

        // Group by unique categories and pick first image per category
        const categoryMap = {};
        data.forEach((product) => {
          if (!categoryMap[product.category]) {
            categoryMap[product.category] = product.image_url;
          }
        });

        const formattedCategories = Object.entries(categoryMap).map(
          ([name, image]) => ({
            name,
            image,
          })
        );

        setMainCategories(formattedCategories);
      } catch (err) {
        console.error("Error fetching categories:", err.message);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-rose-100 to-teal-100 py-36">
        <div className="container mx-auto grid md:grid-cols-2 sm:grid-cols-1 items-center">
          <div className="sm:m-auto">
            <h2 className="lg:text-3xl md:text-2xl font-bold mb-5">
              Mtm Veterinary Medicines <br />& PetShop
            </h2>
            <p className="text-lg mb-6">The Heaven Of Your Pets</p>
            <button className="bg-primary text-white hover:bg-primary hover:text-white focus:outline-none rounded-md px-4 py-2">
              <Link to="/shop">Shop Now</Link>
            </button>
          </div>
          <div>
            <img className="hidden sm:block" src={heroImage} alt="Hero" />
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="bg-white py-16 sm:py-28">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Image Section */}
            <div className="w-full">
              <img
                className="sm:h-1/2 sm:w-64 md:h-1/2 md:w-1/2"
                src={aboutImage}
                alt="About Us"
              />
            </div>
            {/* Text Section */}
            <div className="w-full">
              <div className="md:pl-8 sm:pl-0">
                <h2 className="text-2xl md:text-3xl font-bold mb-5">
                  About Us
                </h2>
                <p className="text-base md:text-lg mb-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam vel felis a nunc rutrum dignissim. Vivamus eu arcu nec
                  libero sagittis volutpat.
                </p>
                <p className="text-base md:text-lg mb-6">
                  Integer vehicula eu nisi vel convallis. Sed euismod lorem a
                  tortor varius, vel aliquam augue malesuada.
                </p>
                <button className="bg-primary text-white hover:bg-primary-dark focus:outline-none rounded-md px-6 py-3">
                  <Link to="/about">Learn More</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* slider Categories */}
      <section>
        <div className="container mb-8">
          {mainCategories.length > 0 && (
            <div className="mb-10">
              <h3 className="text-2xl font-bold mb-4 text-center text-gray-700">
                Explore Categories
              </h3>
              <Slider {...sliderSettings}>
                {mainCategories.map((category, index) => (
                  <div key={index} className="px-3">
                    <div className="bg-slate-300 rounded-full p-2">
                      <div className="text-center rounded-md">
                        <img
                          className="w-32 mx-auto"
                          src={category.image}
                          alt=""
                        />
                        <h2 className="mt-4 text-black font-bold">
                          {category.name}
                        </h2>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          )}
        </div>
      </section>

      {/* Shop by Pet */}
      <section>
        <div className="container mb-8">
          <div className="flex gap-4 items-center justify-center">
            <img className="w-11" src={star} alt="Star Icon" />
            <span className="text-3xl font-bold">Shop by Pets/animals</span>
            <img className="w-11" src={star} alt="Star Icon" />
          </div>
          <br />
          <br />
          <div className=" ">
            <CategorysCard filterCategory="Shop pets" />
          </div>
        </div>
      </section>

      {/* Banner */}
      <section>
        <div className="container mb-8">
          <div>
            <img className="w-full rounded-xl h-60" src={Banner} alt="Banner" />
          </div>
        </div>
      </section>

      {/* Shop by Poultry */}
      <section>
        <div className="container mb-8">
          <div className="flex gap-4 items-center justify-center">
            <img className="w-11" src={star} alt="Star Icon" />
            <span className="text-3xl font-bold">Shop by Toys</span>
            <img className="w-11" src={star} alt="Star Icon" />
          </div>
          <br />
          <br />
          <div className="">
            <CategorysCard filterCategory="Toys" />
          </div>
        </div>
      </section>

      <section>
        <div className="container mb-8">
          <div className="flex gap-4 items-center justify-center">
            <img className="w-11" src={star} alt="Star Icon" />
            <span className="text-3xl font-bold">Shop by Cages</span>
            <img className="w-11" src={star} alt="Star Icon" />
          </div>
          <br />
          <br />
          <div className="">
            <CategorysCard filterCategory="Cages" />
          </div>
        </div>
      </section>
      <section>
        <div className="container mb-8">
          <div className="flex gap-4 items-center justify-center">
            <img className="w-11" src={star} alt="Star Icon" />
            <span className="text-3xl font-bold">Shop by Pharmacy</span>
            <img className="w-11" src={star} alt="Star Icon" />
          </div>
          <br />
          <br />
          <div className="">
            <CategorysCard filterCategory="Pharmacy" />
          </div>
        </div>
      </section>
      <section>
        <div className="container mb-8">
          <div className="flex gap-4 items-center justify-center">
            <img className="w-11" src={star} alt="Star Icon" />
            <span className="text-3xl font-bold">Shop Grooming</span>
            <img className="w-11" src={star} alt="Star Icon" />
          </div>
          <br />
          <br />
          <div className="">
            <CategorysCard filterCategory="Grooming" />
          </div>
        </div>
      </section>

      {/* Doctor Consulting */}
      <section>
        <div className="container mb-8">
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <img
                className="cursor-pointer"
                src={frame1}
                alt="Consultation 1"
              />
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

          <Slider {...settings}>
            {review.map((item) => (
              <div
                key={item.id}
                className="relative max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md w-56 m-2 "
              >
                <div className="p-3">
                  <img
                    className="object-cover rounded-lg"
                    src={item.img}
                    alt="Customer Review"
                  />
                </div>

                <div className="mt-4 px-5 pb-5">
                  <div className="mb-5">
                    <p>{item.reviewText}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-16">
                      {[...Array(item.rating)].map((_, index) => (
                        <img
                          key={index}
                          className="w-4"
                          src={Star}
                          alt="Star"
                        />
                      ))}
                    </div>

                    <div>
                      <p>{item.reviewerName}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </div>
  );
};

export default Home;
