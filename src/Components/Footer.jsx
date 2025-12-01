import React from "react";

const Footer = () => {
  return (
    <footer className="footer-main">
      <div className="footer-container">

        {/* SOCIAL ICONS */}
        <div className="footer-social">
          <a
            href="https://www.instagram.com/aascharyaaa"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="footer-link"
          >
            <i className="fab fa-instagram"></i>
          </a>

          <a
            href="https://youtube.com/@aascharyaaa"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="footer-link"
          >
            <i className="fab fa-youtube"></i>
          </a>

          <a
            href="https://open.spotify.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Spotify"
            className="footer-link"
          >
            <i className="fab fa-spotify"></i>
          </a>

          <a
            href="https://music.apple.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Apple Music"
            className="footer-link"
          >
            <i className="fab fa-apple"></i>
          </a>

          <a
            href="https://x.com/aascharyaaa"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X"
            className="footer-link"
          >
            <i className="fab fa-x-twitter"></i>
          </a>

          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="footer-link"
          >
            <i className="fab fa-facebook"></i>
          </a>
        </div>

        {/* COPYRIGHT */}
        <div className="footer-copy">
          {/* © {new Date().getFullYear()} AASCHARYÁ. All rights reserved. */}
        </div>
      </div>

      {/* INLINE CSS FOR FOOTER */}
      <style>{`
        .footer-main {
          width: 100%;
          background-color: #c00a0aff;
          padding: 20px 0;
          text-align: center;
          font-family: 'Sunny Spells', cursive !important;
        }

        .footer-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
        }

        .footer-social {
          display: flex;
          gap: 30px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .footer-link {
          color: white;
          font-size: 26px;
          transition: transform 0.3s ease, color 0.3s ease;
        }

        .footer-link:hover {
          transform: translateY(-6px) scale(1.15);
          // color: #ffd700;
        }

        .footer-copy {
          color: rgba(255,255,255,0.85);
          font-size: 14px;
        }

        @media (max-width: 500px) {
          .footer-link {
            font-size: 22px;
          }
          .footer-social {
            gap: 20px;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
