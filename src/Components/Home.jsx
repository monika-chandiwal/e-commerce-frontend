import React from "react";
import Header from "../Common/Header";
import FooterComponent from "../Common/Footer";
import FilterProducts from "../Pages/FilterProducts";

import Products from "./Products";
import { Container } from "react-bootstrap";
export default function Home() {
  return (
    <div className="main">
      <Header />
      <Container fluid style={{ display: "flex", flexDirection: "row" }}>
        <FilterProducts />
        <Products />
      </Container>
      <div
        style={{
          position: "relative",
          bottom: 0,
        }}
      >
        <FooterComponent />
      </div>
    </div>
  );
}
