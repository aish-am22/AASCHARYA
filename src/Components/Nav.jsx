import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

/* Import the HowdyFriend font (TTF you added) */
import HowdyFriend from "../assets/fonts/HowdyFriend-MABBY.ttf";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav
      style={isMobile ? styles.navbarMobile : styles.navbar}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* local font-face + nav styles */}
      <style>{`
        @font-face {
          font-family: 'HowdyFriend';
          src: url(${HowdyFriend}) format('truetype');
          font-weight: 700;
          font-style: normal;
          font-display: swap;
        }

        /* Apply HowdyFriend to nav links only */
        .nav-link {
          font-family: 'HowdyFriend', sans-serif !important;
          font-weight: 700 !important;
          letter-spacing: 1px;
          text-transform: uppercase;
          text-decoration: none;
          color: inherit;
          display: inline-block;
          transition: transform 160ms ease, color 180ms ease;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* hover affordance */
        .nav-link:hover,
        .nav-link:focus {
          transform: translateY(-3px);
          color: #f5f5f5;
        }

        /* Brand keeps its own font — do not use HowdyFriend */
        .navbar-logo {
          font-family: 'Rusty Hooks', cursive;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}</style>

      {/* Brand */}
      <div style={isMobile ? styles.leftBrandMobile : styles.leftBrand}>
        <Link to="/" style={styles.brandLink} aria-label="Go to Home">
          <div
            style={isMobile ? styles.brandMobile : styles.brand}
            className="brand-text navbar-logo"
          >
            AASCHARYÁ
          </div>
        </Link>
      </div>

      {/* Links */}
      <div
        style={isMobile ? styles.linksContainerMobile : styles.linksContainer}
      >
        <Link to="/videos" className="nav-link" style={isMobile ? styles.linkMobile : styles.link}>
          Channel
        </Link>

        <Link to="/listen" className="nav-link" style={isMobile ? styles.linkMobile : styles.link}>
          Listen
        </Link>

        <Link to="/more" className="nav-link" style={isMobile ? styles.linkMobile : styles.link}>
          More
        </Link>
      </div>
    </nav>
  );
};

const styles = {
  /* === Desktop Navbar === */
  navbar: {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px 60px",
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  width: "100%",
  backgroundColor: "transparent",
  backdropFilter: "none",
  color: "white",
  zIndex: 1000,
  boxSizing: "border-box",
  pointerEvents: "none",
},

navbarMobile: {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "12px 16px 10px",
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  width: "100%",
  backgroundColor: "transparent",
  backdropFilter: "none",
  color: "white",
  zIndex: 1000,
  boxSizing: "border-box",
  pointerEvents: "none",
},


  /* === Brand Desktop: pinned left === */
  leftBrand: {
    position: "absolute",
    left: 60,
    top: 12,
    zIndex: 1100,
    pointerEvents: "auto",
  },

  /* === Brand Mobile: centered, in flow === */
  leftBrandMobile: {
    position: "static",
    marginBottom: 6,
    zIndex: 1100,
    pointerEvents: "auto",
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },

  /* === Links Desktop: right-aligned === */
  linksContainer: {
    display: "flex",
    gap: "35px",
    marginRight: "60px",
    marginLeft: "200px",
    justifyContent: "flex-end",
    width: "100%",
    maxWidth: "1200px",
    pointerEvents: "auto",
  },

  /* === Links Mobile: centered row === */
  linksContainerMobile: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 4,
    pointerEvents: "auto",
  },

  /* NOTE: removed fontFamily here so .nav-link font is used */
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "700",
    fontSize: "20px",
    letterSpacing: "1px",
    transition: "color 0.3s ease, transform 0.2s ease",
    userSelect: "none",
  },

  linkMobile: {
    color: "white",
    textDecoration: "none",
    fontWeight: "700",
    fontSize: "17px",
    letterSpacing: "0.5px",
    transition: "color 0.3s ease, transform 0.2s ease",
    userSelect: "none",
  },

  /* === Brand styles === */
  brand: {
    fontWeight: "700",
    fontSize: "46px",
    fontFamily: "'Rusty Hooks', cursive",
    color: "white",
    letterSpacing: "1px",
    transition: "transform 0.25s ease",
    lineHeight: 1,
    userSelect: "none",
    pointerEvents: "auto",
  },

  /* Smaller logo on mobile */
  brandMobile: {
    fontWeight: "700",
    fontSize: "32px",
    fontFamily: "'Rusty Hooks', cursive",
    color: "white",
    letterSpacing: "0.8px",
    transition: "transform 0.25s ease",
    lineHeight: 1,
    userSelect: "none",
    pointerEvents: "auto",
  },

  brandLink: {
    textDecoration: "none",
    cursor: "pointer",
    display: "inline-block",
    zIndex: 1101,
    pointerEvents: "auto",
  },
};

export default Navbar;
