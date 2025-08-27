import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";

const slides = [
  {
    id: 1,
    title: "Residence 1",
    subtitle: "Visualization",
    image: "assets/carousel/1.webp",
  },
  {
    id: 2,
    title: "Residence 2",
    subtitle: "Visualization",
    image: "assets/carousel/2.webp",
  },
  {
    id: 3,
    title: "Residence 3",
    subtitle: "Visualization",
    image: "assets/carousel/4.webp",
  },
  {
    id: 4,
    title: "Residence 4",
    subtitle: "Visualization",
    image: "assets/carousel/3.webp",
  },
  {
    id: 5,
    title: "Residence 5",
    subtitle: "Visualization",
    image: "assets/carousel/5.webp",
  },
  {
    id: 6,
    title: "Creative Design",
    subtitle: "Programming",
    image: "assets/carousel/7.webp",
  },
  {
    id: 7,
    title: "Future Vision",
    subtitle: "Graphic Design",
    image: "assets/carousel/6.webp",
  },
];

const BlurBackgroundCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full h-full overflow-hidden py-8 bg-black text-white">
      {/* Fondo difuminado con transición */}
      <div className="absolute inset-0 -z-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out`}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(20px) brightness(0.4)",
              opacity: activeIndex === index ? 1 : 0,
            }}
          ></div>
        ))}
      </div>

      {/* Carrusel con EffectCoverflow */}
      <Swiper
        modules={[EffectCoverflow]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0, // ángulo de rotación de los slides
          stretch: 50, // separación horizontal
          depth: 400, // profundidad en Z
          modifier: 1.3, // intensidad del efecto
          slideShadows: false,
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide
            key={slide.id}
            className="max-w-[85%] h-full w-auto flex items-center justify-center"
          >
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-auto h-full">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className=" object-contain h-full w-auto "
                />
              </div>

              <div className="mt-2 text-center text-white">
                <h2 className="text-base font-bold">{slide.title}</h2>
                <p className=" text-xs font-light">{slide.subtitle}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BlurBackgroundCarousel;
