// Header.jsx
import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";

const AREAS = ["Visualization", "Programming", "Graphic Design"];

const Header = ({ activeArea = "Visualization", onAreaSelect }) => {
  const viewRef = useRef(null);
  const trackRef = useRef(null);
  const [cellW, setCellW] = useState(0);

  const REPEATS = 7;
  const LOOP = useMemo(
    () =>
      Array.from(
        { length: REPEATS * AREAS.length },
        (_, i) => AREAS[i % AREAS.length]
      ),
    []
  );

  const base = Math.floor(REPEATS / 2) * AREAS.length;
  const [idx, setIdx] = useState(
    () => base + Math.max(0, AREAS.indexOf("Visualization"))
  );

  // medir ancho celda: 1/3 del ancho disponible del header (que ya hereda de Cover)
  useLayoutEffect(() => {
    const measure = () => setCellW((viewRef.current?.clientWidth || 0) / 3);
    measure();
    const ro = new ResizeObserver(measure);
    viewRef.current && ro.observe(viewRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // posición inicial: Visualization centrado
  const didInit = useRef(false);
  useLayoutEffect(() => {
    if (!cellW || didInit.current) return;
    const startIdx = base + AREAS.indexOf("Visualization");
    setIdx(startIdx);
    gsap.set(trackRef.current, { x: -((startIdx - 1) * cellW) });
    didInit.current = true;
  }, [cellW]);

  const nearestIndexForArea = (area, fromIndex) => {
    const targets = [];
    LOOP.forEach((a, i) => a === area && targets.push(i));
    return targets.reduce(
      (best, i) =>
        Math.abs(i - fromIndex) < Math.abs(best - fromIndex) ? i : best,
      targets[0]
    );
  };

  const recenterIfNeeded = () => {
    const len = AREAS.length;
    const min = len;
    const max = LOOP.length - len - 1;
    if (idx < min || idx > max) {
      const normalized = ((idx % len) + len) % len;
      const newIdx = base + normalized;
      const delta = (newIdx - idx) * cellW;
      gsap.set(trackRef.current, { x: `+=${-delta}` });
      setIdx(newIdx);
    }
  };

  // centra cuando cambia el área desde el carrusel
  useEffect(() => {
    if (!cellW || !activeArea) return;
    const target = nearestIndexForArea(activeArea, idx);
    setIdx(target);
    gsap.to(trackRef.current, {
      x: -((target - 1) * cellW),
      duration: 0.5,
      ease: "power2.out",
      onComplete: recenterIfNeeded,
    });
  }, [activeArea, cellW]);

  const handleClick = (area) => {
    const target = nearestIndexForArea(area, idx);
    setIdx(target);
    gsap.to(trackRef.current, {
      x: -((target - 1) * cellW),
      duration: 0.45,
      ease: "power2.out",
      onComplete: recenterIfNeeded,
    });
    onAreaSelect?.(area);
  };

  return (
    <header className="z-40 flex flex-col px-4 gap-2 items-start w-full text-white">
      <img
        src="assets/logo_full1.svg"
        alt="Borsoga Logo"
        className="h-auto w-64"
      />

      {/* Banda de áreas: ocupa el ancho del padre (Cover) y sin padding lateral extra */}
      <div className="w-full border-t border-b border-white leading-8 text-sm overflow-hidden">
        <div
          ref={viewRef}
          className="relative w-full overflow-hidden select-none"
        >
          <div ref={trackRef} className="flex will-change-transform">
            {LOOP.map((label, i) => {
              const isActive = i === idx;
              const rel = i - idx; // -1 = prev (izq), 0 = activo (centro), 1 = next (der)

              // alineación por posición visible (simula justify-between)
              const alignClasses =
                rel === -1
                  ? "justify-start text-left"
                  : rel === 1
                  ? "justify-end text-right"
                  : "justify-center text-center";

              return (
                <button
                  key={`${label}-${i}`}
                  type="button"
                  onClick={() => handleClick(label)}
                  className={`flex-none flex items-center ${alignClasses} cursor-pointer focus:outline-none`}
                  style={{ width: `${cellW}px` }} // cada celda = 1/3 del ancho visible
                  aria-pressed={isActive}
                >
                  <h2
                    className={`w-full transition-opacity duration-300 ease-in-out m-0
                      ${
                        isActive
                          ? "opacity-100 font-bold text-white"
                          : "opacity-70 hover:opacity-100"
                      }
                    `}
                  >
                    {label}
                  </h2>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
