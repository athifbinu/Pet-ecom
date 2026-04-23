import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../Redux/Slices/CartSlice";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-gray-100 py-6 last:border-0 bg-white group hover:bg-gray-50/50 transition-colors px-4 rounded-xl"
    >
      {/* Image & Title */}
      <div className="flex w-full sm:w-2/5 gap-4 items-center sm:items-start">
        <div className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 bg-gray-50 rounded-xl border border-gray-100 p-2 overflow-hidden">
          <img
            className="w-full h-full object-contain mix-blend-multiply transition-transform group-hover:scale-110 duration-300"
            src={item.imgUrl || item.images?.[0] || item.image_url}
            alt={item.productName}
          />
        </div>
        <div className="flex flex-col justify-center h-full gap-2">
          <span className="font-bold text-gray-900 text-base sm:text-lg line-clamp-2">{item.productName}</span>
          <span className="text-sm font-semibold text-blue-600 sm:hidden">₹{item.price}</span>
        </div>
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center justify-between sm:justify-center w-full sm:w-1/5 mt-4 sm:mt-0 h-full sm:pt-4">
        <span className="text-sm text-gray-500 sm:hidden">Quantity</span>
        <div className="flex items-center bg-gray-100 rounded-lg p-1">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => dispatch(cartActions.decreaseItem(item.id))}
            className="w-8 h-8 flex items-center justify-center bg-white rounded shadow-sm text-gray-600 hover:text-red-500 transition-colors"
          >
            <Minus size={14} />
          </motion.button>
          <span className="w-10 text-center font-semibold text-gray-900 text-sm">
            {item.quantity}
          </span>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => dispatch(cartActions.increaseItem(item.id))}
            className="w-8 h-8 flex items-center justify-center bg-white rounded shadow-sm text-gray-600 hover:text-blue-600 transition-colors"
          >
            <Plus size={14} />
          </motion.button>
        </div>
      </div>

      {/* Unit Price */}
      <div className="hidden sm:flex sm:w-1/5 justify-center pt-6">
        <span className="text-base font-semibold text-gray-900">₹{item.price}</span>
      </div>

      {/* Total Price & Remove */}
      <div className="flex sm:w-1/5 items-center justify-between sm:justify-center w-full mt-4 sm:mt-0 sm:pt-6">
        <span className="text-sm text-gray-500 sm:hidden">Total</span>
        <div className="flex items-center gap-6 sm:gap-4">
           <span className="text-lg font-bold text-gray-900">
             ₹{item.price * item.quantity}
           </span>
           <motion.button
             whileHover={{ scale: 1.1, rotate: 10 }}
             whileTap={{ scale: 0.9 }}
             onClick={() => dispatch(cartActions.deleteItem(item.id))}
             className="text-gray-400 hover:text-red-500 transition-colors p-2 bg-red-50 rounded-full hover:bg-red-100 sm:bg-transparent sm:hover:bg-transparent"
             title="Remove Item"
           >
             <Trash2 size={18} />
           </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const Cart = () => {
  const { cartItems, totalAmount, totalQuantity } = useSelector(
    (state) => state.cart
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-500/30 text-white">
            <ShoppingBag size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Shopping Cart</h1>
            <p className="text-gray-500 text-sm mt-1">You have {totalQuantity} items in your cart</p>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 lg:items-start">
          
          {/* Left - Cart Items */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="w-full lg:w-2/3 xl:w-3/4 bg-white rounded-3xl shadow-xl shadow-gray-200/50 overflow-hidden border border-gray-100"
          >
            {/* Table Headers */}
            {cartItems.length > 0 && (
              <div className="hidden sm:flex bg-gray-50 text-gray-500 text-xs uppercase font-bold py-4 px-8 border-b border-gray-200">
                <span className="w-2/5">Product Details</span>
                <span className="w-1/5 text-center">Quantity</span>
                <span className="w-1/5 text-center">Price</span>
                <span className="w-1/5 text-center">Total</span>
              </div>
            )}

            {/* Cart Items List */}
            <div className="p-4 sm:p-6">
              {cartItems.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 px-4 text-center"
                >
                  <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6 text-gray-400 border border-gray-200 shadow-inner">
                    <ShoppingBag size={64} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
                  <p className="text-gray-500 mb-8 max-w-md">Looks like you haven't added anything to your cart yet. Browse our top categories and discover our best deals!</p>
                  <Link to="/shop">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-blue-500/30 flex items-center gap-2 transition-colors"
                    >
                      Start Shopping
                      <ArrowRight size={18} />
                    </motion.button>
                  </Link>
                </motion.div>
              ) : (
                <motion.div layout className="divide-y divide-gray-50">
                  <AnimatePresence>
                    {cartItems.map((item) => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </div>

            {/* Footer Action */}
            {cartItems.length > 0 && (
              <div className="bg-gray-50 p-6 border-t border-gray-100">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 transition-colors group"
                >
                  <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                  Continue Shopping
                </Link>
              </div>
            )}
          </motion.div>

          {/* Right - Order Summary */}
          {cartItems.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="w-full lg:w-1/3 xl:w-1/4 bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-6 xl:p-8 border border-gray-100 sticky top-28"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 text-sm mb-6">
                <div className="flex justify-between items-center text-gray-600">
                  <span>Subtotal ({totalQuantity} items)</span>
                  <span className="font-semibold text-gray-900">₹{totalAmount}</span>
                </div>
                <div className="flex justify-between items-center text-gray-600">
                  <span>Shipping Estimate</span>
                  <span className="text-green-600 font-semibold">Free</span>
                </div>
                <div className="flex justify-between items-center text-gray-600">
                  <span>Tax Estimate</span>
                  <span className="font-semibold text-gray-900">Calculated at checkout</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6 mb-8">
                <div className="flex justify-between items-end">
                  <span className="text-base font-semibold text-gray-900">Total</span>
                  <div className="text-right">
                    <span className="text-3xl font-black text-gray-900">₹{totalAmount}</span>
                  </div>
                </div>
              </div>

              <Link to="/checkout" className="block w-full">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-xl shadow-lg shadow-gray-900/20 flex items-center justify-center gap-2 mb-4"
                >
                  Proceed to Checkout
                  <ArrowRight size={18} />
                </motion.button>
              </Link>
              
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-4">
                <ShieldCheck size={14} className="text-green-500" />
                <span>Secure Checkout Process</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
