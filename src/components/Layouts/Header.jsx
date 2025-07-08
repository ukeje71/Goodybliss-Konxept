import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";
import { Link } from "react-router";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showHeader, setShowHeader] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Scroll event handler
  useEffect(() => {
    const handleScroll = () => {
      if (isMobile) return;

      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setShowHeader(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setShowHeader(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isMobile]);

  // Check mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isSearchOpen && !event.target.closest(".search-container")) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSearchOpen]);

  // Static data
  const announcements = [
    "Free shipping on all prints!",
    "Limited-time offer: 20% off with code ARTLOVE20",
    "New collection dropping soon — stay tuned!",
    "Worldwide shipping available",
    "Sign up for exclusive early access",
  ];

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Art Classes", path: "/art-classes" },
    { name: "ORIGINAL MOVING SALE 📦", path: "/moving-sale" },
    { name: "Shop By Collection", path: "/collections" },
    { name: "Fine Art Prints", path: "/gallery" },
    { name: "Canvas Prints", path: "/gallery" },
    { name: "Originals", path: "/gallery" },
    { name: "About", path: "/about" },
    { name: "Log in", path: "/login" },
  ];

  const searchCategories = [
    "All Collections",
    "Original Paintings",
    "Limited Edition Prints",
    "Art Classes",
    "Gift Cards",
    "Sale Items",
  ];

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

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <div className="relative">
      {/* Announcement Marquee - Always visible */}
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

      {/* Main Header - Now scroll aware */}
      <div
        className={`fixe top-0  left-0 right-0 z-30 transition-transform duration-300 ${
          showHeader || isMobile
            ? "translate-y-0 shadow-md"
            : "-translate-y-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 text-[#74541e] bg-white">
          <div className="flex flex-row gap-4">
            <button
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
              className="hover:text-amber-800 transition-colors"
            >
              <Menu />
            </button>
            {/* Search with dropdown */}
            <div className="relative search-container">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                aria-label="Search"
                className="p-2 rounded-full hover:bg-amber-50 transition-colors"
              >
                <Search className="text-amber-800 w-5 h-5" />
              </button>

              {isSearchOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-lg shadow-xl z-40 border border-amber-100 overflow-hidden">
                  <div className="p-4 border-b border-amber-100">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search artworks, collections..."
                        className="w-full pl-10 pr-4 py-2 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-300"
                      />
                      <Search className="absolute left-3 top-2.5 text-amber-400 w-4 h-4" />
                    </div>
                  </div>
                  <div className="py-2">
                    <h3 className="px-4 py-2 text-xs font-semibold text-amber-600 uppercase tracking-wider">
                      Popular Searches
                    </h3>
                    <ul>
                      {searchCategories.map((category, index) => (
                        <li key={index}>
                          <button className="w-full text-left px-4 py-2 hover:bg-amber-50 transition-colors text-amber-800">
                            {category}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>

          <Link
            to="/"
            className="Parisienne md:text-3xl hover:text-amber-800 transition-colors"
            aria-label="Home"
          >
            Goodybliss Konxept
          </Link>

          <div className="flex flex-row gap-4 relative">
            <Link
              to="/login"
              aria-label="login"
              className="hover:text-amber-800 transition-colors"
            >
              <User />
            </Link>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative hover:text-amber-800 transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C47E20] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-y-0 left-0 w-72 bg-white/80 backdrop-blur-md transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 border-r border-[#846C3B]`}
      >
        <div className="p-4 flex justify-end items-center border-b border-[#846C3B] bg-white/30">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-[#846C3B] hover:text-amber-800 transition-colors"
            aria-label="Close menu"
          >
            <X size={28} />
          </button>
        </div>

        <nav className="p-4 h-[calc(100vh-65px)] overflow-y-auto">
          <ul className="space-y-3">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-3 px-3 text-[#846C3B] hover:text-amber-800 hover:bg-white/30 rounded-md transition-colors border-b border-[#846C3B]/20"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Shopping Cart */}
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
                          className="text-xs px-1.5 border rounded hover:bg-gray-100"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="text-sm">{item.quantity}</span>
                        <button
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
              <span className="text-[#74541e] font-medium">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <Link
              to="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="block w-full py-2 bg-[#C47E20] text-white text-center rounded-md hover:bg-[#a56d1a] transition-colors"
            >
              Checkout
            </Link>
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
