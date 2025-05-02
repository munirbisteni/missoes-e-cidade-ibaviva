import React from "react";
import "./index.css";
import Navbar from "./sections/Navbar";
import Banner from "./sections/Banner";
import Apresentation from "./sections/Apresentation";
import ProjetosCarousel from "./sections/Projects";
import Missionaries from "./sections/Missionaries";
import Footer from "./sections/Footer";
import { Analytics } from "@vercel/analytics/react"

const App = () => {
  return (
    <div>
      <Navbar />
      <Banner />
      <Apresentation />
      <ProjetosCarousel />
      <Missionaries />
      <Footer />
      <Analytics />
    </div>
  );
};

export default App;
