import React, { useRef, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Carousel from "./Carousel";

const Cover = () => {
  const apiRef = useRef(null);
  const [activeArea, setActiveArea] = useState("Visualization");
  return (
    <section className="relative w-full h-screen  py-14 lg:pt-8 lg:pb-4 flex flex-col items-start justify-between">
      <Header
        activeArea={activeArea}
        onAreaSelect={(area) => apiRef.current?.goToArea(area)}
      />

      <Carousel
        onAreaChange={setActiveArea}
        registerApi={(api) => (apiRef.current = api)}
      />
      <Footer />
    </section>
  );
};

export default Cover;
