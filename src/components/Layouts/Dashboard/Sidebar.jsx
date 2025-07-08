import {
  LayoutDashboard,
  PlusSquare,
  BarChart,
  LogOut,
  User,
  Settings,
  ShoppingBag,
  Palette,
  Menu,
  X
} from "lucide-react";
import { Link, useLocation } from "react-router";
import { useState, useEffect } from "react";

const Sidebar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    {
      title: "General",
      items: [
        {
          name: "Dashboard",
          icon: <LayoutDashboard size={18} />,
          path: "/admin/dashboard",
        },
        {
          name: "New Product",
          icon: <PlusSquare size={18} />,
          path: "/admin/new-product",
        },
        {
          name: "Products",
          icon: <ShoppingBag size={18} />,
          path: "/admin/products",
        },
        {
          name: "Artworks",
          icon: <Palette size={18} />,
          path: "/admin/artworks",
        },
        {
          name: "Analytics",
          icon: <BarChart size={18} />,
          path: "/admin/analytics",
        },
      ],
    },
    {
      title: "Management",
      items: [
        {
          name: "Account",
          icon: <User size={18} />,
          path: "/admin/account",
        },
        {
          name: "Settings",
          icon: <Settings size={18} />,
          path: "/admin/settings",
        },
        {
          name: "Logout",
          icon: <LogOut size={18} />,
          path: "/logout",
        },
      ],
    },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 h-screen bg-[#2a2118] text-[#beac98] fixed left-0 top-0 overflow-y-auto">
        <div className="p-6 border-b border-[#3e3327]">
          <Link to="/admin/dashboard" className="flex items-center gap-2">
            <Palette className="text-[#C47E20]" size={24} />
            <h1 className="text-xl font-serif text-white">Goodybliss Admin</h1>
          </Link>
        </div>

        <div className="p-4">
          {menuItems.map((section, index) => (
            <div key={index} className="mb-8">
              <h3 className="text-xs uppercase tracking-wider text-[#846C3B] mb-4 px-2">
                {section.title}
              </h3>
              <ul className="space-y-1">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <Link
                      to={item.path}
                      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                        location.pathname === item.path
                          ? "bg-[#74541e] text-white"
                          : "hover:bg-[#3e3327] hover:text-white"
                      }`}
                    >
                      <span className="text-[#C47E20]">{item.icon}</span>
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#3e3327] bg-[#2a2118]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#74541e] flex items-center justify-center text-white">
              <User size={16} />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Admin User</p>
              <p className="text-xs text-[#beac98]">Artist Admin</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Toggle Button (Bottom Left) */}
      <button 
        onClick={toggleMobileMenu}
        className="md:hidden fixed bottom-4 left-4 z-50 p-3 rounded-full bg-[#2a2118] text-[#beac98] shadow-lg"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Sidebar */}
      <div className={`md:hidden fixed inset-0 z-40 transform transition-all duration-300 ease-in-out ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } w-64 h-screen bg-[#2a2118] text-[#beac98] overflow-y-auto`}>
        <div className="p-6 border-b border-[#3e3327]">
          <Link 
            to="/admin/dashboard" 
            className="flex items-center gap-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Palette className="text-[#C47E20]" size={24} />
            <h1 className="text-xl font-serif text-white">Goodybliss Admin</h1>
          </Link>
        </div>

        <div className="p-4">
          {menuItems.map((section, index) => (
            <div key={index} className="mb-8">
              <h3 className="text-xs uppercase tracking-wider text-[#846C3B] mb-4 px-2">
                {section.title}
              </h3>
              <ul className="space-y-1">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <Link
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                        location.pathname === item.path
                          ? "bg-[#74541e] text-white"
                          : "hover:bg-[#3e3327] hover:text-white"
                      }`}
                    >
                      <span className="text-[#C47E20]">{item.icon}</span>
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#3e3327] bg-[#2a2118]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#74541e] flex items-center justify-center text-white">
              <User size={16} />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Admin User</p>
              <p className="text-xs text-[#beac98]">Artist Admin</p>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay - Mobile */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 z-30  bg-opacity-50"
          onClick={toggleMobileMenu}
        />
      )}
    </>
  );
};

export default Sidebar;