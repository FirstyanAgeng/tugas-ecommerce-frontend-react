import React, { useState } from "react";
import { Container, Nav, Navbar, NavDropdown, Button } from "react-bootstrap";
import { HOME, PRODUCT, LOGIN } from "../router";
import { useNavigate } from "react-router-dom";
import { getUserName, setAuthToken } from "../utils/Authentication";
import Cookies from "js-cookie";

const NavAdmin = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(!!getUserName());

  const handleLogout = () => {
    setAuthToken(null);
    Cookies.remove("userName");
    setLoggedIn(false);

    navigate(LOGIN);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href={HOME}>Admin</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Container>
      <Navbar.Collapse id="basic-navbar-nav">
        {loggedIn ? (
          <NavDropdown title={getUserName()} id="basic-nav-dropdown">
            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
          </NavDropdown>
        ) : (
          <Button variant="primary" onClick={() => navigate(LOGIN)}>
            Login
          </Button>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavAdmin;
