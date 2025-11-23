import React, { useEffect, useState } from "react";
import DoodleBG from "../assets/morebg.svg"; // doodle background (optional)
import CoverImage from "../assets/download.jpeg"; // fallback thumbnail if you want

// Example video data — replace ids/urls with your actual videos
const VIDEO_LIST = [
  { id: "1", title: "Official Music Video", url: "https://www.youtube.com/watch?v=ScMzIvxBSi4" },
  { id: "2", title: "Behind The Scenes", url: "https://www.youtube.com/watch?v=ysz5S6PUM-U" },
  { id: "3", title: "Live Performance", url: "https://www.youtube.com/watch?v=jNQXAC9IVRw" },
  { id: "4", title: "Lyric Video", url: "https://www.youtube.com/watch?v=2Vv-BfVoq4g" },
  { id: "5", title: "Acoustic Session", url: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ" },
  { id: "6", title: "Interview", url: "https://www.youtube.com/watch?v=HgzGwKwLmgM" },
];

const Videos = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // set body defaults and cleanup
    document.body.style.margin = "0";
    document.body.style.backgroundColor = "#C00000";
    const onResize = () => setIsMobile(window.innerWidth <= 640);
    onResize();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      document.body.style.backgroundColor = "";
    };
  }, []);

  // navbar/footer heights tuned for breakpoints
  const NAVBAR_HEIGHT = isMobile ? 64 : 90;
  const FOOTER_HEIGHT = isMobile ? 64 : 80;

  // helper: get youtube thumbnail from a youtube url (best-effort)
  const getYouTubeThumbnail = (url) => {
    try {
      const urlObj = new URL(url);
      const vid = urlObj.searchParams.get("v");
      if (vid) return `https://img.youtube.com/vi/${vid}/hqdefault.jpg`;
    } catch (e) {
      // not a valid url — fallback
    }
    return CoverImage;
  };

  // open video in a new tab (keeps it simple & reliable)
  const openVideo = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // responsive grid values
  const columns = isMobile ? 1 : 3;
  const gap = isMobile ? 14 : 22;

  const container = {
    position: "relative",
    width: "100%",
    minHeight: `calc(100vh - ${FOOTER_HEIGHT}px)`,
    overflow: "hidden",
    paddingTop: `${NAVBAR_HEIGHT}px`,
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingBottom: "40px",
    // main fade-in
    animation: "siteFadeIn 650ms ease forwards",
  };

  // doodle as <img> inside the section so footer not covered
  const doodleImgStyle = {
    position: "absolute",
    top: NAVBAR_HEIGHT,
    left: 0,
    width: "100%",
    height: `calc(100% - ${NAVBAR_HEIGHT}px)`,
    objectFit: "cover",
    zIndex: 0,
    pointerEvents: "none",
    opacity: isMobile ? 0.28 : 0.20,
    transform: "translateY(0)",
    willChange: "transform, opacity",
    animation: "doodleFloat 10s linear infinite",
  };

  const content = {
    position: "relative",
    zIndex: 2,
    width: "100%",
    maxWidth: 1200,
    padding: isMobile ? "18px" : "36px",
    boxSizing: "border-box",
  };

  const header = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  };

  const pageTitle = {
    fontFamily: "'Rusty Hooks', cursive",
    color: "white",
    fontSize: isMobile ? 28 : 36,
    margin: 0,
    letterSpacing: 2,
    textShadow: "0 6px 18px rgba(0,0,0,0.45)",
  };

  const pageSubtitle = {
    fontFamily: "'Sunny Spells', cursive",
    color: "rgba(255,255,255,0.95)",
    fontSize: isMobile ? 14 : 16,
    margin: 0,
    transform: "translateY(0)",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: gap,
    alignItems: "stretch",
  };

  const cardBase = {
    position: "relative",
    borderRadius: 12,
    overflow: "hidden",
    background: "rgba(0,0,0,0.45)",
    boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
    border: "1px solid rgba(255,255,255,0.06)",
    cursor: "pointer",
    transformOrigin: "center center",
    transition: "transform 300ms cubic-bezier(.2,.9,.3,1), box-shadow 300ms ease",
    willChange: "transform, box-shadow",
  };

  const thumb = {
    width: "100%",
    height: isMobile ? 180 : 200,
    objectFit: "cover",
    display: "block",
    transition: "transform 700ms cubic-bezier(.2,.9,.3,1)",
    willChange: "transform",
  };

  const playOverlay = {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 3,
    pointerEvents: "none",
  };

  const playButton = {
    width: isMobile ? 56 : 72,
    height: isMobile ? 56 : 72,
    borderRadius: "50%",
    background: "linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.06))",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 10px 24px rgba(0,0,0,0.5)",
    transition: "transform 300ms ease, box-shadow 300ms ease, background 300ms ease",
    transform: "translateZ(0)",
  };

  const playTriangle = {
    width: 0,
    height: 0,
    borderLeft: `${isMobile ? 14 : 18}px solid white`,
    borderTop: `${isMobile ? 10 : 13}px solid transparent`,
    borderBottom: `${isMobile ? 10 : 13}px solid transparent`,
    marginLeft: 4,
  };

  const info = {
    padding: isMobile ? 12 : 14,
    color: "white",
    zIndex: 2,
    background: "linear-gradient(180deg, rgba(0,0,0,0.0), rgba(0,0,0,0.28))",
  };

  const videoTitle = {
    fontSize: isMobile ? 15 : 16,
    margin: 0,
    fontWeight: 700,
    color: "#fff",
    letterSpacing: 0.2,
  };

  const videoMeta = {
    marginTop: 6,
    fontSize: 13,
    color: "rgba(255,255,255,0.78)",
  };

  return (
    <div style={container}>
      {/* Embedded styles for animations (keeps component self-contained) */}
      <style>{`
        @keyframes siteFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes doodleFloat {
          0% { transform: translateY(0) scale(1.01); }
          50% { transform: translateY(-8px) scale(1.02); }
          100% { transform: translateY(0) scale(1.01); }
        }
        @keyframes cardEntrance {
          0% { opacity: 0; transform: translateY(18px) rotate(-1deg) scale(0.985); }
          60% { opacity: 1; transform: translateY(-6px) rotate(0.2deg) scale(1.01); }
          100% { opacity: 1; transform: translateY(0) rotate(0deg) scale(1); }
        }
        @keyframes playPulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.08); opacity: 0.95; }
          100% { transform: scale(1); opacity: 1; }
        }

        /* card hover effects applied via class */
        .video-card:focus { outline: none; box-shadow: 0 8px 34px rgba(0,0,0,0.6); }
        .video-card:hover { transform: translateY(-8px) scale(1.02); box-shadow: 0 22px 60px rgba(0,0,0,0.7); }
        .video-card:hover img { transform: scale(1.08) translateY(-2px); }
        .video-card:active { transform: translateY(-3px) scale(1.01); }

        /* pulsing play button + hover glow */
        .play-btn { animation: playPulse 2000ms ease-in-out infinite; }
        .video-card:hover .play-btn { transform: scale(1.06); box-shadow: 0 18px 40px rgba(192,0,0,0.18); }

        /* subtle glass highlight */
        .video-card::after {
          content: '';
          position: absolute;
          left: -40%;
          top: -20%;
          width: 200%;
          height: 60%;
          transform: rotate(25deg);
          background: linear-gradient(90deg, rgba(255,255,255,0.03), rgba(255,255,255,0.06), rgba(255,255,255,0.02));
          pointer-events: none;
          mix-blend-mode: overlay;
        }

        /* entrance animation will be controlled via inline animation-delay per item */

        /* keyboard focus visible */
        .video-card:focus-visible {
          box-shadow: 0 0 0 4px rgba(255,255,255,0.06), 0 20px 50px rgba(0,0,0,0.65);
          border-color: rgba(255,255,255,0.12);
        }

        /* respect users who prefer reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .video-card, .play-btn, img, .video-card::after, #doodle-bg {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>

      {/* doodle background image */}
      <img id="doodle-bg" src={DoodleBG} alt="" style={doodleImgStyle} />

      <div style={content}>
        <header style={header}>
          <div>
            <h1 style={pageTitle}>Videos</h1>
            <p style={pageSubtitle}>Official music videos, live performances & behind-the-scenes</p>
          </div>

          {/* small action area — could add filters, search etc */}
          <div aria-hidden="true" style={{ minWidth: 120 }} />
        </header>

        <main style={gridStyle}>
          {VIDEO_LIST.map((v, idx) => {
            const thumbUrl = getYouTubeThumbnail(v.url);
            // stagger delay: 80ms between items
            const delayMs = idx * 80;
            const cardStyle = {
              ...cardBase,
              animation: `cardEntrance 680ms cubic-bezier(.2,.9,.3,1) both`,
              animationDelay: `${delayMs}ms`,
            };

            // attach the hover transform to inner img via class usage: keep thumb style for baseline
            return (
              <article
                key={v.id}
                role="button"
                tabIndex={0}
                aria-label={`Open video: ${v.title}`}
                onClick={() => openVideo(v.url)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") openVideo(v.url);
                }}
                style={cardStyle}
                className="video-card"
              >
                <img src={thumbUrl} alt={v.title} style={thumb} />

                {/* semi-transparent play button overlay */}
                <div style={playOverlay}>
                  <div style={playButton} className="play-btn" aria-hidden="true">
                    <div style={playTriangle} />
                  </div>
                </div>

                <div style={info}>
                  <h3 style={videoTitle}>{v.title}</h3>
                  <div style={videoMeta}>Official • 3:41</div>
                </div>
              </article>
            );
          })}
        </main>
      </div>
    </div>
  );
};

export default Videos;
