import React, { useEffect, useState, useRef } from "react";

/**
 * Enhanced BTS Gallery
 * - Cinematic hero carousel with parallax & subtle zoom
 * - Masonry thumbnail grid below
 * - Fullscreen lightbox (title, index, open/download)
 * - Lazy-loading thumbnails
 * - Accessible keyboard navigation
 *
 * Replace the `images` array with your actual shoot image URLs or imported assets.
 */

const images = [
  // replace these with your images
  "https://images.unsplash.com/photo-1511376777868-611b54f68947?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1505685296765-3a2736de412f?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1513569771920-c9e1d31714af?auto=format&fit=crop&w=1600&q=80",
];

const Bts = () => {
  // page background setup
  useEffect(() => {
    const prevBg = document.body.style.backgroundColor;
    const prevMargin = document.body.style.margin;
    document.body.style.backgroundColor = "#C00000";
    document.body.style.margin = "0";
    return () => {
      document.body.style.backgroundColor = prevBg || "";
      document.body.style.margin = prevMargin || "";
    };
  }, []);

  // HERO state
  const [currentHero, setCurrentHero] = useState(0);
  const [isHoveringHero, setIsHoveringHero] = useState(false);
  const heroTimer = useRef(null);

  // Lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // small responsive
  const [isNarrow, setIsNarrow] = useState(false);

  // parallax
  const heroRef = useRef(null);
  const parallaxY = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const onResize = () => setIsNarrow(window.innerWidth <= 760);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // HERO autoplay
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

  // parallax scroll handler (lightweight)
  useEffect(() => {
    const onScroll = () => {
      // compute small parallax based on scroll position of hero container
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      // when hero is in viewport, produce small translation
      const mid = rect.top + rect.height / 2 - window.innerHeight / 2;
      const target = Math.max(Math.min(mid * -0.03, 30), -30); // clamp
      parallaxY.current = target;
      // request animation frame to apply transform
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          if (heroRef.current) {
            heroRef.current.style.setProperty(
              "transform",
              `translateY(${parallaxY.current}px)`
            );
          }
          rafRef.current = null;
        });
      }
    };
    // use passive listener
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // lightbox controls
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxOpen]);

  // accessibility focus when lightbox opens
  useEffect(() => {
    if (lightboxOpen) {
      const el = document.getElementById("bts-lightbox");
      if (el) el.focus();
    }
  }, [lightboxOpen]);

  // small helper to open image in new tab (download may be blocked for cross-origin)
  const openImageNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Hero image component with cinematic overlay
  const Hero = () => (
    <div style={s.heroWrap}>
      <div
        ref={heroRef}
        style={{ ...s.hero, transform: "translateY(0)" }}
        onMouseEnter={() => { setIsHoveringHero(true); stopHeroAutoplay(); }}
        onMouseLeave={() => { setIsHoveringHero(false); startHeroAutoplay(); }}
        role="button"
        tabIndex={0}
        aria-label="Open hero photo"
        onClick={() => openLightbox(currentHero)}
      >
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`BTS ${i + 1}`}
            loading={i === currentHero ? "eager" : "lazy"}
            style={{
              ...s.heroImg,
              opacity: i === currentHero ? 1 : 0,
              transform: i === currentHero ? "scale(1.02)" : "scale(1.08)",
            }}
            draggable={false}
          />
        ))}

        <div style={s.heroGradient} aria-hidden="true" />
        <div style={s.heroMeta}>
          <div style={s.heroLabel}>Behind the Scenes</div>
          <div style={s.heroSubtitle}>Moments from the shoot — tap to enlarge</div>
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
      <Hero />

      <section style={s.gridWrap}>
        <div style={isNarrow ? { ...s.masonry, ...s.masonryMobile } : s.masonry}>
          {images.map((src, i) => (
            <figure
              key={i}
              style={s.thumb}
              onClick={() => openLightbox(i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === "Enter" ? openLightbox(i) : null)}
            >
              <img src={src} alt={`Shoot ${i + 1}`} loading="lazy" style={s.thumbImg} />
              <figcaption style={s.caption}>
                <div style={s.captionTitle}>Shoot • Day {i + 1}</div>
                <div style={s.captionSub}>Captured during production</div>
              </figcaption>
            </figure>
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
          onClick={(e) => { if (e.target.id === "bts-lightbox") closeLightbox(); }}
        >
          <div style={s.lightboxInner}>
            <img src={images[lightboxIndex]} alt={`Large ${lightboxIndex + 1}`} style={s.lightboxImg} />
            <div style={s.lightboxFooter}>
              <div style={s.lightboxInfo}>
                <strong style={{fontSize:14}}>Shoot • Day {lightboxIndex + 1}</strong>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.85)" }}>High-res capture</div>
              </div>

              <div style={s.lightboxActions}>
                <button style={s.actionBtn} onClick={() => prevLightbox()} aria-label="Previous">‹ Prev</button>
                <button style={s.actionBtn} onClick={() => openImageNewTab(images[lightboxIndex])} aria-label="Open in new tab">Open</button>
                <button style={s.actionBtn} onClick={() => nextLightbox()} aria-label="Next">Next ›</button>
              </div>
            </div>

            <button style={s.closeBtn} onClick={closeLightbox} aria-label="Close">✕</button>
          </div>
        </div>
      )}

      {/* Inline animations & small responsive CSS */}
      <style>{`
        @media (max-width: 900px) {
          .heroWrap { padding: 12px; }
        }
        @media (max-width: 520px) {
          .heroWrap { padding: 8px; }
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
    paddingTop: 90, // space for navbar
    paddingBottom: 80, // space for footer
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflowX: "hidden",
  },
  heroWrap: {
    width: "100%",
    maxWidth: 1200,
    margin: "12px auto 24px",
    padding: "20px",
    boxSizing: "border-box",
  },
  hero: {
    position: "relative",
    height: "56vh",
    minHeight: 320,
    borderRadius: 18,
    overflow: "hidden",
    boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
    cursor: "pointer",
    background: "linear-gradient(180deg, rgba(0,0,0,0.04), rgba(0,0,0,0.06))",
  },
  heroImg: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "opacity 900ms cubic-bezier(.2,.9,.3,1), transform 900ms ease",
    willChange: "opacity, transform",
    filter: "contrast(1.02) saturate(1.02)",
    display: "block",
  },
  heroGradient: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(180deg, rgba(0,0,0,0) 20%, rgba(0,0,0,0.35) 100%)",
    zIndex: 2,
    pointerEvents: "none",
  },
  heroMeta: {
    position: "absolute",
    left: 22,
    bottom: 20,
    zIndex: 4,
    color: "#fff",
    textShadow: "0 8px 26px rgba(0,0,0,0.6)",
    backdropFilter: "blur(6px)",
    background: "linear-gradient(90deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))",
    padding: "12px 14px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.06)",
  },
  heroLabel: {
    fontFamily: "'Sunny Spells', cursive",
    fontSize: 16,
    marginBottom: 6,
    letterSpacing: 0.6,
  },
  heroSubtitle: {
    fontSize: 12,
    color: "rgba(255,255,255,0.9)",
    margin: 0,
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

  gridWrap: {
    width: "100%",
    maxWidth: 1200,
    margin: "20px auto 48px",
    boxSizing: "border-box",
    padding: "0 20px",
  },

  masonry: {
    columnCount: 3,
    columnGap: "18px",
  },
  masonryMobile: {
    columnCount: 1,
    columnGap: "12px",
  },

  thumb: {
    width: "100%",
    display: "inline-block",
    marginBottom: 18,
    borderRadius: 12,
    overflow: "hidden",
    boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
    transform: "translateZ(0)",
    cursor: "pointer",
    transition: "transform 300ms cubic-bezier(.2,.9,.3,1), box-shadow 200ms ease",
  },
  thumbImg: {
    width: "100%",
    height: "auto",
    display: "block",
    objectFit: "cover",
    transition: "transform 480ms ease",
  },
  caption: {
    padding: "10px 12px",
    color: "white",
    background: "linear-gradient(180deg, rgba(0,0,0,0.0), rgba(0,0,0,0.28))",
    fontSize: 13,
  },

  lightboxOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.88)",
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
