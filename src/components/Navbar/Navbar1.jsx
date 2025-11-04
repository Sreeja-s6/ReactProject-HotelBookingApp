import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Button, Offcanvas } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar1.css';
import { assets } from '../../assets/assets';

const Navbar1 = () => {
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Hotels', path: '/rooms' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const location = useLocation();
  const navigate = useNavigate(); // ✅ place this here (not inside return)

  const isHome = location.pathname === '/';

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isTransparent = isHome && !isScrolled;

  return (
    <>
      <Navbar
        expand="lg"
        fixed="top"
        style={{
          backgroundColor: isTransparent
            ? 'transparent'
            : 'rgba(255, 255, 255, 0.95)',
          transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
          boxShadow: !isTransparent ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none',
          backdropFilter: !isTransparent ? 'blur(8px)' : 'none',
        }}
      >
        <Container className="d-flex justify-content-between align-items-center py-2">

          {/* 🏨 Brand / Logo */}
          <Navbar.Brand as={Link} to="/" className="fw-bold fs-4">
            <img
              src={assets.logo}
              alt="StayEase Logo"
              style={{
                height: '40px',
                width: 'auto',
                filter: isTransparent
                  ? 'invert(0) brightness(100)'
                  : 'invert(1) brightness(0)',
                transition: 'filter 0.3s ease',
              }}
            />
          </Navbar.Brand>

          {/* 💻 Desktop Nav Links */}
          <Nav className="d-none d-lg-flex align-items-center gap-4">
            {navLinks.map((link, i) => (
              <Nav.Link
                key={i}
                as={Link}
                to={link.path}
                className={`fw-medium position-relative ${
                  isTransparent ? 'text-white' : 'text-dark'
                }`}
              >
                {link.name}
                <span
                  className={`position-absolute start-0 bottom-0 w-0 h-1 ${
                    isTransparent ? 'bg-white' : 'bg-dark'
                  } hover-expand`}
                />
              </Nav.Link>
            ))}
          </Nav>

          {/* 💻 Desktop Right Side */}
          <div className="d-none d-lg-flex align-items-center gap-3">
            <i
              className={`bi bi-search ${
                isTransparent ? 'text-white' : 'text-dark'
              } fs-5`}
            ></i>
            <Button
              variant={isTransparent ? 'light' : 'dark'}
              className="rounded-pill px-4"
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
          </div>

          {/* 📱 Mobile Menu Button */}
          <div className="d-md-none ms-auto">
            <img
              src={assets.menuIcon}
              alt="menu"
              onClick={() => setIsMenuOpen(true)}
              style={{
                height: '1.8rem',
                width: '1.8rem',
                marginRight: '0.8rem',
                cursor: 'pointer',
                filter: isTransparent ? 'invert(0)' : 'invert(1)',
                transition: 'filter 0.3s ease, opacity 0.3s ease',
              }}
            />
          </div>
        </Container>
      </Navbar>

      {/* 📱 Mobile Offcanvas Menu */}
      <Offcanvas
        show={isMenuOpen}
        onHide={() => setIsMenuOpen(false)}
        placement="end"
        className="text-center"
        style={{ backgroundColor: '#fff' }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="fw-bold fs-4 d-flex align-items-center gap-2 mx-auto">
            <img
              src={assets.logo}
              alt="StayEase logo"
              style={{
                height: '36px',
                width: 'auto',
                filter: 'invert(1) brightness(0)',
              }}
            />
          </Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body className="d-flex flex-column align-items-center justify-content-center gap-4 mt-3">
          {navLinks.map((link, i) => (
            <Nav.Link
              key={i}
              as={Link}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className="text-dark fw-medium fs-5"
            >
              {link.name}
            </Nav.Link>
          ))}

          <Button
            variant="dark"
            className="rounded-pill px-4 py-2 mt-3"
            onClick={() => {
              setIsMenuOpen(false);
              navigate('/login');
            }}
          >
            Login
          </Button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Navbar1;
