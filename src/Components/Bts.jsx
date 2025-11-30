// Bts.jsx
import React, { useEffect, useRef, useState } from "react";
import DoodleBG from "../assets/morebg.svg"; // same doodle used in More.jsx

const images = [
  "https://images.unsplash.com/photo-1511376777868-611b54f68947?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1505685296765-3a2736de412f?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1513569771920-c9e1d31714af?auto=format&fit=crop&w=1600&q=80",
];

const Bts = () => {
  useEffect(() => {
    const prevBg = document.body.style.backgroundColor;
    const prevMargin = document.body.style.margin;
    document.body.style.backgroundColor = "#B00303";
    document.body.style.margin = "0";
    return () => {
      document.body.style.margin = prevMargin || "";
      document.body.style.backgroundColor = prevBg || "";
    };
  }, []);

  const [currentHero, setCurrentHero] = useState(0);
  const [isHoveringHero, setIsHoveringHero] = useState(false);
  const heroTimer = useRef(null);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const [cols, setCols] = useState(3);
  const [isNarrow, setIsNarrow] = useState(false);

  const heroRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      setIsNarrow(w <= 760);
      if (w >= 1200) setCols(4);
      else if (w >= 900) setCols(3);
      else if (w >= 600) setCols(2);
      else setCols(1);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    startHeroAutoplay();
    return stopHeroAutoplay;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHoveringHero]);

  const startHeroAutoplay = () => {
    stopHeroAutoplay();
    if (isHoveringHero) return;
    heroTimer.current = setInterval(() => {
      setCurrentHero((s) => (s + 1) % images.length);
    }, 4200);
  };
  const stopHeroAutoplay = () => {
    if (heroTimer.current) {
      clearInterval(heroTimer.current);
      heroTimer.current = null;
    }
  };

  // gentle parallax for hero on scroll
  useEffect(() => {
    const onScroll = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const mid = rect.top + rect.height / 2 - window.innerHeight / 2;
      const target = Math.max(Math.min(mid * -0.03, 30), -30);
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          if (heroRef.current) {
            heroRef.current.style.setProperty("transform", `translateY(${target}px)`);
          }
          rafRef.current = null;
        });
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const openLightbox = (i) => {
    setLightboxIndex(i);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };
  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  };
  const prevLightbox = () => setLightboxIndex((i) => (i - 1 + images.length) % images.length);
  const nextLightbox = () => setLightboxIndex((i) => (i + 1) % images.length);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevLightbox();
      if (e.key === "ArrowRight") nextLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen]);

  useEffect(() => {
    if (lightboxOpen) {
      const el = document.getElementById("bts-lightbox");
      if (el) el.focus();
    }
  }, [lightboxOpen]);

  const openImageNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const rotations = [-8, -4, -2, 2, 5, 8];

  // thumb tilt handlers (desktop)
  const handleThumbMove = (e) => {
    const frame = e.currentTarget.querySelector(".polaroid-frame");
    if (!frame || window.innerWidth <= 760) return;
    const rect = frame.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const px = (dx / rect.width) * 10; // tilt factor
    const py = (dy / rect.height) * -6;
    frame.style.transform = `rotateX(${py}deg) rotateY(${px}deg) translateZ(8px) scale(1.01)`;
    frame.style.boxShadow = "0 36px 90px rgba(0,0,0,0.55)";
  };
  const resetThumb = (e) => {
    const frame = e.currentTarget.querySelector(".polaroid-frame");
    if (!frame) return;
    frame.style.transform = frame.dataset.baseTransform || "";
    frame.style.boxShadow = "";
  };

  const PolaroidThumb = ({ src, i, onClick, alt }) => {
    const rot = rotations[i % rotations.length];
    const wrapperStyle = {
      transform: `rotate(${rot}deg)`,
      transition: "transform 250ms ease, box-shadow 220ms ease",
    };

    const thumbImgStyle = {
      ...s.polaroidImg,
      ...(isNarrow ? s.polaroidImgMobile : {}),
    };

    const frameStyle = { ...s.polaroid, ...(isNarrow ? s.polaroidMobile : {}) };

    return (
      <figure
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => (e.key === "Enter" ? onClick() : null)}
        style={{ ...s.polaroidWrapper, ...wrapperStyle }}
        aria-label={`Open shoot image ${i + 1}`}
        onMouseMove={handleThumbMove}
        onMouseLeave={resetThumb}
      >
        <div
          style={frameStyle}
          className={`polaroid-frame ${isNarrow ? "enter" : ""}`}
          data-base-transform={`rotate(${rot}deg)`}
        >
          <img src={src} alt={alt} loading="lazy" style={thumbImgStyle} draggable={false} />
          <div style={isNarrow ? { ...s.polaroidCaption, ...s.polaroidCaptionMobile } : s.polaroidCaption}>
            <div style={s.captionTitle}>Shoot • Day {i + 1}</div>
            <div style={s.captionSub}>Tap to enlarge</div>
          </div>
        </div>
      </figure>
    );
  };

  const Hero = () => (
    <div style={s.heroWrap}>
      <div
        ref={heroRef}
        style={{ ...s.hero, transform: "translateY(0)" }}
        onMouseEnter={() => {
          setIsHoveringHero(true);
          stopHeroAutoplay();
        }}
        onMouseLeave={() => {
          setIsHoveringHero(false);
          startHeroAutoplay();
        }}
        role="button"
        tabIndex={0}
        aria-label="Open hero photo"
      >
        <div style={s.heroPolaroidWrap}>
          <div
            className="hero-polaroid polaroid-frame"
            style={{
              ...s.polaroid,
              ...s.heroPolaroid,
              transform: `rotate(${rotations[currentHero % rotations.length] / 2}deg) scale(1)`,
              border: "1px solid rgba(255,255,255,0.95)",
            }}
            onClick={() => openLightbox(currentHero)}
            onMouseMove={(e) => {
              if (window.innerWidth <= 760) return;
              const el = e.currentTarget;
              const rect = el.getBoundingClientRect();
              const cx = rect.left + rect.width / 2;
              const cy = rect.top + rect.height / 2;
              const dx = e.clientX - cx;
              const dy = e.clientY - cy;
              const px = (dx / rect.width) * 6;
              const py = (dy / rect.height) * -4;
              el.style.transform = `rotate(${rotations[currentHero % rotations.length] / 2}deg) rotateX(${py}deg) rotateY(${px}deg) translateZ(8px) scale(1.01)`;
              el.style.boxShadow = "0 40px 90px rgba(0,0,0,0.66)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.transform = `rotate(${rotations[currentHero % rotations.length] / 2}deg) scale(1)`;
              el.style.boxShadow = s.polaroid.boxShadow;
            }}
          >
            <img
              src={images[currentHero]}
              alt={`BTS ${currentHero + 1}`}
              loading="eager"
              style={{ ...s.polaroidImg, ...s.heroPolaroidImg }}
              draggable={false}
            />
            <div style={{ ...s.polaroidCaption, ...s.heroCaptionOverride }}>
              <div style={{ ...s.captionTitle, fontSize: 18 }}>Behind the Scenes</div>
              <div style={{ ...s.captionSub, fontSize: 13 }}>Moments from the shoot — tap to enlarge</div>
            </div>
          </div>
        </div>
      </div>

      <div style={s.dots}>
        {images.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setCurrentHero(i)}
            style={i === currentHero ? s.dotActive : s.dot}
          />
        ))}
      </div>
    </div>
  );

  return (
    <main style={s.page} aria-live="polite">
      {/* doodle background & overlay (same as More.jsx) */}
      <img src={DoodleBG} alt="" style={s.doodleImgStyle} className="bts-doodle" />
      <div style={s.doodleOverlayStyle} aria-hidden="true" />

      <Hero />

      <section style={s.gridWrap}>
        <div
          style={{
            ...s.grid,
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gap: isNarrow ? 18 : 30,
          }}
        >
          {images.map((src, i) => (
            <PolaroidThumb
              key={i}
              src={src}
              i={i}
              alt={`Shoot ${i + 1}`}
              onClick={() => openLightbox(i)}
            />
          ))}
        </div>
      </section>

      {lightboxOpen && (
        <div
          id="bts-lightbox"
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          style={s.lightboxOverlay}
          onClick={(e) => {
            // close only when backdrop itself was clicked (not inner content)
            if (e.target === e.currentTarget) closeLightbox();
          }}
        >
          <div style={s.lightboxInner}>
            <img src={images[lightboxIndex]} alt={`Large ${lightboxIndex + 1}`} style={s.lightboxImg} />
            <div style={s.lightboxFooter}>
              <div style={s.lightboxInfo}>
                <strong style={{ fontSize: 14 }}>Shoot • Day {lightboxIndex + 1}</strong>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.85)" }}>High-res capture</div>
              </div>

              <div style={s.lightboxActions}>
                <button style={s.actionBtn} onClick={() => prevLightbox()} aria-label="Previous">‹ Prev</button>
                <button style={s.actionBtn} onClick={() => openImageNewTab(images[lightboxIndex])} aria-label="Open in new tab">Open</button>
                <button style={s.actionBtn} onClick={() => nextLightbox()} aria-label="Next">Next ›</button>
              </div>
            </div>

            <button
              type="button"
              style={{ ...s.closeBtn, zIndex: 10002, pointerEvents: "auto" }}
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <style>{`
        /* doodle float & subtle filter */
        .bts-doodle {
          position: fixed;
          top: 90px;
          left: 0;
          width: 100%;
          height: calc(100% - 90px);
          object-fit: cover;
          z-index: 0;
          pointer-events: none;
          filter: saturate(0.98) contrast(0.98) blur(0.2px);
          will-change: transform, opacity;
          animation: floaty 12s ease-in-out infinite;
          opacity: 0.45;
        }
        @keyframes floaty {
          0% { transform: translateY(0px) scale(1); opacity: 0.45; }
          25% { transform: translateY(-8px) scale(1.01); opacity: 0.47; }
          50% { transform: translateY(0px) scale(1); opacity: 0.45; }
          75% { transform: translateY(6px) scale(1.005); opacity: 0.42; }
          100% { transform: translateY(0px) scale(1); opacity: 0.45; }
        }

        /* doodle overlay for depth */
        .bts-doodle + div {
          position: fixed;
          top: 90px;
          left: 0;
          right: 0;
          /* stop overlay before the footer so footer doesn't get tinted */
          bottom: 80px; /* <= matches paddingBottom/footer area */
          background: linear-gradient(180deg, rgba(176,3,3,0.42) 0%, rgba(153,1,1,0.36) 60%, rgba(16,0,0,0.12) 100%);
          z-index: 1;
          pointer-events: none;
          mix-blend-mode: normal;
        }

        /* Polaroid hover interactions: strong lift */
        .polaroid-frame:hover { transform: translateY(-10px) rotate(0deg) scale(1.035) !important; box-shadow: 0 36px 90px rgba(0,0,0,0.55) !important; }
        /* entrance animation used on mobile (polaroid frames have .enter class when narrow) */
        .polaroid-frame.enter {
          animation: swipeUp 420ms cubic-bezier(.2,.9,.3,1) both;
        }
        @keyframes swipeUp {
          0% { transform: translateY(18px) rotate(0deg); opacity: 0; }
          60% { transform: translateY(-8px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(0) rotate(0deg); opacity: 1; }
        }

        /* Prevent image selection when double-clicking */
        img { user-select: none; -webkit-user-drag: none; }

        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .polaroid-frame, .hero-polaroid { animation: none !important; transition: none !important; transform: none !important; }
          .bts-doodle { animation: none !important; }
        }

        /* responsive tweaks */
        @media (max-width: 900px) {
          .bts-doodle { top: 72px; height: calc(100% - 72px); }
        }
        @media (max-width: 480px) {
          .bts-doodle { top: 64px; height: calc(100% - 64px); opacity: 0.48; }
        }
      `}</style>
    </main>
  );
};

export default Bts;

/* ======================
   STYLES (JS object)
   ====================== */
const s = {
  page: {
    minHeight: "100vh",
    width: "100%",
    boxSizing: "border-box",
    paddingTop: 90,
    paddingBottom: 80,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflowX: "hidden",
    backgroundColor: "#B00303",
    position: "relative",
    zIndex: 2,
  },

  doodleImgStyle: {
    position: "fixed",
    top: 90,
    left: 0,
    width: "100%",
    height: "calc(100% - 90px)",
    objectFit: "cover",
    zIndex: 0,
    pointerEvents: "none",
    opacity: 0.45,
  },

  doodleOverlayStyle: {
    position: "fixed",
    top: 90,
    left: 0,
    right: 0,
    bottom: 80, // matches CSS .bts-doodle + div bottom
    background:
      "linear-gradient(180deg, rgba(176,3,3,0.42) 0%, rgba(153,1,1,0.36) 60%, rgba(16,0,0,0.12) 100%)",
    zIndex: 1,
    pointerEvents: "none",
    mixBlendMode: "normal",
  },

  heroWrap: {
    width: "100%",
    maxWidth: 1200,
    margin: "12px auto 24px",
    padding: "8px",
    boxSizing: "border-box",
    zIndex: 3,
  },

  hero: {
    position: "relative",
    height: "56vh",
    minHeight: 320,
    borderRadius: 18,
    overflow: "visible",
    boxShadow: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  heroPolaroidWrap: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 4,
    pointerEvents: "auto",
  },

  grid: {
    display: "grid",
    width: "100%",
    maxWidth: 1200,
    margin: "0 auto",
    boxSizing: "border-box",
  },

  gridWrap: {
    width: "100%",
    maxWidth: 1200,
    margin: "20px auto 48px",
    boxSizing: "border-box",
    padding: "0 20px",
    zIndex: 3,
  },

  polaroidWrapper: {
    display: "inline-block",
    width: "100%",
    breakInside: "avoid",
    cursor: "pointer",
    marginBottom: 0,
  },

  // Polaroid (white glossy frame like More.jsx)
  polaroid: {
    width: "100%",
    maxWidth: "100%",
    margin: "0 auto",
    background: "linear-gradient(180deg, #fff 0%, #f6f6f6 100%)",
    borderRadius: 10,
    paddingBottom: 12,
    boxSizing: "border-box",
    boxShadow: "0 18px 48px rgba(0,0,0,0.45)",
    border: "1px solid rgba(255,255,255,0.95)",
    transformOrigin: "center center",
    transition: "transform 220ms ease, box-shadow 220ms ease",
    overflow: "hidden",
    cursor: "pointer",
  },

  polaroidMobile: {
    maxWidth: "100%",
    paddingBottom: 10,
    borderRadius: 8,
  },

  // HERO: use same opaque white gradient (fixes the red show-through)
  heroPolaroid: {
    maxWidth: 920,
    width: "92%",
    paddingBottom: 16,
    borderRadius: 14,
    boxShadow: "0 28px 90px rgba(0,0,0,0.6), 0 8px 30px rgba(176,3,3,0.06)",
    border: "1px solid rgba(255,255,255,0.95)",
    // make it opaque like the other polaroids
    background: "linear-gradient(180deg, #ffffff 0%, #f6f6f6 100%)",
  },

  polaroidImg: {
    width: "100%",
    display: "block",
    objectFit: "cover",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    height: "auto",
    maxHeight: 360,
  },

  polaroidImgMobile: {
    objectFit: "contain",
    height: "auto",
    maxHeight: "50vh",
  },

  heroPolaroidImg: {
    height: "56vh",
    maxHeight: "68vh",
    objectFit: "cover",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  polaroidCaption: {
    padding: "10px 12px 14px",
    background: "transparent",
    textAlign: "center",
    color: "rgba(0,0,0,0.8)",
  },
  polaroidCaptionMobile: {
    padding: "10px 10px 12px",
  },

  captionTitle: {
    fontFamily: "'Sunny Spells', cursive",
    fontSize: 14,
    marginBottom: 4,
    color: "rgba(0,0,0,0.9)",
  },
  captionSub: {
    fontSize: 12,
    color: "rgba(0,0,0,0.6)",
  },

  heroCaptionOverride: {
    color: "rgba(0,0,0,0.9)",
  },

  dots: {
    display: "flex",
    gap: 10,
    justifyContent: "center",
    marginTop: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    background: "rgba(255,255,255,0.45)",
    border: "none",
    cursor: "pointer",
    transition: "all 220ms ease",
  },
  dotActive: {
    width: 12,
    height: 12,
    borderRadius: 12,
    background: "#FFD700",
    border: "none",
    cursor: "pointer",
    transition: "all 220ms ease",
  },

  lightboxOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.92)",
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  lightboxInner: {
    position: "relative",
    maxWidth: "96%",
    maxHeight: "94%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    pointerEvents: "auto", // ensure inner area accepts clicks
    zIndex: 10001,
  },
  lightboxImg: {
    maxWidth: "100%",
    maxHeight: "82vh",
    borderRadius: 12,
    boxShadow: "0 18px 80px rgba(0,0,0,0.7)",
  },
  lightboxFooter: {
    marginTop: 12,
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
  },
  lightboxInfo: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  lightboxActions: {
    display: "flex",
    gap: 8,
  },
  actionBtn: {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "#fff",
    padding: "8px 12px",
    borderRadius: 8,
    cursor: "pointer",
  },
  closeBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "#fff",
    padding: "6px 10px",
    borderRadius: 8,
    cursor: "pointer",
  },
};
