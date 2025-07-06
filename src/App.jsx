import React from "react";
import Header from "./components/Layouts/Header";
import Homepage from "./pages/Homepage";
import { Route, Routes } from "react-router";
import Gallerypage from "./pages/Gallerypage";
import Error from "./pages/Errorpage";
import Footer from "./components/Layouts/Footer";

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="gallery" element={<Gallerypage />}>
          <Route path=":categoryId" element={<Gallerypage />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer/>
    </div>
  );
};

export default App;
