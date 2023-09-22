import React, { useState } from "react";
import { Container, Nav, Navbar, NavDropdown, Button } from "react-bootstrap";
import { HOME, PRODUCT, LOGIN } from "../router";
import { useNavigate } from "react-router-dom";
import { getUserName, setAuthToken } from "../utils/Authentication";
import Cookies from "js-cookie";
import { BsCartFill } from "react-icons/bs";
import Cart from "../pages/User/Cart";

const NavigationBar = ({ cart, updateCart, setTotalPrice, totalPrice }) => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(!!getUserName());
  const [cartModalShow, setCartModalShow] = useState(false);

  const handleLogout = () => {
    setAuthToken(null);
    Cookies.remove("userName");
    setLoggedIn(false);
    navigate(LOGIN);
  };

  const handleShowCartModal = () => {
    setCartModalShow(true);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href={HOME}>Beranda</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href={HOME}>Home</Nav.Link>
            <Nav.Link href={PRODUCT}>Product</Nav.Link>
          </Nav>
          {loggedIn ? (
            <>
              <NavDropdown
                title={getUserName()}
                id="basic-nav-dropdown"
                className="me-3"
              >
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
              <Button variant="primary" onClick={handleShowCartModal}>
                <BsCartFill /> Cart
              </Button>
            </>
          ) : (
            <Button variant="primary" onClick={() => navigate(LOGIN)}>
              Login
            </Button>
          )}
        </Navbar.Collapse>
      </Container>

      <Cart
        cart={cart}
        updateCart={updateCart}
        setTotalPrice={setTotalPrice}
        totalPrice={totalPrice}
        show={cartModalShow}
        handleClose={() => setCartModalShow(false)}
      />
    </Navbar>
  );
};

export default NavigationBar;
