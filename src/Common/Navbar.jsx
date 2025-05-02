import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Navbar, Nav, Container, Form, Row, Col } from "react-bootstrap";
import { IoCartOutline } from "react-icons/io5";
import "./Navbar.css";
import { FaRegHeart, FaRegUser, FaRegUserCircle } from "react-icons/fa";

export default function NavbarComponent() {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search submitted:", query);
    // You can trigger your actual search logic here
  };

  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Container fluid className="mx-2">
        <Navbar.Brand href="/"> StyliQue</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center w-100">
            <Nav.Link href="/">MEN</Nav.Link>
            <Nav.Link href="/products">WOMEN</Nav.Link>
            <Nav.Link href="/products">KIDS</Nav.Link>
            <Nav.Link href="/cart">HOME</Nav.Link>
            <Nav.Link href="/cart">BEAUTY</Nav.Link>
          </Nav>

          <Nav className=" align-items-center ">
            <div className="flex-grow-1 mx-2">
              <Form className="d-flex w-60" onSubmit={handleSearch}>
                <Form.Control
                  type="text"
                  placeholder="Search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="custom-search"
                />
              </Form>
            </div>
            <Nav.Link href="/wishlist">
              <FaRegHeart />
              Wishlist
            </Nav.Link>
            <Nav.Link href="/cart">
              <IoCartOutline />
              Cart
            </Nav.Link>
            <Nav.Link href="/login">
              <FaRegUserCircle spin="true" className="spinning-icon" />
              Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
