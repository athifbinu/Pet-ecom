import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../Redux/Slices/CartSlice";
import { Link } from "react-router-dom";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 border-b py-6 ">
      <div className="flex w-full sm:w-2/5 gap-4">
        <img
          className="w-24 h-24 object-cover"
          src={item.imgUrl}
          alt={item.productName}
        />
        <div className="flex flex-col justify-between flex-grow">
          <span className="font-bold text-sm">{item.productName}</span>
          <button
            onClick={() => dispatch(cartActions.deleteItem(item.id))}
            className="text-xs text-red-500 hover:underline mt-1"
          >
            Remove
          </button>
        </div>
      </div>

      <div className="flex items-center sm:justify-center gap-2 sm:w-1/5">
        <button onClick={() => dispatch(cartActions.decreaseItem(item.id))}>
          <svg className="w-3 fill-current text-gray-600" viewBox="0 0 448 512">
            <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
          </svg>
        </button>
        <input
          className="w-10 border text-center"
          type="text"
          value={item.quantity}
          readOnly
        />
        <button onClick={() => dispatch(cartActions.increaseItem(item.id))}>
          <svg className="w-3 fill-current text-gray-600" viewBox="0 0 448 512">
            <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
          </svg>
        </button>
      </div>

      <div className="flex sm:w-1/5 justify-between sm:justify-center w-full">
        <span className="text-sm font-semibold">₹{item.price}</span>
      </div>

      <div className="flex sm:w-1/5 justify-between sm:justify-center w-full">
        <span className="text-sm font-semibold">
          ₹{item.price * item.quantity}
        </span>
      </div>
    </div>
  );
};

const Cart = () => {
  const { cartItems, totalAmount, totalQuantity } = useSelector(
    (state) => state.cart
  );

  return (
    <div className="container mx-auto mt-6 px-4">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left - Cart Items */}
        <div className="w-full lg:w-3/4 bg-white p-6 rounded-md shadow-md">
          <div className="flex flex-col sm:flex-row justify-between border-b pb-4">
            <h1 className="text-xl font-semibold">Shopping Cart</h1>
            <h2 className="text-xl font-semibold">{totalQuantity} Items</h2>
          </div>

          {/* Labels for large screens */}
          <div className="hidden sm:flex mt-6 text-gray-500 text-xs uppercase font-semibold border-b pb-2">
            <span className="w-2/5">Product Details</span>
            <span className="w-1/5 text-center">Quantity</span>
            <span className="w-1/5 text-center">Price</span>
            <span className="w-1/5 text-center">Total</span>
          </div>

          {/* Cart Items */}
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">
              Your cart is empty.
            </p>
          ) : (
            cartItems.map((item) => <CartItem key={item.id} item={item} />)
          )}

          <Link
            to="/shop"
            className="mt-6 inline-flex items-center gap-2 text-indigo-600 text-sm"
          >
            <svg className="w-4" viewBox="0 0 448 512" fill="currentColor">
              <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
            </svg>
            Continue Shopping
          </Link>
        </div>

        {/* Right - Order Summary */}
        <div className="w-full lg:w-1/4 bg-white p-6 rounded-md shadow-md">
          <h1 className="text-xl font-semibold border-b pb-4">Order Summary</h1>
          <div className="flex justify-between mt-4">
            <span className="text-sm font-semibold uppercase">
              Items {totalQuantity}
            </span>
            <span className="text-sm font-semibold">₹{totalAmount}</span>
          </div>

          <div className="border-t mt-6 pt-4">
            <div className="flex justify-between text-sm font-semibold mb-4">
              <span>Total cost</span>
              <span>₹{totalAmount}</span>
            </div>
            <Link to="/checkout">
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md">
                Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
