import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import Layout from "../components/Layout";
import { getUserName } from "../utils/Authentication";
import axios from "axios";
import Swal from "sweetalert2";
const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loggedIn, setLoggedIn] = useState(!!getUserName());

  useEffect(() => {
    // Ambil daftar produk dari API
    axios
      .get("http://127.0.0.1:8000/api/product/list_product/")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // const addToCart = (product) => {
  //   // Tambahkan produk ke keranjang
  //   setCart([...cart, product]);
  //   // Tambahkan harga produk ke total harga
  //   setTotalPrice(totalPrice + parseFloat(product.price));
  // };
  // // ... (Kode lainnya tetap sama)
  // // ...
  const addToCart = (product) => {
    // Tambahkan produk ke keranjang dengan menggunakan stock_available
    if (product.stock_available > 0) {
      // Pastikan stok tersedia sebelum menambahkannya ke keranjang
      setCart([...cart, { ...product, quantity: 1 }]);
      // Kurangi stok yang tersedia setelah menambahkannya ke keranjang
      product.stock_available -= 1;
      // Tambahkan harga produk ke total harga
      setTotalPrice(totalPrice + parseFloat(product.price));
    } else {
      // Tampilkan pesan atau tindakan jika stok habis
      alert("Stok produk habis.");
    }
  };
  // ...

  return (
    <Layout cart={cart} updateCart={setCart}>
      <div className="h-100" style={{ height: "200vh" }}>
        <div className="row my-5">
          {products.map((product, index) => (
            <div className="col-4 mb-5" key={product.id}>
              <Card style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src={product.image}
                  className="img-thumbnail"
                />
                <Card.Body>
                  <Card.Title>{product.product_name}</Card.Title>
                  <Card.Text>
                    <p>Harga : {product.price}</p>
                    <p>Stock Tersedia : {product.stock_available}</p>
                  </Card.Text>
                  {loggedIn ? (
                    <Button
                      variant="primary"
                      onClick={() =>
                        addToCart(product) +
                        Swal.fire("data berhasil ditambahkan")
                      }
                    >
                      Tambah ke Keranjang
                    </Button>
                  ) : null}
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Homepage;
