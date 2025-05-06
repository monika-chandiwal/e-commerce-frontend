import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Container, Nav } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import { useState, useContext } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import "./pages.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ThemeContext from "../Common/ThemeContext";
import NavbarComponent from "../Common/Navbar";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { theme, toggleTheme } = useContext(ThemeContext);
  console.log("Navbar theme:", theme);
  const saveUser = (e) => {
    e.preventDefault();
    const user = { email, username, password };
    console.log(e.target);

    fetch("http://localhost:8080/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    }).then(() => {
      console.log("new student added");
      toast.success("Signup Successfully ! ", {
        position: "bottom-left",
        closeOnClick: "true",
        autoClose: 3000,
      });
    });
  };

  return (
    <>
      <NavbarComponent />
      <Container
        bg={theme}
        variant={theme}
        fluid
        className="d-flex justify-content-center align-items-center signup bg-dark text-white"
        style={{ minHeight: "100vh" }}
      >
        <Form
          onSubmit={saveUser}
          method="POST"
          style={{ width: "100%", maxWidth: "600px" }}
          className="p-4 rounded bg-secondary"
        >
          <h3 className="text-center mb-5">Signup</h3>

          {/* Username */}
          <Form.Group as={Row} className="mb-4 justify-content-center">
            <Col sm={8}>
              <Form.Control
                required
                type="text"
                placeholder="Username"
                name="username"
                className="bg-dark text-white border-light"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Col>
          </Form.Group>

          {/* Email */}
          <Form.Group as={Row} className="mb-4 justify-content-center">
            <Col sm={8}>
              <Form.Control
                required
                type="email"
                placeholder="Email"
                name="email"
                className="bg-dark text-white border-light"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                  required
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
                Sign In
              </Button>
            </Col>
          </Form.Group>
          <p
            style={{
              textAlign: "center",
              marginTop: "1.5rem",
            }}
          >
            already have an account <LoginButton />
          </p>
        </Form>
        <ToastContainer />
      </Container>
    </>
  );
}

function LoginButton() {
  return (
    <Nav.Link
      className="loginButton"
      href="/login"
      style={{
        display: "inline-block",
        color: "black",
      }}
    >
      Login
    </Nav.Link>
  );
}
