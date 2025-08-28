// npm i gsap
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const Footer = () => {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const contentRef = useRef(null);
  const arrowRef = useRef(null);
  const tlRef = useRef(null);

  // Estado inicial del panel (cerrado)
  useLayoutEffect(() => {
    gsap.set(panelRef.current, {
      height: 0,
      opacity: 0,
      y: -8,
      overflow: "hidden",
    });
  }, []);

  // Animación abrir/cerrar
  useEffect(() => {
    const h = contentRef.current?.offsetHeight || 0;
    tlRef.current && tlRef.current.kill();

    tlRef.current = gsap.timeline({
      defaults: { ease: "power2.out", duration: 0.45 },
    });

    if (open) {
      tlRef.current
        .to(panelRef.current, { height: h, opacity: 1, y: 0 }, 0)
        .to(arrowRef.current, { rotate: 45 }, 0);
    } else {
      tlRef.current
        .to(panelRef.current, { height: 0, opacity: 0, y: -8 }, 0)
        .to(arrowRef.current, { rotate: 0 }, 0);
    }

    return () => tlRef.current?.kill();
  }, [open]);

  // Recalcular altura si cambia el viewport mientras está abierto
  useEffect(() => {
    const onResize = () => {
      if (!open) return;
      const h = contentRef.current?.offsetHeight || 0;
      gsap.set(panelRef.current, { height: h });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open]);

  return (
    <footer className="z-10 flex flex-col h-auto px-4 items-start w-full text-white">
      {/* Cabecera: botón Contact/Now + flecha */}
      <div className="border-t border-white flex justify-between items-end w-full py-2">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="w-full flex items-end justify-between gap-3 focus:outline-none"
        >
          <span className="text-2xl leading-6 text-left">
            <h2 className="font-thin">Contact</h2>
            <h2 className="font-semibold">Now</h2>
          </span>

          {/* Flecha (rota con GSAP) */}
          <img
            ref={arrowRef}
            src="assets/arrow.svg"
            alt="toggle"
            className="w-6 h-auto pb-1 origin-center will-change-transform"
          />
        </button>
      </div>

      {/* Panel desplegable (aparece debajo de Contact/Now) */}
      <div ref={panelRef} className="w-full overflow-hidden">
        <div
          ref={contentRef}
          className="pt-2 pb-4 flex flex-col items-center justify-center font-light gap-2"
        >
          {/* Teléfono */}
          <a
            href="https://wa.me/17868524847"
            target="_blank"
            className="flex items-center gap-3 hover:underline"
          >
            <img src="assets/phone.svg" alt="mail icon" className="w-5 h-5" />
            786-852-4847
          </a>

          {/* Email */}
          <a
            href="mailto:wilfredo@borsogastudio.com"
            className="flex items-center gap-3 hover:underline"
          >
            <img src="assets/mail.svg" alt="mail icon" className="w-5 h-5" />
            wilfredo@borsogastudio.com
          </a>
        </div>
      </div>

      {/* Barra inferior */}
      <div className="flex justify-between w-full border-t border-b border-white py-1">
        <h2 className="font-semibold">Based in Miami</h2>
        <h2 className="font-light">
          Our site is <span className="italic font-semibold">coming soon!</span>
        </h2>
      </div>
    </footer>
  );
};

export default Footer;
