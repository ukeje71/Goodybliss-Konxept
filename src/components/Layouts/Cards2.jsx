import React from "react";
import { Heart, MoveRight } from "lucide-react";
import { useNavigate } from "react-router";
import useWishlistStore from "../Store/wishlistStore";
const Cards2 = ({
  id,
  title,
  imageUrl,
  discountPrice,
  size,
  year,
  medium,
  inStock,
  regularPrice,
}) => {
  // Cart functionality
  const discountPercent = discountPrice
    ? Math.round(((regularPrice - discountPrice) / regularPrice) * 100)
    : 0;
  // Routing
  const navigate = useNavigate();
  const {addToWishlist}= useWishlistStore();
  return (
    <div
      key={id}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
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
              e.target.src = "path/to/placeholder-imageUrl.jpg";
            }}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">ImageUrl not available</span>
          </div>
        )}
        {/* Heart icon (non-interactive) */}
        <button className="absolute top-3 left-3 p-2 rounded-full bg-white/80">
          <Heart size={20} onClick={() => addToWishlist()} />
        </button>
        {discountPrice && (
          <div className="absolute top-3 right-3 bg-[#aa9f8f] text-white text-xs font-medium px-2 py-1 rounded-full">
            On Sale
          </div>
        )}

        {inStock === false && (
          <div className="absolute top-3 right-3 bg-gray-600 text-white text-xs font-medium px-2 py-1 rounded-full">
            Sold Out
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-xl font-medium text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">
          {medium} • {year}
        </p>
        <p className="text-xs text-gray-500 mt-1">{size}</p>

        {/* Price */}
        <div className="mb-4">
          {discountPrice ? (
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-[#74541e]">
                ${discountPrice.toFixed(2)}
              </span>
              <span className="text-sm text-gray-400 line-through">
                ${regularPrice?.toFixed(2)}
              </span>
              {discountPercent > 0 && (
                <span className="ml-auto text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">
                  {discountPercent}% OFF
                </span>
              )}
            </div>
          ) : (
            <span className="text-lg font-bold text-[#74541e]">
              ${regularPrice?.toFixed(2)}
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
            // onClick={() => inStock && addToCart()}
            className={`flex-1 py-2 text-sm rounded transition-colors ${
              inStock
                ? "bg-[#74541e] text-white rounded hover:bg-[#5a4218]"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={inStock === false}
          >
            {inStock ? "Add to Cart" : "Sold Out"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards2;
