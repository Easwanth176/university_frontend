// Home.js
import React, { useState } from 'react';
import { Navbar, Nav, Dropdown, Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../CSS/Home.css';

import logoImage from '../../logo.png';
import ownerImage from '../../founder.jpg';

export default function Home() {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    window.location.href = '/';
  };

  return (
    <div className="big-container">
      <Navbar bg="dark" expand="lg" variant="dark">
        <Navbar.Brand href="#">
          <img
            src={logoImage}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Your Logo"
          />
        </Navbar.Brand>
        <span className="company-name">Satyabhama University</span>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#query">Query</Nav.Link>
            <Nav.Link href="#gallery">Gallery</Nav.Link>
            <Nav.Link href="#contact">Other</Nav.Link>
            <Dropdown
              show={showDropdown}
              align="end"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                Profile
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.ItemText>User Name</Dropdown.ItemText>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Home section */}
      <section className="home" id="home">
        <div style={{ padding: '8%' }} className="wrapper">
          <div className="cols cols0">
            <h1>
              Welcome to <span className="multitext">Learning Link UP</span>
            </h1>
            <br />
            <p>
              Learning Link up is a platform where all the university members can interact with each other, a university management system is a complete solution. Reducing manual labor and intervention, this system ensures accuracy, reliability, and integrity of records, information data.
            </p>
          </div>
          <div className="cols cols1">
            <div className="imgbox">
              <img
                src={ownerImage}
                alt="Owner Logo"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Query section */}
      <section className="query" id="query">
  <h2>Post a Query</h2>
  <Container>
    <Row>
      {/* Left Container - Post Query */}
      <Col md={6} className="query-left-container">
        <h3>Post Query</h3>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your name" />
          </Form.Group>

          <Form.Group controlId="formQueryRegarding">
            <Form.Label>Query Regarding</Form.Label>
            <Form.Control type="text" placeholder="Enter your query subject" />
          </Form.Group>

          <Form.Group controlId="formShortDescription">
            <Form.Label>Short Description</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Enter a short description" />
          </Form.Group>

          <Form.Group controlId="formContactNumber">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control type="tel" placeholder="Enter your contact number" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Col>

      {/* Right Container - Answers */}
      <Col md={6} className="query-right-container">
        <h3>Answers</h3>
        {/* Add content for answers here */}
      </Col>
    </Row>
  </Container>
</section>
    </div>
  );
}
