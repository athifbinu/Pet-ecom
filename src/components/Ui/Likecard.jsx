import React from "react";
import { useDispatch } from "react-redux";
import { likeActions } from "../../Redux/Slices/LikeSlice";
import { cartActions } from "../../Redux/Slices/CartSlice";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { ShoppingCart, Trash2, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Likecard = ({ item }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(likeActions.removeFromLike(item.id));
    Swal.fire({
      icon: "success",
      iconColor: "#ef4444",
      title: "Removed!",
      text: `${item.name} has been removed from your Wishlist.`,
      confirmButtonText: "OK",
      confirmButtonColor: "#3b82f6",
      background: "#ffffff",
      customClass: { popup: "rounded-2xl shadow-xl" },
      timer: 1500,
    });
  };

  const addTocart = () => {
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
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      whileHover={{ y: -8 }}
      className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col h-full"
    >
      <div className="absolute top-3 left-3 z-10 p-1.5 bg-red-50 text-red-500 rounded-full shadow-sm">
        <Heart className="w-4 h-4 fill-current" />
      </div>

      <Link to="/details" state={{ product: item }} className="flex w-full aspect-[4/3] p-4 bg-gray-50 items-center justify-center relative overflow-hidden">
        <img
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
          src={item.image_url || item.images?.[0]}
          alt={item.name}
        />
      </Link>

      <div className="p-5 flex flex-col flex-grow bg-white">
        <h5 className="text-base sm:text-lg font-bold text-gray-900 mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {item.name}
        </h5>

        <div className="mb-4">
          <span className="text-xl font-black text-gray-900">
            ₹{item.price}
          </span>
          {item.originalPrice && (
            <span className="text-sm line-through text-gray-400 ml-2 font-semibold">
              ₹{item.originalPrice}
            </span>
          )}
        </div>

        <div className="flex justify-between gap-3 mt-auto pt-4 border-t border-gray-100">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={addTocart}
            className="flex-1 bg-gray-900 hover:bg-black text-white py-2.5 rounded-xl text-sm font-bold shadow-md shadow-gray-900/20 transition-all flex justify-center items-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" /> Cart
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDelete}
            className="bg-red-50 hover:bg-red-100 text-red-500 py-2.5 px-4 rounded-xl text-sm font-bold shadow-sm transition-all flex justify-center items-center"
            title="Remove from Wishlist"
          >
            <Trash2 className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default Likecard;
