import React, { useEffect, useMemo, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Mousewheel, Keyboard } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import placeholders from "../../placeholders.json";

const slides = [
  {
    id: 2,
    title: "Pine Tree Residence",
    subtitle: "Visualization",
    image: "assets/carousel/1.webp",
    placeholder: placeholders["1.webp"].base64,
    area: "Visualization",
  },
  {
    id: 3,
    title: "Coconut Grove Villa",
    subtitle: "Visualization",
    image: "assets/carousel/2.webp",
    placeholder: placeholders["2.webp"].base64,
    area: "Visualization",
  },
  {
    id: 4,
    title: "Valeria Residence",
    subtitle: "Visualization",
    image: "assets/carousel/4.webp",
    placeholder: placeholders["3.webp"].base64,
    area: "Visualization",
  },
  {
    id: 5,
    title: "Lumière Kitchen",
    subtitle: "Visualization",
    image: "assets/carousel/3.webp",
    placeholder: placeholders["4.webp"].base64,
    area: "Visualization",
  },
  {
    id: 6,
    title: "Corner 1662",
    subtitle: "Visualization",
    image: "assets/carousel/5.webp",
    placeholder: placeholders["5.webp"].base64,
    area: "Visualization",
  },
  {
    id: 7,
    title: "Epsi Nest",
    subtitle: "Web Design",
    image: "assets/carousel/7.webp",
    placeholder: placeholders["7.webp"].base64,
    area: "Programming",
    bgImage: "assets/carousel/epsi-back.webp",
  },
  {
    id: 8,
    type: "video",
    title: "Peak Vision",
    subtitle: "Web Design",
    video: "assets/carousel/peak-vision-video.mp4", // tu video
    poster: "assets/carousel/peak-vision-back.webp", // poster del video (estático)
    placeholder: placeholders["6.webp"]?.base64, // blur base64 del poster (opcional)
    area: "Visualization",
    bgImage: "assets/carousel/peak-vision-video-back.webp", // fondo personalizado (difuminado)
  },
  {
    id: 9,
    title: "Epsi Nest",
    subtitle: "visual Identity",
    image: "assets/carousel/epsi.webp",
    placeholder: placeholders["7.webp"].base64,
    area: "Graphic Design",
    bgImage: "assets/carousel/epsi-back.webp",
  },
  {
    id: 10,
    title: "Peak Vision",
    subtitle: "Visual Identity",
    image: "assets/carousel/6.webp",
    placeholder: placeholders["6.webp"].base64,
    area: "Graphic Design",
    bgImage: "assets/carousel/peak-vision-back.webp",
  },
  {
    id: 11,
    title: "",
    subtitle: "",
    image: "assets/shape.svg",
  },
];

// ---------- Slide de Imagen ----------
const ImageSlide = ({ slide }) => {
  const [isLandscape, setIsLandscape] = useState(true);
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`grid w-full min-h-0 ${
        isLandscape
          ? "grid-rows-[auto_auto] h-auto"
          : "grid-rows-[1fr_auto] h-full"
      }`}
    >
      <div
        className={`relative w-full overflow-hidden flex items-center justify-center ${
          isLandscape ? "h-auto" : "h-full min-h-0"
        }`}
      >
        {slide.placeholder && (
          <img
            src={slide.placeholder}
            alt=""
            aria-hidden="true"
            className={`absolute inset-0 w-full h-full object-contain blur-xl scale-105 transition-opacity duration-500 ${
              loaded ? "opacity-0" : "opacity-100"
            }`}
          />
        )}

        <img
          src={slide.image}
          alt={slide.title}
          className={`object-contain max-w-full max-h-full transition-opacity duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={(e) => {
            setIsLandscape(
              e.currentTarget.naturalWidth >= e.currentTarget.naturalHeight
            );
            setLoaded(true);
          }}
        />
      </div>

      <div className="pt-2 text-center text-white shrink-0">
        <h2 className="text-base font-bold">{slide.title}</h2>
        <p className="text-xs font-light">{slide.subtitle}</p>
      </div>
    </div>
  );
};

// ---------- Slide de Video (lazy + autoplay) ----------
const VideoSlide = ({ slide, isActive }) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const [srcReady, setSrcReady] = useState(false); // cargamos src solo cuando entra en viewport
  const [isLandscape, setIsLandscape] = useState(true);

  // IntersectionObserver para lazy-load del video
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setInView(true);
          else setInView(false);
        });
      },
      { root: null, rootMargin: "200px", threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Asignar src cuando entre en vista
  useEffect(() => {
    if (inView && !srcReady) setSrcReady(true);
  }, [inView, srcReady]);

  // Play/pause según estado activo y listo
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isActive && loaded) {
      v.play().catch(() => {}); // algunos navegadores bloquean; muted ayuda
    } else {
      v.pause();
    }
  }, [isActive, loaded]);

  return (
    <div
      ref={containerRef}
      className={`grid w-full min-h-0 ${
        isLandscape
          ? "grid-rows-[auto_auto] h-auto"
          : "grid-rows-[1fr_auto] h-full"
      }`}
    >
      <div
        className={`relative w-full overflow-hidden flex items-center justify-center ${
          isLandscape ? "h-auto" : "h-full min-h-0"
        }`}
      >
        {/* Placeholder/Poster en blur hasta que el video esté listo */}
        {(slide.placeholder || slide.poster) && (
          <img
            src={slide.placeholder || slide.poster}
            alt=""
            aria-hidden="true"
            className={`absolute inset-0 w-full h-full object-contain blur-xl scale-105 transition-opacity duration-500 ${
              loaded ? "opacity-0" : "opacity-100"
            }`}
          />
        )}

        <video
          ref={videoRef}
          className={`object-contain max-w-full max-h-full transition-opacity duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          // autoplay config
          autoPlay
          muted
          loop
          playsInline
          preload="none" // no descargues hasta que nosotros pongamos el src
          poster={slide.poster}
          onLoadedData={(e) => {
            const v = e.currentTarget;
            // detectar orientación real del video
            const vw = v.videoWidth || 16;
            const vh = v.videoHeight || 9;
            setIsLandscape(vw >= vh);
            setLoaded(true);
          }}
          // asignamos el src SOLO cuando está en viewport
          src={srcReady ? slide.video : undefined}
        />
      </div>

      <div className="pt-2 text-center text-white shrink-0">
        <h2 className="text-base font-bold">{slide.title}</h2>
        <p className="text-xs font-light">{slide.subtitle}</p>
      </div>
    </div>
  );
};

// ---------- Item genérico que decide imagen o video ----------
const SlideItem = ({ slide, isActive }) => {
  if (slide.type === "video")
    return <VideoSlide slide={slide} isActive={isActive} />;
  return <ImageSlide slide={slide} />;
};

/**
 * Props:
 * - onAreaChange(area: string)
 * - registerApi((api) => void) => { goToArea(area), goToIndex(i) }
 */
const BlurBackgroundCarousel = ({ onAreaChange, registerApi }) => {
  const [swiper, setSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // -------- Fondo difuminado con crossfade (performance-friendly) --------
  const layerARef = useRef(null);
  const layerBRef = useRef(null);
  const activeLayer = useRef(0); // 0 => A visible, 1 => B visible

  const getBgUrl = (index) => {
    const s = slides[index];
    if (!s) return "";
    // En video: usa bgImage si existe; si no, usa poster; si no, usa image.
    return s.bgImage || s.image || s.poster || "";
  };

  // init fondo
  useEffect(() => {
    const a = layerARef.current;
    const b = layerBRef.current;
    if (!a || !b) return;
    a.style.backgroundImage = `url('${getBgUrl(0)}')`;
    a.style.opacity = "1";
    b.style.opacity = "0";
  }, []);

  const crossfadeBg = (nextIdx) => {
    const a = layerARef.current;
    const b = layerBRef.current;
    if (!a || !b) return;
    const nextUrl = getBgUrl(nextIdx);
    if (!nextUrl) return;

    const showB = activeLayer.current === 0;
    const top = showB ? b : a;
    const bottom = showB ? a : b;

    top.style.backgroundImage = `url('${nextUrl}')`;
    // forzar reflow
    // eslint-disable-next-line no-unused-expressions
    top.offsetHeight;
    top.style.opacity = "1";
    bottom.style.opacity = "0";
    activeLayer.current = showB ? 1 : 0;
  };
  // ----------------------------------------------------------------------

  // Mapa: area -> primer índice
  const firstIndexByArea = useMemo(() => {
    const map = new Map();
    slides.forEach((s, i) => {
      if (s.area && !map.has(s.area)) map.set(s.area, i);
    });
    return map;
  }, []);

  // Exponer API al padre
  useEffect(() => {
    if (!swiper || !registerApi) return;
    const api = {
      goToArea: (area) => {
        const idx = firstIndexByArea.get(area);
        if (idx != null) swiper.slideTo(idx);
      },
      goToIndex: (i) => swiper?.slideTo(i),
    };
    registerApi(api);
  }, [swiper, registerApi, firstIndexByArea]);

  return (
    <div className="w-full h-full overflow-hidden py-8 bg-black text-white">
      {/* Fondo difuminado con crossfade (2 capas + un solo blur) */}
      <div className="absolute inset-0 -z-0 overflow-hidden">
        <div
          className="absolute inset-0 will-change-transform"
          style={{
            filter: "blur(18px)",
            transform: "translateZ(0)",
          }}
        >
          <div
            ref={layerARef}
            className="absolute inset-0 bg-center bg-cover transition-opacity duration-500 ease-out"
            style={{ opacity: 0, willChange: "opacity" }}
          />
          <div
            ref={layerBRef}
            className="absolute inset-0 bg-center bg-cover transition-opacity duration-500 ease-out"
            style={{ opacity: 0, willChange: "opacity" }}
          />
        </div>
        <div className="absolute inset-0 bg-black/45 pointer-events-none" />
      </div>

      <Swiper
        modules={[EffectCoverflow, Mousewheel, Keyboard]}
        onSwiper={setSwiper}
        effect="coverflow"
        grabCursor
        centeredSlides
        slidesPerView="auto"
        speed={500}
        mousewheel
        keyboard={{ enabled: true, onlyInViewport: true, pageUpDown: true }}
        coverflowEffect={{
          rotate: 0,
          stretch: 50,
          depth: 400,
          modifier: 1.3,
          slideShadows: false,
        }}
        onSlideChange={(sw) => {
          const idx = sw.activeIndex;
          setActiveIndex(idx);
          crossfadeBg(idx);
          const area = slides[idx]?.area || "Visualization";
          onAreaChange?.(area);
        }}
        className="mySwiper h-full w-full"
      >
        {slides.map((slide, i) => (
          <SwiperSlide
            key={slide.id}
            className="h-full max-w-[85%] overflow-hidden !flex items-center justify-center"
          >
            <SlideItem slide={slide} isActive={i === activeIndex} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BlurBackgroundCarousel;
