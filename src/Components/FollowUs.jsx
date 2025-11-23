import React, { useEffect } from "react";
import bomma from "../assets/Bomma-1.svg"; // Desktop background
import Image from "../assets/morebg.svg"; // Mobile background

const FollowUs = () => {
  // ✅ Apply red background and remove margins when this page loads
  useEffect(() => {
    document.body.style.backgroundColor = "#C00000";
    document.body.style.margin = "0";

    return () => {
      document.body.style.backgroundColor = "";
      document.body.style.margin = "";
    };
  }, []);

  // Shared button style
  const buttonStyle = {
    padding: "19px 30px",
    borderRadius: "50px",
    fontFamily: "'Sunny Spells', cursive",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s ease",
    backdropFilter: "blur(5px)",
    width: "180px",
    border: "2px solid rgba(255, 255, 255, 0.3)",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    textDecoration: "none",
    display: "inline-block",
    textAlign: "center",
  };

  // Title button style
  const titleButtonStyle = {
    ...buttonStyle,
    backgroundColor: "rgba(192, 0, 0, 0.8)",
    cursor: "default",
    border: "2px solid rgba(255, 255, 255, 0.5)",
    marginBottom: "10px",
  };

  // Centered button container
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

  return (
    <>
      <div style={styles.container} className="follow-us-container">
        <div style={buttonContainerStyle}>
          <div style={titleButtonStyle}>Follow AASCHARYÁ</div>

          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            style={buttonStyle}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor = "rgba(255, 0, 0, 0.7)")
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = "rgba(0, 0, 0, 0.5)")
            }
          >
            Instagram
          </a>

          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            style={buttonStyle}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor = "rgba(255, 0, 0, 0.7)")
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = "rgba(0, 0, 0, 0.5)")
            }
          >
            YouTube
          </a>

          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            style={buttonStyle}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor = "rgba(255, 0, 0, 0.7)")
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = "rgba(0, 0, 0, 0.5)")
            }
          >
            X
          </a>

          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            style={buttonStyle}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor = "rgba(255, 0, 0, 0.7)")
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = "rgba(0, 0, 0, 0.5)")
            }
          >
            Facebook
          </a>
        </div>
      </div>

      {/* ✅ Switch backgrounds based on screen size */}
      <style>
        {`
          .follow-us-container {
            background-image: url(${bomma});
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            width: 100%;
            height: 100vh;
            border: 6px solid #C00000;
            position: relative;
            overflow: hidden;
          }

          /* ✅ Mobile View (use morebg.svg) */
          @media (max-width: 768px) {
            .follow-us-container {
              background-image: url(${Image}) !important;
              background-size: cover;
              background-position: center;
            }

            a {
              width: 160px !important;
              font-size: 16px !important;
              padding: 15px 20px !important;
            }
          }

          @media (max-width: 480px) {
            .follow-us-container {
              background-image: url(${Image}) !important;
              background-size: cover;
              background-position: center;
            }

            a {
              width: 140px !important;
              font-size: 15px !important;
              padding: 12px 18px !important;
            }
          }
        `}
      </style>
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
    border: "6px solid #C00000",
    boxSizing: "border-box",
  },
};

export default FollowUs;
