// Bts.jsx — Clean version (NO footer, NO collab)
import React, { useCallback, useEffect, useRef, useState, useMemo } from "react";
import DoodleBG from "../assets/Mobile view phone view final.svg";

const images = [
  "https://images.unsplash.com/photo-1511376777868-611b54f68947?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1505685296765-3a2736de412f?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1513569771920-c9e1d31714af?auto=format&fit=crop&w=1600&q=80",
];

const rotations = [-8, -4, -2, 2, 5, 8];

const Bts = () => {
  const [layout, setLayout] = useState({ navHeight: 90, isMobile: false });

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w <= 480) return { navHeight: 64, isMobile: true };
      if (w <= 900) return { navHeight: 72, isMobile: false };
      return { navHeight: 90, isMobile: false };
    };
    const onResize = () => setLayout(compute());
    setLayout(compute());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.classList.add("bts-body-bg");
    return () => document.body.classList.remove("bts-body-bg");
  }, []);

  const [currentHero, setCurrentHero] = useState(0);
  const [isHoveringHero, setIsHoveringHero] = useState(false);
  const heroTimer = useRef(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Columns
  const [cols, setCols] = useState(3);
  const [isNarrow, setIsNarrow] = useState(false);

  useEffect(() => {
    const fn = () => {
      const w = window.innerWidth;
      setIsNarrow(w <= 760);
      if (w >= 1200) setCols(4);
      else if (w >= 900) setCols(3);
      else if (w >= 600) setCols(2);
      else setCols(1);
    };
    fn();
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  // Autoplay
  const startHeroAutoplay = useCallback(() => {
    if (heroTimer.current) return;
    if (isHoveringHero) return;
    heroTimer.current = setInterval(() => {
      setCurrentHero((s) => (s + 1) % images.length);
    }, 4200);
  }, [isHoveringHero]);

  const stopHeroAutoplay = useCallback(() => {
    if (heroTimer.current) {
      clearInterval(heroTimer.current);
      heroTimer.current = null;
    }
  }, []);

  useEffect(() => {
    stopHeroAutoplay();
    if (!isHoveringHero) startHeroAutoplay();
    return stopHeroAutoplay;
  }, [isHoveringHero, startHeroAutoplay, stopHeroAutoplay]);

  // Hero parallax
  const heroRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      if (!heroRef.current) return;
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        const rect = heroRef.current.getBoundingClientRect();
        const mid = rect.top + rect.height / 2 - window.innerHeight / 2;
        const target = Math.max(Math.min(mid * -0.03, 30), -30);
        heroRef.current.style.transform = `translateY(${target}px)`;
        rafRef.current = null;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Lightbox keyboard
  useEffect(() => {
    if (!lightboxOpen) return;
    const key = (e) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") setLightboxIndex((i) => (i - 1 + images.length) % images.length);
      if (e.key === "ArrowRight") setLightboxIndex((i) => (i + 1) % images.length);
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [lightboxOpen]);

  // Lightbox scroll lock
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [lightboxOpen]);

  // Polaroid hover
  const handleThumbMove = useCallback((e) => {
    if (window.innerWidth <= 760) return;
    const frame = e.currentTarget.querySelector(".polaroid-frame");
    if (!frame) return;
    const rect = frame.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const px = (dx / rect.width) * 10;
    const py = (dy / rect.height) * -6;
    frame.style.transform = `rotateX(${py}deg) rotateY(${px}deg) scale(1.01)`;
  }, []);

  const resetThumb = useCallback((e) => {
    const frame = e.currentTarget.querySelector(".polaroid-frame");
    if (!frame) return;
    frame.style.transform = frame.dataset.baseTransform || "";
  }, []);

  // Polaroid component
  const PolaroidThumb = useMemo(() => {
    return React.memo(function Thumb({ src, i, onClick }) {
      const rot = rotations[i % rotations.length];
      const frameStyle = {
        transform: `rotate(${rot}deg)`,
        transition: "transform 250ms ease",
      };

      return (
        <figure
          role="button"
          tabIndex={0}
          onClick={onClick}
          onKeyDown={(e) => e.key === "Enter" && onClick()}
          style={{ ...s.polaroidWrapper, ...frameStyle }}
          onMouseMove={handleThumbMove}
          onMouseLeave={resetThumb}
        >
          <div
            className="polaroid-frame"
            data-base-transform={`rotate(${rot}deg)`}
            style={s.polaroid}
          >
            <img src={src} alt="" loading="lazy" style={s.polaroidImg} draggable={false} />
            <div style={s.polaroidCaption}>
              <div style={s.captionTitle}>Shoot • Day {i + 1}</div>
              <div style={s.captionSub}>Tap to enlarge</div>
            </div>
          </div>
        </figure>
      );
    });
  }, [handleThumbMove, resetThumb]);

  // Hero
  const Hero = useCallback(() => {
    const rot = rotations[currentHero % rotations.length] / 2;

    return (
      <div style={s.heroWrap}>
        <div
          ref={heroRef}
          style={s.hero}
          onMouseEnter={() => {
            setIsHoveringHero(true);
            stopHeroAutoplay();
          }}
          onMouseLeave={() => {
            setIsHoveringHero(false);
            startHeroAutoplay();
          }}
        >
          <div style={s.heroPolaroidWrap}>
            <div
              className="polaroid-frame"
              style={{
                ...s.polaroid,
                ...s.heroPolaroid,
                transform: `rotate(${rot}deg)`,
              }}
              onClick={() => setLightboxOpen(true) || setLightboxIndex(currentHero)}
            >
              <img
                src={images[currentHero]}
                style={{ ...s.polaroidImg, ...s.heroPolaroidImg }}
              />

              <div style={{ ...s.polaroidCaption, ...s.heroCaptionOverride }}>
                <div style={{ ...s.captionTitle, fontSize: 18 }}>Behind the Scenes</div>
                <div style={{ ...s.captionSub, fontSize: 13 }}>Tap to enlarge</div>
              </div>
            </div>
          </div>
        </div>

        <div style={s.dots}>
          {images.map((_, i) => (
            <button
              key={i}
              style={i === currentHero ? s.dotActive : s.dot}
              onClick={() => setCurrentHero(i)}
            />
          ))}
        </div>
      </div>
    );
  }, [currentHero, startHeroAutoplay, stopHeroAutoplay]);

  return (
    <main style={{ ...s.page, paddingTop: layout.navHeight }}>

      {/* DOODLE BG — no clipping needed now */}
      <img
        src={DoodleBG}
        style={{
          ...s.doodleImgStyle,
          top: layout.navHeight,
          height: `calc(100% - ${layout.navHeight}px)`,
        }}
        className="bts-doodle"
      />

      <Hero />

      <section style={s.gridWrap}>
        <div style={{ ...s.grid, gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
          {images.map((src, i) => (
            <PolaroidThumb
              key={i}
              src={src}
              i={i}
              onClick={() => {
                setLightboxIndex(i);
                setLightboxOpen(true);
              }}
            />
          ))}
        </div>
      </section>

      {lightboxOpen && (
        <div
          style={s.lightboxOverlay}
          onClick={(e) => e.target === e.currentTarget && setLightboxOpen(false)}
        >
          <div style={s.lightboxInner}>
            <img src={images[lightboxIndex]} style={s.lightboxImg} />

            <button
              style={s.closeBtn}
              onClick={() => setLightboxOpen(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <style>
        {`
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            overflow-x: hidden;
          }

          .bts-doodle {
            position: fixed;
            left: 0;
            width: 100%;
            object-fit: cover;
            z-index: 0;
            pointer-events: none;
          }

          .bts-body-bg {
            background-color: #B00303 !important;
          }
        `}
      </style>
    </main>
  );
};

export default Bts;

const s = {
  page: {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "#B00303",
    position: "relative",
    zIndex: 2,
    overflowX: "hidden",
  },

  doodleImgStyle: {
    position: "fixed",
    left: 0,
    width: "100%",
    objectFit: "cover",
    zIndex: 0,
  },

  heroWrap: {
    width: "100%",
    maxWidth: 1200,
    margin: "20px auto",
    padding: "8px",
    zIndex: 3,
  },

  hero: {
    position: "relative",
    height: "56vh",
    borderRadius: 18,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  heroPolaroidWrap: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },

  polaroid: {
    width: "100%",
    maxWidth: 920,
    background: "linear-gradient(180deg, #fff 0%, #f6f6f6 100%)",
    borderRadius: 14,
    boxShadow: "0 18px 48px rgba(0,0,0,0.45)",
    paddingBottom: 14,
    overflow: "hidden",
    cursor: "pointer",
    transition: "transform 0.2s ease",
  },

  heroPolaroid: {
    maxWidth: 920,
  },

  polaroidImg: {
    width: "100%",
    display: "block",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    objectFit: "cover",
  },

  heroPolaroidImg: {
    height: "56vh",
    objectFit: "cover",
  },

  polaroidCaption: {
    textAlign: "center",
    padding: "10px",
    color: "rgba(0,0,0,0.8)",
  },

  captionTitle: {
    fontSize: 14,
    marginBottom: 4,
  },

  captionSub: {
    fontSize: 12,
    opacity: 0.6,
  },

  heroCaptionOverride: {},

  gridWrap: {
    width: "100%",
    maxWidth: 1200,
    padding: "20px",
    zIndex: 3,
  },

  grid: {
    display: "grid",
    gap: 20,
  },

  polaroidWrapper: {
    width: "100%",
    cursor: "pointer",
  },

  dots: {
    display: "flex",
    justifyContent: "center",
    gap: 10,
    marginTop: 12,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.4)",
    border: "none",
  },

  dotActive: {
    width: 12,
    height: 12,
    borderRadius: "50%",
    background: "#FFD700",
    border: "none",
  },

  lightboxOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.9)",
    zIndex: 9999,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  lightboxInner: {
    position: "relative",
    maxWidth: "90%",
    maxHeight: "90%",
  },

  lightboxImg: {
    width: "100%",
    maxHeight: "80vh",
    borderRadius: 10,
  },

  closeBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    background: "rgba(255,255,255,0.1)",
    border: "none",
    borderRadius: 6,
    color: "#fff",
    fontSize: 20,
    padding: "4px 10px",
    cursor: "pointer",
  },
};
