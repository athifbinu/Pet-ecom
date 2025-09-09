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
} from "lucide-react";
import { useDispatch } from "react-redux";
import { cartActions } from "../Redux/Slices/CartSlice";
import Swal from "sweetalert2";
import { supabase } from "../components/supabase/supabaseClient";
import ProductCard from "../components/Ui/ProductCard";
import Slider from "react-slick";
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

  const dispatch = useDispatch();

  // ✅ Stop flicker: if no product, show loader instead of redirecting instantly
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  // ✅ Add to cart with SweetAlert
  const addToCart = () => {
    dispatch(cartActions.addItem({ ...product, quantity }));
    Swal.fire({
      title: "🎉 Added to Cart!",
      text: `${product.name} has been added successfully.`,
      icon: "success",
      confirmButtonText: "OK",
      background: "#f9fafb",
      confirmButtonColor: "#2563eb",
      customClass: { popup: "rounded-xl shadow-lg" },
      timer: 2000,
      timerProgressBar: true,
    });
  };

  const handleQuantityChange = (delta) => {
    const newQty = quantity + delta;
    if (newQty >= 1 && newQty <= 10) setQuantity(newQty);
  };

  // ✅ Star rating renderer
  const renderStars = (rating, interactive = false, size = 20) => {
    return [...Array(5)].map((_, i) => (
      <button
        key={i}
        onClick={interactive ? () => setUserRating(i + 1) : undefined}
        className={`${
          interactive ? "cursor-pointer hover:scale-110" : "cursor-default"
        } transition-transform`}
        disabled={!interactive}
      >
        <Star
          size={size}
          className={`${
            i < Math.floor(rating)
              ? "text-yellow-400 fill-yellow-400"
              : i < rating
              ? "text-yellow-400 fill-yellow-200"
              : "text-gray-300"
          }`}
        />
      </button>
    ));
  };

  // ✅ Fetch Suggested Products
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

  // ✅ Slider settings (mobile-friendly, no flicker)
  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden pt-[4rem]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-gray-600 space-x-2 mb-6">
          <span>Home</span>
          <ChevronRight size={16} />
          <span>{product.category}</span>
          <ChevronRight size={16} />
          <span className="text-gray-900 font-medium">{product.name}</span>
        </nav>

        {/* Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image */}
          <div>
            <img
              src={product.image_url || product.images?.[0]}
              alt={product.name}
              className="rounded-2xl object-cover w-full aspect-[4/5]" // ✅ fixed aspect ratio
            />
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-sm text-blue-600 font-medium">
                {product.brand || "Unknown Brand"}
              </span>
              <div className="flex space-x-2">
                <Link to="">
                  <button className="p-2 rounded-full hover:bg-gray-100">
                    <Heart
                      className={
                        isWishlisted
                          ? "text-red-500 fill-red-500"
                          : "text-gray-400"
                      }
                      size={20}
                    />
                  </button>
                </Link>
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <Share2 className="text-gray-400" size={20} />
                </button>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

            <div className="flex items-center space-x-2">
              {renderStars(product.rating || 4.5)}
              <span className="text-sm text-gray-600 ml-2">
                {product.rating || 4.5} ({product.reviewCount || 20} reviews)
              </span>
            </div>

            <div className="flex items-center space-x-3 text-2xl font-bold text-gray-900">
              ₹{product.price}
              {product.originalPrice && (
                <>
                  <span className="text-lg text-gray-500 line-through">
                    ₹{product.originalPrice}
                  </span>
                  <span className="bg-red-100 text-red-800 text-sm px-2 py-1 rounded">
                    Save ₹{product.originalPrice - product.price}
                  </span>
                </>
              )}
            </div>

            <p className="text-gray-600">{product.description}</p>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="bg-gray-200 px-3 py-1 rounded text-lg"
              >
                -
              </button>
              <span className="text-lg font-medium">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="bg-gray-200 px-3 py-1 rounded text-lg"
              >
                +
              </button>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                onClick={addToCart}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} /> Add to Cart
              </button>
              <button
                onClick={() =>
                  navigate("/checkout", {
                    state: { product: { ...product, quantity } },
                  })
                }
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg flex items-center justify-center gap-2"
              >
                <CreditCard size={20} /> Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Tab Section */}
        <div className="bg-white rounded-xl shadow-md">
          <nav className="flex flex-wrap border-b">
            {[
              { key: "description", label: "Description", icon: Package },
              { key: "reviews", label: "Reviews", icon: Star },
              { key: "specifications", label: "Specifications", icon: Clock },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveSection(key)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition duration-200 ${
                  activeSection === key
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-600 hover:text-blue-500"
                }`}
              >
                <Icon size={18} />
                {label}
              </button>
            ))}
          </nav>

          <div className="p-4 sm:p-6">
            {activeSection === "description" && (
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                {product.description}
              </p>
            )}

            {activeSection === "reviews" && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
                <div className="mb-4">{renderStars(userRating, true, 24)}</div>
                <textarea
                  className="w-full border border-gray-300 rounded p-3 mb-4 text-sm"
                  rows="4"
                  placeholder="Share your experience..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded text-sm">
                  Submit Review
                </button>
              </div>
            )}

            {activeSection === "specifications" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-gray-700 text-sm sm:text-base">
                <div>
                  <h4 className="font-semibold mb-3">General</h4>
                  <ul className="space-y-1">
                    <li>
                      <strong>Brand:</strong> {product.brand}
                    </li>
                    <li>
                      <strong>SKU:</strong> {product.sku}
                    </li>
                    <li>
                      <strong>Weight:</strong> {product.weight}
                    </li>
                    <li>
                      <strong>Dimensions:</strong> {product.dimensions}
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Manufacturing</h4>
                  <ul className="space-y-1">
                    <li>
                      <strong>Material:</strong> {product.material}
                    </li>
                    <li>
                      <strong>Warranty:</strong> {product.warranty}
                    </li>
                    <li>
                      <strong>Origin:</strong> {product.countryOfOrigin}
                    </li>
                    <li>
                      <strong>Manufacturer:</strong> {product.manufacturer}
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Suggested Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Suggested Products</h2>
          {suggested.length > 0 ? (
            <Slider {...sliderSettings}>
              {suggested.map((item) => (
                <div key={item.id} className="px-2">
                  <ProductCard item={item} />
                </div>
              ))}
            </Slider>
          ) : (
            <p className="text-gray-500">No suggested products available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
