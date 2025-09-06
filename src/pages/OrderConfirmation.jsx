import React, { useEffect, useState } from 'react';
import {
    CheckCircle,
    Truck,
    Clock,
    MapPin,
    Download,
    ShoppingBag,
    ArrowRight,
    Home,
    Phone,
    Mail
} from 'lucide-react';

const OrderConfirmation = () => {
    const [orderDetails, setOrderDetails] = useState({
        orderNumber: '#123456',
        orderDate: 'October 15, 2023',
        deliveryDate: 'October 17, 2023',
        paymentMethod: 'Paystack (Card)',
        transactionId: 'PS-7890XYZ123',
        totalAmount: '₦18,500.00',
        shippingAddress: 'Ariara Junction, 10 Osusu, Aba, Abia State',
        customerName: 'John Doe',
        customerEmail: 'john.doe@example.com',
        customerPhone: '+234 707 635 4937'
    });

    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: 'Premium Coffee Beans',
            price: 4500,
            quantity: 2,
            image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
        },
        {
            id: 2,
            name: 'Coffee Mug Set',
            price: 7500,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
        },
        {
            id: 3,
            name: 'Coffee Filter',
            price: 2000,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1611854778588-eec2c565f3b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
        }
    ]);

    // Calculate total
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = 0; // Free delivery
    const total = subtotal + shipping;

    // Confetti effect
    useEffect(() => {
        const createConfetti = () => {
            const confettiCount = 100;
            const confettiContainer = document.querySelector('.confetti-container');

            if (!confettiContainer) return;

            for (let i = 0; i < confettiCount; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.animationDelay = Math.random() * 3 + 's';
                confetti.style.backgroundColor = [
                    '#C47E20', '#74541e', '#5a4218', '#846C3B'
                ][Math.floor(Math.random() * 4)];

                confettiContainer.appendChild(confetti);
            }
        };

        createConfetti();
    }, [], 1000);

    return (
        <div className="min-h-screen bg-[#f5f0ea] py-8 px-4">
            {/* Confetti container */}
            <div className="confetti-container fixed top-0 left-0 w-full h-full pointer-events-none z-50"></div>

            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-xl shadow-sm border border-[#e8e2d6] p-6 mb-6 text-center relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <CheckCircle className="w-64 h-64 text-[#f5f0ea] opacity-30" />
                    </div>

                    <div className="relative z-10">
                        <CheckCircle className="w-20 h-20 text-[#C47E20] mx-auto mb-4" />
                        <h1 className="text-3xl font-serif text-[#74541e] mb-2">Order Confirmed!</h1>
                        <p className="text-[#846C3B]">Thank you for your purchase. Your order is being processed.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Order Details */}
                    <div className="bg-white rounded-xl shadow-sm border border-[#e8e2d6] p-6">
                        <h2 className="text-xl font-serif text-[#74541e] mb-4 flex items-center">
                            <ShoppingBag className="mr-2" size={20} />
                            Order Details
                        </h2>

                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-[#846C3B]">Order Number</span>
                                <span className="font-medium text-[#74541e]">{orderDetails.orderNumber}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-[#846C3B]">Order Date</span>
                                <span className="font-medium text-[#74541e]">{orderDetails.orderDate}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-[#846C3B]">Payment Method</span>
                                <span className="font-medium text-[#74541e]">{orderDetails.paymentMethod}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-[#846C3B]">Transaction ID</span>
                                <span className="font-medium text-[#74541e]">{orderDetails.transactionId}</span>
                            </div>

                            <div className="flex justify-between pt-3 border-t border-[#e8e2d6]">
                                <span className="text-lg font-medium text-[#74541e]">Total Amount</span>
                                <span className="text-lg font-medium text-[#74541e]">{orderDetails.totalAmount}</span>
                            </div>
                        </div>

                        <h2 className="text-xl font-serif text-[#74541e] mt-6 mb-4 flex items-center">
                            <MapPin className="mr-2" size={20} />
                            Delivery Address
                        </h2>

                        <div className="bg-[#f9f7f3] p-4 rounded-lg">
                            <p className="text-[#5a4218]">{orderDetails.customerName}</p>
                            <p className="text-[#846C3B]">{orderDetails.shippingAddress}</p>
                            <p className="text-[#846C3B]">{orderDetails.customerPhone}</p>
                        </div>
                    </div>

                    {/* Delivery Status */}
                    <div className="bg-white rounded-xl shadow-sm border border-[#e8e2d6] p-6">
                        <h2 className="text-xl font-serif text-[#74541e] mb-4 flex items-center">
                            <Truck className="mr-2" size={20} />
                            Delivery Status
                        </h2>

                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[#846C3B]">Estimated Delivery</span>
                                <span className="font-medium text-[#74541e]">{orderDetails.deliveryDate}</span>
                            </div>

                            <div className="h-2 bg-[#e8e2d6] rounded-full overflow-hidden">
                                <div className="h-full bg-[#C47E20] rounded-full w-3/4"></div>
                            </div>

                            <div className="flex justify-between text-xs text-[#846C3B] mt-1">
                                <span>Order Placed</span>
                                <span>Shipped</span>
                                <span>Out for Delivery</span>
                                <span>Delivered</span>
                            </div>
                        </div>

                        <div className="bg-[#f9f7f3] p-4 rounded-lg">
                            <div className="flex items-start">
                                <Clock className="text-[#C47E20] mr-3 mt-1" size={18} />
                                <div>
                                    <h3 className="font-medium text-[#74541e]">Preparing your order</h3>
                                    <p className="text-sm text-[#846C3B]">Your order is being processed and will be shipped soon.</p>
                                </div>
                            </div>
                        </div>

                        <h2 className="text-xl font-serif text-[#74541e] mt-6 mb-4 flex items-center">
                            <ShoppingBag className="mr-2" size={20} />
                            Order Items
                        </h2>

                        <div className="space-y-4">
                            {cartItems.map(item => (
                                <div key={item.id} className="flex items-center">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-16 h-16 rounded-lg object-cover border border-[#e8e2d6]"
                                    />
                                    <div className="ml-4 flex-1">
                                        <h3 className="font-medium text-[#74541e]">{item.name}</h3>
                                        <p className="text-sm text-[#846C3B]">Qty: {item.quantity}</p>
                                    </div>
                                    <span className="font-medium text-[#74541e]">₦{(item.price * item.quantity).toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="bg-white rounded-xl shadow-sm border border-[#e8e2d6] p-6 mt-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button className="flex-1 py-3 px-4 bg-[#74541e] hover:bg-[#5a4218] text-white rounded-lg font-medium flex items-center justify-center transition-colors">
                            <Download className="mr-2" size={18} />
                            Download Invoice
                        </button>

                        <button className="flex-1 py-3 px-4 bg-[#f5f0ea] hover:bg-[#e8e2d6] text-[#74541e] rounded-lg font-medium flex items-center justify-center transition-colors border border-[#e8e2d6]">
                            <ShoppingBag className="mr-2" size={18} />
                            Track Order
                        </button>

                        <button className="flex-1 py-3 px-4 bg-[#f5f0ea] hover:bg-[#e8e2d6] text-[#74541e] rounded-lg font-medium flex items-center justify-center transition-colors border border-[#e8e2d6]">
                            <Home className="mr-2" size={18} />
                            Continue Shopping
                        </button>
                    </div>
                </div>

                {/* Support Info */}
                <div className="bg-white rounded-xl shadow-sm border border-[#e8e2d6] p-6 mt-6">
                    <h2 className="text-xl font-serif text-[#74541e] mb-4 text-center">Need Help?</h2>

                    <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                        <div className="flex items-center">
                            <Phone className="text-[#C47E20] mr-2" size={18} />
                            <span className="text-[#846C3B]">+234 707 635 4937</span>
                        </div>

                        <div className="flex items-center">
                            <Mail className="text-[#C47E20] mr-2" size={18} />
                            <span className="text-[#846C3B]">goodybliss@gmail.com</span>
                        </div>
                    </div>

                    <p className="text-center text-[#846C3B] mt-4">
                        We're here to help with any questions or concerns you may have.
                    </p>
                </div>
            </div>

            <style jsx>{`
        @keyframes confettiFall {
          0% {
            transform: translateY(-100px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        
        .confetti {
          position: absolute;
          width: 10px;
          height: 10px;
          opacity: 0.7;
          animation: confettiFall 5s linear infinite;
        }
        
        .confetti:nth-child(5n) {
          width: 12px;
          height: 4px;
        }
        
        .confetti:nth-child(3n) {
          width: 7px;
          height: 7px;
        }
        
        .confetti:nth-child(7n) {
          width: 15px;
          height: 5px;
        }
      `}</style>
        </div>
    );
};

export default OrderConfirmation;