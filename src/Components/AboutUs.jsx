import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import NavbarComponent from "../Common/Navbar";
import FooterComponent from "../Common/Footer";
import ThemeContext from "../Common/ThemeContext";
import { map } from "../../public/icons.jsx";
import { BiPolygon } from "react-icons/bi";
export default function AboutUs() {
  const theme = useContext(ThemeContext);
  return (
    <Container
      fluid
      bg={theme}
      variant={theme}
      className="about-container p-0 m-0"
    >
      <NavbarComponent />
      <main className="m-5 p-4">
        <h3>Who We Are</h3>
        <p>
          We are a team of tech-savvy developers and passionate innovators who
          believe in the power of digital shopping. Our mission is to simplify
          online buying through intuitive design, reliable technology, and
          secure transactions.
        </p>
        <div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5861537911746!2d77.70139477454605!3d12.934299215696058!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae13001635ced1%3A0xe0b2816c98f1e1fd!2zVXJiYW4gaG9tZXPwn4-g!5e0!3m2!1sen!2sin!4v1746971739485!5m2!1sen!2sin"
            width="100%"
            height="450"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div
          className="d-flex"
          style={{
            fontFamily: "monospace",

            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            margin: "4rem",
            marginBottom: "0",
          }}
        >
          <p> Mobile : 7877958719 || e-mail : monikachandiwal04@gmail.com</p>
          <address>
            {" "}
            Address : 2, Bhoganahalli Rd, Kaverappa Layout, Kadubeesanahalli,
            Panathur, Bengaluru, Karnataka 560103.
          </address>
        </div>
      </main>
    </Container>
  );
}
