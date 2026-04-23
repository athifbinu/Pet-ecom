import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../Redux/Slices/CartSlice";
import { likeActions } from "../../Redux/Slices/LikeSlice";
import { Heart, ShoppingCart, Star, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import "animate.css";

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();
  const likedItems = useSelector((state) => state.like.likedItems);

  const isInWatchlist = likedItems.some((i) => i.id === item.id);

  const addToCart = (e) => {
    e.preventDefault(); // Prevent link navigation if button is inside link area
    dispatch(cartActions.addItem(item));

    Swal.fire({
      title: "Added to Cart!",
      text: `${item.name} has been added successfully.`,
      icon: "success",
      iconColor: "#3b82f6",
      confirmButtonText: "Continue Shopping",
      background: "#ffffff",
      confirmButtonColor: "#3b82f6",
      customClass: { popup: "rounded-2xl shadow-xl" },
      timer: 2000,
      timerProgressBar: true,
      showClass: {
        popup: "animate__animated animate__zoomIn animate__faster"
      },
      hideClass: {
        popup: "animate__animated animate__zoomOut animate__faster"
      }
    });
  };

  const toggleWatchlist = (e) => {
    e.preventDefault();
    if (isInWatchlist) {
      dispatch(likeActions.removeFromLike(item.id));
    } else {
      dispatch(likeActions.addToLike(item));
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col h-full"
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {item.isOnSale && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md shadow-red-500/30"
          >
            SALE
          </motion.div>
        )}
        {(item.rating >= 4.5 || !item.rating) && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md shadow-emerald-500/30 flex items-center gap-1"
          >
            <Star className="w-3 h-3 fill-white" /> BEST
          </motion.div>
        )}
      </div>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleWatchlist}
        className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full shadow-md text-gray-500 hover:text-red-500 transition-colors"
      >
        <Heart
          className={`w-4 h-4 ${
            isInWatchlist ? "text-red-500 fill-red-500" : ""
          }`}
        />
      </motion.button>

      <Link to="/details" state={{ product: item }} className="flex-grow flex flex-col pt-2">
        <div className="relative overflow-hidden aspect-[4/3] w-full p-4 flex items-center justify-center"> 
          <img
            src={item.image_url || item.images?.[0]}
            alt={item.name}
            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Quick View Overlay (Hidden by default, shown on hover) */}
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-full font-semibold text-sm shadow-lg flex items-center gap-2 translate-y-4 group-hover:translate-y-0 transition-all duration-300"
            >
              <Eye className="w-4 h-4" /> Quick View
            </motion.div>
          </div>
        </div>

        <div className="p-5 flex flex-col flex-grow"> 
          <div className="flex justify-between items-start mb-2">
            <span className="inline-block px-2.5 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-md uppercase tracking-wider">
              {item.category || item.category_name || "Pet Product"}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
              <span className="text-xs font-bold text-gray-700">
                {item.rating || 4.5}
              </span>
            </div>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {item.name}
          </h3>

          <p className="text-gray-500 text-xs sm:text-sm mb-4 line-clamp-2 leading-relaxed flex-grow bg-white">
            {item.description || "High quality product for your lovely pets. Provides the best nutrition and care."}
          </p>

          <div className="flex items-end justify-between pt-4 border-t border-gray-100 mt-auto bg-white">
            <div className="flex flex-col">
              {item.originalPrice && (
                <span className="text-xs text-gray-400 line-through mb-0.5">
                  ₹{item.originalPrice}
                </span>
              )}
              <span className="text-xl font-black text-gray-900">
                ₹{item.price}
              </span>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={addToCart}
              className="relative overflow-hidden group/btn flex items-center justify-center w-10 h-10 bg-gray-900 hover:bg-black text-white rounded-xl shadow-md transition-all"
            >
              <ShoppingCart className="w-4 h-4 relative z-10 flex-shrink-0" />
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
