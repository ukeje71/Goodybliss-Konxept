import Abstract1 from "../assets/Images/Abstract.jpeg";
import Landscape1 from "../assets/Images/Face1.jpeg";
import Portrait1 from "../assets/Images/Fine.jpeg";
import StillLife1 from "../assets/Images/Landscape.jpeg";
import ModernArt1 from "../assets/Images/Complex.jpeg";
import Watercolor1 from "../assets/Images/Face2.jpeg";
import Impressionist1 from "../assets/Images/Face1.jpeg";

export const product = [
  {
    id: 1,
    title: "Ephemeral Dreams",
    medium: "Abstract Acrylic",
    year: 2023,
    size: "24×36 in",
    regularPrice: 1200,
    discountPrice: 899,
    image: Abstract1,
    category: "abstract",
    inStock: true,
    tags: ["modern", "contemporary"]
  },
  {
    id: 2,
    title: "Mountain Serenity",
    medium: "Oil Landscape",
    year: 2022,
    size: "30×40 in",
    regularPrice: 1800,
    discountPrice: 1500,
    image: Landscape1,
    category: "landscape",
    inStock: true,
    tags: ["nature", "outdoors"]
  },
  {
    id: 3,
    title: "The Thinker",
    medium: "Charcoal Portrait",
    year: 2024,
    size: "18×24 in",
    regularPrice: 950,
    discountPrice: null,
    image: Portrait1,
    category: "portrait",
    inStock: false, // Sold out
    tags: ["figurative", "people"]
  },
  {
    id: 4,
    title: "Morning Stillness",
    medium: "Watercolor Still Life",
    year: 2023,
    size: "16×20 in",
    regularPrice: 650,
    discountPrice: 550,
    image: StillLife1,
    category: "still-life",
    inStock: true,
    tags: ["flowers", "objects"]
  },
  {
    id: 5,
    title: "Urban Chaos",
    medium: "Mixed Media Modern",
    year: 2023,
    size: "36×48 in",
    regularPrice: 2200,
    discountPrice: 1800,
    image: ModernArt1,
    category: "modern",
    inStock: true,
    tags: ["abstract", "experimental"]
  },
  {
    id: 6,
    title: "Ocean Breeze",
    medium: "Watercolor Seascape",
    year: 2022,
    size: "22×30 in",
    regularPrice: 850,
    discountPrice: 750,
    image: Watercolor1,
    category: "seascape",
    inStock: true,
    tags: ["water", "nature"]
  },
  {
    id: 7,
    title: "Sunset Fields",
    medium: "Impressionist Oil",
    year: 2023,
    size: "20×24 in",
    regularPrice: 1200,
    discountPrice: null,
    image: Impressionist1,
    category: "impressionist",
    inStock: true,
    tags: ["landscape", "light"]
  }
];

// Export categories separately for easy use in filters
export const categories = [
  { id: "all", name: "All Works" },
  { id: "abstract", name: "Abstract" },
  { id: "landscape", name: "Landscape" },
  { id: "portrait", name: "Portrait" },
  { id: "still-life", name: "Still Life" },
  { id: "modern", name: "Modern" },
  { id: "seascape", name: "Seascape" },
  { id: "impressionist", name: "Impressionist" }
];