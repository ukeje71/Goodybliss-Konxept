import React, { useState, useRef } from "react";
import {
  Upload,
  X,
  ImagePlus,
  Palette,
  Ruler,
  DollarSign,
  Tag,
  Calendar,
  BookOpen,
  Box,
  Info,
  Check,
} from "lucide-react";
import Sidebar from "../components/Layouts/Dashboard/Sidebar";
import axios from "axios";
import { db } from "../components/Firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import toast from "react-hot-toast";

const CreateProductPage = () => {
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    category: "original",
    medium: "",
    year: new Date().getFullYear(),
    price: "",
    discountPrice: "",
    size: "",
    stock: true,
    images: [],
  });

  const [previewImages, setPreviewImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null); // ✅ New state for actual file
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setUploadError("Please upload an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Image size must be less than 5MB");
      return;
    }

    if (previewImages.length >= 1) {
      setUploadError("You can only upload one image at a time");
      return;
    }

    setIsUploading(true);
    setUploadError("");

    setTimeout(() => {
      const newPreview = {
        name: file.name,
        url: URL.createObjectURL(file),
      };

      setSelectedFile(file);
      setPreviewImages([newPreview]);
      setIsUploading(false);
      fileInputRef.current.value = "";
    }, 1000);
  };

  const removeImage = (index) => {
    const updatedPreviews = [...previewImages];
    URL.revokeObjectURL(updatedPreviews[index].url);
    updatedPreviews.splice(index, 1);
    setPreviewImages(updatedPreviews);
    setSelectedFile(null); // ✅ Clear file if image removed
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      setUploadError("Please add an image before submitting.");
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile); // ✅ Correct file reference
      formData.append("upload_preset", "Goodybliss");
      formData.append("folder", "samples/ecommerce");

      const cloudinaryRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dlyearrnf/image/upload",
        formData
      );

      const imageUrl = cloudinaryRes.data.secure_url;

      await addDoc(collection(db, "products"), {
        ...productData,
        imageUrl: imageUrl,
        createdAt: serverTimestamp(),
      });

      toast.success("Artwork uploaded successfully!");

      // Reset everything
      setProductData({
        title: "",
        description: "",
        category: "original",
        medium: "",
        year: new Date().getFullYear(),
        price: "",
        discountPrice: "",
        size: "",
        stock: 1,
        images: [],
      });
      setPreviewImages([]);
      setSelectedFile(null);
    } catch (error) {
      console.log("Error uploading or saving:", error);
      setUploadError("Failed to upload image or save product. Try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f9f5ee] to-[#f0e8d8] py-8 px-4 sm:px-6 lg:px-8">
      {/* Sidebar */}
      <Sidebar />
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-[#e8e2d6]">
        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl md:text-3xl font-serif text-[#74541e]">
              Add New Artwork
            </h1>
            <div className="flex items-center space-x-2 bg-[#f8f3ea] px-3 py-1 rounded-full">
              <Info className="text-[#a56d1a] h-4 w-4" />
              <span className="text-xs text-[#846C3B]">Step 1 of 2</span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Image Upload Section */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-[#846C3B] mb-2">
                Artwork Image <span className="text-red-500">*</span>
              </label>

              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                {/* Image upload box - now only allows single image */}
                <div
                  onClick={triggerFileInput}
                  className={`relative w-full sm:w-48 h-48 rounded-lg border-2 border-dashed ${isUploading
                      ? "border-[#a56d1a]"
                      : previewImages.length > 0
                        ? "border-green-500"
                        : "border-[#d4c9b5]"
                    } flex flex-col items-center justify-center cursor-pointer hover:bg-[#f9f7f3] transition-all duration-300 ${previewImages.length > 0 ? "bg-green-50" : "bg-white"
                    }`}
                >
                  <input
                    type="file"
                    className="hidden"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUploading || previewImages.length > 0}
                  />

                  {isUploading ? (
                    <div className="animate-pulse flex flex-col items-center">
                      <div className="w-8 h-8 bg-[#C47E20] rounded-full animate-bounce"></div>
                      <span className="mt-2 text-sm text-[#846C3B]">
                        Uploading...
                      </span>
                    </div>
                  ) : previewImages.length > 0 ? (
                    <div className="flex flex-col items-center text-green-600">
                      <Check className="w-8 h-8 mb-2" strokeWidth={2} />
                      <span className="text-sm">Image Added</span>
                    </div>
                  ) : (
                    <>
                      <ImagePlus className="text-[#74541e] w-8 h-8 mb-2" />
                      <span className="text-sm text-[#846C3B]">Add Image</span>
                      <span className="text-xs text-[#846C3B]/60">
                        (Max 5MB)
                      </span>
                    </>
                  )}
                </div>

                {/* Preview image */}
                {previewImages.map((img, index) => (
                  <div
                    key={index}
                    className="relative w-full sm:w-64 h-48 rounded-lg overflow-hidden group shadow-md"
                  >
                    <img
                      src={img.url}
                      alt={img.name}
                      className="w-full h-full object-contain bg-gray-100"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 text-white text-xs truncate">
                      {img.name}
                    </div>
                  </div>
                ))}

                {/* Help text for empty state */}
                {previewImages.length === 0 && (
                  <div className="flex-1 flex items-center justify-center p-4 bg-[#f9f7f3] rounded-lg">
                    <div className="text-center">
                      <p className="text-sm text-[#846C3B] mb-2">
                        Upload a high-quality image of your artwork
                      </p>
                      <p className="text-xs text-[#846C3B]/60">
                        Recommended: 1500x1800px, JPG or PNG
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {uploadError && (
                <p className="text-xs text-red-500 mt-1">{uploadError}</p>
              )}
            </div>

            {/* Basic Information */}
            <div className="space-y-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#846C3B] mb-1">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={productData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-[#d4c9b5] rounded-lg focus:ring-2 focus:ring-[#C47E20] focus:border-[#C47E20] transition-all"
                    placeholder="Ephemeral Dreams"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#846C3B] mb-1">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Box className="text-[#74541e] h-5 w-5" />
                    </div>
                    <select
                      name="category"
                      value={productData.category}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 border border-[#d4c9b5] rounded-lg focus:ring-2 focus:ring-[#C47E20] focus:border-[#C47E20] appearance-none bg-white"
                      required
                    >
                      <option value="original">Original Painting</option>
                      <option value="print">Fine Art Print</option>
                      <option value="canvas">Canvas Print</option>
                      <option value="sketch">Sketch/Drawing</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#846C3B] mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={productData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-[#d4c9b5] rounded-lg focus:ring-2 focus:ring-[#C47E20] focus:border-[#C47E20] transition-all"
                  placeholder="Describe the artwork, inspiration, techniques used..."
                  required
                />
                <p className="text-xs text-[#846C3B]/60 mt-1">
                  Minimum 50 characters
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#846C3B] mb-1">
                    Medium <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Palette className="text-[#74541e] h-5 w-5" />
                    </div>
                    <input
                      type="text"
                      name="medium"
                      value={productData.medium}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 border border-[#d4c9b5] rounded-lg focus:ring-2 focus:ring-[#C47E20] focus:border-[#C47E20]"
                      placeholder="Oil on canvas, Watercolor, etc."
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#846C3B] mb-1">
                    Year Created <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="text-[#74541e] h-5 w-5" />
                    </div>
                    <input
                      type="number"
                      name="year"
                      min="1900"
                      max={new Date().getFullYear()}
                      value={productData.year}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 border border-[#d4c9b5] rounded-lg focus:ring-2 focus:ring-[#C47E20] focus:border-[#C47E20]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#846C3B] mb-1">
                    Size <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Ruler className="text-[#74541e] h-5 w-5" />
                    </div>
                    <input
                      type="text"
                      name="size"
                      value={productData.size}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 border border-[#d4c9b5] rounded-lg focus:ring-2 focus:ring-[#C47E20] focus:border-[#C47E20]"
                      placeholder="24 × 36 in, 50 × 70 cm, etc."
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#846C3B] mb-1">
                    In Stock <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="stock"
                    value={productData.stock}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-[#d4c9b5] rounded-lg focus:ring-2 focus:ring-[#C47E20] focus:border-[#C47E20]"
                    required
                  >
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="bg-[#f9f7f3] p-6 rounded-lg mb-8">
              <h3 className="text-lg font-medium text-[#74541e] mb-4 flex items-center">
                <DollarSign className="mr-2 h-5 w-5" />
                Pricing Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#846C3B] mb-1">
                    Price ($) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="text-[#74541e] h-5 w-5" />
                    </div>
                    <input
                      type="number"
                      name="price"
                      min="0"
                      step="0.01"
                      value={productData.price}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 border border-[#d4c9b5] rounded-lg focus:ring-2 focus:ring-[#C47E20] focus:border-[#C47E20] bg-white"
                      placeholder="1200.00"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#846C3B] mb-1">
                    Discount Price ($)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Tag className="text-[#74541e] h-5 w-5" />
                    </div>
                    <input
                      type="number"
                      name="discountPrice"
                      min="0"
                      step="0.01"
                      value={productData.discountPrice}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 border border-[#d4c9b5] rounded-lg focus:ring-2 focus:ring-[#C47E20] focus:border-[#C47E20] bg-white"
                      placeholder="950.00"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Options */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-[#74541e] mb-4 flex items-center">
                <BookOpen className="mr-2 h-5 w-5" />
                Additional Options
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="framing-option"
                      type="checkbox"
                      className="h-4 w-4 text-[#74541e] focus:ring-[#C47E20] border-[#d4c9b5] rounded"
                    />
                  </div>
                  <label
                    htmlFor="framing-option"
                    className="ml-3 block text-sm text-[#846C3B]"
                  >
                    <span className="font-medium">Framing option</span>
                    <p className="text-xs text-[#846C3B]/60 mt-1">
                      Offer custom framing for an additional $150
                    </p>
                  </label>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="certificate"
                      type="checkbox"
                      className="h-4 w-4 text-[#74541e] focus:ring-[#C47E20] border-[#d4c9b5] rounded"
                    />
                  </div>
                  <label
                    htmlFor="certificate"
                    className="ml-3 block text-sm text-[#846C3B]"
                  >
                    <span className="font-medium">
                      Certificate of authenticity
                    </span>
                    <p className="text-xs text-[#846C3B]/60 mt-1">
                      Include a signed certificate with the artwork
                    </p>
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-[#e8e2d6] pt-6">
              <button
                type="button"
                className="px-6 py-3 text-[#846C3B] border border-[#d4c9b5] rounded-lg hover:bg-[#f9f7f3] transition-colors"
              >
                Save as Draft
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-[#C47E20] to-[#a56d1a] text-white rounded-lg hover:opacity-90 transition-opacity flex items-center shadow-md disabled:opacity-50"
                disabled={previewImages.length === 0 || isUploading}
              >
                <Upload className="mr-2 h-5 w-5" />
                Add Artwork
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProductPage;
