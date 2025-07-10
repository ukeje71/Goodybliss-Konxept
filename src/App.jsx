import React from "react";
import Header from "./components/Layouts/Header";
import Homepage from "./pages/Homepage";
import { Route, Routes, useLocation, Navigate, Outlet } from "react-router";
import Gallerypage from "./pages/Gallerypage";
import Error from "./pages/Errorpage";
import Footer from "./components/Layouts/Footer";
import Aboutpage from "./pages/Aboutpage";
import Loginpage from "./pages/Loginpage";
import CreateProductPage from "./pages/CreateProductPage";
import Dashboardpage from "./pages/Dashboardpage";
import ContactPage from "./pages/Contactpage";
import { Toaster } from "react-hot-toast";


const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const isAuthenticated = () => {
  return !!localStorage.getItem("authToken");
};

const ProtectedRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

const AdminLayout = () => {
  return (
    <div>
      {/* You can add admin-specific header/sidebar here */}
      <Outlet />
    </div>
  );
};

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ScrollToTop />
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<Aboutpage />} />
          <Route path="/gallery" element={<Gallerypage />}>
            <Route path=":categoryId" element={<Gallerypage />} />
          </Route>
          <Route path="/login" element={<Loginpage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Protected Admin Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboardpage />} />
              <Route path="dashboard" element={<Dashboardpage />} />
              <Route path="newproduct" element={<CreateProductPage />} />
              <Route path="products" element={<Gallerypage />} />
              <Route path="artworks" element={<Dashboardpage />} />
              <Route path="analytics" element={<Dashboardpage />} />
              <Route path="account" element={<Dashboardpage />} />
              <Route path="settings" element={<Dashboardpage />} />
            </Route>
          </Route>

          <Route path="*" element={<Error />} />
        </Routes>
        <Toaster position="top-right" reverseOrder={false} />
      </main>
      <Footer />
    </div>
  );
};

export default App;
