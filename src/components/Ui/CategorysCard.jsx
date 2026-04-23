import React, { useEffect, useState } from "react";
import { supabase } from "../../components/supabase/supabaseClient";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { Loader2, PackageX } from "lucide-react";
import { Link } from "react-router-dom";

const CategorysCard = ({ filterCategory, filterSubCategory }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let query = supabase.from("products").select("*").limit(8);

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

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64 w-full">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          <Loader2 className="w-12 h-12 text-blue-600 mb-4" />
        </motion.div>
        <p className="text-blue-600 font-bold tracking-wide animate-pulse uppercase text-sm">Curating Top Products...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col justify-center items-center py-16 px-4 w-full bg-white rounded-3xl border border-dashed border-gray-200 mt-8 shadow-sm"
      >
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
          <PackageX className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-2xl font-extrabold text-gray-900 mb-3">No Products Found</h3>
        <p className="text-gray-500 text-base max-w-md text-center mb-8 leading-relaxed">
          We couldn't find any products in this specific category right now. Check back later or explore our other amazing collections!
        </p>
        <Link to={`/shop${filterCategory ? `?category=${encodeURIComponent(filterCategory)}` : ""}`}>
           <motion.button 
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             className="bg-gray-900 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-gray-900/20 flex items-center gap-2"
           >
             Browse All Products
           </motion.button>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 xl:gap-8 py-12 px-4 sm:px-0"
    >
      {products.map((product) => (
        <motion.div key={product.id} variants={itemVariants} className="h-full">
          <ProductCard item={product} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CategorysCard;
