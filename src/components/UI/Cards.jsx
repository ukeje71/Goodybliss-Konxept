import React from "react";
import { product } from "../../data/product";
import useCartStore from "../Store/cartStore";
import useWishlistStore from "../Store/wishlistStore";
import toast from "react-hot-toast";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router";

const Cards = ({
  stockFilter = "all",
  sortBy = "alphabetical",
  currentPage = 1,
  photosPerPage = 24,
}) => {
  // Safe data handling
  const safeProducts = product || [];
  //
  const navigate = useNavigate();
  // Cart functionality
  const { addToCart } = useCartStore();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlistStore();

  // Handle add to cart with proper product structure
  const handleAddToCart = (product) => {
    const cartProduct = {
      id: product.id,
      title: product.title,
      price: product.discountPrice || product.regularPrice,
      image: product.image,
      size: product.size,
      quantity: 1,
    };
    addToCart(cartProduct);
    toast.success("Item added to cart!");
  };
  // Add this new function for wishlist toggle
  const handleWishlistToggle = (product, e) => {
    e.stopPropagation();
    const isInWishlist = wishlist.some((item) => item.id === product.id);

    if (isInWishlist) {
      removeFromWishlist(product.id);
      toast.success("Removed from wishlist");
    } else {
      addToWishlist({
        id: product.id,
        title: product.title,
        price: product.discountPrice || product.regularPrice,
        image: product.image,
        size: product.size,
      });
      toast.success(
        (t) => (
          <span>
            Added to wishlist!{" "}
            <button
              onClick={() => {
                // Assuming you're using React Router
                navigate("/wishlist");
                toast.dismiss(t.id);
              }}
              className="font-bold underline hover:text-blue-600"
            >
              View Wishlist
            </button>
          </span>
        ),
        { duration: 4000 } // Optional: extend duration
      );
    }
  };
  // 1. Filter products with fallbacks
  const filteredProducts = safeProducts.filter((item) => {
    if (!item || typeof item !== "object") return false;

    if (stockFilter === "all") return true;
    if (stockFilter === "in-stock") return item.inStock !== false;
    if (stockFilter === "out-of-stock") return item.inStock === false;
    return item.category === stockFilter;
  });

  // 2. Sort products with protection
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    try {
      const priceA = a.discountPrice ?? a.regularPrice ?? 0;
      const priceB = b.discountPrice ?? b.regularPrice ?? 0;

      switch (sortBy) {
        case "alphabetical":
          return (a.title || "").localeCompare(b.title || "");
        case "price-low-high":
          return priceA - priceB;
        case "price-high-low":
          return priceB - priceA;
        case "date-new-old":
          return new Date(b.year || 0) - new Date(a.year || 0);
        case "date-old-new":
          return new Date(a.year || 0) - new Date(b.year || 0);
        default:
          return 0;
      }
    } catch {
      return 0;
    }
  });

  // 3. Paginate with bounds checking
  const startIndex = Math.max(0, (currentPage - 1) * photosPerPage);
  const endIndex = Math.min(startIndex + photosPerPage, sortedProducts.length);
  const productsToShow = sortedProducts.slice(startIndex, endIndex);

  if (productsToShow.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">
          No products found matching your criteria
        </p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {productsToShow.map((item) => {
        const discountPercent = item.discountPrice
          ? Math.round(
              ((item.regularPrice - item.discountPrice) / item.regularPrice) *
                100
            )
          : 0;
        const isInWishlist = wishlist.some(
          (wishlistItem) => wishlistItem.id === item.id
        );
        return (
          <div
            key={item.id}
            className="border border-[#e8e2d6] rounded-lg overflow-hidden bg-white hover:shadow-md transition-all"
          >
            {/* Image with error fallback */}
            <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title || "Artwork"}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "path/to/placeholder-image.jpg";
                  }}
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Image not available</span>
                </div>
              )}

              {/* Heart icon (non-interactive) */}
              <button
                onClick={(e) => handleWishlistToggle(item, e)}
                className="absolute top-3 left-3 p-2 rounded-full bg-white/80"
              >
                <Heart
                  size={20}
                  className={
                    isInWishlist ? "text-[#74541e] fill-[#74541e]" : "text-gray-400"
                  }
                />
              </button>

              {item.discountPrice && (
                <div className="absolute top-3 right-3 bg-[#aa9f8f] text-white text-xs font-medium px-2 py-1 rounded-full">
                  On Sale
                </div>
              )}

              {item.inStock === false && (
                <div className="absolute top-3 right-3 bg-gray-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                  Sold Out
                </div>
              )}
            </div>

            {/* Product info */}
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-800 mb-1">
                {item.title || "Untitled"}
              </h3>
              <p className="text-sm text-gray-600 mb-1">
                {[item.medium, item.year].filter(Boolean).join(" • ")}
              </p>
              {item.size && (
                <p className="text-xs text-gray-500 mb-3">{item.size}</p>
              )}

              {/* Price */}
              <div className="mb-4">
                {item.discountPrice ? (
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-[#74541e]">
                      ${item.discountPrice.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      ${item.regularPrice?.toFixed(2)}
                    </span>
                    {discountPercent > 0 && (
                      <span className="ml-auto text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">
                        {discountPercent}% OFF
                      </span>
                    )}
                  </div>
                ) : (
                  <span className="text-lg font-bold text-[#74541e]">
                    ${item.regularPrice?.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-2">
                <button className="flex-1 py-2 text-sm border border-[#d4c9b5] text-[#74541e] rounded hover:bg-[#f0e9dd] transition-colors">
                  View Details
                </button>
                <button
                  onClick={() => item.inStock && handleAddToCart(item)}
                  className={`flex-1 py-2 text-sm rounded transition-colors ${
                    item.inStock
                      ? "bg-[#74541e] text-white rounded hover:bg-[#5a4218]"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                  disabled={item.inStock === false}
                >
                  {item.inStock ? "Add to Cart" : "Sold Out"}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
