import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  FaGoogle,
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    remember: false,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/; // Min 8 chars, 1 uppercase, 1 number
    return regex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      setError("Username and password are required.");
      return;
    }

    if (!validatePassword(formData.password)) {
      setError(
        "Password must be at least 8 characters, contain 1 uppercase letter and 1 number."
      );
      return;
    }

    setError("");
    // Redirect to Home Page
    navigate("/home");
  };

  return (
    <Container fluid className="vh-100 d-flex align-items-center">
      <Row className="w-100">
        {/* Left Section (Form) */}
        <Col
          md={6}
          className="d-flex flex-column justify-content-center align-items-center"
        >
          <div style={{ width: "100%", maxWidth: "320px" }}>
            <h4 className="fw-bold mb-2">Sign In</h4>
            <p className="mb-3">
              New user?{" "}
              <a href="/register" className="text-primary">
                Create an account
              </a>
            </p>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formUsername" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Username or email"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="rounded-0"
                />
              </Form.Group>

              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="rounded-0"
                />
              </Form.Group>

              <Form.Group
                controlId="formCheck"
                className="mb-3 d-flex align-items-center"
              >
                <Form.Check
                  type="checkbox"
                  label="Keep me signed in"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button
                variant="dark"
                type="submit"
                className="w-100 rounded-0 mb-3"
              >
                Sign In
              </Button>
            </Form>

            <div className="d-flex align-items-center my-3">
              <div className="flex-grow-1 border-bottom"></div>
              <span className="mx-2 small text-muted">Or Sign In With</span>
              <div className="flex-grow-1 border-bottom"></div>
            </div>

            <div className="d-flex justify-content-center gap-3">
              <a href="#" className="btn btn-outline-dark rounded-circle p-2">
                <FaGoogle />
              </a>
              <a href="#" className="btn btn-outline-dark rounded-circle p-2">
                <FaFacebookF />
              </a>
              <a href="#" className="btn btn-outline-dark rounded-circle p-2">
                <FaLinkedinIn />
              </a>
              <a href="#" className="btn btn-outline-dark rounded-circle p-2">
                <FaTwitter />
              </a>
            </div>
          </div>
        </Col>

        {/* Right Section (Image/Illustration) */}
        <Col
          md={6}
          className="d-none d-md-flex justify-content-center align-items-center bg-white"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
            alt="login illustration"
            style={{ width: "300px", maxWidth: "100%" }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
