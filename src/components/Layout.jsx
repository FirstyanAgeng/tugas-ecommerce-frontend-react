import { Container } from "react-bootstrap";
import NavigationBar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children, cart, updateCart }) => {
  return (
    <>
      <NavigationBar cart={cart} updateCart={updateCart} />{" "}
      {/* Tambahkan updateCart di sini */}
      <Container className="" style={{ height: "200vh" }}>
        {children}
      </Container>
      <Footer />
    </>
  );
};

export default Layout;
