import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaInstagram, FaTwitter, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import "./Footer.css";
import { assets } from "../../assets/assets";

function Footer() {
    return (
        <footer className="footer py-5 mt-5">
            <Container>
                <Row className="gy-4 gx-5 align-items-start">
                    {/* Left Section (Wider column) */}
                    <Col md={4}>
                        <img src={assets.logo} alt="QuickStay logo" className="footer-logo mb-3" />
                        <p className="text-muted footer-desc">
                            Discover the world’s most extraordinary places to stay — from boutique hotels to luxury villas and private islands.
                        </p>
                        <div className="d-flex gap-3 mt-3">
                            <a href="#" className="footer-icon"><FaInstagram /></a>
                            <a href="#" className="footer-icon"><FaTwitter /></a>
                            <a href="#" className="footer-icon"><FaFacebookF /></a>
                            <a href="#" className="footer-icon"><FaLinkedinIn /></a>
                        </div>
                    </Col>

                    {/* Company */}
                    <Col md={2}>
                        <h6 className="fw-semibold mb-3">Company</h6>
                        <ul className="list-unstyled text-muted footer-links">
                            <li><a href="#">About</a></li>
                            <li><a href="#">Careers</a></li>
                            <li><a href="#">Press</a></li>
                            <li><a href="#">Blog</a></li>
                            <li><a href="#">Partners</a></li>
                        </ul>
                    </Col>

                    {/* Support */}
                    <Col md={3}>
                        <h6 className="fw-semibold mb-3">Support</h6>
                        <ul className="list-unstyled text-muted footer-links">
                            <li><a href="#">Help Center</a></li>
                            <li><a href="#">Safety Information</a></li>
                            <li><a href="#">Cancellation Options</a></li>
                            <li><a href="#">Contact Us</a></li>
                            <li><a href="#">Accessibility</a></li>
                        </ul>
                    </Col>

                    {/* Stay Updated */}
                    <Col md={3}>
                        <h6 className="fw-semibold mb-3">Stay Updated</h6>
                        <p className="text-muted">
                            Subscribe to our newsletter for travel inspiration and special offers.
                        </p>

                    </Col>
                </Row>

                <hr className="my-4" />

                {/* Bottom Section */}
                <div className="d-flex flex-column flex-md-row justify-content-between text-muted small">
                    <p className="mb-0">© {new Date().getFullYear()} QuickStay. All rights reserved.</p>
                    <div className="d-flex gap-3">
                        <a href="#" className="text-muted text-decoration-none">Privacy</a>
                        <a href="#" className="text-muted text-decoration-none">Terms</a>
                        <a href="#" className="text-muted text-decoration-none">Sitemap</a>

                    </div>
                </div>
            </Container>
        </footer>
    );
}

export default Footer;
