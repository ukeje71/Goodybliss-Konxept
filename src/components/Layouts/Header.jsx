import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import Marquee from "react-fast-marquee";
import { Link, useNavigate, useLocation } from "react-router";
import Cart from "./Cart";
import useCartStore from "../Store/cartStore";
import useWishlistStore from "../Store/wishlistStore";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showHeader, setShowHeader] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const searchRef = useRef(null);

  // Store functions
  const { getTotalItems } = useCartStore();
  const { getTotalWishes } = useWishlistStore();

  // Navigation hooks
  const navigate = useNavigate();
  const location = useLocation();

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close search when route changes
  useEffect(() => {
    setIsSearchOpen(false);
  }, [location.pathname]);

  // Scroll handler for header show/hide
  useEffect(() => {
    const handleScroll = () => {
      if (isMobile) return;
      const currentScrollY = window.scrollY;
      setShowHeader(currentScrollY <= lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
      setIsSticky(currentScrollY > 50);
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
    { name: "About Our Artist", path: "/about" },
    { name: "Art Classes", path: "/art-classes" },
    { name: "ORIGINAL MOVING SALE 📦", path: "/gallery" },
    { name: "Canvas Prints", path: "/gallery" },
    { name: "Shop By Collection", path: "/gallery" },
    { name: "Fine Art Prints", path: "/gallery" },
    { name: "Originals", path: "/gallery" },
    { name: "Contact", path: "/contact" },
    { name: "Wishlist", path: "/wishlist" },
    { name: "LogIn", path: "/login" },
  ];

  const searchCategories = [
    { name: "All Collections", path: "/gallery" },
    { name: "Original Paintings", path: "/gallery" },
    { name: "Art Classes", path: "/art-classes" },
    { name: "Sale Items", path: "/sale-items" },
  ];

  return (
    <div className="relative">
      {/* Sticky Marquee */}
      <div className={`sticky top-0 z-40 ${isSticky ? "shadow-md" : ""}`}>
        <Marquee
          speed={40}
          gradient={false}
          pauseOnHover={true}
          className="bg-[#C47E20] text-amber-50 p-2 Cormorant"
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
      </div>

      {/* Main Header */}
      <div
        className={`bg-white sticky top-8 z-30 transition-transform duration-300 ${
          showHeader || isMobile
            ? "translate-y-0 shadow-md"
            : "-translate-y-full"
        } ${isSticky ? "sticky top-8" : ""}`}
      >
        <div className="flex justify-between items-center p-4 text-[#74541e]">
          <div className="flex flex-row gap-4">
            <button
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
              className="hover:text-[#74541e] transition-colors"
            >
              <Menu />
            </button>

            {/* Search with dropdown */}
            <div className="relative search-container" ref={searchRef}>
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                aria-label="Search"
                className="p-2 rounded-full hover:bg-amber-50 transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>

              {isSearchOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-lg shadow-xl z-50 border border-amber-100 overflow-hidden">
                  <div className="p-4 border-b border-[#C47E20]">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search artworks, collections..."
                        className="w-full pl-10 pr-4 py-2 border border-[#C47E20] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C47E20]"
                      />
                      <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#C47E20]" />
                    </div>
                  </div>
                  <div className="py-2">
                    <h3 className="px-4 py-2 text-xs font-semibold text-[#C47E20] uppercase tracking-wider">
                      Popular Searches
                    </h3>
                    <ul>
                      {searchCategories.map((category, index) => (
                        <li key={index}>
                          <Link
                            to={category.path}
                            className="w-full text-left px-4 py-2 hover:bg-amber-50 transition-colors text-[#74541e] block"
                            onClick={() => setIsSearchOpen(false)}
                          >
                            {category.name}
                          </Link>
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
            className="Parisienne md:text-3xl hover:text-[#74541e] transition-colors"
            aria-label="Home"
          >
            Goodybliss Konxept
          </Link>

          <div className="flex flex-row gap-4 relative">
            <Link
              to="/login"
              aria-label="login"
              className="hover:text-[#74541e] transition-colors"
            >
              <User />
            </Link>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative hover:text-[#74541e] transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C47E20] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>
            <button
              onClick={() => navigate("/wishlist")}
              className="relative hover:text-[#74541e] transition-colors"
              aria-label="Wishlist"
            >
              <Heart />
              {getTotalWishes() > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C47E20] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalWishes()}
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
            className="text-[#846C3B] hover:text-[#74541e] transition-colors"
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
                  className="block py-3 px-3 text-[#846C3B] hover:text-[#74541e] hover:bg-white/30 rounded-md transition-colors border-b border-[#846C3B]/20"
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
