import React, { useState } from 'react';
import { useLocation,Link } from 'react-router-dom';

import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../CSS/Form.css';

export default function MyForm() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const identifier = queryParams.get('identifier');
  const userType = queryParams.get('userType');
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useState({});
  const [showDropdown, setShowDropdown] = useState(false);
  const handleLogout = () => {
    window.location.href = '/';
  };
  const viewProfile = () => {
    window.location.href = `/profile?identifier=${identifier}&userType=${userType}`;

  }; 
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    Name: '',
    Regarding: '',
    Description: '',
    contact: '',
  });

  const handleQueryInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleQuerySubmit = (e) => {
    e.preventDefault();

    // Simulate form submission logic here

    // Set submitSuccess to trigger success message
    setSubmitSuccess(true);

    // Simulate delay before redirecting to 'expo'
    setTimeout(() => {
      // Reset submitSuccess and trigger redirection
      setSubmitSuccess(false);
      // Redirect to 'expo'
      window.location.href = `/expo?identifier=${identifier}&userType=${userType}`;
    }, 800); // 3000 milliseconds (3 seconds)
  };

  return (
    <div>
      <section className="query-section" id="query">
        <Container>
          <h2>Add Project</h2>
          <Row>
            <Col md={6} className="query-container">
              <h3>Add Project</h3>
              {submitSuccess && (
                <p style={{ color: 'white' }}>Project Added successfully!</p>
              )}
              <Form onSubmit={handleQuerySubmit}>
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    name="Name"
                    onChange={handleQueryInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formQueryRegarding">
                  <Form.Label>Project Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your query subject"
                    name="Regarding"
                    onChange={handleQueryInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formShortDescription">
                  <Form.Label>Abstract</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter a short description"
                    name="Description"
                    onChange={handleQueryInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formContactNumber">
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Enter your contact number"
                    name="contact"
                    onChange={handleQueryInputChange}
                    required
                  />
                </Form.Group>
   
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Col>
            <Link to={`/department?identifier=${identifier}&userType=${userType}`} className="nav-link">

         <Button variant="primary" className="button-back" type="button">
  Back
</Button>
</Link>

          </Row>
        </Container>
      </section>
    </div>
  );
}
