import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Image from "../assets/download.jpeg";

const Home = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(true);
  const okBtnRef = useRef(null);
  

  useEffect(() => {
    // inject font links (only if not already included in index.html)
    const fonts = [
      { href: "https://fonts.cdnfonts.com/css/rusty-hooks", id: "rusty-hooks-css" }, // Rusty Hooks
      { href: "https://db.onlinewebfonts.com/c/bae6d0a1f6d2a9d8d8d2e3b0c3f2a1f5?family=Sunny+Spells", id: "sunny-spells-css" }, // Sunny Spells (example provider)
    ];

    fonts.forEach(({ href, id }) => {
      if (!document.getElementById(id)) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        link.id = id;
        // don't block rendering
        link.media = "print";
        link.onload = () => (link.media = "all");
        document.head.appendChild(link);
      }
    });

    // Save previous body styles
    const prevBg = document.body.style.backgroundColor;
    const prevOverflowX = document.body.style.overflowX;

    // Make background transparent for Home
    document.body.style.backgroundColor = "transparent";

    // Prevent horizontal scrollbar = no stripe
    document.body.style.overflowX = "hidden";

    return () => {
      // Restore for other pages
      document.body.style.backgroundColor = prevBg || "";
      document.body.style.overflowX = prevOverflowX || "";
      // optionally remove injected links (keeps them by default for performance)
      // fonts.forEach(({ id }) => {
      //   const el = document.getElementById(id);
      //   if (el) el.remove();
      // });
    };
  }, []);

  // Focus the OK button when popup opens and add ESC to close
  useEffect(() => {
    if (showPopup) {
      okBtnRef.current?.focus();
    }

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
    padding: "14px 40px",
    borderRadius: "50px",
    fontSize: "22px",
    fontWeight: "bold",
    fontFamily: "'Sunny Spells', cursive", // page font applied
    cursor: "pointer",
    overflow: "hidden",
    transition: "all 0.3s ease",
    backdropFilter: "blur(5px)",
    border: "2px solid rgba(255, 255, 255, 0.3)",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    position: "relative",
    width: "auto",
  };

  // popup button style (smaller, modern)
  const popupOkStyle = {
  padding: "10px 20px",
  borderRadius: "10px",
  fontSize: "16px",
  fontFamily: "'Fredoka One', cursive",
  cursor: "pointer",
  border: "none",
  backgroundColor: "white",
  color: "#0c0909",
  boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
};


  return (
    <div style={styles.container}>
      {/* Popup overlay */}
      {showPopup && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Welcome dialog"
          style={styles.popupBackdrop}
          onClick={() => setShowPopup(false)} // clicking backdrop closes
        >
          <div
            style={styles.popupCard}
            onClick={(e) => e.stopPropagation()} // prevent backdrop click from closing when clicking inside
          >
            {/* Heading uses Rusty Hooks (not Sunny Spells) */}
            <h3 style={styles.popupTitle}>AASCHARYÁ — Coming December 2025</h3>

            <p style={styles.popupMessage}>
              This platform is in development. The launch has moved to December 2025 while visuals and content are refined. Thank you for your patience — more is coming.
            </p>
            <p style={styles.popupNote}>
  Note: This preview was shared with the Clive Davis Institute as proof of ongoing creative development. 
  The full site and first release are still in progress.
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
      <section style={styles.videoSection}>
        <video
          src="https://www.pexels.com/download/video/8053107.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={styles.video}
        />

        <div style={styles.overlay}>
          <div style={styles.buttons} className="home-buttons">
          <button
  style={buttonStyle}
  onClick={handleListenClick}
  onMouseEnter={(e) => (e.target.style.backgroundColor = "rgba(255, 0, 0, 0.7)")}
  onMouseLeave={(e) => (e.target.style.backgroundColor = "rgba(0, 0, 0, 0.5)")}
>
  Listen/Stream
</button>

<button
  style={buttonStyle}
  onClick={handleMusicVideoClick}
  onMouseEnter={(e) => (e.target.style.backgroundColor = "rgba(255, 0, 0, 0.7)")}
  onMouseLeave={(e) => (e.target.style.backgroundColor = "rgba(0, 0, 0, 0.5)")}
>
  Watch The Music Video
</button>

<button
  style={buttonStyle}
  onClick={handleLyricalVideoClick}
  onMouseEnter={(e) => (e.target.style.backgroundColor = "rgba(255, 0, 0, 0.7)")}
  onMouseLeave={(e) => (e.target.style.backgroundColor = "rgba(0, 0, 0, 0.5)")}
>
  Watch The Lyrical Video
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

      <style>
        {`
          /* Ensure popup message and buttons use Sunny Spells by default except headings */
          body, .home-buttons, .home-buttons button {
            font-family: 'Sunny Spells', cursive;
          }

          @media (max-width: 768px) {
            .home-buttons {
              flex-direction: column !important;
              align-items: center !important;
              gap: 15px !important;
            }
            
            .home-buttons button {
              padding: 12px 30px !important;
              font-size: 18px !important;
              border-radius: 45px !important;
              min-width: 220px !important;
            }
          }
          
          @media (max-width: 480px) {
            .home-buttons {
              flex-direction: column !important;
              align-items: center !important;
              gap: 12px !important;
            }
            
            .home-buttons button {
              padding: 12px 28px !important;
              font-size: 17px !important;
              border-radius: 45px !important;
              min-width: 210px !important;
            }
          }
        `}
      </style>
    </div>
  );
};

// ====== Inline Styles ======
const styles = {
  container: {
    boxSizing: "border-box",
    minHeight: "100vh",
    overflow: "hidden",
    backgroundColor: "transparent", // make sure container doesn't leak red
    fontFamily: "'Sunny Spells', cursive", // apply Sunny Spells to page by default
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
    zIndex: -1,
  },
  overlay: {
    position: "absolute",
    bottom: "5%",
    left: "50%",
    transform: "translateX(-50%)",
    textAlign: "center",
    color: "#fff",
    zIndex: 1,
    width: "100%",
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
    zIndex: -1,
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

  /* popup styles */
  popupBackdrop: {
    position: "fixed",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.45)",
    zIndex: 2000,
    padding: "20px",
    backdropFilter: "blur(3px)",
  },
  popupCard: {
  width: "min(420px, 92%)",
  background: "rgba(255, 255, 255, 0.12)",   // transparent white
  backdropFilter: "blur(12px)",              // strong glass blur
  WebkitBackdropFilter: "blur(12px)",
  borderRadius: "18px",
  padding: "22px 24px",
  boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
  textAlign: "center",
  border: "1px solid rgba(255,255,255,0.25)", // glass border
},

  popupTitle: {
  margin: 0,
  fontSize: "1.25rem",
  fontWeight: 700,
  letterSpacing: "0.3px",
  fontFamily: "'Fredoka One', cursive",
  color: "rgba(255, 0, 0, 0.9)",
  textShadow: "0 2px 8px rgba(0,0,0,0.35)",
},
popupMessage: {
  marginTop: 10,
  fontSize: "14px",
  lineHeight: 1.45,
  fontFamily: "'Fredoka', sans-serif",
  color: "rgba(255, 255, 255, 0.75)", 
},

popupNote: {
  marginTop: 12,
  fontSize: "12px",
  lineHeight: 1.4,
  fontFamily: "'Fredoka', sans-serif",
  color: "rgba(255, 255, 255, 0.5)", // soft transparent
},


};


export default Home;
