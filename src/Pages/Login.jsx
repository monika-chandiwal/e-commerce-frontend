import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Container, Nav } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import "./pages.css";
import NavbarComponent from "../Common/Navbar";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  // Inside your component
  const navigate = useNavigate();

  const loginUser = (e) => {
    e.preventDefault();
    const user = { email, password };

    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Login failed");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Login successful", data);
        localStorage.setItem("isLoggedIn", "true"); // Or save token if returned
        navigate("/home"); // redirect immediately
      })
      .catch((err) => {
        console.error("Error during login:", err);
        alert("Invalid credentials");
      });
  };

  return (
    <>
      <NavbarComponent />
      <Container
        fluid
        className="d-flex justify-content-center align-items-center signup bg-dark text-white"
        style={{ minHeight: "100vh" }}
      >
        <Form
          onSubmit={loginUser}
          method="POST"
          style={{ width: "100%", maxWidth: "600px" }}
          className="p-4 rounded bg-secondary"
        >
          <h3 className="text-center mb-5">Login</h3>

          {/* Email */}
          <Form.Group as={Row} className="mb-4 justify-content-center">
            <Col sm={8}>
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                className="bg-dark text-white border-light"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-4 justify-content-center"
            style={{
              border: "1px solid #6c757d",
            }}
          >
            <Col sm={8}>
              <InputGroup
                style={{
                  border: "1px solid #ced4da",
                  borderRadius: ".375rem",
                  boxShadow: isFocused
                    ? "0 0 0 0.25rem rgba(13, 110, 253, 0.25)" // Bootstrap's blue focus ring
                    : "none",
                  transition: "box-shadow 0.3s ease",
                }}
              >
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  className="bg-dark text-white border-light"
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  style={{
                    border: "none",
                    boxShadow: "none",
                  }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <InputGroup.Text
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    backgroundColor: "#212529", // dark background
                    color: "white",
                    cursor: "pointer",
                    border: "none",
                  }}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </InputGroup.Text>
              </InputGroup>
            </Col>
          </Form.Group>

          {/* Submit Button */}
          <Form.Group as={Row} className="mt-3 justify-content-center">
            <Col sm={8} className="d-flex justify-content-center">
              <Button variant="light" type="submit">
                Login
              </Button>
            </Col>
          </Form.Group>
          <p
            style={{
              textAlign: "center",
              marginTop: "1.5rem",
            }}
          >
            create new account{" "}
            <Nav.Link
              className="signupButton"
              href="/signup"
              style={{
                display: "inline-block",
                color: "black",
              }}
            >
              Signup
            </Nav.Link>
          </p>
          <div className="text-center mt-3">
            <Nav.Link href="http://localhost:8080/oauth2/authorization/google">
              <Button variant="light">
                <FcGoogle /> Continue with Google
              </Button>
            </Nav.Link>
          </div>
        </Form>
      </Container>
    </>
  );
}
