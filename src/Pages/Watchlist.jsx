// pages/Watchlist.jsx
import React from "react";
import { useSelector } from "react-redux";
import Likecard from "../components/Ui/Likecard";

const Watchlist = () => {
  const watchlistItems = useSelector((state) => state.like.likedItems);

  return (
    <section className="mt-40">
      <div className="container">
        {watchlistItems.length === 0 ? (
          <p className="text-center text-gray-500 text-xl">
            No items in watchlist.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {watchlistItems.map((item) => (
              <Likecard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Watchlist;
