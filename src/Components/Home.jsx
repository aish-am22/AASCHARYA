import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Image from "../assets/download.jpeg";

/* Local font imports */
import Femmina from "../assets/fonts/Femmina.ttf";
import Nyc from "../assets/fonts/Nyc.ttf";
import SuperSerene from "../assets/fonts/SuperSerene.ttf.ttf";
import SuperShiny from "../assets/fonts/SuperShiny.ttf.ttf";
import SFHandRegular from "../assets/fonts/SF_Cartoonist_Hand.ttf";
import SFHandBold from "../assets/fonts/SF_Cartoonist_Hand_Bold.ttf";
import HowdyFriend from "../assets/fonts/HowdyFriend-MABBY.ttf";



const Home = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(true);
  const okBtnRef = useRef(null);

  useEffect(() => {
    const fonts = [
      { href: "https://fonts.cdnfonts.com/css/yorris-notes", id: "yorris-notes-css" },
      { href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700&display=swap", id: "montserrat-css" },
      { href: "https://fonts.googleapis.com/css2?family=Quicksand:wght@500;600&display=swap", id: "quicksand-css" },
      { href: "https://db.onlinewebfonts.com/c/bae6d0a1f6d2a9d8d8d2e3b0c3f2a1f5?family=Sunny+Spells", id: "sunny-spells-css" },
    ];

    fonts.forEach(({ href, id }) => {
      if (!document.getElementById(id)) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        link.id = id;
        link.media = "print";
        link.onload = () => (link.media = "all");
        document.head.appendChild(link);
      }
    });

    const prevBg = document.body.style.backgroundColor;
    const prevOverflowX = document.body.style.overflowX;

    document.body.style.backgroundColor = "transparent";
    document.body.style.overflowX = "hidden";

    return () => {
      document.body.style.backgroundColor = prevBg || "";
      document.body.style.overflowX = prevOverflowX || "";
    };
  }, []);

  useEffect(() => {
    if (showPopup) okBtnRef.current?.focus();

    const handleKey = (e) => {
      if (e.key === "Escape") setShowPopup(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [showPopup]);

  const handleListenClick = () => navigate("/listen");
  const handleMusicVideoClick = () =>
    window.open("https://www.youtube.com/@aascharyamusic", "_blank");
  const handleLyricalVideoClick = () =>
    window.open("https://www.youtube.com/watch?v=YOUR_LYRICAL_VIDEO_ID", "_blank");

  const buttonStyle = {
    borderRadius: "40px",
    fontWeight: 800,
    fontFamily: "'BearDays', sans-serif",
    cursor: "pointer",
    overflow: "hidden",
    transition: "transform 180ms ease, box-shadow 220ms ease, opacity 160ms ease",
    border: "2px solid rgba(255,255,255,0.18)",
    backgroundColor: "rgba(0,0,0,0.55)",
    color: "#fff",
    boxSizing: "border-box",
    padding: "0 18px",
    height: "56px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    textTransform: "uppercase",
    letterSpacing: "1px",
  };

  const popupOkStyle = {
    padding: "10px 20px",
    borderRadius: "10px",
    fontSize: "16px",
    fontFamily: "'SFHandBold', sans-serif",
    cursor: "pointer",
    border: "none",
    backgroundColor: "white",
    color: "#0c0909",
    boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
  };

  return (
    <div className="home-root" style={styles.container}>
      {showPopup && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Welcome dialog"
          style={styles.popupBackdrop}
          onClick={() => setShowPopup(false)}
        >
          <div
            style={styles.popupCard}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={styles.popupTitle}>
              AASCHARYÁ — Coming December 2025
            </h3>

            <p style={styles.popupMessage}>
              This platform is in development. The launch has moved to December 2025 while visuals and content are refined. Thank you for your patience — more is coming.
            </p>
            <p style={styles.popupNote}>
              Note: This preview was shared with the Clive Davis Institute as proof of ongoing creative development. The full site and first release are still in progress.
            </p>

            <div style={{ display: "flex", justifyContent: "center", marginTop: 14 }}>
              <button
                ref={okBtnRef}
                onClick={() => setShowPopup(false)}
                style={popupOkStyle}
                aria-label="Close welcome dialog"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ====== Video Section ====== */}
      <section className="video-section" style={styles.videoSection}>
        <video
          src="https://www.pexels.com/download/video/8053107.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={styles.video}
        />

        <div className="home-overlay">
          <div className="home-buttons" style={styles.buttons}>
            <button
              className="home-btn"
              style={buttonStyle}
              onClick={handleListenClick}
              aria-label="Listen / Stream"
            >
              LISTEN / STREAM
            </button>

            <button
              className="home-btn"
              style={buttonStyle}
              onClick={handleMusicVideoClick}
              aria-label="Watch The Music Video"
            >
              WATCH THE MUSIC VIDEO
            </button>

            <button
              className="home-btn"
              style={buttonStyle}
              onClick={handleLyricalVideoClick}
              aria-label="Watch The Lyrical Video"
            >
              WATCH THE LYRICAL VIDEO
            </button>
          </div>
        </div>
      </section>

      {/* ====== Image Section ====== */}
      <section style={styles.imageSection}>
        <img src={Image} alt="Aascharya Music Vibe" style={styles.image} />
        <div style={styles.imageOverlay}>
          <h2 style={styles.imageText}></h2>
        </div>
      </section>

      {/* custom fonts + responsive styling */}
      <style>{`
        /* Register local fonts */
       @font-face {
  font-family: 'HowdyFriend';
  src: url(${HowdyFriend}) format('truetype');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}


        @font-face {
          font-family: 'NYC';
          src: url(${Nyc}) format('truetype');
          font-weight: 700;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: 'SFHand';
          src: url(${SFHandRegular}) format('truetype');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: 'SFHandBold';
          src: url(${SFHandBold}) format('truetype');
          font-weight: 700;
          font-style: normal;
          font-display: swap;
        }

        /* Base fallback */
        body, .home-buttons, .home-buttons button { font-family: 'Sunny Spells', cursive; }

        /* Button-specific styling: BearDays only for buttons */
       .home-btn {
  font-family: 'HowdyFriend', sans-serif !important;
  font-weight: 700 !important;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-size: 20px;
}


        /* Remove red glows — subtle neutral hover instead */
        .home-btn {
          transition: transform 180ms ease, box-shadow 220ms ease, background 220ms ease;
        }

        .home-btn:hover,
        .home-btn:focus,
        .home-btn:focus-visible {
          transform: translateY(-6px) scale(1.02);
          box-shadow:
            0 10px 30px rgba(0,0,0,0.30),
            inset 0 1px 0 rgba(255,255,255,0.03);
          background: linear-gradient(90deg, rgba(0,0,0,0.64), rgba(18,18,18,0.62));
          border-color: rgba(255,255,255,0.22);
          outline: none;
        }

        /* overlay placement default (desktop) */
        .home-overlay {
          position: absolute;
          bottom: 5%;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          z-index: 1;
          display: flex;
          justify-content: center;
        }

        .home-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          align-items: center;
          flex-wrap: nowrap;
        }

        /* small screen: stack vertically */
        @media (max-width: 768px) {
          .home-overlay {
            bottom: auto;
            top: 56%;
            transform: translate(-50%, -6%);
            padding: 0 18px;
            pointer-events: auto;
          }

          .home-buttons {
            flex-direction: column;
            gap: 18px;
            align-items: center;
            width: 100%;
            max-width: 420px;
            margin: 0 auto;
          }

          .home-btn {
            width: 220px;
            height: 52px;
            font-size: 17px;
            min-width: 220px;
          }
        }

        @media (max-width: 420px) {
          .home-overlay { top: 60%; }
          .home-buttons { gap: 14px; }
          .home-btn { width: 200px; height: 48px; font-size: 15px; min-width: 200px; }
        }

        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .home-btn { transition: none !important; transform: none !important; }
        }

        /* Popup / text fonts kept non-italic */
        .popup-message { font-family: 'SuperSerene', 'Montserrat', sans-serif; font-style: normal; }
        .popup-note { font-family: 'Femmina', 'Quicksand', sans-serif; font-style: normal; }
      `}</style>
    </div>
  );
};

// ====== Inline Styles ======
const styles = {
  container: {
    boxSizing: "border-box",
    minHeight: "100vh",
    overflow: "hidden",
    backgroundColor: "transparent",
    fontFamily: "'Sunny Spells', cursive",
    position: "relative",
  },

  videoSection: {
    position: "relative",
    height: "100vh",
    width: "100%",
    overflow: "hidden",
  },
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: -2,
  },
  buttons: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    flexWrap: "wrap",
  },

  imageSection: {
    position: "relative",
    width: "100%",
    height: "100vh",
    overflow: "hidden",
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: -3,
  },
  imageOverlay: {
    position: "absolute",
    top: 0,
    left: "0",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
  },
  imageText: {
    color: "#0c0909",
    fontSize: "2.5rem",
    fontWeight: 700,
    textAlign: "center",
    letterSpacing: "2px",
    textShadow: "0 2px 10px rgba(0,0,0,0.5)",
    maxWidth: "800px",
    marginTop: "0",
  },

  popupBackdrop: {
    position: "fixed",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.55)",
    zIndex: 3000,
    padding: "20px",
    backdropFilter: "blur(5px)",
    animation: "fadeIn 0.4s ease-out",
  },

  popupCard: {
    width: "min(420px, 94%)",
    background: "rgba(255, 255, 255, 0.14)",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    borderRadius: "18px",
    padding: "22px 24px",
    boxShadow: "0 12px 45px rgba(0,0,0,0.35)",
    textAlign: "center",
    border: "1px solid rgba(255,255,255,0.35)",
  },

 popupTitle: {
  margin: 0,
  fontSize: "1.35rem",
  fontFamily: "SFHandBold",
  color: "rgba(180, 0, 0, 1)",
  letterSpacing: "0.3px",
  paddingBottom: "8px",
},

  popupMessage: {
  marginTop: 12,
  fontSize: "15px",
  fontFamily: "SFHand",
  lineHeight: 1.6,
  color: "rgba(255,255,255,0.92)",
},

 popupNote: {
  marginTop: 12,
  fontSize: "13px",
  fontFamily: "SFHand",
  lineHeight: 1.45,
  color: "rgba(255,255,255,0.78)",
  opacity: 0.95,
},
};

export default Home;
