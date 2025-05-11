import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import * as formik from "formik";
import * as yup from "yup";
import "../Pages/pages.css";
import { ToastContainer, toast } from "react-toastify";

import NavbarComponent from "./Navbar";

export default function ContactUs() {
  const { Formik } = formik;

  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().required(),
    mobile: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    query: yup.string().required(),
    terms: yup.bool().required().oneOf([true], "Terms must be accepted"),
  });

  const handleSubmit = (values, { resetForm }) => {
    const contact = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      mobile: values.mobile,
      city: values.city,
      state: values.state,
      query: values.query,
    };

    fetch("http://localhost:8080/contactUs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact),
    })
      .then((response) => {
        if (response.ok) {
          toast.success("Your query has been sent successfully!", {
            position: "bottom-left",
            autoClose: 3000,
          });
          resetForm(); // Clear the form after success
        } else {
          response.text().then((errorMessage) => {
            toast.error(`${errorMessage}, try again`, {
              position: "bottom-left",
              autoClose: 5000,
              hideProgressBar: true,
            });
          });
        }
      })
      .catch((error) => {
        console.error("Network error:", error);
        toast.error("Something went wrong. Please try again later.", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: true,
        });
      });
  };

  return (
    <div>
      <NavbarComponent />
      <Formik
        validationSchema={schema}
        onSubmit={handleSubmit}
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          mobile: "",
          city: "",
          state: "",
          query: "",
          terms: false,
        }}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit} className="contactForm">
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationFormikFirstName">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  isValid={touched.firstName && !errors.firstName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.firstName}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationFormikLastName">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  isValid={touched.lastName && !errors.lastName}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.lastName}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} md="4" controlId="validationFormikemail">
                <Form.Label>email</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="email"
                    placeholder="email"
                    aria-describedby="inputGroupPrepend"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="validationFormiknumber">
                <Form.Label>Mobile</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="mobile number"
                    aria-describedby="inputGroupPrepend"
                    name="mobile"
                    value={values.mobile}
                    onChange={handleChange}
                    isInvalid={!!errors.mobile}
                  />
                  <Form.Control.Feedback type="valid">
                    {errors.mobile}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationFormik03">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="City"
                  name="city"
                  value={values.city}
                  onChange={handleChange}
                  isInvalid={!!errors.city}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.city}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationFormik04">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="State"
                  name="state"
                  value={values.state}
                  onChange={handleChange}
                  isInvalid={!!errors.state}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.state}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="8" controlId="validationFormikQuery">
                <Form.Label>Query</Form.Label>
                <Form.Control
                  as="textarea"
                  name="query"
                  value={values.query}
                  onChange={handleChange}
                  isValid={touched.query && !errors.query}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.query}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Form.Group className="mb-3">
              <Form.Check
                required
                name="terms"
                label="Agree to terms and conditions"
                onChange={handleChange}
                isInvalid={!!errors.terms}
                feedback={errors.terms}
                feedbackType="invalid"
                id="validationFormik0"
              />
            </Form.Group>
            <Button type="submit">Submit form</Button>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
}
