import React, { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaInstagram, FaTwitter, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import "./Footer.css";
import { assets } from "../../assets/assets";
import { ThemeContext } from "../../context/ThemeContext"; // ✅ Theme context import

function Footer() {
  const { theme } = useContext(ThemeContext); // ✅ get theme (light/dark)

  return (
    <footer
      className={`footer ${theme === "dark" ? "footer-dark" : "footer-light"
        } py-5 mt-5`}
    >
      <Container>
        <Row className="gy-4 gx-5 align-items-start">
          {/* --- Left Section (Logo + Description + Socials) --- */}
          <Col md={4}>
            <img
              src={assets.logo}
              alt="QuickStay logo"
              className="footer-logo mb-3"
            />
            <p className="footer-desc">
              Discover the world’s most extraordinary places to stay — from
              boutique hotels to luxury villas and private islands.
            </p>

            <div className="d-flex gap-3 mt-3">
              <a href="#" className="footer-icon">
                <FaInstagram />
              </a>
              <a href="#" className="footer-icon">
                <FaTwitter />
              </a>
              <a href="#" className="footer-icon">
                <FaFacebookF />
              </a>
              <a href="#" className="footer-icon">
                <FaLinkedinIn />
              </a>
            </div>
          </Col>

          {/* --- Company --- */}
          <Col md={2}>
            <h6 className="fw-semibold mb-3">Company</h6>
            <ul className="list-unstyled footer-links">
              <li><a href="/about">About</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Partners</a></li>
            </ul>
          </Col>

          {/* --- Support --- */}
          <Col md={3}>
            <h6 className="fw-semibold mb-3">Support</h6>
            <ul className="list-unstyled footer-links">
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Safety Information</a></li>
              <li><a href="#">Cancellation Options</a></li>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="#">Accessibility</a></li>
            </ul>
          </Col>

          {/* --- Stay Updated --- */}
          <Col md={3}>
            <h6 className="fw-semibold mb-3">Stay Updated</h6>
            <p className="footer-desc">
              Subscribe to our newsletter for travel inspiration and special offers.
            </p>
            {/* (Optional: You can add an email input here later) */}
          </Col>
        </Row>

        <hr className="my-4" />

        {/* --- Bottom Section --- */}
        <div className="d-flex flex-column flex-md-row justify-content-between small">
          <p className="mb-0">
            © {new Date().getFullYear()} QuickStay. All rights reserved.
          </p>
          <div className="bottom-links d-flex gap-3">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Sitemap</a>
          </div>
        </div>

      </Container>
    </footer>
  );
}

export default Footer;
