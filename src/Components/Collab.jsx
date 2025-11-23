import React from "react";

const CollaborationSection = () => {
  const styles = {
    collabSection: {
      backgroundColor: "#c00000",
      color: "#fff",
      textAlign: "center",
      padding: "35px 15px",
      width: "100%",
      margin: 0,
      border: "none",
      fontFamily: "'Sunny Spells', cursive", // ✅ font added here
    },
    collabText: {
      fontSize: "1.3rem",
      margin: 0,
      lineHeight: "1.8",
      fontWeight: 500,
      letterSpacing: "0.3px",
      fontFamily: "'Sunny Spells', cursive", // ✅ font for text
    },
    mailLink: {
      color: "white",
      textDecoration: "none",
      fontWeight: "700",
      fontFamily: "'Sunny Spells', cursive", // ✅ link font
    },
  };

  return (
    <section style={styles.collabSection}>
      <p style={styles.collabText}>
        For collaborations or partnerships, mail us at{" "}
        <a
          href="mailto:aascharyamusic@gmail.com?subject=Collaboration Inquiry"
          style={styles.mailLink}
        >
          aascharyamusic@gmail.com
        </a>
      </p>
    </section>
  );
};

export default CollaborationSection;
