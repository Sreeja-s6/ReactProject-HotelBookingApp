import React, { useState, useEffect, useContext } from "react";
import { Navbar, Nav, Container, Button, Offcanvas, Dropdown } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHeart, FaSun, FaMoon } from "react-icons/fa";
import { assets } from "../../assets/assets";
import { WishlistContext } from "../../context/WishlistContext";
import { ThemeContext } from "../../context/ThemeContext";
import "./Navbar1.css";

const Navbar1 = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Hotels", path: "/rooms" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { wishlist, clearWishlist } = useContext(WishlistContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const authUser = JSON.parse(localStorage.getItem("authUser"));

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Transparent only on home top in light mode
  const isTransparent = isHome && !isScrolled && theme === "light";

  const handleWishlistClick = () => {
    if (authUser) navigate("/wishlist");
    else navigate("/login");
  };

  const handleLogout = () => {
    if (authUser) localStorage.removeItem(`wishlist_${authUser.email}`);
    clearWishlist();
    localStorage.removeItem("authUser");
    navigate("/", { replace: true });
  };

  return (
    <>
      <Navbar
        expand="lg"
        fixed="top"
        style={{
          backgroundColor: isTransparent
            ? "transparent"
            : theme === "dark"
              ? "rgba(0,0,0,0.85)"
              : "rgba(255,255,255,0.95)",
          transition: "background-color 0.3s ease, box-shadow 0.3s ease",
          boxShadow: !isTransparent ? "0 2px 10px rgba(0,0,0,0.1)" : "none",
          backdropFilter: !isTransparent ? "blur(8px)" : "none",
        }}
      >
        <Container className="d-flex justify-content-between align-items-center py-2">
          {/* Logo */}
          <Navbar.Brand as={Link} to="/" className="fw-bold fs-4">
  <img
    src={assets.logo} // white logo
    alt="StayEase Logo"
    style={{
      height: "40px",
      width: "auto",
      filter:
        theme === "dark"
          ? "invert(0)" 
          : isTransparent
            ? "invert(0)" 
            : "invert(1) brightness(0)", 
      transition: "filter 0.3s ease",
    }}
  />
</Navbar.Brand>



          {/* Desktop Links */}
          <Nav className="d-none d-lg-flex align-items-center gap-4">
            {navLinks.map((link, i) => (
              <Nav.Link
                key={i}
                as={Link}
                to={link.path}
                className={`fw-medium position-relative ${theme === "dark"
                    ? "text-light"
                    : isTransparent
                      ? "text-white"
                      : "text-dark"
                  }`}
              >
                {link.name}
              </Nav.Link>
            ))}
          </Nav>

          {/* Right Section */}
          <div className="d-none d-lg-flex align-items-center gap-3">
            {/* Wishlist */}
            <div
              style={{ position: "relative", cursor: "pointer" }}
              onClick={handleWishlistClick}
            >
              <FaHeart size={20} color="red" />
              {wishlist.length > 0 && (
                <span className="badge-heart">{wishlist.length}</span>
              )}
            </div>

            {/* Theme Toggle */}
            <Button
              variant="outline-secondary"
              className="rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: "40px",
                height: "40px",
                border: "none",
                background: "transparent",
                color: theme === "dark" ? "#fff" : "#000",
              }}
              onClick={toggleTheme}
              title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
            >
              {theme === "light" ? <FaMoon size={18} /> : <FaSun size={18} />}
            </Button>

            {/* User Login / Dropdown */}
            {authUser ? (
              <Dropdown align="end">
                <Dropdown.Toggle
                  variant={theme === "dark" ? "light" : "dark"}
                  className="rounded-pill d-flex align-items-center justify-content-center"
                  style={{ width: "40px", height: "40px", padding: 0 }}
                  id="dropdown-user"
                >
                  <i className="bi bi-person-fill fs-5" />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => navigate("/my-bookings")}>
                    My Bookings
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Button
                variant={theme === "dark" ? "light" : "dark"}
                className="rounded-pill px-4"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <div className="d-lg-none ms-auto">
            <img
              src={assets.menuIcon}
              alt="menu"
              onClick={() => setIsMenuOpen(true)}
              style={{
                height: "1.8rem",
                width: "1.8rem",
                marginRight: "0.8rem",
                cursor: "pointer",
                filter:
                  theme === "dark"
                    ? "invert(1)"
                    : isTransparent
                      ? "invert(0)"
                      : "invert(1)",
              }}
            />
          </div>
        </Container>
      </Navbar>

      {/* Mobile Offcanvas */}
      <Offcanvas
        show={isMenuOpen}
        onHide={() => setIsMenuOpen(false)}
        placement="start"
        className={`offcanvas-fullscreen text-center ${theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"
          }`}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="fw-bold fs-4 d-flex align-items-center gap-2 mx-auto">
            <img src={assets.logo} alt="StayEase logo" style={{ height: "36px", width: "auto" }} />
          </Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body className="d-flex flex-column align-items-center justify-content-center gap-4 mt-3">
          {navLinks.map((link, i) => (
            <Nav.Link
              key={i}
              as={Link}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className={`fw-medium fs-5 ${theme === "dark" ? "text-light" : "text-dark"
                }`}
            >
              {link.name}
            </Nav.Link>
          ))}

          {/* Wishlist */}
          <div
            style={{ position: "relative", cursor: "pointer" }}
            onClick={handleWishlistClick}
          >
            <FaHeart size={20} color="red" />
            {wishlist.length > 0 && <span className="badge-heart">{wishlist.length}</span>}
          </div>

          {/* Theme Toggle */}
          <Button
            variant={theme === "dark" ? "light" : "dark"}
            className="rounded-pill px-4 py-2 mt-3"
            onClick={toggleTheme}
          >
            {theme === "light" ? "Dark Mode 🌙" : "Light Mode ☀️"}
          </Button>

          {authUser ? (
            <Button
              variant={theme === "dark" ? "light" : "dark"}
              className="rounded-pill px-4 py-2 mt-3"
              onClick={() => {
                setIsMenuOpen(false);
                handleLogout();
              }}
            >
              Logout
            </Button>
          ) : (
            <Button
              variant={theme === "dark" ? "light" : "dark"}
              className="rounded-pill px-4 py-2 mt-3"
              onClick={() => {
                setIsMenuOpen(false);
                navigate("/login");
              }}
            >
              Login
            </Button>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Navbar1;
