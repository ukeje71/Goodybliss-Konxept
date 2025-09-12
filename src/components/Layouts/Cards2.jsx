import React from "react";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router";
import useWishlistStore from "../Store/wishlistStore";
import useCartStore from "../Store/cartStore";
import toast from "react-hot-toast";

const Cards2 = ({
  id,
  title,
  imageUrl,
  discountPrice,
  price,        // 👈 get from Firestore
  size,
  year,
  medium,
  stock,        // 👈 boolean
  ...product
}) => {
  // Normalize prices
  const parsedRegularPrice = Number(price) || 0;  
  const parsedDiscountPrice = discountPrice ? Number(discountPrice) : null;

  // Stock is already a boolean in Firestore
  const isInStock = Boolean(stock);

  console.log("Cards2 props:", {
    id,
    title,
    price,
    parsedRegularPrice,
    discountPrice,
    parsedDiscountPrice,
    stock,
    isInStock
  });

  const discountPercent =
    parsedDiscountPrice && parsedRegularPrice > 0
      ? Math.round(
          ((parsedRegularPrice - parsedDiscountPrice) / parsedRegularPrice) * 100
        )
      : 0;

  const navigate = useNavigate();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlistStore();
  const { addToCart } = useCartStore();

  // Add to cart handler
  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!isInStock) {
      toast.error("This item is out of stock");
      return;
    }
    addToCart({
      id,
      title,
      imageUrl,
      price: parsedDiscountPrice || parsedRegularPrice,
      size,
      year,
      medium,
      stock: isInStock,
      ...product,
    });
    toast.success("Added to Cart");
  };

  // Wishlist toggle
  const isInWishlist = wishlist.some((item) => item && item.id === id);

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    if (isInWishlist) {
      removeFromWishlist(id);
      toast.error("Removed from Wishlist");
    } else {
      addToWishlist({
        id,
        title,
        imageUrl,
        price: parsedDiscountPrice || parsedRegularPrice,
        size,
        year,
        medium,
        stock: isInStock,
        ...product,
      });
      toast.success("Added to Wishlist");
    }
  };

  return (
    <div
      key={id}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
      onClick={() => navigate(`/products/${id}`)}
    >
      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title || "Artwork"}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/placeholder.jpg";
            }}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Image not available</span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 left-3 p-2 rounded-full bg-white/80 hover:bg-white transition-colors z-10"
        >
          <Heart
            size={20}
            className={
              isInWishlist
                ? "text-[#74541e] fill-[#74541e]"
                : "text-gray-400 hover:text-[#74541e]"
            }
          />
        </button>

        {parsedDiscountPrice && (
          <div className="absolute top-3 right-3 bg-[#aa9f8f] text-white text-xs font-medium px-2 py-1 rounded-full">
            On Sale
          </div>
        )}

        {!isInStock && (
          <div className="absolute top-3 right-3 bg-gray-600 text-white text-xs font-medium px-2 py-1 rounded-full">
            Sold Out
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4">
        <h3 className="text-xl font-medium text-gray-800">{title || "Untitled"}</h3>
        <p className="text-sm text-gray-600 mt-1">
          {[medium, year].filter(Boolean).join(" • ")}
        </p>
        {size && <p className="text-xs text-gray-500 mt-1">{size}</p>}

        {/* Price */}
        <div className="mb-4">
          {parsedDiscountPrice ? (
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-[#74541e]">
                ${parsedDiscountPrice.toFixed(2)}
              </span>
              <span className="text-sm text-gray-400 line-through">
                ${parsedRegularPrice.toFixed(2)}
              </span>
              {discountPercent > 0 && (
                <span className="ml-auto text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">
                  {discountPercent}% OFF
                </span>
              )}
            </div>
          ) : (
            <span className="text-lg font-bold text-[#74541e]">
              ${parsedRegularPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/products/${id}`);
            }}
            className="flex-1 py-2 text-sm border border-[#d4c9b5] text-[#74541e] rounded hover:bg-[#f0e9dd] transition-colors"
          >
            View Details
          </button>
          <button
            onClick={handleAddToCart}
            className={`flex-1 py-2 text-sm rounded transition-colors ${
              isInStock
                ? "bg-[#74541e] text-white hover:bg-[#5a4218]"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!isInStock}
          >
            {isInStock ? "Add to Cart" : "Sold Out"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards2;