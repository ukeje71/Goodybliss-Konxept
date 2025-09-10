import React, { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';
import {
    CheckCircle,
    Truck,
    Clock,
    MapPin,
    Download,
    ShoppingBag,
    Home,
    Phone,
    Mail,
    Loader
} from 'lucide-react';
import useCartStore from "../components/Store/cartStore";
import { useNavigate } from 'react-router';

const OrderConfirmation = () => {
    const invoiceRef = useRef(null);
    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // Cart state
    const { cartItems } = useCartStore();
    // Navigation
    const navigate = useNavigate();
    // Get order reference from URL parameters
    const getOrderRefFromURL = () => {
        const params = new URLSearchParams(window.location.search);
        return params.get('ref');
    };

    // Confetti effect
    useEffect(() => {
        const createConfetti = () => {
            const confettiCount = 100;
            const confettiContainer = document.querySelector('.confetti-container');

            if (!confettiContainer) return;

            // Clear existing confetti
            confettiContainer.innerHTML = '';

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
    }, []);

    // Fetch order data from Google Sheets
    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const orderRef = getOrderRefFromURL();

                if (!orderRef) {
                    throw new Error('No order reference found in URL');
                }

                // Your Google Apps Script URL for GET requests
                const scriptURL = 'https://script.google.com/macros/s/AKfycbyWbWeZwA2pW3SxCWbq2KKaamdkYLndl3kujB7DVrSmd9_MG5QokmxbOnapnj71p2TJgQ/exec';

                const response = await fetch(scriptURL);

                if (!response.ok) {
                    throw new Error('Failed to fetch order data');
                }

                const result = await response.json();

                if (!Array.isArray(result.data)) {
                    throw new Error("Invalid response format from Google Sheets");
                }

                const orders = result.data;
                const order = orders.find(o => String(o.ref) === String(orderRef));

                if (!order) {
                    console.error("Order not found with ref:", orderRef, orders);
                    throw new Error(`Order with ref ${orderRef} not found`);
                }

                setOrderDetails({
                    orderNumber: order.ref || '#123456',
                    orderDate: new Date(order.timestamp || Date.now()).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    }),
                    deliveryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    }),
                    paymentMethod: 'Paystack (Card)',
                    transactionId: order.ref || 'PS-7890XYZ123',
                    totalAmount: `$${parseInt(order.amount || 0).toLocaleString()}`,
                    shippingAddress: order.address || 'Address not available',
                    customerName: order.fullName || 'Customer',
                    customerEmail: order.email || 'No email provided',
                    customerPhone: order.phone || 'No phone provided'
                });

                setLoading(false);
            } catch (err) {
                console.error('Error fetching order data:', err);
                setError(err.message);
                setLoading(false);

                // Fallback to sample data if fetch fails
                setOrderDetails({
                    orderNumber: '#123456',
                    orderDate: 'October 15, 2023',
                    deliveryDate: 'October 17, 2023',
                    paymentMethod: 'Paystack (Card)',
                    transactionId: 'PS-7890XYZ123',
                    totalAmount: '$18,500.00',
                    shippingAddress: 'Ariara Junction, 10 Osusu, Aba, Abia State',
                    customerName: 'Anonymous User',
                    customerEmail: 'someone@example.com',
                    customerPhone: '+234 707 635 4937'
                });
            }
        };

        fetchOrderData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f5f0ea] flex items-center justify-center">
                <div className="text-center">
                    <Loader className="w-12 h-12 text-[#C47E20] animate-spin mx-auto mb-4" />
                    <p className="text-[#74541e]">Loading your order details...</p>
                </div>
            </div>
        );
    }

    // Downloading function - FIXED
    const handleInvoiceDownload = () => {
        const input = invoiceRef.current;

        // Temporarily override unsupported Tailwind colors
        input.style.backgroundColor = "#ffffff";
        input.style.color = "#000000";

        html2canvas(input, {
            scale: 2,
            backgroundColor: "#ffffff" // fallback
        }).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");

            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save(`invoice-${orderDetails.orderNumber}.pdf`);

            // Reset styles after capture
            input.style.backgroundColor = "";
            input.style.color = "";
        });
    };

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

                <div
                    ref={invoiceRef}
                    style={{ backgroundColor: "#ffffff", color: "#000000" }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                >

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
                            <p className="text-[#846C3B]">{orderDetails.customerEmail}</p>
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
                            Order Summary
                        </h2>

                        <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                            {cartItems.length > 0 ? (
                                cartItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex justify-between items-center"
                                    >
                                        <div className="flex items-center">
                                            <img
                                                src={item.imageUrl}
                                                alt={item.title}
                                                className="w-12 h-12 object-cover rounded mr-3"
                                            />
                                            <div>
                                                <h3 className="text-sm font-medium text-[#74541e]">
                                                    {item.title}
                                                </h3>
                                                <p className="text-xs text-[#846C3B]">
                                                    Qty: {item.quantity}
                                                </p>
                                            </div>
                                        </div>
                                        <span className="text-sm font-medium text-[#74541e]">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-gray-500 py-4">
                                    Your cart is empty
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="bg-white rounded-xl shadow-sm border border-[#e8e2d6] p-6 mt-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button onClick={handleInvoiceDownload} className="flex-1 py-3 px-4 bg-[#74541e] hover:bg-[#5a4218] text-white rounded-lg font-medium flex items-center justify-center transition-colors">
                            <Download className="mr-2" size={18} />
                            Download Invoice
                        </button>
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://wa.me/2348138562085">
                            <button className="flex-1 py-3 px-4 w-full bg-[#f5f0ea] hover:bg-[#e8e2d6] text-[#74541e] rounded-lg font-medium flex items-center justify-center transition-colors border border-[#e8e2d6]">
                                <ShoppingBag className="mr-2" size={18} />
                                Track Order
                            </button>
                        </a>

                        <button onClick={() => navigate("/gallery")} className="flex-1 py-3 px-4 bg-[#f5f0ea] hover:bg-[#e8e2d6] text-[#74541e] rounded-lg font-medium flex items-center justify-center transition-colors border border-[#e8e2d6]">
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
                            <span className="text-[#846C3B]">+234 813 8562 085</span>
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
        </div>
    );
};

export default OrderConfirmation;