import React from "react";
import Header from "./components/Layouts/Header";
import Homepage from "./pages/Homepage";
import { Route, Routes } from "react-router";
import Gallerypage from "./pages/Gallerypage";

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="gallery" element={<Gallerypage/>}/>
      </Routes>
    </div>
  );
};

export default App;
