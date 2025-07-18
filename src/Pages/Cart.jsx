import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../Redux/Slices/CartSlice"; // ✅ import correctly
import { Link } from "react-router-dom";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5 border-b">
      <div className="flex w-full sm:w-2/5">
        <div className="w-20">
          <img
            className="h-24 object-cover"
            src={item.imgUrl}
            alt={item.productName}
          />
        </div>
        <div className="flex flex-col justify-between ml-4 flex-grow">
          <span className="font-bold text-sm">{item.productName}</span>
          <button
            onClick={() => dispatch(cartActions.deleteItem(item.id))} // ✅ fixed
            className="text-xs text-red-500 hover:underline"
          >
            Remove
          </button>
        </div>
      </div>

      <div className="flex justify-center w-full sm:w-1/5">
        <button onClick={() => dispatch(cartActions.decreaseItem(item.id))}>
          <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
            <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
          </svg>
        </button>
        <input
          className="mx-2 border text-center w-8"
          type="text"
          value={item.quantity}
          readOnly
        />
        <button onClick={() => dispatch(cartActions.increaseItem(item.id))}>
          <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
            <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
          </svg>
        </button>
      </div>

      <span className="text-center w-full sm:w-1/5 font-semibold text-sm">
        ₹{item.price}
      </span>
      <span className="text-center w-full sm:w-1/5 font-semibold text-sm">
        ₹{item.price * item.quantity}
      </span>
    </div>
  );
};

const Cart = () => {
  const { cartItems, totalAmount, totalQuantity } = useSelector(
    (state) => state.cart
  );

  return (
    <div className="container mx-auto mt-10 px-4">
      <div className="flex flex-col lg:flex-row shadow-md my-10">
        <div className="w-full lg:w-3/4 bg-white px-10 py-10">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
            <h2 className="font-semibold text-2xl">{totalQuantity} Items</h2>
          </div>

          <div className="hidden sm:flex mt-10 mb-5">
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
              Product Details
            </h3>
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">
              Quantity
            </h3>
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">
              Price
            </h3>
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">
              Total
            </h3>
          </div>

          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">
              Your cart is empty.
            </p>
          ) : (
            cartItems.map((item) => <CartItem key={item.id} item={item} />)
          )}

          <Link
            to="/shop"
            className="text-indigo-600 text-sm mt-10 flex items-center gap-2"
          >
            <svg className="w-4" viewBox="0 0 448 512" fill="currentColor">
              <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
            </svg>
            Continue Shopping
          </Link>
        </div>

        <div id="summary" className="w-full lg:w-1/4 px-8 py-10 bg-white">
          <h1 className="font-semibold text-2xl border-b pb-8">
            Order Summary
          </h1>
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">
              Items {totalQuantity}
            </span>
            <span className="font-semibold text-sm">₹{totalAmount}</span>
          </div>
          <div className="border-t mt-8">
            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
              <span>Total cost</span>
              <span>₹{totalAmount + 10}</span>
            </div>
            <Link to="/checkout">
              <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
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
