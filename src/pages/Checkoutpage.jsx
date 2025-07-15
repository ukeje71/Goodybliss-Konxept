import { Lock, CreditCard, Truck, ArrowLeft } from "lucide-react";
import { useState } from "react";
import useCartStore from "../components/Store/cartStore";
import { useNavigate } from "react-router";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, clearCart } = useCartStore();
  
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    addressLine1: "",
    streetName: "",
    city: "",
    state: "",
    deliveryOption: "Free Delivery",
  });

  // Calculate order values
  const subtotal = getTotalPrice();
  const shipping = formData.deliveryOption === "Free Delivery" ? 0 : 10; // Example shipping cost
  const total = subtotal + shipping;

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = "Full name required";
    if (!formData.email.trim()) errors.email = "Email required";
    if (!formData.phoneNumber.trim()) errors.phoneNumber = "Phone number required";
    if (!formData.addressLine1.trim()) errors.addressLine1 = "Address line required";
    if (!formData.streetName.trim()) errors.streetName = "Street name required";
    if (!formData.city.trim()) errors.city = "City required";
    if (!formData.state.trim()) errors.state = "State required";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    
    if (Object.keys(errors).length === 0) {
      // Process payment here
      // After successful payment:
      clearCart();
      navigate("/order-confirmation");
    } else {
      setFormErrors(errors);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-[#f5f0ea] py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-[#74541e] mb-6 hover:text-[#5a4218]"
        >
          <ArrowLeft className="mr-2" size={18} />
          Back to Cart
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Delivery Info */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-[#e8e2d6] p-6 mb-6">
              <h2 className="text-xl font-serif text-[#74541e] mb-4 flex items-center">
                <Truck className="mr-2" size={20} />
                Delivery Information
              </h2>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#846C3B] mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border ${formErrors.fullName ? 'border-red-500' : 'border-[#d4c9b5]'} rounded-lg focus:ring-2 focus:ring-[#C47E20] focus:border-[#C47E20]`}
                    required
                  />
                  {formErrors.fullName && <p className="text-red-500 text-xs mt-1">{formErrors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#846C3B] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border ${formErrors.email ? 'border-red-500' : 'border-[#d4c9b5]'} rounded-lg focus:ring-2 focus:ring-[#C47E20] focus:border-[#C47E20]`}
                    required
                  />
                  {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#846C3B] mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border ${formErrors.phoneNumber ? 'border-red-500' : 'border-[#d4c9b5]'} rounded-lg focus:ring-2 focus:ring-[#C47E20] focus:border-[#C47E20]`}
                    required
                  />
                  {formErrors.phoneNumber && <p className="text-red-500 text-xs mt-1">{formErrors.phoneNumber}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#846C3B] mb-1">
                    Address Line 1
                  </label>
                  <input
                    type="text"
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border ${formErrors.addressLine1 ? 'border-red-500' : 'border-[#d4c9b5]'} rounded-lg focus:ring-2 focus:ring-[#C47E20] focus:border-[#C47E20]`}
                    required
                  />
                  {formErrors.addressLine1 && <p className="text-red-500 text-xs mt-1">{formErrors.addressLine1}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#846C3B] mb-1">
                    Street Name
                  </label>
                  <input
                    type="text"
                    name="streetName"
                    value={formData.streetName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border ${formErrors.streetName ? 'border-red-500' : 'border-[#d4c9b5]'} rounded-lg focus:ring-2 focus:ring-[#C47E20] focus:border-[#C47E20]`}
                    required
                  />
                  {formErrors.streetName && <p className="text-red-500 text-xs mt-1">{formErrors.streetName}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#846C3B] mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border ${formErrors.city ? 'border-red-500' : 'border-[#d4c9b5]'} rounded-lg focus:ring-2 focus:ring-[#C47E20] focus:border-[#C47E20]`}
                      required
                    />
                    {formErrors.city && <p className="text-red-500 text-xs mt-1">{formErrors.city}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#846C3B] mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border ${formErrors.state ? 'border-red-500' : 'border-[#d4c9b5]'} rounded-lg focus:ring-2 focus:ring-[#C47E20] focus:border-[#C47E20]`}
                      required
                    />
                    {formErrors.state && <p className="text-red-500 text-xs mt-1">{formErrors.state}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#846C3B] mb-1">
                      Country
                    </label>
                    <select 
                      className="w-full px-4 py-2 border border-[#d4c9b5] rounded-lg focus:ring-2 focus:ring-[#C47E20] focus:border-[#C47E20]"
                      defaultValue="Nigeria"
                    >
                      <option>Nigeria</option>
                      <option>Ghana</option>
                      <option>Kenya</option>
                      <option>South Africa</option>
                    </select>
                  </div>
                </div>
              </form>

              <h2 className="text-xl font-serif text-[#74541e] mt-8 mb-4 flex items-center">
                <CreditCard className="mr-2" size={20} />
                Payment Method
              </h2>

              <div className="space-y-3">
                <div className="flex items-center p-4 border border-[#C47E20] rounded-lg cursor-pointer bg-[#f9f7f3]">
                  <input
                    type="radio"
                    id="paystack"
                    name="paymentMethod"
                    className="h-4 w-4 text-[#C47E20] focus:ring-[#C47E20] border-[#d4c9b5]"
                    defaultChecked
                  />
                  <label
                    htmlFor="paystack"
                    className="ml-3 block text-sm font-medium text-[#846C3B]"
                  >
                    Paystack (Card, Bank Transfer, USSD)
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div>
            <div className="bg-white rounded-xl shadow-sm border border-[#e8e2d6] p-6 sticky top-8">
              <h2 className="text-xl font-serif text-[#74541e] mb-4">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div className="flex items-center">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-12 h-12 object-cover rounded mr-3" 
                        />
                        <div>
                          <h3 className="text-sm font-medium text-[#74541e]">{item.title}</h3>
                          <p className="text-xs text-[#846C3B]">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-[#74541e]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-4">Your cart is empty</p>
                )}
              </div>

              <div className="border-t border-[#e8e2d6] pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-[#846C3B]">Subtotal</span>
                  <span className="text-sm font-medium text-[#74541e]">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-[#846C3B]">Shipping</span>
                  <span className="text-sm font-medium text-[#74541e]">
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#e8e2d6] mt-2">
                  <span className="font-medium text-[#74541e]">Total</span>
                  <span className="font-medium text-[#74541e]">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={cartItems.length === 0}
                className={`w-full mt-6 py-3 px-4 rounded-lg text-white font-medium flex items-center justify-center ${
                  cartItems.length === 0 
                    ? 'bg-[#a8a095] cursor-not-allowed' 
                    : 'bg-[#74541e] hover:bg-[#5a4218]'
                }`}
              >
                <Lock className="mr-2" size={16} />
                {cartItems.length === 0 ? 'Cart is Empty' : 'Complete Checkout'}
              </button>

              <p className="text-xs text-[#846C3B] mt-4 flex items-center">
                <Lock className="mr-1" size={12} />
                Your payment is securely processed by Paystack. We don't store
                your card details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;