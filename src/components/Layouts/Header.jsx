import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";
import { Link } from "react-router";
import Cart from "./Cart";
import useCartStore from "../Store/cartStore";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showHeader, setShowHeader] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const { getTotalItems } = useCartStore();

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (isMobile) return;
      const currentScrollY = window.scrollY;
      setShowHeader(currentScrollY <= lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isMobile]);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
    { name: "About", path: "/about" },
    { name: "Art Classes", path: "/art-classes" },
    { name: "ORIGINAL MOVING SALE 📦", path: "/gallery" },
    { name: "Shop By Collection", path: "/gallery" },
    { name: "Fine Art Prints", path: "/gallery" },
    { name: "Canvas Prints", path: "/gallery" },
    { name: "Originals", path: "/gallery" },
    { name: "Contact", path: "/contact" },
    { name: "Admin Log in", path: "/login" },
  ];

  const searchCategories = [
    "All Collections",
    "Original Paintings",
    "Limited Edition Prints",
    "Art Classes",
    "Gift Cards",
    "Sale Items",
  ];

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
      <div
        className={` left-0 right-0 z-30 transition-transform duration-300 ${
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
                <Search className="w-5 h-5" />
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
                      <Search className="absolute left-3 top-2.5 w-4 h-4" />
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
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C47E20] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Original Styling */}
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

      {/* Cart Component */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

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