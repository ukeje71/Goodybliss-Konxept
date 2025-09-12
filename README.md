#Goodybliss
Goodybliss is a modern e-commerce web application built with React and Vite, designed to provide a seamless shopping experience for art and related products. The application integrates with Firebase for data storage, Cloudinary for image hosting, Paystack for payments, and Google Sheets for order management. It features a responsive UI with Tailwind CSS, interactive components with Framer Motion, and state management with Zustand.
Table of Contents

Features
Technologies
Installation
Scripts
Dependencies
Dev Dependencies
Usage
Project Structure
Contributing
Contact

Features

Product Catalog: Browse products fetched from Firebase Firestore with filtering and sorting capabilities.
Cart & Wishlist: Add items to cart and wishlist with Zustand state management.
Checkout: Secure payments via Paystack with order details saved to Google Sheets.
Order Confirmation: Display order details with product images and downloadable PDF invoices.
Responsive Design: Built with Tailwind CSS for a mobile-friendly experience.
Animations: Smooth transitions and confetti effects using Framer Motion.
Image Hosting: Cloudinary integration for efficient image storage and delivery.
Notifications: User feedback with React Hot Toast.
Routing: Client-side navigation with React Router.

Technologies

Frontend: React, React Router, Tailwind CSS, Framer Motion, Lucide React
State Management: Zustand
Backend: Firebase Firestore
Image Hosting: Cloudinary
Payments: Paystack
Order Storage: Google Sheets via Google Apps Script
PDF Generation: html2canvas-pro, jsPDF
Build Tool: Vite
Linting: ESLint

Installation

Clone the Repository:
git clone https://github.com/ukeje71/goodybliss-konxept.git
cd goodybliss

Install Dependencies:
npm install

Set Up Environment Variables:Create a .env file in the root directory and add the following:
VITE_APP_FIREBASE_API_KEY=your_firebase_api_key
VITE_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_APP_FIREBASE_APP_ID=your_firebase_app_id
VITE_APP_PAYSTACK_PUBLIC_KEY=your_paystack_public_key
VITE_APP_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
VITE_APP_CLOUDINARY_API_KEY=your_cloudinary_api_key
VITE_APP_CLOUDINARY_API_SECRET=your_cloudinary_api_secret

Configure Google Apps Script:

Set up a Google Apps Script project to handle order data storage.
Update the script URL in CheckoutPage.jsx to your deployed script URL.

Run the Application:
npm run dev

Open http://localhost:5173 in your browser.

Scripts

npm run dev: Starts the development server with Vite.
npm run build: Builds the application for production.
npm run lint: Runs ESLint to check for code issues.
npm run preview: Previews the production build locally.

Dependencies
The following dependencies are used in the project:

@tailwindcss/vite: ^4.1.11 - Vite plugin for Tailwind CSS integration.
axios: ^1.11.0 - Promise-based HTTP client for API requests.
cloudinary: ^2.7.0 - Cloudinary SDK for image uploads and management.
firebase: ^11.10.0 - Firebase SDK for Firestore and authentication.
framer-motion: ^12.23.12 - Animation library for React.
googleapis: ^159.0.0 - Google APIs for interacting with Google Sheets.
html2canvas: ^1.4.1 - Converts DOM to canvas for PDF generation.
html2canvas-pro: ^1.5.11 - Enhanced version of html2canvas.
jspdf: ^3.0.2 - Generates PDF documents.
lucide-react: ^0.525.0 - Icon library for React.
react: ^19.1.1 - React library for building user interfaces.
react-dom: ^19.1.1 - React DOM rendering.
react-fast-marquee: ^1.6.5 - Marquee component for scrolling text/images.
react-hot-toast: ^2.5.2 - Notification library for React.
react-router: ^7.8.2 - Declarative routing for React.
react-router-dom: ^7.8.2 - DOM bindings for React Router.
swiper: ^11.2.10 - Slider/carousel library for React.
tailwindcss: ^4.1.11 - Utility-first CSS framework.
zustand: ^5.0.8 - State management library.

Dev Dependencies

@eslint/js: ^9.25.0 - ESLint JavaScript configurations.
@types/react: ^19.1.12 - Type definitions for React.
@types/react-dom: ^19.1.9 - Type definitions for React DOM.
@vitejs/plugin-react: ^5.0.2 - Vite plugin for React support.
eslint: ^9.25.0 - Linting tool for JavaScript.
eslint-plugin-react-hooks: ^5.2.0 - ESLint rules for React Hooks.
eslint-plugin-react-refresh: ^0.4.19 - ESLint plugin for React Refresh.
globals: ^16.0.0 - Global variables for ESLint.
vite: ^7.1.4 - Fast build tool and development server.

Usage

Browse Products:

Navigate to the /gallery route to view products fetched from Firebase Firestore.
Use filters (e.g., stock status, category) and sorting options (e.g., alphabetical, price).

Add to Cart/Wishlist:

Click "Add to Cart" or the heart icon to add products to the cart or wishlist.
View the cart or wishlist via the respective routes (/cart, /wishlist).

Checkout:

Proceed to /checkout, enter details, and complete payment via Paystack.
Order details are saved to Google Sheets.

Order Confirmation:

After checkout, view the order confirmation at /order-confirmation?ref=ORDER_REF.
Download a PDF invoice with order details and product images.

Track Orders:

Use the "Track Order" button to contact support via WhatsApp.

Project Structure
goodybliss/
├── src/
│   ├── components/
│   │   ├── Cards.jsx          # Product card component
│   │   ├── Store/
│   │   │   ├── cartStore.js   # Zustand store for cart
│   │   │   ├── wishlistStore.js # Zustand store for wishlist
│   │   │   ├── Details.js     # Zustand store for product details
│   ├── Firebase.js            # Firebase configuration
│   ├── App.jsx                # Main app component with routing
│   ├── index.css              # Global styles with Tailwind
│   ├── main.jsx               # Entry point
├── public/                    # Static assets
├── .env                       # Environment variables
├── package.json               # Project metadata and dependencies
├── vite.config.js             # Vite configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── README.md                  # Project documentation

Contributing
Contributions are welcome! To contribute:

Fork the repository.
Create a new branch: git checkout -b feature/your-feature.
Make changes and commit: git commit -m "Add your feature".
Push to the branch: git push origin feature/your-feature.
Open a pull request.

Please ensure code follows ESLint rules and includes tests where applicable.
Contact
For support or inquiries:

Email: goodybliss@gmail.com
Phone: +234 813 8562 085
WhatsApp: Contact Us
