import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
      {/* Brand */}
      <div style={isMobile ? styles.leftBrandMobile : styles.leftBrand}>
        <Link to="/" style={styles.brandLink} aria-label="Go to Home">
          <div
            style={isMobile ? styles.brandMobile : styles.brand}
            className="brand-text"
          >
            AASCHARYÁ
          </div>
        </Link>
      </div>

      {/* Links */}
      <div
        style={
          isMobile ? styles.linksContainerMobile : styles.linksContainer
        }
      >
        <Link to="/videos" style={isMobile ? styles.linkMobile : styles.link}>
          Channel
        </Link>
        <Link to="/listen" style={isMobile ? styles.linkMobile : styles.link}>
          Listen
        </Link>
        <Link to="/more" style={isMobile ? styles.linkMobile : styles.link}>
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
    justifyContent: "center", // center container; brand is absolute
    padding: "20px 60px",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    background: "transparent",
    color: "red",
    zIndex: 1000,
    boxSizing: "border-box",
  },

  /* === Mobile Navbar (stacked) === */
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
    background: "transparent",
    color: "red",
    zIndex: 1000,
    boxSizing: "border-box",
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
    marginLeft: "200px", // space so brand doesn't overlap links
    justifyContent: "flex-end",
    width: "100%",
    maxWidth: "1200px",
  },

  /* === Links Mobile: centered row === */
  linksContainerMobile: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 4,
  },

  link: {
    color: "white",
    textDecoration: "none",
    fontFamily: "'Sunny Spells', cursive",
    fontWeight: "400",
    fontSize: "20px",
    letterSpacing: "1px",
    transition: "color 0.3s ease, transform 0.2s ease",
    userSelect: "none",
  },

  linkMobile: {
    color: "white",
    textDecoration: "none",
    fontFamily: "'Sunny Spells', cursive",
    fontWeight: "400",
    fontSize: "17px",
    letterSpacing: "0.5px",
    transition: "color 0.3s ease, transform 0.2s ease",
    userSelect: "none",
  },

  /* === Brand styles === */
  brand: {
    fontWeight: "bold",
    fontSize: "46px",
    fontFamily: "'Rusty Hooks', cursive",
    color: "white",
    letterSpacing: "1px",
    transition: "transform 0.25s ease",
    lineHeight: 1,
    userSelect: "none",
  },

  /* Smaller logo on mobile */
  brandMobile: {
    fontWeight: "bold",
    fontSize: "32px",
    fontFamily: "'Rusty Hooks', cursive",
    color: "white",
    letterSpacing: "0.8px",
    transition: "transform 0.25s ease",
    lineHeight: 1,
    userSelect: "none",
  },

  brandLink: {
    textDecoration: "none",
    cursor: "pointer",
    display: "inline-block",
    zIndex: 1101,
  },
};

export default Navbar;
