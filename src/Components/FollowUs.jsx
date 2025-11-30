import React, { useEffect } from "react";
import bomma from "../assets/Bomma-1.svg"; // Desktop background
import Image from "../assets/morebg.svg"; // Mobile background

const FollowUs = () => {
  // Apply global theme background & remove margins when this page loads
  useEffect(() => {
    document.body.style.backgroundColor = "#B00303";
    document.body.style.margin = "0";

    return () => {
      // keep site-wide theme; only cleanup margin
      document.body.style.margin = "";
    };
  }, []);

  // Bubble hover/touch effect
  const createBubble = (rawEvent) => {
    const isTouch = rawEvent.type.startsWith("touch");
    const evt = isTouch ? rawEvent.touches[0] : rawEvent;
    const btn = rawEvent.currentTarget || rawEvent.target;

    // if wrapper used, ensure we get the actual button element that has .btn-inner
    const innerBtn = btn.querySelector?.(".btn-inner") ? btn.querySelector(".btn-inner") : btn;

    // create bubble
    const bubble = document.createElement("span");
    const size = Math.max(innerBtn.offsetWidth, innerBtn.offsetHeight);
    const rect = innerBtn.getBoundingClientRect();

    bubble.style.width = bubble.style.height = `${size}px`;
    bubble.style.left = `${evt.clientX - rect.left - size / 2}px`;
    bubble.style.top = `${evt.clientY - rect.top - size / 2}px`;
    bubble.className = "bubble";

    innerBtn.appendChild(bubble);

    // remove after animation
    setTimeout(() => {
      bubble.remove();
    }, 700);
  };

  // shared styles
  const buttonStyle = {
    padding: "19px 30px",
    borderRadius: "50px",
    fontFamily: "'Sunny Spells', cursive",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.28s ease",
    backdropFilter: "blur(5px)",
    width: "180px",
    border: "2px solid rgba(255, 255, 255, 0.3)",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    position: "relative", // required for bubble
    overflow: "hidden",   // required for bubble
    userSelect: "none",
  };

  const titleButtonStyle = {
    ...buttonStyle,
    backgroundColor: "rgba(176, 3, 3, 0.85)",
    cursor: "default",
    border: "2px solid rgba(255, 255, 255, 0.5)",
    marginBottom: "10px",
    width: "220px",
  };

  const buttonContainerStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px",
    zIndex: 2,
  };

  // wrapper class applied to each button to help event target consistency
  const BtnWrapper = ({ children, href, ariaLabel }) => (
    <div
      className="btn-wrapper"
      onMouseMove={createBubble}
      onTouchStart={createBubble}
      style={{ display: "inline-block", borderRadius: 50 }}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-inner"
        style={buttonStyle}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    </div>
  );

  return (
    <>
      <div style={styles.container} className="follow-us-container" role="region" aria-label="Follow Aascharya">
        <div style={buttonContainerStyle}>
          <div style={titleButtonStyle} className="btn-inner" aria-hidden="true">
            Follow AASCHARYÁ
          </div>

          <BtnWrapper href="https://www.instagram.com" ariaLabel="Follow on Instagram">
            Instagram
          </BtnWrapper>

          <BtnWrapper href="https://www.youtube.com" ariaLabel="Watch on YouTube">
            YouTube
          </BtnWrapper>

          <BtnWrapper href="https://x.com" ariaLabel="Follow on X">
            X
          </BtnWrapper>

          <BtnWrapper href="https://www.facebook.com" ariaLabel="Follow on Facebook">
            Facebook
          </BtnWrapper>
        </div>
      </div>

      {/* Styles for layout + bubble effect + responsive */}
      <style>{`
        .follow-us-container {
          background-image: url(${bomma});
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          width: 100%;
          height: 100vh;
          border: 6px solid #B00303;
          position: relative;
          overflow: hidden;
        }

        /* Button bubble */
        .btn-inner {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 50px;
          -webkit-tap-highlight-color: transparent;
        }

        .btn-inner:active {
          transform: translateY(-2px) scale(0.995);
        }

        .bubble {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.38);
          transform: scale(0);
          animation: bubbleEffect 700ms cubic-bezier(.2,.9,.3,1) forwards;
          pointer-events: none;
          mix-blend-mode: screen;
        }

        @keyframes bubbleEffect {
          0% {
            transform: scale(0);
            opacity: 0.85;
          }
          60% {
            transform: scale(1.6);
            opacity: 0.38;
          }
          100% {
            transform: scale(2.4);
            opacity: 0;
          }
        }

        /* small glow on hover */
        .btn-wrapper:hover .btn-inner {
          box-shadow: 0 10px 30px rgba(176,3,3,0.22), inset 0 1px 0 rgba(255,255,255,0.02);
          transform: translateY(-6px);
          background-color: rgba(176,3,3,0.12);
          transition: transform 220ms ease, box-shadow 220ms ease;
        }

        .btn-wrapper:active .btn-inner {
          transform: translateY(-2px);
        }

        /* Mobile background swap */
        @media (max-width: 768px) {
          .follow-us-container {
            background-image: url(${Image}) !important;
          }
          .btn-inner {
            width: 160px !important;
            font-size: 16px !important;
            padding: 15px 20px !important;
          }
        }

        @media (max-width: 480px) {
          .follow-us-container {
            background-image: url(${Image}) !important;
          }
          .btn-inner {
            width: 140px !important;
            font-size: 15px !important;
            padding: 12px 18px !important;
          }
        }

        /* Respect reduced motion preference */
        @media (prefers-reduced-motion: reduce) {
          .bubble, .btn-wrapper:hover .btn-inner {
            animation: none !important;
            transition: none !important;
            transform: none !important;
            box-shadow: none !important;
          }
        }
      `}</style>
    </>
  );
};

const styles = {
  container: {
    width: "100%",
    height: "100vh",
    backgroundImage: `url(${bomma})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    margin: 0,
    padding: 0,
    overflow: "hidden",
    position: "relative",
    border: "6px solid #B00303",
    boxSizing: "border-box",
  },
};

export default FollowUs;
