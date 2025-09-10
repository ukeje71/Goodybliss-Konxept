import React, { useEffect, useState } from "react";
import useCartStore from "../Store/cartStore";
import useWishlistStore from "../Store/wishlistStore";
import toast from "react-hot-toast";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router";
import { db } from "../Firebase";
import { collection, getDocs } from "firebase/firestore";
import useDetailsStore from "../Store/Details";

const Cards = ({
  stockFilter = "all",
  sortBy = "alphabetical",
  currentPage = 1,
  photosPerPage = 24,
}) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { addToCart } = useCartStore();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlistStore();

  // Default image URL for fallback
  const DEFAULT_IMAGE_URL = "https://via.placeholder.com/300x200"; // Use the same placeholder as in onError

  // Fetch Firestore products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Fetched products:", productsArray); // Debug log
        setProducts(productsArray);
        useDetailsStore.getState().setProducts(productsArray);
      } catch (error) {
        console.error("Failed to fetch products from Firestore:", error);
        toast.error("Failed to load products");
      }
    };

    fetchProducts();
  }, []);

  // Filter, sort, paginate
  const safeProducts = products || [];

  const filteredProducts = safeProducts.filter((item) => {
    if (!item || typeof item !== "object") return false;
    if (stockFilter === "all") return true;
    if (stockFilter === "in-stock") return item.stock !== false;
    if (stockFilter === "out-of-stock") return item.stock === false;
    return item.category === stockFilter;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
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
  });

  const startIndex = Math.max(0, (currentPage - 1) * photosPerPage);
  const endIndex = Math.min(startIndex + photosPerPage, sortedProducts.length);
  const productsToShow = sortedProducts.slice(startIndex, endIndex);

  const handleAddToCart = (product) => {
    const cartProduct = {
      id: product.id,
      title: product.title,
      price: product.discountPrice || product.regularPrice,
      imageUrl: product.imageUrl && typeof product.imageUrl === 'string' && product.imageUrl.trim() !== ''
        ? product.imageUrl
        : DEFAULT_IMAGE_URL, // Use default if imageUrl is invalid
      size: product.size,
      quantity: 1,
    };
    console.log("Adding to cart:", cartProduct); // Debug log
    addToCart(cartProduct);
    toast.success("Item added to cart!");
  };

  const handleWishlistToggle = (product, e) => {
    e.stopPropagation();
    const isInWishlist = wishlist.some((item) => item.id === product.id);
    if (isInWishlist) {
      removeFromWishlist(product.id);
      toast.error("Removed from wishlist");
    } else {
      const wishlistProduct = {
        id: product.id,
        title: product.title,
        price: product.discountPrice || product.regularPrice,
        imageUrl: product.imageUrl || DEFAULT_IMAGE_URL,
        size: product.size,
        year: product.year,
        medium: product.medium,
        stock: product.stock,
      };
      addToWishlist(wishlistProduct);
      toast.success(
        (t) => (
          <span>
            Added to wishlist!
            <button
              onClick={() => {
                navigate("/wishlist");
                toast.dismiss(t.id);
              }}
              className="font-bold underline hover:text-blue-600"
            >
              View Wishlist
            </button>
          </span>
        ),
        { duration: 4000 }
      );
    }
  };

  if (productsToShow.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Trying to Connect ....</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {productsToShow.map((item) => {
        const discountPercent = item.discountPrice
          ? Math.round(
              ((item.regularPrice - item.discountPrice) / item.regularPrice) * 100
            )
          : 0;
        const isInWishlist = wishlist.some(
          (wishlistItem) => wishlistItem && wishlistItem.id === item.id
        );

        return (
          <div
            key={item.id}
            className="border border-[#e8e2d6] rounded-lg overflow-hidden bg-white hover:shadow-md transition-all cursor-pointer"
            onClick={() => navigate(`/products/${item.id}`)}
          >
            <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={item.title || "Artwork"}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = DEFAULT_IMAGE_URL;
                  }}
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Image not available</span>
                </div>
              )}

              <button
                onClick={(e) => handleWishlistToggle(item, e)}
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

              {item.discountPrice && (
                <div className="absolute top-3 right-3 bg-[#aa9f8f] text-white text-xs font-medium px-2 py-1 rounded-full">
                  On Sale
                </div>
              )}
              {item.stock === false && (
                <div className="absolute top-3 right-3 bg-gray-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                  Sold Out
                </div>
              )}
            </div>

            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-800 mb-1 line-clamp-1">
                {item.title || "Untitled"}
              </h3>
              <p className="text-sm text-gray-600 mb-1 line-clamp-1">
                {[item.medium, item.year].filter(Boolean).join(" • ")}
              </p>
              {item.size && (
                <p className="text-xs text-gray-500 mb-3">{item.size}</p>
              )}
              <div className="mb-4">
                {item.discountPrice ? (
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-[#74541e]">
                      ${Number(item.discountPrice).toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      ${Number(item.regularPrice).toFixed(2)}
                    </span>
                    {discountPercent > 0 && (
                      <span className="ml-auto text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">
                        {discountPercent}% OFF
                      </span>
                    )}
                  </div>
                ) : (
                  <span className="text-lg font-bold text-[#74541e]">
                    ${Number(item.regularPrice).toFixed(2)}
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/products/${item.id}`);
                  }}
                  className="flex-1 py-2 text-sm border border-[#d4c9b5] text-[#74541e] rounded hover:bg-[#f0e9dd] transition-colors"
                >
                  View Details
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    item.stock && handleAddToCart(item);
                  }}
                  className={`flex-1 py-2 text-sm rounded transition-colors ${
                    item.stock
                      ? "bg-[#74541e] text-white hover:bg-[#5a4218]"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                  disabled={item.stock === false}
                >
                  {item.stock ? "Add to Cart" : "Sold Out"}
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