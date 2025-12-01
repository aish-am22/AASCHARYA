import React from "react";

const CollaborationSection = () => {
  const styles = {
    collabSection: {
      backgroundColor: "#c00a0aff",
      color: "#ffffffd7",
      textAlign: "center",
      padding: "35px 15px",
      width: "100%",
      margin: 0,
      border: "none",
      fontFamily: "SFHandBold",
    },
    collabText: {
      fontSize: "1.1rem",
      margin: 0,
      lineHeight: "1.8",
      fontWeight: 700,
      letterSpacing: "0.3px",
      fontFamily: "SFHandBold",
    },
    mailLink: {
      color: "white",
      textDecoration: "none",
      fontWeight: 700,
      fontFamily: "SFHandBold",
    },
  };

  return (
    <section style={styles.collabSection}>
      <p style={styles.collabText}>
        For collaboration inquiries and creative partnerships, please contact {" "}
        <a
          href="mailto:teamaascharya@gmail.com?subject=Collaboration Inquiry"
          style={styles.mailLink}
        >
          teamaascharya@gmail.com
        </a>
      </p>
    </section>
  );
};

export default CollaborationSection;
