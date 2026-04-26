import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existing = state.cartItems.find((item) => item.id === newItem.id);
      const qtyToAdd = newItem.quantity || 1;
      state.totalQuantity += qtyToAdd;
      if (!existing) {
        state.cartItems.push({
          id: newItem.id,
          productName: newItem.name,
          imgUrl: newItem.image_url,
          price: newItem.price,
          quantity: qtyToAdd,
          totalprice: newItem.price * qtyToAdd,
        });
      } else {
        existing.quantity += qtyToAdd;
        existing.totalprice = existing.price * existing.quantity;
      }

      state.totalAmount = state.cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },

    deleteItem: (state, action) => {
      const id = action.payload;
      const existing = state.cartItems.find((item) => item.id === id);
      if (existing) {
        state.totalQuantity -= existing.quantity;
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
      }

      state.totalAmount = state.cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },

    increaseItem: (state, action) => {
      const id = action.payload;
      const item = state.cartItems.find((item) => item.id === id);
      if (item) {
        item.quantity++;
        item.totalprice = item.price * item.quantity;
        state.totalQuantity++;
      }

      state.totalAmount = state.cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },

    decreaseItem: (state, action) => {
      const id = action.payload;
      const item = state.cartItems.find((item) => item.id === id);
      if (item && item.quantity > 1) {
        item.quantity--;
        item.totalprice = item.price * item.quantity;
        state.totalQuantity--;
      }

      state.totalAmount = state.cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
