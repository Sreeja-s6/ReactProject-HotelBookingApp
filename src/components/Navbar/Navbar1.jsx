import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Button, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Navbar1.css'; 
import { assets } from '../../assets/assets';

const Navbar1 = () => {
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Hotels', path: '/rooms' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Navbar
        expand="lg"
        fixed="top"
        style={{
          backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
          transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
          boxShadow: isScrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none',
          backdropFilter: isScrolled ? 'blur(8px)' : 'none',
        }}
      >
        <Container className="d-flex justify-content-between align-items-center py-2">
          {/* Brand / Logo */}
          <Navbar.Brand
            as={Link}
            to="/"
            className={`fw-bold fs-4 ${isScrolled ? 'text-primary' : 'text-white'}`}
          >
            <img
              src={assets.logo}
              alt="logo"
              className={`logo ${isScrolled ? 'scrolled' : ''}`}
            />

          </Navbar.Brand>

          {/* Desktop Links */}
          <Nav className="d-none d-lg-flex align-items-center gap-4">
            {navLinks.map((link, i) => (
              <Nav.Link
                key={i}
                as={Link}
                to={link.path}
                className={`fw-medium position-relative ${isScrolled ? 'text-dark' : 'text-white'
                  }`}
              >
                {link.name}
                <span
                  className={`position-absolute start-0 bottom-0 w-0 h-1 ${isScrolled ? 'bg-dark' : 'bg-white'
                    } hover-expand`}
                />
              </Nav.Link>
            ))}
            {/* <Button
              variant={isScrolled ? 'outline-dark' : 'outline-light'}
              size="sm"
              className="rounded-pill"
            >
              New Launch
            </Button> */}
          </Nav>

          {/* Desktop Right Side */}
          <div className="d-none d-lg-flex align-items-center gap-3">
            <i
              className={`bi bi-search ${isScrolled ? 'text-dark' : 'text-white'
                } fs-5`}
            ></i>
            <Button
              variant={isScrolled ? 'dark' : 'light'}
              className="rounded-pill px-4"
            >
              Login
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="link"
            className="d-lg-none text-decoration-none"
            onClick={() => setIsMenuOpen(true)}
          >
            <i
              className={`bi bi-list ${isScrolled ? 'text-dark' : 'text-white'
                } fs-3`}
            ></i>
          </Button>
        </Container>
      </Navbar>

      {/* Mobile Offcanvas Menu */}
      <Offcanvas
        show={isMenuOpen}
        onHide={() => setIsMenuOpen(false)}
        placement="start"
        className="text-center"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>StayEase</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="d-flex flex-column align-items-center gap-3">
          {navLinks.map((link, i) => (
            <Nav.Link
              key={i}
              as={Link}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className="text-dark fw-medium"
            >
              {link.name}
            </Nav.Link>
          ))}
          <Button variant="outline-dark" className="rounded-pill" size="sm">
            New Launch
          </Button>
          <Button variant="dark" className="rounded-pill px-4">
            Login
          </Button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Navbar1;
