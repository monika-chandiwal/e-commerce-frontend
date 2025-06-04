import React, { useEffect, useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import "../Pages/pages.css";
import { CiHeart } from "react-icons/ci";
import { useSearchParams } from "react-router-dom";
export default function Products() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  console.log(category);
  const [products, setProducts] = useState([]);
  console.log(products);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/vendor/showAllProductsToUsers"
        );
        if (!response.ok) {
          throw new Error("something went wrong");
        }
        const data = await response.json();
        console.log("Fetched products:", data);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    const fetchDataByCategory = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/vendor/showProductsToUsersBasedOnCat/${category}`
        );
        if (!response.ok) {
          throw new Error("something went wrong");
        }
        const data = await response.json();
        console.log("Fetched products:", data);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    if (category == null) fetchData();
    else fetchDataByCategory();
  }, []);
  return (
    <Container>
      {products.length === 0 ? (
        <p> Oop's! No products found.</p>
      ) : (
        <ul className="products">
          {products.map((product) => (
            <li key={product.id}>
              <Card style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src={product.imageUrl}
                  className="imageStyle"
                />
                <div className="wishlist">
                  <Button className="button">
                    Wishlist <CiHeart />{" "}
                  </Button>
                </div>
                <Card.Body>
                  <Card.Title>{product.brand}</Card.Title>
                  <Card.Text>
                    {product.description}
                    <br />
                    <strong>Rs. {product.price}</strong>
                  </Card.Text>
                </Card.Body>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}
