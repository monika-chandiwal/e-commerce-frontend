import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useRef, useEffect } from "react";
import { Navbar, Nav, Container, Form, Image, Card } from "react-bootstrap";
import { IoCartOutline } from "react-icons/io5";
import { FaRegHeart, FaRegUserCircle } from "react-icons/fa";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { FiUserPlus } from "react-icons/fi";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export default function NavbarComponent() {
  const [query, setQuery] = useState("");
  const [showCard, setShowCard] = useState(false);
  const cardRef = useRef(null);
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const fullName = localStorage.getItem("username") || "";
  const email = localStorage.getItem("useremail") || "";
  const profilePic = localStorage.getItem("ProfilePic");

  const initials = fullName
    .split(" ")
    .map((n, i) => (i < 2 ? n[0] : ""))
    .join("")
    .toUpperCase();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleOutsideClick = (e) => {
    if (cardRef.current && !cardRef.current.contains(e.target)) {
      setShowCard(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleProfileClick = () => {
    setShowCard((prev) => !prev);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search submitted:", query);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Container fluid className="mx-2">
        <Navbar.Brand href="/">StyliQue</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center w-100">
            <Nav.Link href="/">MEN</Nav.Link>
            <Nav.Link href="/women">WOMEN</Nav.Link>
            <Nav.Link href="/kids">KIDS</Nav.Link>
            <Nav.Link href="/home">HOME</Nav.Link>
            <Nav.Link href="/cart">BEAUTY</Nav.Link>
          </Nav>

          <Nav className="align-items-center position-relative">
            <Form className="d-flex w-60 mx-2" onSubmit={handleSearch}>
              <Form.Control
                type="text"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="custom-search"
              />
            </Form>

            <Nav.Link href="/wishlist">
              <FaRegHeart /> Wishlist
            </Nav.Link>
            <Nav.Link href="/cart">
              <IoCartOutline /> Cart
            </Nav.Link>

            {!isLoggedIn ? (
              <Nav.Link href="/login">
                <FaRegUserCircle className="spinning-icon" /> Login
              </Nav.Link>
            ) : (
              <div className="position-relative">
                <div
                  onClick={handleProfileClick}
                  style={{
                    cursor: "pointer",
                    border: "1px solid white",
                    borderRadius: "1rem",
                    padding: "0.3rem 0.6rem",
                    color: "white",
                    display: "inline-block",
                  }}
                >
                  {initials}
                </div>

                {showCard && (
                  <Card
                    ref={cardRef}
                    className="position-absolute mt-2"
                    style={{
                      right: 0,
                      minWidth: "250px",
                      display: "flex",
                      flexDirection: "column",
                      textAlign: "center",
                    }}
                  >
                    <Card.Body>
                      {profilePic ? (
                        <Image
                          src={profilePic}
                          roundedCircle
                          width="50"
                          height="50"
                          className="me-2"
                        />
                      ) : (
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-disabled">
                              Add profile picture
                            </Tooltip>
                          }
                        >
                          <span className="d-inline-block">
                            <FiUserPlus
                              size={30}
                              style={{
                                border: "1px solid gray",
                                borderRadius: "2rem",
                                cursor: "pointer",
                              }}
                              className="m-2 p-1"
                            />
                          </span>
                        </OverlayTrigger>
                      )}
                      <div>
                        <div>
                          <strong>{fullName.toUpperCase()}</strong>
                        </div>
                        <div
                          className="text-muted"
                          style={{ fontSize: "0.85rem" }}
                        >
                          {email}
                        </div>
                      </div>
                    </Card.Body>
                    <Card.Footer>
                      <button
                        onClick={handleLogout}
                        className="btn btn-danger w-100"
                      >
                        Logout
                      </button>
                    </Card.Footer>
                  </Card>
                )}
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
