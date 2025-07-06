import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import React, { useState } from "react";
import Marquee from "react-fast-marquee";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Static data
  const announcements = [
    "Free shipping on all prints!",
    "Limited-time offer: 20% off with code ARTLOVE20",
    "New collection dropping soon — stay tuned!",
    "Worldwide shipping available",
    "Sign up for exclusive early access",
  ];

  const menuItems = [
    "Art Classes",
    "ORIGINAL MOVING SALE 📦",
    "Shop By Collection",
    "Fine Art Prints",
    "Canvas Prints",
    "Tapestries",
    "Originals",
    "About",
    "Log in",
  ];

  // Static cart data
  const cartItems = [
    {
      id: 1,
      title: "Ephemeral Dreams",
      price: 1200,
      size: "24 × 36 in",
      quantity: 1,
      image: "../assets/Images/abstract.jpeg",
    },
    {
      id: 2,
      title: "Chromatic Harmony",
      price: 950,
      size: "18 × 24 in",
      quantity: 1,
      image: "../assets/Images/fine-art.jpeg",
    },
  ];

  // Static calculations
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <div className="relative">
      {/* Announcement Marquee */}
      <Marquee
        speed={40}
        gradient={false}
        pauseOnHover={true}
        className="overflow-hidden bg-[#C47E20] text-amber-50 p-2 Cormorant"
      >
        {announcements.map((text, index) => (
          <span key={index} className="mx-8 flex items-center text-sm">
            {text}
            {index !== announcements.length - 1 && (
              <span className="mx-4 text-amber-200">•</span>
            )}
          </span>
        ))}
      </Marquee>

      {/* Main Header */}
      <div className="flex justify-between items-center p-4 text-[#C47E20] bg-white shadow-md">
        <span className="flex flex-row gap-4">
          <button onClick={() => setIsMenuOpen(true)}>
            <Menu />
          </button>
          <Search />
        </span>
        <h1 className="Parisienne md:text-3xl">Goodybliss Konxept</h1>
        <span className="flex flex-row gap-4 relative">
          <User />
          <button onClick={() => setIsCartOpen(true)} className="relative">
            <ShoppingBag />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#C47E20] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
        </span>
      </div>

      {/* ===== LEFT MENU ===== */}
      <div
        className={`fixed inset-y-0 left-0 w-72 bg-white/80 backdrop-blur-md transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 border-r border-[#846C3B]`}
      >
        <div className="p-4 flex justify-end items-center border-b border-[#846C3B] bg-white/30">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-[#846C3B] hover:text-amber-800 transition-colors"
          >
            <X size={28} />
          </button>
        </div>

        <nav className="p-4 h-[calc(100vh-65px)] overflow-y-auto">
          <ul className="space-y-3">
            {menuItems.map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className="block py-3 px-3 text-[#846C3B] hover:text-amber-800 hover:bg-white/30 rounded-md transition-colors border-b border-[#846C3B]/20"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* ===== RIGHT CART ===== */}
      <div
        className={`fixed inset-y-0 right-0 w-full md:w-72 lg:w-96 bg-white/80 backdrop-blur-md transform ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 border-l border-[#846C3B]`}
      >
        <div className="p-4 flex justify-between items-center border-b border-[#846C3B] bg-white/30">
          <h2 className="text-lg font-medium text-[#846C3B]">
            Your Cart ({itemCount})
          </h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-[#846C3B] hover:text-amber-800 transition-colors"
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
                    {/* Replace with your actual Image component */}
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
                      <span className="text-[#C47E20] font-medium">
                        ${item.price.toFixed(2)}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          className="text-xs px-1.5 border rounded hover:bg-gray-100"
                          onClick={() => {}}
                        >
                          -
                        </button>
                        <span className="text-sm">{item.quantity}</span>
                        <button
                          className="text-xs px-1.5 border rounded hover:bg-gray-100"
                          onClick={() => {}}
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
                onClick={() => setIsCartOpen(false)}
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
              <span className="text-[#C47E20] font-medium">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <button className="w-full py-2 bg-[#C47E20] text-white rounded-md hover:bg-[#a56d1a] transition-colors">
              Checkout
            </button>
          </div>
        )}
      </div>

      {/* Overlays */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setIsCartOpen(false)}
        />
      )}
    </div>
  );
};

export default Header;
