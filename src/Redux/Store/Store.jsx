import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../../Redux/Slices/CartSlice";
import likeReducer from "../../Redux/Slices/LikeSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    like: likeReducer,
  },
});

export default store;
