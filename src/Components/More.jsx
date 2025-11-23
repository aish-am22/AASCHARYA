import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DoodleBG from "../assets/morebg.svg";

const More = () => {
  const navigate = useNavigate();

  // responsive nav/footer heights (desktop / tablet / mobile)
  const [layout, setLayout] = useState({
    navHeight: 90,
    footerHeight: 80,
    isMobile: false,
  });

  useEffect(() => {
    // simple breakpoint-based heights
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
    // initial
    setLayout(computeLayout());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.backgroundColor = "#C00000"; // fallback behind doodles
    return () => {
      document.body.style.backgroundColor = "";
      document.body.style.margin = "";
    };
  }, []);

  const NAVBAR_HEIGHT = layout.navHeight;
  const FOOTER_HEIGHT = layout.footerHeight;

  // container will leave space for footer so footer is visible below More
  const containerStyle = {
    position: "relative",
    width: "100%",
    minHeight: `calc(100vh - ${FOOTER_HEIGHT}px)`,
    overflow: "hidden",
    display: "block",
  };

  // doodle image placed absolute INSIDE the More section (so footer not overlapped)
  const doodleImgStyle = {
    position: "absolute",
    top: NAVBAR_HEIGHT, // start below navbar
    left: 0,
    width: "100%",
    height: `calc(100% - ${NAVBAR_HEIGHT}px)`,
    objectFit: "cover",
    zIndex: 0,
    pointerEvents: "none",
    opacity: layout.isMobile ? 0.28 : 0.22,
    transformOrigin: "center",
    willChange: "transform, opacity",
  };

  // content wrapper centers card and ensures top spacing for navbar
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
  };

  // responsive card sizing (we keep width logic in JS for accuracy)
  const card = {
    width: layout.isMobile ? "88%" : layout.isMobile === false && window.innerWidth <= 900 ? "360px" : "420px",
    maxWidth: "92%",
    background: "rgba(255,255,255,0.06)",
    borderRadius: "20px",
    padding: layout.isMobile ? "18px" : "28px",
    display: "flex",
    flexDirection: "column",
    gap: layout.isMobile ? "12px" : "18px",
    backdropFilter: "blur(10px)",
    boxShadow: "0 14px 40px rgba(0,0,0,0.45)",
    border: "1px solid rgba(255,255,255,0.06)",
    textAlign: "center",
    transformStyle: "preserve-3d",
  };

  const heading = {
    fontFamily: "'Sunny Spells', cursive",
    color: "white",
    fontSize: layout.isMobile ? "18px" : "20px",
    margin: 0,
    letterSpacing: "1px",
    position: "relative",
  };

  const subText = {
    color: "rgba(255,255,255,0.9)",
    fontSize: layout.isMobile ? "13px" : "14px",
    margin: 0,
    opacity: 0.95,
  };

  const handleBtsClick = () => navigate("/bts");
  const handleFollowClick = () => navigate("/followus");

  return (
    <div style={containerStyle}>
      {/* doodle layer as <img> inside More area */}
      <img src={DoodleBG} alt="" style={doodleImgStyle} className="more-doodle" />

      {/* content center */}
      <div style={contentWrapper}>
        <div style={card} className="more-card">
          <h3 style={heading} className="more-heading">
            More
            <span className="underline" />
          </h3>
          <p style={subText} className="more-sub">Behind the scenes & connect with us!</p>

          <button className="more-btn" onClick={handleBtsClick} aria-label="BTS">
            BTS
            <span className="shine" />
          </button>

          <button className="more-btn alt" onClick={handleFollowClick} aria-label="Follow">
            FOLLOW
            <span className="shine" />
          </button>
        </div>
      </div>

      {/* Inline responsive + animation CSS */}
      <style>{`
        /* Respect users who prefer reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .more-doodle, .more-card, .more-heading, .more-sub, .more-btn { animation: none !important; transition: none !important; }
        }

        /* Floating doodle */
        .more-doodle {
          animation: floaty 12s ease-in-out infinite;
          filter: saturate(0.98) contrast(0.98);
          will-change: transform, opacity;
        }
        @keyframes floaty {
          0% { transform: translateY(0px) scale(1); opacity: 0.22; }
          25% { transform: translateY(-8px) scale(1.01); opacity: 0.24; }
          50% { transform: translateY(0px) scale(1); opacity: 0.22; }
          75% { transform: translateY(6px) scale(1.005); opacity: 0.2; }
          100% { transform: translateY(0px) scale(1); opacity: 0.22; }
        }

        /* Card entrance and hover lift/tilt */
        .more-card {
          animation: popIn 700ms cubic-bezier(.2,.9,.3,1) both;
          transform-origin: center;
          transition: transform 280ms cubic-bezier(.2,.9,.3,1), box-shadow 280ms;
        }
        @keyframes popIn {
          0% { transform: translateY(18px) rotateX(6deg) scale(0.98); opacity: 0; }
          60% { transform: translateY(-6px) rotateX(2deg) scale(1.02); opacity: 1; }
          100% { transform: translateY(0) rotateX(0) scale(1); opacity: 1; }
        }
        .more-card:hover {
          transform: translateY(-6px) rotateX(1deg);
          box-shadow: 0 20px 60px rgba(0,0,0,0.55);
        }

        /* Heading underline animation */
        .more-heading {
          display: inline-block;
        }
        .more-heading .underline {
          content: "";
          display: block;
          height: 3px;
          width: 0%;
          margin: 8px auto 0;
          background: linear-gradient(90deg, rgba(255,255,255,0.95), rgba(255,0,0,0.9));
          border-radius: 6px;
          transition: width 420ms cubic-bezier(.2,.9,.3,1);
        }
        .more-card:hover .more-heading .underline { width: 64%; }

        /* Subtext gentle fade-in */
        .more-sub {
          opacity: 0;
          transform: translateY(6px);
          animation: fadeUp 800ms 220ms both cubic-bezier(.2,.9,.3,1);
        }
        @keyframes fadeUp {
          to { opacity: 0.95; transform: translateY(0); }
        }

        /* Buttons */
        .more-btn {
          position: relative;
          overflow: hidden;
          display: inline-block;
          width: 100%;
          text-align: center;
          padding: 14px 22px;
          border-radius: 999px;
          background: linear-gradient(135deg, rgba(0,0,0,0.6), rgba(0,0,0,0.48));
          color: white;
          border: 1px solid rgba(255,255,255,0.06);
          font-family: 'Sunny Spells', cursive;
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 1px;
          cursor: pointer;
          transition: transform 240ms cubic-bezier(.2,.9,.3,1), box-shadow 240ms, background 240ms;
          box-shadow: 0 8px 22px rgba(0,0,0,0.35);
          margin-top: 10px;
          z-index: 1;
        }

        /* alternate style for FOLLOW button */
        .more-btn.alt {
          background: linear-gradient(90deg, rgba(0,0,0,0.56), rgba(20,0,0,0.44));
        }

        .more-btn:hover {
          transform: translateY(-6px) scale(1.02) rotateZ(-0.6deg);
          box-shadow: 0 18px 46px rgba(255,0,0,0.12), 0 8px 28px rgba(0,0,0,0.45);
        }

        /* glowing outline on hover */
        .more-btn::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 999px;
          pointer-events: none;
          box-shadow: 0 0 0px rgba(255,0,0,0);
          transition: box-shadow 320ms;
        }
        .more-btn:hover::after {
          box-shadow: 0 8px 32px rgba(255,0,0,0.12), inset 0 0 20px rgba(255,255,255,0.02);
        }

        /* subtle shine sweep */
        .more-btn .shine {
          position: absolute;
          top: -60%;
          left: -30%;
          width: 28%;
          height: 220%;
          background: linear-gradient(120deg, rgba(255,255,255,0.0), rgba(255,255,255,0.18), rgba(255,255,255,0.0));
          transform: rotate(25deg) translateX(-6px);
          transition: transform 520ms cubic-bezier(.2,.9,.3,1), opacity 320ms;
          opacity: 0;
          pointer-events: none;
        }
        .more-btn:hover .shine {
          transform: translateX(270%) rotate(25deg);
          opacity: 1;
        }

        /* pressed / active */
        .more-btn:active {
          transform: translateY(-2px) scale(0.995);
          box-shadow: 0 8px 20px rgba(0,0,0,0.45);
        }

        /* small responsive tweaks */
        @media (max-width: 900px) {
          .more-card { padding: 18px !important; }
          .more-btn { padding: 12px 18px; font-size: 15px; }
        }
        @media (max-width: 480px) {
          .more-card { width: 88% !important; padding: 16px !important; }
          .more-heading { font-size: 18px; }
          .more-sub { font-size: 13px; }
        }
      `}</style>
    </div>
  );
};

export default More;
