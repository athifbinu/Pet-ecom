import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../Redux/Slices/CartSlice";
import { likeActions } from "../../Redux/Slices/LikeSlice";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "animate.css";

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();
  const likedItems = useSelector((state) => state.like.likedItems);

  const isInWatchlist = likedItems.some((i) => i.id === item.id);

  const addToCart = () => {
    dispatch(cartActions.addItem(item));

    Swal.fire({
      title: "🎉 Added to Cart!",
      text: `${item.name} has been added successfully.`,
      icon: "success",
      confirmButtonText: "OK",
      background: "#f9fafb",
      confirmButtonColor: "#2563eb",
      customClass: {
        popup: "rounded-xl shadow-lg",
      },
      timer: 2000,
      timerProgressBar: true,
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });
  };

  const toggleWatchlist = () => {
    if (isInWatchlist) {
      dispatch(likeActions.removeFromLike(item.id));
    } else {
      dispatch(likeActions.addToLike(item));
    }
  };

  return (
<div className="group relative bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200">
  {item.isOnSale && (
    <div className="absolute top-3 left-3 z-10 bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-medium shadow">
      Sale
    </div>
  )}

  <button
    onClick={toggleWatchlist}
    className="absolute top-3 right-3 z-10 p-1.5 bg-white/80 backdrop-blur-sm rounded-full shadow hover:bg-white hover:scale-110 transition"
  >
    <Heart
      className={`w-4 h-4 ${
        isInWatchlist ? "text-red-500 fill-red-500" : "text-gray-500"
      }`}
    />
  </button>

  <Link to="/details" state={{ product: item }}>
    <div className="relative overflow-hidden bg-gray-50 aspect-[4/3]"> 
      {/* 👆 Reduced from aspect-square to 4:3 ratio */}
      <img
        src={item.image_url}
        alt={item.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </div>
  </Link>

  <div className="p-4"> {/* 👇 Reduced from p-6 */}
    <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-medium rounded mb-2 border border-blue-100">
      {item.category}
    </span>

    <h3 className="text-base font-semibold text-gray-900 mb-1 line-clamp-1 group-hover:text-blue-600">
      {item.name}
    </h3>

    <div className="flex items-center gap-1 mb-2">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i < (item.rating || 4)
              ? "text-yellow-400 fill-current"
              : "text-gray-300"
          }`}
        />
      ))}
      <span className="text-xs text-gray-500">
        {item.rating || 4}
      </span>
    </div>

    <p className="text-gray-500 text-xs mb-2 line-clamp-1">
      {item.description}
    </p>

    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
      <div className="flex items-center gap-1">
        <span className="text-lg font-bold text-gray-900">
          ₹{item.price}
        </span>
        {item.originalPrice && (
          <span className="text-sm text-gray-400 line-through">
            ₹{item.originalPrice}
          </span>
        )}
      </div>

      <button
        onClick={addToCart}
        className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium"
      >
        <ShoppingCart className="w-3.5 h-3.5" />
        Add
      </button>
    </div>
  </div>
</div>

  );
};

export default ProductCard;
