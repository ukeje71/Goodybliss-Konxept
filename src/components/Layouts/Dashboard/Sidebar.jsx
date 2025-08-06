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
  X,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import { useState, useEffect } from "react";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

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
          path: "/admin/newproduct",
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
          onClick: () => {
            localStorage.removeItem("authToken");
            navigate("/login");
          },
        },
      ],
    },
  ];

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <button
        onClick={toggleMenu}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="fixed bottom-4 right-4 z-50 p-3 rounded-full bg-[#2a2118] text-[#beac98] shadow-lg hover:bg-[#3e3327] transition-colors"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        className={`fixed inset-0 z-40 transform transition-all duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 h-screen bg-[#2a2118] text-[#beac98] overflow-y-auto`}
        aria-hidden={!isMenuOpen}
      >
        <div className="p-6 border-b border-[#3e3327]">
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <Palette className="text-[#C47E20]" size={24} />
            <h1 className="text-xl font-serif text-white">Goodybliss Admin</h1>
          </Link>
        </div>

        <div className="p-4">
          {menuItems.map((section, index) => (
            <div key={`section-${index}`} className="mb-8">
              <h3 className="text-xs uppercase tracking-wider text-[#846C3B] mb-4 px-2">
                {section.title}
              </h3>
              <ul className="space-y-1">
                {section.items.map((item, itemIndex) => (
                  <li key={`item-${itemIndex}`}>
                    {item.onClick ? (
                      <button
                        onClick={() => {
                          item.onClick();
                          setIsMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-[#3e3327] hover:text-white"
                      >
                        <span className="text-[#C47E20]">{item.icon}</span>
                        <span>{item.name}</span>
                      </button>
                    ) : (
                      <Link
                        to={item.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                          location.pathname === item.path
                            ? "bg-[#74541e] text-white"
                            : "hover:bg-[#3e3327] hover:text-white"
                        }`}
                      >
                        <span className="text-[#C47E20]">{item.icon}</span>
                        <span>{item.name}</span>
                      </Link>
                    )}
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

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
          onClick={toggleMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Sidebar;
