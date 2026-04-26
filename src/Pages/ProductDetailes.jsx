import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Star,
  ShoppingCart,
  CreditCard,
  ChevronRight,
  Heart,
  Share2,
  Package,
  Clock,
  ShieldCheck,
  Truck,
  RotateCcw,
  Minus,
  Plus
} from "lucide-react";
import { useDispatch } from "react-redux";
import { cartActions } from "../Redux/Slices/CartSlice";
import Swal from "sweetalert2";
import { supabase } from "../components/supabase/supabaseClient";
import ProductCard from "../components/Ui/ProductCard";
import Slider from "react-slick";
import { motion, AnimatePresence } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const [quantity, setQuantity] = useState(1);
  const [activeSection, setActiveSection] = useState("description");
  const [reviewText, setReviewText] = useState("");
  const [userRating, setUserRating] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [suggested, setSuggested] = useState([]);
  const [mainImage, setMainImage] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (product) {
      setMainImage(product.image_url || product.images?.[0] || "");
      window.scrollTo(0, 0);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50/50 backdrop-blur-sm pt-[4rem]">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  const addToCart = () => {
    dispatch(cartActions.addItem({ ...product, quantity }));
    Swal.fire({
      title: "Added to Cart!",
      text: `${product.name} (x${quantity}) has been added successfully.`,
      icon: "success",
      iconColor: "#3b82f6",
      confirmButtonText: "Continue Shopping",
      background: "#ffffff",
      confirmButtonColor: "#3b82f6",
      customClass: { popup: "rounded-2xl shadow-xl" },
      timer: 2500,
      timerProgressBar: true,
      showClass: {
        popup: "animate__animated animate__zoomIn animate__faster"
      },
      hideClass: {
        popup: "animate__animated animate__zoomOut animate__faster"
      }
    });
  };

  const handleQuantityChange = (delta) => {
    const newQty = quantity + delta;
    if (newQty >= 1 && newQty <= 10) setQuantity(newQty);
  };

  const renderStars = (rating, interactive = false, size = 20) => {
    return [...Array(5)].map((_, i) => (
      <motion.button
        whileHover={interactive ? { scale: 1.2 } : {}}
        whileTap={interactive ? { scale: 0.9 } : {}}
        key={i}
        onClick={interactive ? () => setUserRating(i + 1) : undefined}
        className={`${
          interactive ? "cursor-pointer" : "cursor-default"
        } transition-colors p-0.5`}
        disabled={!interactive}
      >
        <Star
          size={size}
          className={`${
            i < Math.floor(rating)
              ? "text-yellow-400 fill-yellow-400 p-0"
              : i < rating
              ? "text-yellow-400 fill-yellow-200"
              : "text-gray-200"
          }`}
        />
      </motion.button>
    ));
  };

  useEffect(() => {
    if (product?.category) {
      const fetchSuggested = async () => {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("category", product.category)
          .neq("id", product.id)
          .limit(8);

        if (!error && data) setSuggested(data);
      };
      fetchSuggested();
    }
  }, [product]);

  const sliderSettings = {
    dots: true,
    infinite: suggested.length > 3,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const images = product.images?.length > 0 ? product.images : [product.image_url];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white overflow-x-hidden pt-24 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <motion.nav 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center text-sm text-gray-500 space-x-2 mb-8 bg-white py-3 px-5 rounded-full shadow-sm w-fit"
        >
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link to={`/shop?category=${product.category}`} className="hover:text-blue-600 transition-colors capitalize">{product.category}</Link>
          <ChevronRight size={14} />
          <span className="text-gray-900 font-semibold truncate max-w-[200px] sm:max-w-xs">{product.name}</span>
        </motion.nav>

        {/* Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Image Gallery Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-4"
          >
            <div className="relative bg-white rounded-3xl p-6 shadow-xl shadow-gray-200/50 flex flex-col items-center justify-center group overflow-hidden">
              {product.originalPrice && (
                <div className="absolute top-6 left-6 z-10 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </div>
              )}
              <motion.img
                key={mainImage}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                src={mainImage}
                alt={product.name}
                className="w-full aspect-square object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            
            {/* Thumbnail gallery */}
            {images && images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide py-2">
                {images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setMainImage(img)}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl border-2 overflow-hidden bg-white ${mainImage === img ? 'border-blue-500 shadow-md' : 'border-transparent opacity-70 hover:opacity-100 hover:border-gray-200'} transition-all`}
                  >
                    <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Details Section */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <motion.div variants={fadeInUp} className="flex justify-between items-start mb-2">
              <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full uppercase tracking-wider">
                {product.brand || "Premium Selection"}
              </span>
              <div className="flex space-x-3">
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md text-gray-500 hover:text-red-500 transition-colors"
                >
                  <Heart className={isWishlisted ? "text-red-500 fill-red-500" : ""} size={18} />
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md text-gray-500 hover:text-blue-500 transition-colors"
                >
                  <Share2 size={18} />
                </motion.button>
              </div>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-4 leading-tight">
              {product.name}
            </motion.h1>

            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center space-x-1">
                {renderStars(product.rating || 4.5)}
              </div>
              <span className="text-sm text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded-md">
                {product.rating || 4.5} Rating
              </span>
              <span className="text-sm text-blue-600 hover:underline cursor-pointer font-medium">
                {product.reviewCount || 24} Verified Reviews
              </span>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex items-end gap-4 mb-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 w-fit">
              <div className="text-4xl font-black text-gray-900">
                ₹{product.price}
              </div>
              {product.originalPrice && (
                <div className="flex flex-col">
                  <span className="text-lg text-gray-400 line-through font-semibold">
                    ₹{product.originalPrice}
                  </span>
                  <span className="text-sm text-green-600 font-bold">
                    You save ₹{product.originalPrice - product.price}
                  </span>
                </div>
              )}
            </motion.div>

            <motion.p variants={fadeInUp} className="text-gray-600 text-base leading-relaxed mb-8 max-w-2xl">
              {product.description?.substring(0, 200)}...
            </motion.p>
            
            <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-4 mb-8 border-y border-gray-100 py-6">
              <div className="flex items-center gap-3">
                 <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                    <Truck size={20} />
                 </div>
                 <div className="text-sm">
                   <p className="font-semibold text-gray-900">Free Delivery</p>
                   <p className="text-gray-500 text-xs">For orders over ₹500</p>
                 </div>
              </div>
              <div className="flex items-center gap-3">
                 <div className="bg-green-100 p-2 rounded-full text-green-600">
                    <ShieldCheck size={20} />
                 </div>
                 <div className="text-sm">
                   <p className="font-semibold text-gray-900">Secure Payment</p>
                   <p className="text-gray-500 text-xs">100% protected</p>
                 </div>
              </div>
              <div className="flex items-center gap-3">
                 <div className="bg-purple-100 p-2 rounded-full text-purple-600">
                    <RotateCcw size={20} />
                 </div>
                 <div className="text-sm">
                   <p className="font-semibold text-gray-900">Easy Returns</p>
                   <p className="text-gray-500 text-xs">30 days return policy</p>
                 </div>
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 items-center">
              {/* Quantity Selector */}
              <div className="flex items-center justify-between w-full sm:w-36 bg-gray-100 rounded-xl p-1 shadow-inner h-[52px]">
                <button 
                  onClick={() => handleQuantityChange(-1)}
                  className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm text-gray-600 hover:text-gray-900 disabled:opacity-50 transition-all hover:bg-gray-50"
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </button>
                <span className="font-bold text-gray-900 w-10 text-center">{quantity}</span>
                <button 
                  onClick={() => handleQuantityChange(1)}
                  className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm text-gray-600 hover:text-gray-900 disabled:opacity-50 transition-all hover:bg-gray-50"
                  disabled={quantity >= 10}
                >
                  <Plus size={16} />
                </button>
              </div>

              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={addToCart}
                className="w-full sm:flex-1 bg-gray-900 hover:bg-black text-white h-[52px] rounded-xl flex items-center justify-center gap-2 font-bold shadow-lg shadow-gray-900/20 transition-all"
              >
                <ShoppingCart size={20} />
                <span>Add to Cart</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  navigate("/checkout", {
                    state: { 
                      buyNowProduct: {
                        id: product.id,
                        productName: product.name,
                        imgUrl: mainImage,
                        price: product.price,
                        quantity: quantity,
                        totalprice: product.price * quantity
                      }
                    },
                  })
                }
                className="w-full sm:flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white h-[52px] rounded-xl flex items-center justify-center gap-2 font-bold shadow-lg shadow-blue-500/30 transition-all"
              >
                <CreditCard size={20} />
                <span>Buy Now</span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Tab Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-lg shadow-gray-200/50 mb-16 overflow-hidden"
        >
          <div className="flex border-b border-gray-100 overflow-x-auto scrollbar-hide">
            {[
              { key: "description", label: "Description", icon: Package },
              { key: "specifications", label: "Specifications", icon: Clock },
              { key: "reviews", label: "Customer Reviews", icon: Star },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveSection(key)}
                className={`flex items-center gap-2 px-8 py-5 text-sm font-bold transition-all relative whitespace-nowrap ${
                  activeSection === key
                    ? "text-blue-600 bg-blue-50/30"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50/50"
                }`}
              >
                <Icon size={18} />
                {label}
                {activeSection === key && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="p-8 md:p-10 min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeSection === "description" && (
                  <div className="prose max-w-none text-gray-600">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">About this product</h3>
                    <p className="leading-relaxed sm:text-lg">
                      {product.description}
                    </p>
                  </div>
                )}

                {activeSection === "reviews" && (
                  <div className="grid md:grid-cols-2 gap-12">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-6">Write a Review</h3>
                      <div className="bg-gray-50 p-6 rounded-2xl">
                        <div className="mb-4">
                          <span className="block text-sm font-medium text-gray-700 mb-2">Overall Rating</span>
                          <div className="flex gap-1">{renderStars(userRating, true, 28)}</div>
                        </div>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
                          <textarea
                            className="w-full border-gray-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                            rows="4"
                            placeholder="What did you like or dislike?"
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                          />
                        </div>
                        <motion.button 
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-md transition-colors"
                        >
                          Submit Review
                        </motion.button>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-6">Customer Reviews</h3>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="text-5xl font-black text-gray-900">{product.rating || 4.5}</div>
                        <div>
                          <div className="flex text-yellow-400 mb-1">
                            <Star className="fill-current" size={16} />
                            <Star className="fill-current" size={16} />
                            <Star className="fill-current" size={16} />
                            <Star className="fill-current" size={16} />
                            <Star className="fill-current text-gray-300" size={16} />
                          </div>
                          <p className="text-sm text-gray-500">Based on {product.reviewCount || 24} reviews</p>
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                         <div className="border-b border-gray-100 pb-6">
                            <div className="flex items-center gap-2 mb-2">
                               <div className="flex text-yellow-400"><Star size={14} className="fill-current"/><Star size={14} className="fill-current"/><Star size={14} className="fill-current"/><Star size={14} className="fill-current"/><Star size={14} className="fill-current"/></div>
                               <span className="font-bold text-sm text-gray-900">Great quality!</span>
                            </div>
                            <p className="text-gray-600 text-sm mb-2">Really satisfied with this purchase. My pet loves it and the material feels very premium.</p>
                            <span className="text-xs text-gray-400">By John D. on Oct 12, 2023</span>
                         </div>
                         <div className="border-b border-gray-100 pb-6">
                            <div className="flex items-center gap-2 mb-2">
                               <div className="flex text-yellow-400"><Star size={14} className="fill-current"/><Star size={14} className="fill-current"/><Star size={14} className="fill-current"/><Star size={14} className="fill-current"/><Star size={14} className="text-gray-300 fill-current"/></div>
                               <span className="font-bold text-sm text-gray-900">Good, but could be cheaper</span>
                            </div>
                            <p className="text-gray-600 text-sm mb-2">The product works exactly as described. Delivery was fast too.</p>
                            <span className="text-xs text-gray-400">By Sarah M. on Sep 28, 2023</span>
                         </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === "specifications" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">General Information</h4>
                      <dl className="space-y-4 text-sm sm:text-base">
                        <div className="flex grid grid-cols-3">
                          <dt className="font-medium text-gray-500">Brand</dt>
                          <dd className="text-gray-900 col-span-2 font-medium">{product.brand || "N/A"}</dd>
                        </div>
                        <div className="flex grid grid-cols-3">
                          <dt className="font-medium text-gray-500">SKU</dt>
                          <dd className="text-gray-900 col-span-2">{product.sku || "N/A"}</dd>
                        </div>
                        <div className="flex grid grid-cols-3">
                          <dt className="font-medium text-gray-500">Category</dt>
                          <dd className="text-gray-900 col-span-2 capitalize">{product.category || "N/A"}</dd>
                        </div>
                        <div className="flex grid grid-cols-3">
                          <dt className="font-medium text-gray-500">Weight</dt>
                          <dd className="text-gray-900 col-span-2">{product.weight || "N/A"}</dd>
                        </div>
                      </dl>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">Product Details</h4>
                      <dl className="space-y-4 text-sm sm:text-base">
                        <div className="flex grid grid-cols-3">
                          <dt className="font-medium text-gray-500">Material</dt>
                          <dd className="text-gray-900 col-span-2">{product.material || "N/A"}</dd>
                        </div>
                        <div className="flex grid grid-cols-3">
                          <dt className="font-medium text-gray-500">Warranty</dt>
                          <dd className="text-gray-900 col-span-2">{product.warranty || "Standard 1 Year"}</dd>
                        </div>
                        <div className="flex grid grid-cols-3">
                          <dt className="font-medium text-gray-500">Origin</dt>
                          <dd className="text-gray-900 col-span-2">{product.countryOfOrigin || "N/A"}</dd>
                        </div>
                        <div className="flex grid grid-cols-3">
                          <dt className="font-medium text-gray-500">Dimensions</dt>
                          <dd className="text-gray-900 col-span-2">{product.dimensions || "N/A"}</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Suggested Products */}
        {suggested.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 border-t border-gray-200 pt-16"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">You May Also Like</h2>
              <Link to={`/shop?category=${product.category}`} className="text-blue-600 font-semibold hover:underline hidden sm:block">View All</Link>
            </div>
            <div className="suggested-slider-container -mx-4">
              <Slider {...sliderSettings}>
                {suggested.map((item) => (
                  <div key={item.id} className="px-4 pb-8">
                    <ProductCard item={item} />
                  </div>
                ))}
              </Slider>
            </div>
          </motion.div>
        )}
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
        .suggested-slider-container .slick-track {
            display: flex !important;
            gap: 1rem;
        }
        .suggested-slider-container .slick-slide {
            height: inherit !important;
            margin-bottom: 2rem;
        }
        .suggested-slider-container .slick-slide > div {
            height: 100%;
        }
        .suggested-slider-container .slick-dots {
            bottom: -25px;
        }
        .suggested-slider-container .slick-dots li button:before {
            color: #d1d5db;
            font-size: 10px;
        }
        .suggested-slider-container .slick-dots li.slick-active button:before {
            color: #3b82f6;
        }
      `}</style>
    </div>
  );
};

export default ProductDetails;
