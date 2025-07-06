// components/Ui/Likecard.jsx
import React from "react";
import { useDispatch } from "react-redux";
import { likeActions } from "../../Redux/Slices/LikeSlice";
import { cartActions } from "../../Redux/Slices/CartSlice";

const Likecard = ({ item }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(likeActions.removeFromLike(item.id));
  };

  const addTocart = () => {
    dispatch(cartActions.addItem(item));
  };

  return (
    <div className="flex justify-center p-6">
      <div className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg hover:shadow-xl transition">
        <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
          <img
            className="object-cover w-full h-full"
            src={item.image_url}
            alt={item.name}
          />
        </div>

        <div className="px-5 py-4">
          <h5 className="text-lg font-bold text-gray-800 mb-1">{item.name}</h5>

          <div className="mb-3">
            <span className="text-xl font-bold text-gray-900">
              ₹{item.price}
            </span>
            {item.originalPrice && (
              <span className="text-sm line-through text-gray-500 ml-2">
                ₹{item.originalPrice}
              </span>
            )}
          </div>

          <div className="flex justify-between gap-2">
            <button
              onClick={addTocart}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg text-sm font-semibold"
            >
              Add to Cart
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm font-semibold"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Likecard;
