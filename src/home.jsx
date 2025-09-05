import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Navbar,
  Nav,
} from "react-bootstrap";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom"; 
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [visible, setVisible] = useState(6);
  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState("All");
  const [featured, setFeatured] = useState(null);
  const [sliderCountry, setSliderCountry] = useState(null);

  const navigate = useNavigate(); 


  
  useEffect(() => {
    fetch(process.env.REACT_APP_COUNTRIES_API)
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        setLoading(false);

        const india = data.find((c) => c.name === "India");
        setSliderCountry(india || data[0]);
        setFeatured(data[Math.floor(Math.random() * data.length)]);
      })
      .catch((err) => {
        console.error("Error fetching countries:", err);
        setLoading(false);
      });
  }, []);

  const loadMore = () => {
    setVisible((prev) => prev + 6);
  };

  const filteredCountries =
    region === "All"
      ? countries
      : countries.filter((c) => c.region === region);

  const showInSlider = (country) => {
    setSliderCountry(country);
  };

  const handleLogout = () => {
    localStorage.removeItem("user"); 
    navigate("/"); 
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <>
      {/* Navbar */}
      <Navbar bg="light" expand="lg" className="px-3 shadow-sm">
        <Navbar.Brand href="#" className="fw-bold">
          Countries
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="justify-content-end">
          <Nav className="me-3">
            <Nav.Link
              onClick={() => {
                setRegion("All");
                setVisible(6);
              }}
              active={region === "All"}
            >
              All
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                setRegion("Asia");
                setVisible(6);
              }}
              active={region === "Asia"}
            >
              Asia
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                setRegion("Europe");
                setVisible(6);
              }}
              active={region === "Europe"}
            >
              Europe
            </Nav.Link>
          </Nav>

          {/* Logout Button */}
          <Button variant="outline-danger" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Navbar>

      {/* Page Content */}
      <Container fluid className="py-4 flex-grow-1">
        {/* Header */}
        <Row className="mb-4 text-center">
          <Col>
            <h2 className="fw-bold">WELCOME</h2>
          </Col>
        </Row>

        {/* Slider + Featured */}
        <Row className="mb-4">
          <Col md={8} className="mb-3">
            {sliderCountry ? (
              <Slider {...settings}>
                <div className="text-center">
                  <img
                    src={sliderCountry.flag}
                    alt={sliderCountry.name}
                    className="w-100"
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                  <h5 className="mt-2">{sliderCountry.name}</h5>
                  <p className="text-muted">{sliderCountry.region}</p>
                </div>
              </Slider>
            ) : (
              <div
                style={{
                  height: "250px",
                  background: "#f5f5f5",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "1px solid #ddd",
                }}
              >
                <span>No country selected</span>
              </div>
            )}
          </Col>

          {/* Featured Country */}
          <Col md={4}>
            {featured ? (
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={featured.flag}
                  alt={featured.name}
                  style={{ height: "180px", objectFit: "cover" }}
                />
                <Card.Body className="text-center">
                  <Card.Title>{featured.name}</Card.Title>
                  <Card.Text className="text-muted">{featured.region}</Card.Text>
                </Card.Body>
              </Card>
            ) : (
              <div
                style={{
                  height: "250px",
                  background: "#f5f5f5",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "1px solid #ddd",
                }}
              >
                <span>Loading...</span>
              </div>
            )}
          </Col>
        </Row>

        {/* Country Cards */}
        {loading ? (
          <div className="d-flex justify-content-center align-items-center my-5">
            <Spinner animation="border" variant="dark" />
          </div>
        ) : (
          <Row>
            {filteredCountries.slice(0, visible).map((country, index) => (
              <Col xs={12} md={6} lg={4} className="mb-3" key={index}>
                <Card
                  className="h-100 shadow-sm country-card"
                  onClick={() => showInSlider(country)}
                  style={{ cursor: "pointer" }}
                >
                  <Row className="g-0 align-items-center">
                    <Col xs={4}>
                      <Card.Img
                        src={country.flag}
                        alt={country.name}
                        style={{ height: "100%", objectFit: "cover" }}
                      />
                    </Col>
                    <Col xs={8}>
                      <Card.Body>
                        <Card.Title className="mb-1">
                          {country.name}
                        </Card.Title>
                        <Card.Text className="text-muted mb-0">
                          {country.region}
                        </Card.Text>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {/* Load More */}
        {!loading && visible < filteredCountries.length && (
          <div className="text-center my-4">
            <Button variant="dark" onClick={loadMore}>
              Load more
            </Button>
          </div>
        )}
      </Container>

      {/* Footer */}
      <footer className="text-center py-4 bg-light border-top mt-auto">
        <div className="d-flex justify-content-center gap-3 mb-3">
          <a href="#" className="btn btn-outline-dark rounded-circle p-2">G</a>
          <a href="#" className="btn btn-outline-dark rounded-circle p-2">F</a>
          <a href="#" className="btn btn-outline-dark rounded-circle p-2">in</a>
          <a href="#" className="btn btn-outline-dark rounded-circle p-2">T</a>
        </div>
        <p className="small text-muted mb-1">example@email.com</p>
        <p className="small text-muted mb-0">
          © {new Date().getFullYear()} Demo. All rights reserved.
        </p>
      </footer>
    </>
  );
};

export default Home;
