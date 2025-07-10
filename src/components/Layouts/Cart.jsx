import { ShoppingBag, X } from "lucide-react";
import { Link } from "react-router";
import useCartStore from "../Store/cartStore";

const Cart = ({ isOpen, onClose }) => {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    // removeFromCart,
    getTotalPrice,
    getTotalItems,
    // clearCart,
  } = useCartStore();

  return (
    <div
      className={`fixed inset-y-0 right-0 w-full md:w-72 lg:w-96 bg-white/80 backdrop-blur-md transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out z-50 border-l border-[#846C3B]`}
    >
      <div className="p-4 flex justify-between items-center border-b border-[#846C3B] bg-white/30">
        <h2 className="text-lg font-medium text-[#846C3B]">
          Your Cart ({getTotalItems()})
        </h2>
        <button
          onClick={onClose}
          className="text-[#846C3B] hover:text-amber-800 transition-colors"
          aria-label="Close cart"
        >
          <X size={28} />
        </button>
      </div>

      <div className="p-4 h-[calc(100vh-130px)] overflow-y-auto">
        {cartItems.length > 0 ? (
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex gap-3 py-3 border-b border-[#846C3B]/20"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-[#846C3B] font-medium">{item.title}</h3>
                  <p className="text-sm text-[#846C3B]/80">{item.size}</p>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-[#74541e] font-medium">
                      ${item.price.toFixed(2)}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="text-xs px-1.5 border rounded hover:bg-gray-100"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="text-sm">{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="text-xs px-1.5 border rounded hover:bg-gray-100"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-[#846C3B]/60">
            <ShoppingBag size={48} className="mb-4 opacity-40" />
            <p>Your cart is empty</p>
            <button
              className="mt-4 px-4 py-2 bg-[#C47E20] text-white rounded-md hover:bg-[#a56d1a] transition-colors"
              onClick={onClose}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#846C3B] bg-white/80">
          <div className="flex justify-between mb-4">
            <span className="text-[#846C3B]">Subtotal</span>
            <span className="text-[#74541e] font-medium">
              ${getTotalPrice().toFixed(2)}
            </span>
          </div>
          <Link
            to="/checkout"
            onClick={onClose}
            className="block w-full py-2 bg-[#74541e] text-white text-center rounded-md hover:bg-[#5a4218] transition-colors"
          >
            Checkout
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;