import { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import "./Navbar1.css";

export default function Navbar1() {
  const [navbarBg, setNavbarBg] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setNavbarBg(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Navbar
      expand="lg"
      fixed="top"
      className={navbarBg ? "navbar-solid" : "navbar-transparent"}
    >
      <Container>
        <Navbar.Brand href="#" className="p-4 me-3 fs-5">QuickStay</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#trips">Hotels</Nav.Link>
            <Nav.Link href="#experiences">About</Nav.Link>
            <Nav.Link href="#about">Contact</Nav.Link>
          </Nav>
          <Button variant="outline-light" className="ms-3">Login</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
