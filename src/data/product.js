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
    tags: ["modern", "contemporary"],
    description: "A vibrant explosion of color and texture, this acrylic piece captures the fleeting nature of dreams. Layered brushstrokes and bold contrasts evoke a sense of movement and emotional depth."
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
    tags: ["nature", "outdoors"],
    description: "Majestic peaks meet misty valleys in this oil painting. The artist's masterful use of light creates a tranquil atmosphere, inviting viewers to lose themselves in nature's grandeur."
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
    inStock: false,
    tags: ["figurative", "people"],
    description: "An intimate charcoal study of human contemplation. The delicate shading and expressive lines reveal the subject's introspective mood, showcasing the artist's technical precision."
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
    tags: ["flowers", "objects"],
    description: "Delicate watercolor rendering of fresh blooms in soft morning light. The translucent layers capture the ephemeral beauty of nature with a poetic, almost meditative quality."
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
    tags: ["abstract", "experimental"],
    description: "A dynamic collage of urban energy, combining acrylic, newspaper clippings, and metallic leaf. The fragmented composition mirrors the dissonance and rhythm of city life."
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
    tags: ["water", "nature"],
    description: "Fluid watercolor techniques emulate the ocean's movement, with salt textures creating organic wave patterns. The cool palette evokes the freshness of sea air."
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
    tags: ["landscape", "light"],
    description: "Dappled sunlight dances across golden fields in this impressionist homage to rural beauty. Thick impasto strokes create a tactile sense of wind and warmth."
  },
  // Removed duplicates below - kept only unique entries
  {
    id: 8,
    title: "Whispers of the Forest",
    medium: "Mixed Media",
    year: 2023,
    size: "24×36 in",
    regularPrice: 1500,
    discountPrice: 1200,
    image: Watercolor1,
    category: "mixed-media",
    inStock: true,
    tags: ["nature", "abstract"],
    description: "A captivating blend of textures and colors, this mixed media piece invites viewers into a serene forest glade. The interplay of light and shadow creates a sense of depth and tranquility."
  }
];

// Categories remain unchanged
export const categories = [
  { id: "all", name: "All Works" },
  { id: "abstract", name: "Abstract" },
  { id: "landscape", name: "Landscape" },
  { id: "portrait", name: "Portrait" },
  { id: "still-life", name: "Still Life" },
  { id: "modern", name: "Modern" },
  { id: "seascape", name: "Seascape" },
  { id: "impressionist", name: "Impressionist" },
];