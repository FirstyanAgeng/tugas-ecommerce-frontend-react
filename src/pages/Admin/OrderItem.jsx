import LayoutAdmin from "../../components/LayoutAdmin";
import axios from "axios";
import { Button, Spinner, Badge } from "react-bootstrap";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { getCSRFToken } from "../../utils/Authentication";

const OrderItem = () => {
  //   const moment = require("moment");
  const navigate = useNavigate();
  const [Order, setOrder] = useState([]);
  //   const [isLoading, setIsLoading] = useState(true);

  const token = Cookies.get("authToken");
  const csrftoken = getCSRFToken("csrftoken");
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/product/order_item/", {
        headers: {
          Authorization: `Token ${token}`,
          "X-CSRFToken": csrftoken,
        },
      })
      .then((response) => {
        setOrder(response.data);
        console.log(response.data);
        // setIsLoading(false);
      })
      .catch((error) => {
        // setIsLoading(false);
        console.log(error);
        Swal.fire(error);
      });
  }, [token, csrftoken]);

  const deleteOrder = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/product/order_item/${id}/`, {
        headers: {
          Authorization: `Token ${token}`,
          "X-CSRFToken": csrftoken,
        },
      })
      .then((response) => {
        setOrder(Order.filter((borrow) => borrow.id !== id));
        Swal.fire("Data Berhasil Dihapus");
      })
      .catch((error) => {
        console.log("error : ", error.response);
      });
  };

  const statusColors = {
    Pending: "danger",
    Shipped: "success",
    Delivered: "success",
    Cancelled: "warning",
  };

  return (
    <>
      <LayoutAdmin>
        {/* {isLoading ? (
          <div className="d-flex w-100 h-100">
            <Spinner
              animation="border"
              role="status"
              className="mx-auto my-5"
            ></Spinner>
          </div>
        ) : ( */}
        <div style={{ marginTop: 65 }}>
          <div className="container-fluid">
            <h3 className="text-center">Order</h3>

            <div className="w-full mw-full">
              <div className="card p-0 bg-very-dark-dm">
                <div className="table-responsive">
                  <table className="table table-inner-bordered">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Tanggal</th>
                        <th>User</th>
                        <th>Status</th>
                        <th>Total Harga</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Order.map((order, index) => {
                        return (
                          <tr key={order.id}>
                            <td>{index + 1}</td>
                            <td>{order.order_detail.order_date}</td>
                            <td>{order.order_detail.user_detail.name}</td>
                            <td>
                              {order.order_detail.status in statusColors ? (
                                <Badge
                                  bg={statusColors[order.order_detail.status]}
                                >
                                  {order.order_detail.status}
                                </Badge>
                              ) : null}
                            </td>
                            <td>{order.price}</td>
                            {/* <td>
                                <img
                                  src={borrow.image}
                                  alt=""
                                  width="150"
                                  height="150"
                                />
                              </td> */}
                            <td>
                              <div className="row">
                                <div className="col-1">
                                  <span
                                    style={{ cursor: "pointer" }}
                                    onClick={() => deleteOrder(order.id)}
                                  >
                                    ❌
                                  </span>
                                </div>
                                <div className="col-1">
                                  <Link
                                    to={`/edit-order/${order.id}`}
                                    style={{ textDecoration: "none" }}
                                  >
                                    <span style={{ cursor: "pointer" }}>
                                      ✏️
                                    </span>
                                  </Link>
                                </div>
                              </div>
                            </td>
                            {/* <td>{recipe.tags}</td> */}
                            {/* <td>{recipe.ingredients}</td> */}
                            {/* <td key={index}>
                              {recipe.ingredients.map((ingredient) => (
                                <div key={ingredient.id}>
                                  <span>ID: {ingredient.id}</span>
                                  <span>Name: {ingredient.name}</span>
                                </div>
                              ))}
                            </td> */}

                            <td>
                              <div className="row">
                                {/* <div className="col-10">{data.note}</div> */}
                                <div className="col-1">
                                  {/* <Link
                                    to={`./${data.id}`}
                                    style={{ cursor: "pointer" }}
                                  >
                                    🔍
                                  </Link> */}
                                </div>
                                <div className="col-1">
                                  {/* <span
                                    style={{ cursor: "pointer" }}
                                    onClick={() => deleteContact()}
                                  >
                                    ❌
                                  </span> */}
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* )} */}
      </LayoutAdmin>
    </>
  );
};

export default OrderItem;
