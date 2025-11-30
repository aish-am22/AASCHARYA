// More.jsx
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DoodleBG from "../assets/morebg.svg";
import DummyPolaroid from "../assets/Bomma-1.svg"; // keep your local asset or swap to an online URL

const More = () => {
  const navigate = useNavigate();

  const [layout, setLayout] = useState({
    navHeight: 90,
    footerHeight: 80,
    isMobile: false,
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [polaroidEnter, setPolaroidEnter] = useState(false); // for mobile swipe-up entrance
  const polaroidRef = useRef(null);

  useEffect(() => {
    const computeLayout = () => {
      const w = window.innerWidth;
      if (w <= 480) {
        return { navHeight: 64, footerHeight: 64, isMobile: true };
      } else if (w <= 900) {
        return { navHeight: 72, footerHeight: 72, isMobile: false };
      } else {
        return { navHeight: 90, footerHeight: 80, isMobile: false };
      }
    };

    const handleResize = () => setLayout(computeLayout());
    setLayout(computeLayout());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // trigger mobile polaroid entrance when the layout becomes mobile
  useEffect(() => {
    if (layout.isMobile) {
      // small delay so animation is visible after mount
      const t = setTimeout(() => setPolaroidEnter(true), 140);
      return () => clearTimeout(t);
    } else {
      setPolaroidEnter(false);
    }
  }, [layout.isMobile]);

  // page base styling
  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.backgroundColor = "#B00303";
    return () => {
      document.body.style.margin = "";
      document.body.style.backgroundColor = "";
    };
  }, []);

  const NAVBAR_HEIGHT = layout.navHeight;
  const FOOTER_HEIGHT = layout.footerHeight;

  const containerStyle = {
    position: "relative",
    width: "100%",
    minHeight: `calc(100vh - ${FOOTER_HEIGHT}px)`,
    overflow: "hidden",
    backgroundColor: "#B00303",
    display: "block",
  };

  const doodleImgStyle = {
    position: "absolute",
    top: NAVBAR_HEIGHT,
    left: 0,
    width: "100%",
    height: `calc(100% - ${NAVBAR_HEIGHT}px)`,
    objectFit: "cover",
    zIndex: 0,
    pointerEvents: "none",
    opacity: layout.isMobile ? 0.48 : 0.45,
    transformOrigin: "center",
    willChange: "transform, opacity",
  };

  const doodleOverlayStyle = {
    position: "absolute",
    top: NAVBAR_HEIGHT,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "linear-gradient(180deg, rgba(176,3,3,0.42) 0%, rgba(153,1,1,0.36) 60%, rgba(16,0,0,0.12) 100%)",
    zIndex: 1,
    pointerEvents: "none",
    mixBlendMode: "normal",
  };

  // right-floating vertical controls (desktop)
  const rightControlsStyle = {
    position: "fixed",
    right: layout.isMobile ? "8px" : "24px",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 6,
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    alignItems: "center",
    pointerEvents: "auto",
  };

  // center content wrapper - larger right padding to avoid overlap with right controls
  const contentWrapper = {
    position: "relative",
    zIndex: 2,
    minHeight: `calc(100vh - ${NAVBAR_HEIGHT + FOOTER_HEIGHT}px)`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: `${NAVBAR_HEIGHT}px`,
    paddingBottom: "40px",
    boxSizing: "border-box",
    paddingLeft: layout.isMobile ? "12px" : "120px",
    paddingRight: layout.isMobile ? "12px" : "150px",
  };

  // polaroid container style — increased size
  const polaroidContainerStyle = {
    position: "relative",
    zIndex: 3,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: layout.isMobile ? "96%" : "560px",
    maxWidth: "92%",
    margin: "0 auto",
    perspective: "1000px",
  };

  // polaroid frame style
  const polaroidStyle = {
    display: "block",
    width: "100%",
    borderRadius: "6px",
    padding: layout.isMobile ? "16px 16px 30px 16px" : "22px 22px 40px 22px",
    background: "linear-gradient(180deg, #fff 0%, #f6f6f6 100%)",
    boxShadow:
      "0 30px 60px rgba(0,0,0,0.45), inset 0 2px 6px rgba(0,0,0,0.06)",
    transform: layout.isMobile ? "rotate(0deg)" : "rotate(-2deg)",
    transition: "transform 260ms cubic-bezier(.2,.9,.3,1), box-shadow 260ms, opacity 260ms",
    cursor: "grab",
    userSelect: "none",
  };

  const polaroidImgStyle = {
    width: "100%",
    height: "auto",
    display: "block",
    borderRadius: "4px",
    objectFit: "cover",
    boxShadow: "0 8px 26px rgba(0,0,0,0.36)",
  };

  // handlers for gentle tilt on mouse move (desktop)
  const handlePolaroidMove = (e) => {
    const el = polaroidRef.current;
    if (!el || layout.isMobile) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const px = (dx / rect.width) * 12; // tilt factor
    const py = (dy / rect.height) * -8;
    el.style.transform = `rotateX(${py}deg) rotateY(${px}deg) translateZ(6px)`;
    el.style.boxShadow = "0 40px 80px rgba(0,0,0,0.55)";
  };

  const resetPolaroid = () => {
    const el = polaroidRef.current;
    if (!el) return;
    el.style.transform = layout.isMobile ? "rotate(0deg)" : "rotate(-2deg)";
    el.style.boxShadow =
      layout.isMobile
        ? "0 32px 80px rgba(0,0,0,0.45)" // stronger mobile shadow
        : "0 30px 60px rgba(0,0,0,0.45), inset 0 2px 6px rgba(0,0,0,0.06)";
  };

  const handleBtsClick = () => {
    setMobileMenuOpen(false);
    navigate("/bts");
  };
  const handleFollowClick = () => {
    setMobileMenuOpen(false);
    navigate("/followus");
  };

  return (
    <div style={containerStyle} aria-label="More section">
      <img src={DoodleBG} alt="" style={doodleImgStyle} className="more-doodle" />

      <div style={doodleOverlayStyle} aria-hidden="true" />

      {/* visual vignette */}
      <div className="visual-layer" aria-hidden="true" />

      {/* RIGHT vertical controls (desktop & tablet). On mobile these are hidden via CSS. */}
      <div style={rightControlsStyle} className="right-controls">
        <button
          className="side-btn"
          onClick={handleBtsClick}
          aria-label="BTS"
          title="BTS"
        >
          BTS
        </button>

        <button
          className="side-btn alt"
          onClick={handleFollowClick}
          aria-label="Follow"
          title="Follow"
        >
          FOLLOW
        </button>
      </div>

      {/* MOBILE: floating FAB (shown only on small screens) */}
      <div className={`mobile-fab-wrap ${mobileMenuOpen ? "open" : ""}`} aria-hidden={false}>
        <button
          className={`mobile-fab ${mobileMenuOpen ? "open" : ""}`}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileMenuOpen((s) => !s)}
          title={mobileMenuOpen ? "Close" : "Menu"}
        >
          <span className="fab-line" aria-hidden="true" />
          <span className="fab-line" aria-hidden="true" />
        </button>

        <div className={`mobile-fab-menu ${mobileMenuOpen ? "show" : ""}`} role="menu">
          <button className="mobile-action" onClick={handleBtsClick} role="menuitem" aria-label="BTS">
            BTS
          </button>
          <button className="mobile-action alt" onClick={handleFollowClick} role="menuitem" aria-label="Follow">
            FOLLOW
          </button>
        </div>
      </div>

      <div style={contentWrapper} className="contentWrapper">
        {/* center polaroid */}
        <div style={polaroidContainerStyle} className="polaroid-container">
          <div
            ref={polaroidRef}
            style={polaroidStyle}
            className={`polaroid ${polaroidEnter ? "enter" : ""} ${layout.isMobile ? "mobile-shadow" : ""}`}
            onMouseMove={handlePolaroidMove}
            onMouseLeave={resetPolaroid}
            role="img"
            aria-label="Demo polaroid"
          >
            <img
              src={DummyPolaroid}
              alt="Demo polaroid"
              style={polaroidImgStyle}
              className="polaroid-img"
            />
            
            <div
              style={{
                marginTop: 12,
                fontFamily: "'Sunny Spells', cursive",
                textAlign: "center",
                color: "#2b2b2b",
              }}
            >
              <div style={{ fontSize: layout.isMobile ? 18 : 16, fontWeight: 700 }}>AASCHARYÁ</div>
              <div style={{ fontSize: layout.isMobile ? 14 : 13, opacity: 0.7, marginTop: 6 }}>
                A little memory
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* visual-layer: vignette */
        .visual-layer {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
        }
        .visual-layer::after {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.18) 100%);
          mix-blend-mode: multiply;
          pointer-events: none;
        }

        /* right side buttons for desktop / tablet */
        .right-controls { display: flex; }
        .side-btn {
          background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02));
          color: white;
          border: 1px solid rgba(255,255,255,0.08);
          padding: 10px 18px;
          border-radius: 999px;
          font-weight: 700;
          letter-spacing: 1px;
          cursor: pointer;
          width: 120px;
          text-align: center;
          box-shadow: 0 12px 30px rgba(0,0,0,0.48);
          transition: transform 220ms cubic-bezier(.2,.9,.3,1), box-shadow 220ms;
          font-family: 'Sunny Spells', cursive;
          z-index: 6;
        }
        .side-btn.alt {
          background: linear-gradient(180deg, rgba(0,0,0,0.36), rgba(16,0,0,0.18));
        }
        .side-btn:hover {
          transform: translateX(-6px) scale(1.02);
          box-shadow: 0 26px 60px rgba(176,3,3,0.12), 0 12px 36px rgba(0,0,0,0.55);
        }
        .side-btn:active { transform: translateX(-3px) scale(0.995); }

        /* MOBILE FAB: hidden by default, visible on small screens */
        .mobile-fab-wrap {
          position: fixed;
          bottom: 18px;
          right: 18px;
          z-index: 999;
          display: none; /* desktop: hidden */
          align-items: center;
          gap: 10px;
        }

        .mobile-fab {
          width: 56px;
          height: 56px;
          border-radius: 999px;
          border: none;
          background: linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.04));
          box-shadow: 0 20px 50px rgba(0,0,0,0.45);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          position: relative;
          transition: transform 160ms, box-shadow 160ms;
        }
        .mobile-fab:focus { outline: 2px solid rgba(255,255,255,0.12); }
        .mobile-fab.open { transform: rotate(90deg); }

        /* fab icon lines */
        .fab-line {
          position: absolute;
          width: 18px;
          height: 2px;
          background: white;
          border-radius: 2px;
          transform-origin: center;
          transition: transform 220ms cubic-bezier(.2,.9,.3,1), opacity 160ms;
        }
        .mobile-fab .fab-line:first-child { transform: translateY(-5px); }
        .mobile-fab .fab-line:last-child { transform: translateY(5px); }

        /* when open: transform lines to X */
        .mobile-fab.open .fab-line:first-child {
          transform: rotate(45deg);
        }
        .mobile-fab.open .fab-line:last-child {
          transform: rotate(-45deg);
        }

        /* mobile menu (hidden until open) */
        .mobile-fab-menu {
          display: flex;
          flex-direction: column;
          gap: 10px;
          transform: scale(0.92);
          opacity: 0;
          pointer-events: none;
          transition: transform 200ms cubic-bezier(.2,.9,.3,1), opacity 180ms;
          transform-origin: bottom right;
        }
        .mobile-fab-wrap.open .mobile-fab-menu {
          transform: scale(1);
          opacity: 1;
          pointer-events: auto;
        }

        .mobile-action {
          padding: 10px 16px;
          border-radius: 999px;
          border: none;
          font-weight: 700;
          letter-spacing: 1px;
          cursor: pointer;
          background: linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02));
          color: white;
          box-shadow: 0 12px 30px rgba(0,0,0,0.45);
          width: 120px;
          text-align: center;
        }
        .mobile-action.alt {
          background: linear-gradient(180deg, rgba(0,0,0,0.36), rgba(16,0,0,0.18));
        }

        /* show mobile FAB only on small screens; hide desktop right-controls */
        @media (max-width: 480px) {
          .right-controls { display: none !important; } /* hide desktop right buttons */
          .mobile-fab-wrap { display: flex !important; } /* show mobile FAB */

          /* improved mobile spacing & polaroid sizing */
          .contentWrapper {
            padding-top: 40px !important;
            padding-left: 12px !important;
            padding-right: 12px !important;
            justify-content: center !important;
          }

          .polaroid-container {
            width: 96% !important;
            margin: 0 auto !important;
          }

          .polaroid {
            padding: 16px 14px 28px 14px !important;
            transform: translateY(0) rotate(0deg) !important;
            box-shadow: 0 32px 80px rgba(0,0,0,0.45) !important;
            border-radius: 8px !important;
            opacity: 0; /* we'll animate it in */
          }

          .polaroid-img { border-radius: 6px !important; }

          /* entrance animation: swipe up + fade */
          .polaroid.enter {
            animation: swipeUp 420ms cubic-bezier(.2,.9,.3,1) both;
          }
          @keyframes swipeUp {
            0% { transform: translateY(18px) rotate(0deg); opacity: 0; }
            60% { transform: translateY(-8px) rotate(0deg); opacity: 1; }
            100% { transform: translateY(0) rotate(0deg); opacity: 1; }
          }
        }

        @media (max-width: 900px) {
          .polaroid { transform: rotate(0deg) !important; }
          .right-controls { right: 8px; }
        }

        /* doodle float */
        .more-doodle {
          animation: floaty 12s ease-in-out infinite;
          filter: saturate(0.98) contrast(0.98) blur(0.2px);
          will-change: transform, opacity;
        }
        @keyframes floaty {
          0% { transform: translateY(0px) scale(1); opacity: ${layout.isMobile ? 0.48 : 0.45}; }
          25% { transform: translateY(-8px) scale(1.01); opacity: ${layout.isMobile ? 0.50 : 0.47}; }
          50% { transform: translateY(0px) scale(1); opacity: ${layout.isMobile ? 0.48 : 0.45}; }
          75% { transform: translateY(6px) scale(1.005); opacity: ${layout.isMobile ? 0.44 : 0.42}; }
          100% { transform: translateY(0px) scale(1); opacity: ${layout.isMobile ? 0.48 : 0.45}; }
        }

        /* reduced motion preference */
        @media (prefers-reduced-motion: reduce) {
          .more-doodle, .polaroid, .side-btn, .mobile-fab, .mobile-action { animation: none !important; transition: none !important; }
        }
      `}</style>
    </div>
  );
};

export default More;
