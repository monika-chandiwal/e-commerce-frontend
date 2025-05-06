import React, { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Container, Nav } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import "./pages.css";
import NavbarComponent from "../Common/Navbar";
import { useNavigate } from "react-router-dom";
import ThemeContext from "../Common/ThemeContext";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { theme, toggleTheme } = useContext(ThemeContext);
  //console.log("Navbar theme:", theme);

  const navigate = useNavigate();

  // Handle user login (manual)
  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const user = await response.json();
      console.log("User logged in:", user);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", user.username);
      localStorage.setItem("useremail", user.email);

      navigate("/home");
    } catch (error) {
      console.error("Error during login:", error);
      setError("Invalid email or password.");
    }
  };

  // Google OAuth login handler
  const handleGoogleLogin = () => {
    window.location.href =
      "http://localhost:8080/oauth2/authorization/google?prompt=select_account";
  };

  // Check Google login session
  useEffect(() => {
    fetch("http://localhost:8080/current-user", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Not authenticated");
        return res.json();
      })
      .then((data) => {
        console.log("User logged in via Google:", data);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", data.name);
        localStorage.setItem("useremail", data.email);
        localStorage.setItem("profilePic", data.picture);
        //console.log("Google user:", data);

        navigate("/home");
      })
      .catch((err) => {
        console.log("User not logged in", err.message);
        localStorage.clear();
      });
  }, []);

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
          onSubmit={loginUser}
          method="POST"
          style={{ width: "100%", maxWidth: "600px" }}
          className="p-4 rounded bg-secondary"
        >
          <h3 className="text-center mb-5">Login</h3>

          {/* Show error message */}
          {error && <p className="text-danger text-center">{error}</p>}

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

          {/* Password */}
          <Form.Group
            as={Row}
            className="mb-4 justify-content-center"
            style={{ border: "1px solid #6c757d" }}
          >
            <Col sm={8}>
              <InputGroup
                style={{
                  border: "1px solid #ced4da",
                  borderRadius: ".375rem",
                  boxShadow: isFocused
                    ? "0 0 0 0.25rem rgba(13, 110, 253, 0.25)"
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
                  style={{ border: "none", boxShadow: "none" }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <InputGroup.Text
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    backgroundColor: "#212529",
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

          {/* Login Button */}
          <Form.Group as={Row} className="mt-3 justify-content-center">
            <Col sm={8} className="d-flex justify-content-center">
              <Button variant="light" type="submit">
                Login
              </Button>
            </Col>
          </Form.Group>

          {/* Signup Link */}
          <p className="text-center mt-4">
            Create new account{" "}
            <Nav.Link
              href="/signup"
              style={{ display: "inline-block", color: "black" }}
            >
              Signup
            </Nav.Link>
          </p>

          {/* Google Login */}
          <div className="text-center mt-3">
            <Button onClick={handleGoogleLogin} variant="light">
              <FcGoogle /> Continue with Google
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
}
