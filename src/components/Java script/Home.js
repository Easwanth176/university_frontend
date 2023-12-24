import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Dropdown, Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import '../CSS/Home.css';

import logoImage from '../../logo.png';
import ownerImage from '../../founder.jpg';

export default function Home() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [userData, setUserData] = useState({ name: '', number: '' });
  const [unresolvedQueries, setUnresolvedQueries] = useState([]);
  const [solution, setSolution] = useState('');
  const [solvedQueries, setSolvedQueries] = useState([]);
  const [queryFormData, setQueryFormData] = useState({
    Name: '',
    Regarding: '',
    Description: '',
    contact: '',
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const identifier = queryParams.get('identifier');
  const userType = queryParams.get('userType');

  const handleLogout = () => {
    window.location.href = '/';
  };

  const handleQuerySubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/submitQuery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(queryFormData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Query submitted successfully');
        setSubmitSuccess(true);
        setQueryFormData({
          Name: '',
          Regarding: '',
          Description: '',
          contact: '',
        });
      } else {
        console.error('Query submission failed:', data.error);
        // You can add logic to handle failure, such as displaying an error message
      }
    } catch (error) {
      console.error('Error during query submission:', error);
      // You can add logic to handle the error, such as displaying an error message
    }
  };

  const handleQueryInputChange = (e) => {
    setQueryFormData({
      ...queryFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSolutionSubmit = async (queryId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/submitSolution/${queryId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ solution }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Solution submitted successfully');
        // Refresh the list of unresolved queries
        fetchUnresolvedQueries();
        // Optionally, clear the solution input
        setSolution('');
      } else {
        console.error('Solution submission failed:', data.error);
        // You can add logic to handle failure, such as displaying an error message
      }
    } catch (error) {
      console.error('Error during solution submission:', error);
      // You can add logic to handle the error, such as displaying an error message
    }
  };

  const fetchUnresolvedQueries = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/unresolvedQueries');
      const data = await response.json();

      if (response.ok) {
        setUnresolvedQueries(data);
      } else {
        console.error('Error fetching unresolved queries:', data.error);
      }
    } catch (error) {
      console.error('Error fetching unresolved queries:', error);
    }
  };

  const fetchQueries = async () => {
    try {
      const unresolvedResponse = await fetch('http://localhost:5000/api/unresolvedQueries');
      const solvedResponse = await fetch('http://localhost:5000/api/solvedQueries');
  
      const unresolvedData = await unresolvedResponse.json();
      const solvedData = await solvedResponse.json();
  
      if (unresolvedResponse.ok && solvedResponse.ok) {
        setUnresolvedQueries(unresolvedData);
        // Set only the solved queries in the state
        setSolvedQueries(solvedData);
      } else {
        console.error('Error fetching queries:', unresolvedData.error || solvedData.error);
      }
    } catch (error) {
      console.error('Error fetching queries:', error);
    }
  };
  

  useEffect(() => {
    fetchQueries();
  }, []);


  // Add a useEffect hook to fetch unresolved queries on component mount
  useEffect(() => {
    fetchUnresolvedQueries();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/user?userType=student&registrationNumber=${identifier}`);
        const data = await response.json();

        if (response.ok) {
          console.log('User data fetched successfully');
          setUserData(data);
        } else {
          console.error('Error fetching user data:', data.message);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (identifier) {
      fetchUserData();
    }
  }, [identifier]);

  useEffect(() => {
    setShowDropdown(false);
  }, [userData]);

  return (
    <div className="big-container">
      <Navbar bg="dark" expand="lg" variant="dark">
        <Navbar.Brand href="#">
          <img
            src={logoImage}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="`Your` Logo"
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
                {userData.name && <Dropdown.ItemText>{userData.name}</Dropdown.ItemText>}
                <Dropdown.ItemText>{identifier}</Dropdown.ItemText>
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

      {/* Query section for student*/}


      {userType === 'student' && (
      <section className="query" id="query">
        <h2>Post a Query</h2>
        <Container>
          <Row>
            <Col md={6} className="query-left-container">
              <h3>Post Query</h3>
              {submitSuccess && <p style={{ color: 'green' }}>Query submitted successfully!</p>}
              <Form onSubmit={handleQuerySubmit}>
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    name="Name"
                    value={queryFormData.Name}
                    onChange={handleQueryInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formQueryRegarding">
                  <Form.Label>Query Regarding</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your query subject"
                    name="Regarding"
                    value={queryFormData.Regarding}
                    onChange={handleQueryInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formShortDescription">
                  <Form.Label>Short Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter a short description"
                    name="Description"
                    value={queryFormData.Description}
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
                    value={queryFormData.contact}
                    onChange={handleQueryInputChange}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Col>

            <Col md={6} className="query-right-container">
              <h3>Answered Queries</h3>
              {/* Display answered queries */}
              {solvedQueries.map((query) => (
                <div className="query1" key={query._id}>
                  {/* Add content for answered queries here */}
                  <div className="query-header">
                    <h4>{query.Regarding}</h4>
                    <p>{query.Name}</p>
                  </div>
                  <p>{query.Description}</p>
                  <p>{query.contact}</p>
                  <p>Solution: {query.solution}</p>
                </div>
              ))}
          </Col>

          </Row>
        </Container>
      </section>
       )}


{userType === 'teacher' && (
      <section className="Teacher-container">
        <h3>Available Queries</h3>
        {/* Display unresolved queries */}
        {unresolvedQueries.map((query) => (
          <div className="query1" key={query._id}>
            <div className="query-header">
              <h4>{query.Regarding}</h4>
              <p>{query.Name}</p>
            </div>
            <p>{query.Description}</p>
            <p>{query.contact}</p>
            <input
              type="text"
              placeholder="solution"
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
            />
            <button onClick={() => handleSolutionSubmit(query._id)}>Submit</button>
          </div>
        ))}
      </section>
      )}
     
      {/* ... (Other sections) */}
    </div>
  );
}

