import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router";
import Artist from "../assets/Images/Face1.jpeg";
import { product } from "../data/product";
import Cards from "../components/UI/Cards";

const GalleryPage = () => {
  const { category } = useParams();
  const location = useLocation();

  const [stockFilter, setStockFilter] = useState("all");
  const [sortBy, setSortBy] = useState("alphabetical");
  const [currentPage, setCurrentPage] = useState(1);
  const photosPerPage = 12;
  // Dummy loading state
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulate 1s load; adjust or connect to your API loading logic

    return () => clearTimeout(timer);
  }, [category]);

  useEffect(() => {
    if (category && ["oils", "watercolors", "sketches"].includes(category)) {
      setStockFilter(category);
    } else {
      setStockFilter("all");
    }
  }, [category]);

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

  const isActiveCategory = (cat) => {
    if (cat.id === "all") {
      return location.pathname === "/gallery" || !category;
    }
    return location.pathname === cat.path;
  };

  const handleFilterChange = (filterId) => {
    setStockFilter(filterId);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Filter
  const filteredProducts = product.filter((item) => {
    if (!item || typeof item !== "object") return false;

    if (stockFilter === "all") return true;
    if (stockFilter === "in-stock") return item.inStock !== false;
    if (stockFilter === "out-of-stock") return item.inStock === false;
    return item.category === stockFilter;
  });

  // Sort
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = a.discountPrice ?? a.regularPrice ?? 0;
    const priceB = b.discountPrice ?? b.regularPrice ?? 0;

    switch (sortBy) {
      case "alphabetical":
        return (a.title || "").localeCompare(b.title || "");
      case "price-low-high":
        return priceA - priceB;
      case "price-high-low":
        return priceB - priceA;
      case "date-new-old":
        return new Date(b.year || 0) - new Date(a.year || 0);
      case "date-old-new":
        return new Date(a.year || 0) - new Date(b.year || 0);
      default:
        return 0;
    }
  });

  // Paginate
  const totalPages = Math.ceil(sortedProducts.length / photosPerPage);
  const startIndex = Math.max(0, (currentPage - 1) * photosPerPage);
  const endIndex = Math.min(startIndex + photosPerPage, sortedProducts.length);
  const productsToShow = sortedProducts.slice(startIndex, endIndex);

  return (
    <div className="w-full min-h-screen bg-[#f5f0ea]">
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12 xl:gap-20">
          <div className="w-full lg:w-1/2">
            <div className="relative aspect-square md:aspect-[4/5] max-w-[630px] mx-auto overflow-hidden rounded-lg shadow-lg">
              <img
                src={Artist}
                alt="Artist Goodybliss"
                className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2 text-center lg:text-left max-w-[500px] mx-auto lg:mx-0">
            <h1 className="text-[#74541e] text-3xl sm:text-4xl md:text-5xl font-serif mb-4 md:mb-6">
              The Original Moving Sale
            </h1>
            <div className="text-gray-800 space-y-4 md:space-y-6">
              <h3 className="text-lg md:text-xl">
                Pack up the oils, wrap up the brushes and onto the next
                adventure...
              </h3>
              <p className="leading-relaxed md:leading-8 text-base md:text-lg">
                After two years in our warehouse studio, my creative practice is
                moving to Melbourne! <b>For the first time,</b> collector
                favourites and newly released works are available at a very
                special price.
              </p>
              <p className="text-[#74541e] italic text-lg md:text-xl">
                Goodybliss - Konxept
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Controls */}
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
                  onClick={() => handleFilterChange(filter.id)}
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
              onChange={(e) => setSortBy(e.target.value)}
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

        {/* Category Navigation */}
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

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-md"
              >
                <div className="aspect-[4/3] bg-gray-300" />
                <div className="p-4">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/3 mb-4"></div>
                  <div className="flex space-x-2">
                    <div className="h-8 bg-gray-300 rounded w-1/2"></div>
                    <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Cards products={productsToShow} />
        )}

        {/* Pagination */}
        <div className="flex justify-center mt-12">
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentPage === page
                    ? "bg-[#74541e] text-white"
                    : "bg-[#e8ddd0] text-[#846C3B] hover:bg-[#d8c9b5]"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;
