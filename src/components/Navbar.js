import React from "react";
import { Link } from "react-router-dom";
import { Button, Navbar, Container } from "react-bootstrap";

const NavBar = ({ setDarkMode, darkMode }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <Navbar bg={darkMode ? "dark" : "primary"} variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/users">
          <img src="/logo.png" alt="Logo" width="30" height="30" className="d-inline-block align-top" /> 
          EmployWise
        </Navbar.Brand>
        <div className="d-flex align-items-center">
          <Button variant="light" className="me-2" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </Button>
          <Button variant="danger" onClick={handleLogout}>Logout</Button>
        </div>
      </Container>
    </Navbar>
  );
};

export default NavBar;
