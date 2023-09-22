import axios from "axios";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-use-history";
import {
  setCSRFToken,
  setAuthToken,
  getCSRFToken,
  setUserName,
  setUserId,
} from "../utils/Authentication";
import { DASHBOARD_ADMIN, HOME, PRODUCT } from "../router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleLogin = async () => {
    try {
      const csrfToken = getCSRFToken("csrftoken");
      // Perform a login request to Django and receive the token
      const response = await axios.post(
        "http://127.0.0.1:8000/api/user/token/",
        {
          email,
          password,
        },
        {
          headers: {
            "X-CSRFToken": csrfToken,
          },
        }
      );
      const { token } = response.data;

      setAuthToken(token);
      setCSRFToken(csrfToken);

      const roleResponse = await axios.get(
        "http://127.0.0.1:8000/api/user/role/",
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      const { role, name, id } = roleResponse.data;

      setUserName(name);
      setUserId(id);

      // console.log(name);
      // console.log(role);

      if (role === "ADMIN") {
        history.push(DASHBOARD_ADMIN);
      } else if (role === "USER") {
        history.push(HOME);
      } else {
      }

      // setUserName(user);
      // console.log(csrfToken);
      // console.log(token);
      // Redirect the user to the "equipment" page after a successful login
    } catch (error) {
      // Handle login error here
      console.error("Login failed:", error);
    }
  };

  return (
    <>
      <div className="mt-5">
        <Form className="w-25 mx-auto">
          <h2 className="text-center m-5">LOGIN PAGE</h2>
          <Form.Group>
            <Form.Label className="fw-bold">Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="masukan email anda"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="fw-bold">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="*****"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button className="mt-4 w-100" onClick={handleLogin}>
            Login Sekarang
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Login;
