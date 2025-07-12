import { Lock, CreditCard, Truck, ArrowLeft } from 'lucide-react';

const CheckoutPage = () => {
 
  
  return (
    <div className="min-h-screen bg-[#f5f0ea] py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <button 
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
                  <label className="block text-sm font-medium text-[#846C3B] mb-1">Email Address</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-[#d4c9b5] rounded-lg focus:ring-2 focus:ring-[#C47E20] focus:border-[#C47E20]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#846C3B] mb-1">Phone Number</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 border border-[#d4c9b5] rounded-lg focus:ring-2 focus:ring-[#C47E20] focus:border-[#C47E20]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#846C3B] mb-1">Delivery Address</label>
                  <textarea
                    className="w-full px-4 py-2 border border-[#d4c9b5] rounded-lg focus:ring-2 focus:ring-[#C47E20] focus:border-[#C47E20]"
                    rows="3"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#846C3B] mb-1">City</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-[#d4c9b5] rounded-lg focus:ring-2 focus:ring-[#C47E20] focus:border-[#C47E20]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#846C3B] mb-1">State</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-[#d4c9b5] rounded-lg focus:ring-2 focus:ring-[#C47E20] focus:border-[#C47E20]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#846C3B] mb-1">Country</label>
                    <select
                      className="w-full px-4 py-2 border border-[#d4c9b5] rounded-lg focus:ring-2 focus:ring-[#C47E20] focus:border-[#C47E20]"
                    >
                      <option>Nigeria</option>
                      <option>Ghana</option>
                      <option>Kenya</option>
                      <option>South Africa</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-[#e8e2d6] p-6">
              <h2 className="text-xl font-serif text-[#74541e] mb-4 flex items-center">
                <CreditCard className="mr-2" size={20} />
                Payment Method
              </h2>
              
              <div className="space-y-3">
                <div 
                  className={`flex items-center p-4 border rounded-lg cursor-pointer border-[#C47E20] bg-[#f9f7f3]' : 'border-[#d4c9b5]'}`}
                >
                  <input
                    type="radio"
                    id="paystack"
                    name="paymentMethod"
                    onChange={() => {}}
                    className="h-4 w-4 text-[#C47E20] focus:ring-[#C47E20] border-[#d4c9b5]"
                  />
                  <label htmlFor="paystack" className="ml-3 block text-sm font-medium text-[#846C3B]">
                    Paystack (Card, Bank Transfer, USSD)
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-xl shadow-sm border border-[#e8e2d6] p-6 sticky top-8">
              <h2 className="text-xl font-serif text-[#74541e] mb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                  <div  className="flex justify-between items-center">
                    <div className="flex items-center">
                      <img 
                        className="w-12 h-12 object-cover rounded mr-3"
                      />
                      <div>
                      </div>
                    </div>
                  </div>
              </div>

              <div className="border-t border-[#e8e2d6] pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-[#846C3B]">Subtotal</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-[#846C3B]">Shipping</span>
                </div>
                <div className="flex justify-between">
                  {/* <span className="text-sm text-[#846C3B]">Tax ({taxRate * 100}%)</span> */}
                  {/* <span className="text-sm font-medium">₦{taxAmount.toLocaleString()}</span> */}
                </div>
                <div className="flex justify-between pt-2 border-t border-[#e8e2d6] mt-2">
                  <span className="font-medium text-[#74541e]">Total</span>
                  {/* <span className="font-medium text-[#74541e]">₦{grandTotal.toLocaleString()}</span> */}
                </div>
              </div>

              <button
                className={`w-full mt-6 py-3 px-4 rounded-lg text-white font-medium flex items-center justify-center bg-[#a8a095] cursor-not-allowed' : 'bg-[#74541e] hover:bg-[#5a4218]'}`}
              >
                {/* {loading ? ( */}
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                {/* ) : ( */}
                  <>
                    <Lock className="mr-2" size={16} />
                    {/* Pay ₦{grandTotal.toLocaleString()} */}
                  </>
                {/* )} */}
              </button>

              <p className="text-xs text-[#846C3B] mt-4 flex items-center">
                <Lock className="mr-1" size={12} />
                Your payment is securely processed by Paystack. We don't store your card details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;