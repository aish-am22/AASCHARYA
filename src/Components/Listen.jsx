import React, { useEffect, useState } from "react";
import CoverImage from "../assets/download.jpeg"; // use any album cover or artist image
import DoodleBG from "../assets/morebg.svg"; // optional doodle background

const Listen = () => {
  // mobile detection
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.backgroundColor = "#C00000";

    const handleResize = () => setIsMobile(window.innerWidth <= 480);
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      document.body.style.backgroundColor = "";
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const NAVBAR_HEIGHT = isMobile ? 65 : 85;
  const FOOTER_HEIGHT = isMobile ? 65 : 80;

  const container = {
    position: "relative",
    width: "100%",
    minHeight: `calc(100vh - ${FOOTER_HEIGHT}px)`,
    overflow: "hidden",
    paddingTop: `${NAVBAR_HEIGHT}px`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // entrance
    animation: "listenFadeIn 700ms ease forwards",
  };

  // doodle background below navbar (gentle parallax via animation)
  const doodleStyle = {
    position: "absolute",
    top: NAVBAR_HEIGHT,
    left: 0,
    width: "100%",
    height: `calc(100% - ${NAVBAR_HEIGHT}px)`,
    objectFit: "cover",
    zIndex: 0,
    pointerEvents: "none",
    opacity: isMobile ? 0.32 : 0.22,
    transform: "translateZ(0)",
    willChange: "transform, opacity",
    animation: "doodleFloat 12s ease-in-out infinite",
  };

  // Glass card
  const card = {
    width: isMobile ? "92%" : "420px",
    padding: isMobile ? "18px" : "28px",
    background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
    borderRadius: "22px",
    backdropFilter: "blur(10px) saturate(120%)",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 18px 50px rgba(0,0,0,0.65)",
    display: "flex",
    flexDirection: "column",
    gap: "18px",
    zIndex: 2,
    transformStyle: "preserve-3d",
    transition: "transform 450ms cubic-bezier(.15,.9,.3,1), box-shadow 350ms ease",
  };

  // card hover (applied via class to allow :hover in style block)
  const coverImage = {
    width: "100%",
    borderRadius: "14px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
    display: "block",
    transformOrigin: "50% 50%",
    transition: "transform 700ms cubic-bezier(.2,.9,.3,1), filter 500ms ease",
    willChange: "transform, filter",
  };

  const title = {
    fontFamily: "'Rusty Hooks', cursive",
    color: "white",
    fontSize: isMobile ? "26px" : "30px",
    textAlign: "center",
    margin: 0,
    textShadow: "0 8px 22px rgba(0,0,0,0.6)",
  };

  const subtitle = {
    fontFamily: "'Sunny Spells', cursive",
    color: "rgba(255,255,255,0.95)",
    fontSize: "15px",
    textAlign: "center",
    letterSpacing: "1px",
    margin: 0,
  };

  const buttonBase = {
    padding: isMobile ? "12px" : "14px",
    borderRadius: "999px",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.55)",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontFamily: "'Sunny Spells', cursive",
    fontSize: isMobile ? "14px" : "15px",
    letterSpacing: "1px",
    transition: "transform 220ms cubic-bezier(.2,.9,.3,1), box-shadow 220ms ease, background 220ms ease",
    boxShadow: "0 8px 20px rgba(0,0,0,0.32)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  };

  // click handler wrapper that also plays a quick tiny press animation via adding class
  const handleButtonClick = (href) => {
    // open link
    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <div style={container}>
      {/* local styles for animations & states */}
      <style>{`
        @keyframes listenFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes doodleFloat {
          0% { transform: translateY(0) scale(1.01); }
          50% { transform: translateY(-10px) scale(1.02); }
          100% { transform: translateY(0) scale(1.01); }
        }
        @keyframes cardFloat {
          0% { transform: translateY(0) rotateX(0deg); }
          50% { transform: translateY(-6px) rotateX(0.3deg); }
          100% { transform: translateY(0) rotateX(0deg); }
        }
        @keyframes btnPulse {
          0% { box-shadow: 0 8px 20px rgba(0,0,0,0.32); transform: translateY(0); }
          50% { box-shadow: 0 18px 36px rgba(0,0,0,0.4); transform: translateY(-2px); }
          100% { box-shadow: 0 8px 20px rgba(0,0,0,0.32); transform: translateY(0); }
        }

        /* Hover / focus states for the card */
        .listen-card:hover { transform: translateY(-10px) scale(1.015); box-shadow: 0 28px 70px rgba(0,0,0,0.72); }
        .listen-card:active { transform: translateY(-6px) scale(1.01); }

        /* Inner cover zoom & slight rotate on hover for depth */
        .listen-card:hover .cover-img { transform: scale(1.06) rotate(-0.6deg); filter: saturate(1.08) contrast(1.02); }

        /* Buttons - hover glow and transform */
        .listen-btn { background: linear-gradient(90deg, rgba(255,0,0,0.95), rgba(200,0,0,0.95)); }
        .listen-btn:hover { transform: translateY(-6px) scale(1.02); box-shadow: 0 28px 48px rgba(192,0,0,0.28); }
        .listen-btn:active { transform: translateY(-2px) scale(0.995); box-shadow: 0 10px 22px rgba(0,0,0,0.36); }
        .listen-btn:focus-visible { outline: none; box-shadow: 0 0 0 4px rgba(255,255,255,0.06), 0 26px 60px rgba(0,0,0,0.7); }

        /* small icon style inside button (optional) */
        .btn-icon {
          width: 20px;
          height: 20px;
          display: inline-block;
          border-radius: 4px;
          background: rgba(255,255,255,0.12);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          color: white;
        }

        /* subtle floating animation while idle for card */
        .listen-card { animation: cardFloat 7.5s ease-in-out infinite; }

        /* Reduced motion respects user preference */
        @media (prefers-reduced-motion: reduce) {
          .listen-card, .cover-img, #doodle-bg, .listen-btn { animation: none !important; transition: none !important; }
        }
      `}</style>

      {/* Doodle background */}
      <img id="doodle-bg" src={DoodleBG} alt="" style={doodleStyle} />

      {/* Glass Card */}
      <div style={card} className="listen-card" role="region" aria-label="Listen card">
        <img
          src={CoverImage}
          alt="Album cover"
          style={coverImage}
          className="cover-img"
        />

        <h2 style={title}>AASCHARYÁ</h2>
        <p style={subtitle}>Listen on your favorite platform</p>

        {/* Buttons group */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <button
            className="listen-btn"
            style={{
              ...buttonBase,
              background: "linear-gradient(90deg, rgba(255,0,0,0.98), rgba(192,0,0,0.95))",
            }}
            onClick={() => handleButtonClick("https://open.spotify.com/")}
            onKeyDown={(e) => { if (e.key === "Enter") handleButtonClick("https://open.spotify.com/"); }}
            aria-label="Open Spotify"
          >
            <span className="btn-icon" aria-hidden="true">♪</span>
            Spotify
          </button>

          <button
            className="listen-btn"
            style={{
              ...buttonBase,
              background: "linear-gradient(90deg, rgba(60,60,60,0.98), rgba(30,30,30,0.95))",
              color: "white",
            }}
            onClick={() => handleButtonClick("https://music.apple.com/")}
            onKeyDown={(e) => { if (e.key === "Enter") handleButtonClick("https://music.apple.com/"); }}
            aria-label="Open Apple Music"
          >
            <span className="btn-icon" aria-hidden="true">♪</span>
            Apple Music
          </button>

          <button
            className="listen-btn"
            style={{
              ...buttonBase,
              background: "linear-gradient(90deg, rgba(20,20,20,0.94), rgba(40,10,10,0.92))",
            }}
            onClick={() => handleButtonClick("https://www.youtube.com/music/")}
            onKeyDown={(e) => { if (e.key === "Enter") handleButtonClick("https://www.youtube.com/music/"); }}
            aria-label="Open YouTube Music"
          >
            <span className="btn-icon" aria-hidden="true">♪</span>
            YouTube Music
          </button>
        </div>
      </div>
    </div>
  );
};

export default Listen;
