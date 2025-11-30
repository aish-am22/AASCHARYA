import React, { useEffect, useState } from "react";
import CoverImage from "../assets/download.jpeg";
import DoodleBG from "../assets/morebg.svg";

const Listen = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.backgroundColor = "#B00303";

    const handleResize = () => setIsMobile(window.innerWidth <= 480);
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
    backgroundColor: "#B00303",
    animation: "listenFadeIn 700ms ease forwards",
  };

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
    animation: "doodleFloat 12s ease-in-out infinite",
  };

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
    alignItems: "center",
    zIndex: 2,
    animation: "cardFloat 7.5s ease-in-out infinite",
  };

  const coverImage = {
    width: "100%",
    borderRadius: "14px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
    display: "block",
  };

  return (
    <div style={container}>
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
          0% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0); }
        }
      `}</style>

      {/* Background */}
      <img id="doodle-bg" src={DoodleBG} alt="" style={doodleStyle} />

      {/* Only the image inside the card */}
      <div style={card} className="listen-card">
        <img
          src={CoverImage}
          alt="Album cover"
          style={coverImage}
          className="cover-img"
        />
      </div>
    </div>
  );
};

export default Listen;
