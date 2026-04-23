import React from "react";
import { useSelector } from "react-redux";
import Likecard from "../components/Ui/Likecard";
import { motion, AnimatePresence } from "framer-motion";
import { HeartCrack } from "lucide-react";
import { Link } from "react-router-dom";

const Watchlist = () => {
  const watchlistItems = useSelector((state) => state.like.likedItems);

  return (
    <section className="min-h-screen bg-gray-50 pt-32 pb-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center sm:text-left"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Your Wishlist</h1>
          <p className="text-gray-500 mt-2 text-lg">Items you've loved, saved for later.</p>
        </motion.div>

        {watchlistItems.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col justify-center items-center py-20 px-4 w-full bg-white rounded-3xl border border-dashed border-gray-200 mt-8 shadow-sm"
          >
            <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6">
              <HeartCrack className="w-10 h-10 text-red-500" />
            </div>
            <h3 className="text-2xl font-extrabold text-gray-900 mb-3">Your Wishlist is Empty</h3>
            <p className="text-gray-500 text-base max-w-md text-center mb-8 leading-relaxed">
              Looks like you haven't liked any products yet. Go explore our shop and find something you love!
            </p>
            <Link to="/shop">
               <motion.button 
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-colors"
               >
                 Start Shopping
               </motion.button>
            </Link>
          </motion.div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {watchlistItems.map((item) => (
                <Likecard key={item.id} item={item} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Watchlist;
