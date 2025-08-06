import React from "react";
import { MoveRight, Heart, Trash2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import useWishlistStore from "../components/Store/wishlistStore";
import useCartStore from "../components/Store/cartStore";
import toast from "react-hot-toast";

const WishlistPage = () => {
  const navigate = useNavigate();
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlistStore();
  const { addToCart } = useCartStore();

  const handleAddToCart = (product) => {
    const cartProduct = {
      id: product.id,
      title: product.title,
      price: product.discountPrice || product.price,
      imageUrl: product.imageUrl,
      size: product.size,
      quantity: 1,
    };
    addToCart(cartProduct);
    toast.success("Added to cart!");
  };

  return (
    <div className="min-h-screen bg-[#f5f0ea] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex products-center text-[#74541e] mb-6 hover:underline"
        >
          <ArrowLeft className="mr-2" size={20} />
          Back to Gallery
        </button>

        <div className="flex justify-between products-center mb-8">
          <h1 className="text-3xl font-serif text-[#74541e]">
            Your Wishlist{" "}
            <Heart className="inline ml-2" size={24} fill="#C47E20" />
          </h1>
          {wishlist.length > 0 && (
            <button
              onClick={clearWishlist}
              className="text-sm text-[#74541e] hover:underline flex products-center"
            >
              Clear All <Trash2 className="ml-2" size={16} />
            </button>
          )}
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="mx-auto mb-4 text-[#C47E20]" size={48} />
            <h2 className="text-2xl font-serif text-[#74541e] mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-black mb-6">
              Save your favorite artworks by clicking the heart icon
            </p>
            <button
              onClick={() => navigate("/gallery")}
              className="px-6 py-3 bg-[#74541e] text-white rounded hover:bg-[#5a4218] transition-colors flex products-center mx-auto"
            >
              Browse Gallery <MoveRight className="ml-2" size={18} />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlist.map((product) => {
              console.log("Rendering product:", product); // ✅ Your debug log
              console.log("Product imageUrl", product.imageUrl);
              return (
                <div
                  key={product.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      className="absolute top-3 right-3 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
                      aria-label="Remove from wishlist"
                    >
                      <Heart
                        size={20}
                        className="text-[#C47E20]"
                        fill="#C47E20"
                      />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-medium text-gray-800">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {product.medium} • {product.year}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{product.size}</p>
                    <div className="mt-3">
                      {product.discountPrice ? (
                        <div className="flex products-center gap-2">
                          <span className="text-lg font-bold text-[#74541e]">
                            ₦{Number(product.discountPrice || 0).toFixed(2)}
                          </span>
                          <span className="text-sm text-gray-400 line-through">
                            ₦{Number(product.price || 0).toFixed(2)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-lg font-bold text-[#74541e]">
                          ₦{Number(product.price || 0).toFixed(2)}
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="flex-1 py-2 bg-[#74541e] text-white rounded hover:bg-[#5a421e] transition-colors flex products-center justify-center"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
