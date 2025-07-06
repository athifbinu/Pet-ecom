import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../Redux/Slices/CartSlice";
import { likeActions } from "../../Redux/Slices/LikeSlice";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();
  const likedItems = useSelector((state) => state.like.likedItems);

  const isInWatchlist = likedItems.some((i) => i.id === item.id);

  const addToCart = () => {
    dispatch(cartActions.addItem(item));
  };

  const toggleWatchlist = () => {
    if (isInWatchlist) {
      dispatch(likeActions.removeFromLike(item.id));
    } else {
      dispatch(likeActions.addToLike(item));
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200">
      {item.isOnSale && (
        <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
          Sale
        </div>
      )}

      <button
        onClick={toggleWatchlist}
        className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white hover:scale-110 transition-all duration-200 group/heart"
      >
        <Heart
          className={`w-5 h-5 transition-colors duration-200 ${
            isInWatchlist ? "text-red-500 fill-red-500" : "text-gray-600"
          }`}
        />
      </button>

      <Link to="/details" state={{ product: item }}>
        <div className="relative overflow-hidden bg-gray-50 aspect-square">
          <img
            src={item.image_url}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
        </div>
      </Link>

      <div className="p-6">
        <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 text-sm font-medium rounded-full mb-3 border border-blue-100">
          {item.category}
        </span>

        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
          {item.name}
        </h3>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < (item.rating || 4)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {item.rating || 4} ({item.reviewCount || 20} reviews)
          </span>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
          {item.description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900">
              ₹{item.price}
            </span>
            {item.originalPrice && (
              <span className="text-lg text-gray-500 line-through">
                ₹{item.originalPrice}
              </span>
            )}
          </div>

          <button
            onClick={addToCart}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
