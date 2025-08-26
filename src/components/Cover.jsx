import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Carousel from "./Carousel";

const Cover = () => {
  return (
    <section className="relative w-full h-screen px-4 py-14 flex flex-col items-start justify-between">
      <Header />
      <Carousel />
      <Footer />
    </section>
  );
};

export default Cover;
