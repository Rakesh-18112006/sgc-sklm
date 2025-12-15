import { useEffect, useRef } from "react";
import { FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import "./Footer.css";
import sgc from "../../assets/sgc.webp";

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  return (
    <footer className="footer" ref={footerRef}>
      <div className="footer-container">
        <div className="footer-grid">
          {/* Column 1: Logo and Information */}
          <div className="footer-column">
            <div className="logo-container">
              {
                <img
                  src={sgc}
                  alt="Organization Logo"
                  className="footer-logo"
                />
              }
            </div>
            <h3 className="footer-heading">Information</h3>
            <ul className="footer-links">
              <li>
                <a href="/eureka" className="footer-link">
                  Eureka
                </a>
              </li>
              <li>
                <a href="/" className="footer-link">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="footer-link">
                  About Us
                </a>
              </li>
              <li>
                <a href="/events" className="footer-link">
                  Events
                </a>
              </li>
              <li>
                <a href="/clubs" className="footer-link">
                  Clubs
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Newsletter and Social */}
          <div className="footer-column">
            <h3 className="footer-heading">Sign Up for Our Newsletter</h3>
            <p className="footer-text">
              Receive weekly newsletter with Educational, Event Updates and much
              more!
            </p>
            <form
              className="newsletter-form"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Email address"
                className="email-input"
                required
              />
              <button type="submit" className="subscribe-btn">
                <span className="btn-text">Subscribe</span>
              </button>
            </form>

            <div className="social-media">
              <h4 className="social-heading">Follow Us</h4>
              <div className="social-icons">
                <a
                  href="https://x.com/sgcrguktsklm/status/1967312662385365123?t=1BsZDaNJXFv03ZteGW6srg&s=08"
                  className="social-icon"
                  aria-label="Twitter"
                >
                  <FaTwitter />
                </a>
                <a
                  href="https://www.instagram.com/rgukt_sgc_official?igsh=MWY5dWNrM3czM2d5YQ=="
                  className="social-icon"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://www.linkedin.com/company/student-gymkhana-center-rajiv-gandhi-university-of-knowledge-technologies/posts/?feedView=all"
                  className="social-icon"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="https://www.youtube.com/@StudentsGymkhanaCenter"
                  className="social-icon"
                  aria-label="YouTube"
                >
                  <FaYoutube />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            Copyright © 2025-2026 Student Gymkhana Center
          </p>
          <p className="contact-info">
            For queries contact{" "}
            <a href="mailto:help@sgorguktskim.org" className="contact-link">
              help@sgcrguktskim.org
            </a>{" "}
            | Design and Maintained By SGC Web Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
