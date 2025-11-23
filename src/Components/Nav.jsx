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
      {/* Left: Brand */}
      <div style={styles.leftBrand}>
        <Link to="/" style={styles.brandLink} aria-label="Go to Home">
          <div style={styles.brand} className="brand-text">
            AASCHARYÁ
          </div>
        </Link>
      </div>

      {/* Right: Links */}
      <div
        style={isMobile ? styles.linksContainerMobile : styles.linksContainer}
      >
        <Link to="/videos" style={styles.link}>
  Channel
</Link>
<Link to="/listen" style={styles.link}>
  Listen
</Link>
<Link to="/more" style={styles.link}>
  More
</Link>

      </div>
    </nav>
  );
};

const styles = {
  /* === Navbar Styles === */
  navbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center", // center container so leftBrand is absolute
    padding: "20px 60px",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    background: "transparent",
    color: "red",
    zIndex: 1000,
  },

  navbarMobile: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "15px 20px",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    background: "transparent",
    color: "red",
    zIndex: 1000,
  },

  /* === Brand on the left (absolute to avoid overlap) === */
  leftBrand: {
    position: "absolute",
    left: 60,
    top: 12,
    zIndex: 1100, // above the navbar
    pointerEvents: "auto",
  },

  /* === Links Container aligned to the right visually === */
  linksContainer: {
    display: "flex",
    gap: "35px",
    marginRight: "60px",
    marginLeft: "200px", // create space so brand doesn't overlap links
    justifyContent: "flex-end",
    width: "100%",
    maxWidth: "1200px",
  },

  linksContainerMobile: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    width: "100%",
    paddingRight: "20px",
  },

  link: {
    color: "white",
    textDecoration: "none",
    fontFamily: "'Sunny Spells', cursive",
    fontWeight: "400",
    fontSize: "20px",
    letterSpacing: "1px",
    transition: "color 0.3s ease",
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
  },

  brandLink: {
    textDecoration: "none",
    cursor: "pointer",
    display: "inline-block",
    zIndex: 1101,
  },
};

export default Navbar;
