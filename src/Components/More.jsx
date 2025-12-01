// More.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DoodleBG from "../assets/morebg.svg";
import CoverImage from "../assets/download.jpeg";

const More = () => {
  const navigate = useNavigate();
  const [layout, setLayout] = useState({
    navHeight: 90,
    footerHeight: 80,
    isMobile: false,
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const computeLayout = () => {
      const w = window.innerWidth;
      if (w <= 480) return { navHeight: 64, footerHeight: 64, isMobile: true };
      if (w <= 900) return { navHeight: 72, footerHeight: 72, isMobile: false };
      return { navHeight: 90, footerHeight: 80, isMobile: false };
    };
    const onResize = () => setLayout(computeLayout());
    setLayout(computeLayout());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

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
    opacity: 1,
    transformOrigin: "center",
    willChange: "transform, opacity",
    animation: "floaty 12s ease-in-out infinite",
    filter: "saturate(0.98) contrast(0.98) blur(0.2px)",
  };

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

  const contentWrapper = {
    position: "relative",
    zIndex: 3,
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

  const imageStyle = {
    width: layout.isMobile ? "92%" : "420px",
    borderRadius: "14px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
    display: "block",
    zIndex: 3,
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
      {/* doodle background */}
      <img src={DoodleBG} alt="" style={doodleImgStyle} className="more-doodle" />

      {/* right side controls */}
      <div style={rightControlsStyle} className="right-controls">
        <button className="side-btn" onClick={handleBtsClick} aria-label="BTS" title="BTS">
          BTS
        </button>
        <button className="side-btn alt" onClick={handleFollowClick} aria-label="Follow" title="Follow">
          FOLLOW
        </button>
      </div>

      {/* mobile FAB */}
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
          <button className="mobile-action" onClick={handleBtsClick} role="menuitem" aria-label="BTS">BTS</button>
          <button className="mobile-action alt" onClick={handleFollowClick} role="menuitem" aria-label="Follow">FOLLOW</button>
        </div>
      </div>

      {/* content: only the image (no card) */}
      <div style={contentWrapper} className="contentWrapper">
        <img src={CoverImage} alt="Album cover" style={imageStyle} className="cover-img" />
      </div>

      {/* single style block inside same root */}
      <style>{`
        /* If you need the HowdyFriend font from Google (or local), include it in your index.html or global CSS.
           This file uses 'HowdyFriend' as requested; fallback to cursive if not loaded. */
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
          font-family: 'HowdyFriend', cursive;
          z-index: 6;
        }
        .side-btn.alt { background: linear-gradient(180deg, rgba(0,0,0,0.36), rgba(16,0,0,0.18)); }

        .mobile-fab-wrap {
          position: fixed;
          bottom: 18px;
          right: 18px;
          z-index: 999;
          display: none;
          align-items: center;
          gap: 10px;
        }
        .mobile-fab { width:56px; height:56px; border-radius:999px; border:none; background: linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.04)); box-shadow: 0 20px 50px rgba(0,0,0,0.45); display:inline-flex; align-items:center; justify-content:center; cursor:pointer; position:relative; transition:transform 160ms, box-shadow 160ms; }
        .fab-line { position:absolute; width:18px; height:2px; background:white; border-radius:2px; transform-origin:center; transition: transform 220ms cubic-bezier(.2,.9,.3,1), opacity 160ms; }
        .mobile-fab .fab-line:first-child { transform: translateY(-5px); }
        .mobile-fab .fab-line:last-child { transform: translateY(5px); }
        .mobile-fab.open { transform: rotate(90deg); }
        .mobile-fab.open .fab-line:first-child { transform: rotate(45deg); }
        .mobile-fab.open .fab-line:last-child { transform: rotate(-45deg); }

        @media (max-width: 480px) {
          .right-controls { display: none !important; }
          .mobile-fab-wrap { display: flex !important; }
          .contentWrapper { padding-top: 40px !important; padding-left: 12px !important; padding-right: 12px !important; justify-content: center !important; }
          .cover-img { border-radius: 8px !important; width: 100% !important; box-shadow: 0 28px 60px rgba(0,0,0,0.48) !important; }
        }

        .more-doodle { will-change: transform, opacity; }

        @keyframes floaty {
          0% { transform: translateY(0px) scale(1); }
          25% { transform: translateY(-8px) scale(1.01); }
          50% { transform: translateY(0px) scale(1); }
          75% { transform: translateY(6px) scale(1.005); }
          100% { transform: translateY(0px) scale(1); }
        }

        @media (prefers-reduced-motion: reduce) {
          .more-doodle, .cover-img, .side-btn, .mobile-fab { animation: none !important; transition: none !important; }
        }
      `}</style>
    </div>
  );
};

export default More;
