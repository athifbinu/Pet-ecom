// Redux/Slices/likeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  likedItems: [],
  totellikeQuantity: 0,
};

const likeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {
    addToLike: (state, action) => {
      const exists = state.likedItems.find(
        (item) => item.id === action.payload.id
      );
      if (!exists) {
        state.likedItems.push(action.payload);
        state.totellikeQuantity++;
      }
    },
    removeFromLike: (state, action) => {
      state.likedItems = state.likedItems.filter(
        (item) => item.id !== action.payload
      );
      state.totellikeQuantity = state.likedItems.length;
    },
  },
});

export const likeActions = likeSlice.actions;
export default likeSlice.reducer;
