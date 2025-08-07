import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router";
import Cards from "../components/UI/Cards";

const GalleryPage = () => {
  const { category } = useParams();
  const location = useLocation();
  const [stockFilter, setStockFilter] = useState("all");
  const [sortBy, setSortBy] = useState("alphabetical");
  const [currentPage, setCurrentPage] = useState(1);

  const stockFilters = [
    { id: "all", label: "All Items" },
    { id: "in-stock", label: "In Stock" },
    { id: "out-of-stock", label: "Out of Stock" },
  ];

  const sortOptions = [
    { id: "alphabetical", label: "Alphabetical (A-Z)" },
    { id: "price-low-high", label: "Price (Low to High)" },
    { id: "price-high-low", label: "Price (High to Low)" },
    { id: "date-new-old", label: "Date (Newest First)" },
    { id: "date-old-new", label: "Date (Oldest First)" },
  ];

  const categories = [
    { id: "all", name: "All Works", path: "/gallery" },
    { id: "oils", name: "Oil Paintings", path: "/gallery/oils" },
    { id: "watercolors", name: "Watercolors", path: "/gallery/watercolors" },
    { id: "sketches", name: "Sketches", path: "/gallery/sketches" },
  ];

  useEffect(() => {
    setStockFilter(category || "all");
    setCurrentPage(1); // Reset to first page when filters change
  }, [category]);

  const isActiveCategory = (cat) => {
    if (cat.id === "all") return !category || location.pathname === "/gallery";
    return category === cat.id;
  };

  return (
    <div className="w-full min-h-screen bg-[#f5f0ea]">
      {/* Hero Section (keep your existing hero section) */}
      
      {/* Controls Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-center text-2xl md:text-3xl font-serif text-[#74541e] mb-8">
          Explore the Gallery
        </h2>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h3 className="text-[#846C3B] font-medium mb-2">Stock Status</h3>
            <div className="flex flex-wrap gap-2">
              {stockFilters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => {
                    setStockFilter(filter.id);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${
                    stockFilter === filter.id
                      ? "bg-[#74541e] text-white"
                      : "bg-[#e8ddd0] text-[#846C3B] hover:bg-[#d8c9b5]"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[#846C3B] font-medium mb-2">Sort By</h3>
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-[#e8ddd0] text-[#846C3B] px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#C47E20]"
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <h3 className="text-[#846C3B] font-medium mb-4">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={cat.path}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  isActiveCategory(cat)
                    ? "bg-[#74541e] text-white"
                    : "bg-[#e8ddd0] text-[#846C3B] hover:bg-[#d8c9b5]"
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Cards Component */}
        <Cards
          stockFilter={stockFilter}
          sortBy={sortBy}
          currentPage={currentPage}
          photosPerPage={12}
        />
      </section>
    </div>
  );
};

export default GalleryPage;