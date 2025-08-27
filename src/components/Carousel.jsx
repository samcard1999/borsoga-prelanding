import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import placeholders from "../../placeholders.json";

const slides = [
  // {
  //   id: 1,
  //   title: "",
  //   subtitle: "",
  //   image: "assets/shape.svg",
  // },
  {
    id: 2,
    title: "Residence 1",
    subtitle: "Visualization",
    image: "assets/carousel/1.webp",
    placeholder: placeholders["1.webp"].base64,
  },
  {
    id: 3,
    title: "Residence 2",
    subtitle: "Visualization",
    image: "assets/carousel/2.webp",
    placeholder: placeholders["2.webp"].base64,
  },
  {
    id: 4,
    title: "Residence 3",
    subtitle: "Visualization",
    image: "assets/carousel/4.webp",
    placeholder: placeholders["3.webp"].base64,
  },
  {
    id: 5,
    title: "Residence 4",
    subtitle: "Visualization",
    image: "assets/carousel/3.webp",
    placeholder: placeholders["4.webp"].base64,
  },
  {
    id: 6,
    title: "Residence 5",
    subtitle: "Visualization",
    image: "assets/carousel/5.webp",
    placeholder: placeholders["5.webp"].base64,
  },
  {
    id: 7,
    title: "Epsi Nest",
    subtitle: "Web Design",
    image: "assets/carousel/7.webp",
    placeholder: placeholders["7.webp"].base64,
  },
  {
    id: 8,
    title: "Peak Vision",
    subtitle: "Visual Identity",
    image: "assets/carousel/6.webp",
    placeholder: placeholders["6.webp"].base64,
  },
  {
    id: 9,
    title: "",
    subtitle: "",
    image: "assets/shape.svg",
  },
];

const SlideItem = ({ slide }) => {
  const [isLandscape, setIsLandscape] = useState(true);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="grid grid-rows-[1fr_auto] w-full h-full min-h-0">
      {/* Zona imagen con relación de aspecto fija */}
      <div
        className={`relative w-full flex items-center justify-center overflow-hidden aspect-[${slide.width}/${slide.height}]`}
      >
        {/* Placeholder blur (siempre visible al inicio) */}
        <img
          src={slide.placeholder}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 w-full h-full object-contain blur-xl scale-105 transition-opacity duration-500 ${
            loaded ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* Imagen real */}
        <img
          src={slide.image}
          alt={slide.title}
          className={`object-contain w-full h-full transition-opacity duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setLoaded(true)}
        />
      </div>

      {/* Caption */}
      <div className="pt-2 text-center text-white shrink-0">
        <h2 className="text-base font-bold">{slide.title}</h2>
        <p className="text-xs font-light">{slide.subtitle}</p>
      </div>
    </div>
  );
};

const BlurBackgroundCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full h-fit overflow-hidden py-8 bg-black text-white">
      {/* Fondo difuminado con transición */}
      {/* <div className="absolute inset-0 -z-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out`}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(35px) brightness(0.4)",
              opacity: activeIndex === index ? 1 : 0,
            }}
          ></div>
        ))}
      </div> */}

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
        className="mySwiper h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide
            key={slide.id}
            className="h-full max-w-[85%] overflow-hidden !flex items-center justify-center"
          >
            <SlideItem slide={slide} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BlurBackgroundCarousel;
