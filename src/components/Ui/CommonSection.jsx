import React from "react";

const CommonSection = () => {
  return (
    <section
      className="bg-[url('/src/assets/images/background.jpg')] bg-cover bg-center m-3 sm:m-5 rounded-xl py-36 sm:py-44 md:py-28
    "
    >
      <div className="container mx-auto text-center px-4">
        <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold leading-snug">
          Welcome to Our Shop
        </h1>
        <p className="text-white mt-3 sm:mt-4 max-w-lg mx-auto text-sm sm:text-base md:text-lg">
          Discover the best products for your pets with love and care.
        </p>
      </div>
    </section>
  );
};

export default CommonSection;
