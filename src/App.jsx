import React, { useEffect } from "react";
import Header from "./components/Layouts/Header";
import Homepage from "./pages/Homepage";
import { Route, Routes, useLocation } from "react-router";
import Gallerypage from "./pages/Gallerypage";
import Error from "./pages/Errorpage";
import Footer from "./components/Layouts/Footer";
import Aboutpage from "./pages/Aboutpage";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <div>
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="about" element={<Aboutpage />} />
        <Route path="gallery" element={<Gallerypage />}>
          <Route path=":categoryId" element={<Gallerypage />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;