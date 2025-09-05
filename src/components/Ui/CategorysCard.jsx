import test from "../../assets/categoys/7413369.png";
import test1 from "../../assets/categoys/7413371.png";
import React, { useEffect, useState } from "react";
import { supabase } from "../../components/supabase/supabaseClient";
import { Link } from "react-router-dom";

const CategorysCard = ({ filterCategory, filterSubCategory }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let query = supabase.from("products").select("*");

        if (filterCategory) {
          query = query.eq("category", filterCategory);
        }

        if (filterSubCategory) {
          query = query.eq("subcategory", filterSubCategory);
        }

        const { data, error } = await query;
        if (error) throw error;

        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filterCategory, filterSubCategory]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-600 text-lg font-medium">Loading products...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-400 text-base">
          No products found for this category.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 py-8 px-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition duration-300"
        >
          <Link to="/shop">
            <img
              src={product.image_url}
              alt={product.name}
              className="  object-cover h-60 w-60 items-center m-auto"
            />
          </Link>

          <div className="p-4">
            <h3 className="text-xl font-semibold text-gray-800">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500 mb-1">{product.subcategory}</p>
            <p className="text-lg font-bold text-orange-400 mb-2">
              ₹{product.price}
            </p>
            <p className="text-sm text-gray-600 line-clamp-2">
              {product.description}
            </p>

            <div className="mt-4">
              <Link
                to="/shop"
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-xl transition"
              >
                View Product
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategorysCard;
