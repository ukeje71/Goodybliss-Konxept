import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import React, { useState } from "react";
import Marquee from "react-fast-marquee";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          <span key={index} className="mx-8 flex items-center">
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
        <h1 className="Parisienne md:text-3xl">Goodybiss Koncept</h1>
        <span className="flex flex-row gap-4">
          <User />
          <button onClick={() => setIsMenuOpen(true)}>
            <ShoppingBag />
          </button>
        </span>
      </div>

      {/* Slide-In Menu with Glassmorphism */}
      <div
        className={`fixed inset-y-0 left-0 w-72 bg-white/80 backdrop-blur-md transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 border-r border-[#846C3B]`}
      >
        {/* Menu Header with Close Button */}
        <div className="p-4 flex justify-end items-center border-b border-[#846C3B] bg-white/30">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-[#846C3B] hover:text-amber-800 transition-colors"
          >
            <X size={28} />
          </button>
        </div>

        {/* Menu Items */}
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

      {/* Glassmorphism Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default Header;
