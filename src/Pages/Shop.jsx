import React, { useEffect, useState } from "react";
import CommonSection from "../components/Ui/CommonSection";
import ProductCard from "../components/Ui/ProductCard";

import { supabase } from "../components/supabase/supabaseClient";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase.from("products").select("*");
        if (error) throw error;
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err.message);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter
        ? product.category === categoryFilter
        : true;
      return matchesSearch && matchesCategory;
    });

    setFilteredProducts(filtered);
  }, [searchTerm, categoryFilter, products]);

  return (
    <section>
      <div className="mt-28">
        <CommonSection />
      </div>

      {/* Filter and Search */}
      <div
        className="px-[30px] py-4 max-w-[1170px] mx-auto flex flex-col lg:flex-row
        justify-between gap-4 lg:gap-x-3 relative lg:top-4 lg:shadow-1 bg-white 
        lg:bg-transparent lg:backdrop-blur rounded-lg -mt-36 mb-24 "
      >
        <input
          type="text"
          placeholder="Search Products"
          className="p-2.5 w-full text-gray-500 border rounded-md shadow-sm focus:border-orange-500 font-bold"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="w-full p-2.5 text-gray-500 border rounded-md shadow-sm focus:border-orange-400"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Shop pets">Shop Pets</option>
          <option value="Pharmacy">Pharmacy</option>
          <option value="Toys">Toys</option>
          <option value="Grooming">Grooming</option>
          <option value="Cages">Cages</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="container">
        {filteredProducts.length === 0 ? (
          <p className="text-center font-semibold text-gray-500 py-10">
            No products found.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredProducts.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Shop;
