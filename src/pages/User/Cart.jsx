import React from "react";
import { Modal, Table, Button } from "react-bootstrap";
import axios from "axios";
import { getUserId } from "../../utils/Authentication";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
const Cart = ({
  cart,
  show,
  handleClose,
  updateCart,
  setTotalPrice,
  totalPrice,
}) => {
  const userId = getUserId();

  // const calculateTotalPrice = () => {
  //   const totalPrice = cart.reduce((total, product) => {
  //     return total + product.price * product.stock_available;
  //   }, 0);

  //   return totalPrice;
  // };

  // // ...
  const calculateTotalPrice = () => {
    const totalPrice = cart.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);

    return totalPrice;
  };
  const handleIncreaseQuantity = (product) => {
    if (product.quantity < product.stock_available) {
      // Meningkatkan jumlah produk dalam keranjang dengan batasan stok tersedia
      const updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      updateCart(updatedCart);
      // Kurangi stok yang tersedia saat menambah kuantitas
      product.stock_available -= 1;
      // Perbarui harga total
      // setTotalPrice(totalPrice + parseFloat(product.price));
    } else {
      // Tampilkan pesan atau tindakan jika stok produk telah mencapai batasnya
      alert("Stok produk telah mencapai batas.");
    }
  };

  const handleDecreaseQuantity = (product) => {
    if (product.quantity > 1) {
      // Mengurangi jumlah produk dalam keranjang dengan batasan minimum 1
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity - 1, // Mengurangkan kuantitas produk
            }
          : item
      );
      updateCart(updatedCart);
      // Tambahkan stok yang tersedia saat mengurangi kuantitas
      product.stock_available += 1;
      // Perbarui harga total
      // setTotalPrice(totalPrice - parseFloat(product.price));
    } else {
      // Jika kuantitas produk adalah 1, hapus produk dari keranjang
      const updatedCart = cart.filter((item) => item.id !== product.id);
      updateCart(updatedCart);
      // Tambahkan stok yang tersedia karena produk dihapus
      product.stock_available += 1;
      // Kurangi harga total
      // setTotalPrice(totalPrice - parseFloat(product.price));
    }
  };

  // ...

  const placeOrder = () => {
    const token = Cookies.get("authToken");
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Untuk memastikan 2 digit
    const day = String(today.getDate()).padStart(2, "0"); // Untuk memastikan 2 digit
    const formattedDate = `${year}-${month}-${day}`;
    // Data pesanan yang akan dikirim
    const orderData = {
      // order_date: formattedDate,
      status: "Pending",
      total_price: calculateTotalPrice().toFixed(2),
      user: userId,
    };

    console.log("orderData", orderData);

    // Kirim permintaan POST ke endpoint API
    axios
      .post("http://localhost:8000/api/product/list_order/", orderData, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        console.log("Pesanan berhasil dibuat:", response.data);
        // Pesanan berhasil, kosongkan keranjang
        updateCart([]);
        handleClose();
        Swal.fire("selamat pesanan anda sudah terkirim");
      })
      .catch((error) => {
        console.error("Gagal membuat pesanan:", error.response.data);
        // Tambahkan tindakan lain jika pesanan gagal, seperti menampilkan pesan kesalahan.
      });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Your Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((product) => (
              <tr key={product.id}>
                <td>{product.product_name}</td>
                <td>Rp. {product.price}</td>
                <td>{product.quantity}</td>
                <td>Rp. {(product.price * product.quantity).toFixed(2)}</td>
                <td>
                  <Button
                    variant="success"
                    onClick={() => handleIncreaseQuantity(product)}
                  >
                    +
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDecreaseQuantity(product)}
                  >
                    -
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="text-end">
          <strong>Total Price: Rp. {calculateTotalPrice().toFixed(2)}</strong>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-primary" onClick={placeOrder}>
          Place Order
        </button>
        <button className="btn btn-secondary" onClick={handleClose}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default Cart;
