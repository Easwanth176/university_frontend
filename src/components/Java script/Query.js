import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Navbar, Nav, Dropdown } from 'react-bootstrap';
import '../CSS/Query.css';
import logoImage from '../../logo.png';
import { Link, useLocation } from 'react-router-dom';

export default function Query() {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [unresolvedQueries, setUnresolvedQueries] = useState([]);
  const [solution, setSolution] = useState('');
  const [solvedQueries, setSolvedQueries] = useState([]);
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [userData, setUserData] = useState({});
  const queryParams = new URLSearchParams(location.search);
  const identifier = queryParams.get('identifier');
  const userType = queryParams.get('userType');
  const [filteredQueries, setFilteredQueries] = useState([]); // Add this line

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    const filteredQueries = solvedQueries.filter((query) =>
      query.Regarding.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredQueries(filteredQueries);
    console.log('Filtered Queries:', filteredQueries);
  };

  const handleLogout = () => {
    window.location.href = '/';
  };

  const [queryFormData, setQueryFormData] = useState({
    Name: '',
    Regarding: '',
    Description: '',
    contact: '',
  });

  const handleResolveCheckboxChange = async (queryId, isChecked) => {
    try {
      const response = await fetch(`https://sathyabama-backend.onrender.com/api/setResolvedStatus/${queryId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isResolved: isChecked }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Resolved status updated successfully');
        fetchQueries();
      } else {
        console.error('Failed to update resolved status:', data.error);
      }
    } catch (error) {
      console.error('Error during resolved status update:', error);
    }
  };

  const handleQuerySubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://sathyabama-backend.onrender.com/api/submitQuery', {
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
      }
    } catch (error) {
      console.error('Error during query submission:', error);
    }
  };

  const handleQueryInputChange = (e) => {
    setQueryFormData({
      ...queryFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSolutionSubmit = async (queryId, userName, solutionText) => {
    // Validate that both name and solution are provided
    if (!userName || !solutionText) {
      console.error('Name and Solution are required.');
      // You can handle the validation error, e.g., show an alert or set an error state.
      return;
    }

    try {
      const response = await fetch(`https://sathyabama-backend.onrender.com/api/submitSolution/${queryId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ solution: solutionText, solutionName: userName }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Solution submitted successfully');
        fetchUnresolvedQueries();
        setSolution('');
        setQueryFormData({ ...queryFormData, Name: '' });
      } else {
        console.error('Solution submission failed:', data.error);
      }
    } catch (error) {
      console.error('Error during solution submission:', error);
    }
  };

  const fetchUnresolvedQueries = async () => {
    try {
      const response = await fetch('https://sathyabama-backend.onrender.com/api/unresolvedQueries');
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
      const unresolvedResponse = await fetch('https://sathyabama-backend.onrender.com/api/unresolvedQueries');
      const solvedResponse = await fetch('http://localhost:5000/api/solvedQueriesWithSolutions');

      const unresolvedData = await unresolvedResponse.json();
      const solvedData = await solvedResponse.json();

      if (unresolvedResponse.ok && solvedResponse.ok) {
        setUnresolvedQueries(unresolvedData);
        setSolvedQueries(solvedData);
      } else {
        console.error('Error fetching queries:', unresolvedData.error || solvedData.error);
      }
    } catch (error) {
      console.error('Error fetching queries:', error);
    }
  };

  const [activeQueryIndex, setActiveQueryIndex] = useState(0);
  const [activeSolutionIndex, setActiveSolutionIndex] = useState(0);

  const handlePrevSolution = () => {
    setActiveSolutionIndex((prevIndex) => (prevIndex === 0 ? prevIndex : prevIndex - 1));
  };

  const handleNextSolution = () => {
    setActiveSolutionIndex((prevIndex) => {
      const solutionsLength = solvedQueries[activeQueryIndex]?.solutions.length || 0;
      return prevIndex === solutionsLength - 1 ? prevIndex : prevIndex + 1;
    });
  };

  const handlePrevQuery = () => {
    setActiveQueryIndex((prevIndex) => (prevIndex === 0 ? prevIndex : prevIndex - 1));
    setActiveSolutionIndex(0);
  };

  const handleNextQuery = () => {
    setActiveQueryIndex((prevIndex) => {
      const queriesLength = solvedQueries.length;
      return prevIndex === queriesLength - 1 ? prevIndex : prevIndex + 1;
    });
    setActiveSolutionIndex(0);
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  useEffect(() => {
    fetchUnresolvedQueries();
  }, []);

  return (
    <div>
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
          <Link to={`/home?identifier=${identifier}&userType=${userType}`} className="nav-link">Home</Link>
            <Link to={`/query?identifier=${identifier}&userType=${userType}`} className="nav-link">Query</Link>
            <Link to={`/chat?identifier=${identifier}&userType=${userType}`} className="nav-link">Chat</Link>
            <Nav.Link href={`/expo?identifier=${identifier}&userType=${userType}`}>Other</Nav.Link>
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
                <Dropdown.ItemText>{userType}</Dropdown.ItemText>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <h2>Available Query</h2>

      <section className="answer-section">
        <Col md={6} className="solution-container">
          {unresolvedQueries.map((query) => (
            <div className="query-item" key={query._id}>
              <div className="left-side">
                <u>
                  <h4>{query.Regarding}</h4>
                </u>
                <p>
                  <b>Name:</b> {query.Name}
                </p>
                <p>
                  <b>Description:</b> {query.Description}
                </p>
                <p>
                  <b>Contact Number:</b> {query.contact}
                </p>
              </div>
              <div className="right-side">
                <input
                  type="text"
                  placeholder="Name"
                  value={queryFormData.Name}
                  onChange={(e) =>
                    setQueryFormData({ ...queryFormData, Name: e.target.value })
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="Solution"
                  value={solution}
                  onChange={(e) => setSolution(e.target.value)}
                />

                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={query.isResolved}
                    onChange={() =>
                      handleResolveCheckboxChange(query._id, !query.isResolved)
                    }
                  />
                  <label>Resolved</label>
                </div>
                <button
                  onClick={() =>
                    handleSolutionSubmit(query._id, queryFormData.Name, solution)
                  }
                >
                  Submit
                </button>
              </div>
            </div>
          ))}
        </Col>
      </section>

      <h2>Post a Query</h2>

      <section className="query-section" id="query">
        <Container>
          <Row>
            <Col md={6} className="query-container">
              <h3>Post Query</h3>
              {submitSuccess && (
                <p style={{ color: 'green' }}>Query submitted successfully!</p>
              )}
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
          </Row>
        </Container>
      </section>

      <h2>Solved Queries</h2>

      <section className="teacher-container">
  <Container>
    <div className="Search-bar">
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
    <Row className="category-row">
      <Col md={12} className="category-column teacher-column">
        {searchTerm !== '' ? (
          filteredQueries.map((query, index) => (
            <div
              key={query._id}
              className={`query-container ${
                index === activeQueryIndex ? 'active' : ''
              }`}
            >
              <div className="query-details">
                <h4>Query Regarding: {query.Regarding}</h4>
                <h5>Name: {query.Name}</h5>
                <p>Description: {query.Description}</p>
                <p>Contact: {query.contact}</p>
              </div>
              <div className="solution-slider">
                <div className="solution-card">
                  <p>Solution {activeSolutionIndex + 1}</p>
                  <p>
                    Name: {query.solutions[activeSolutionIndex]?.solutionName}:{' '}
                  </p>
                  <p>
                    Solution :{' '}
                    {query.solutions[activeSolutionIndex]?.solutionText}
                  </p>
                </div>
              </div>
              <div className="solution-navigation">
                <button
                  onClick={handlePrevSolution}
                  disabled={activeSolutionIndex === 0}
                >
                  Prev
                </button>
                <button
                  onClick={handleNextSolution}
                  disabled={
                    activeSolutionIndex ===
                    (query.solutions.length > 0
                      ? query.solutions.length - 1
                      : 0)
                  }
                >
                  Next
                </button>
              </div>
            </div>
          ))
        ) : (
          solvedQueries.map((query, index) => (
            <div
              key={query._id}
              className={`query-container ${
                index === activeQueryIndex ? 'active' : ''
              }`}
            >
              <div className="query-details">
                <h4>Query Regarding: {query.Regarding}</h4>
                <h5>Name: {query.Name}</h5>
                <p>Description: {query.Description}</p>
                <p>Contact: {query.contact}</p>
              </div>
              <div className="solution-slider">
                <div className="solution-card">
                  <p>Solution {activeSolutionIndex + 1}</p>
                  <p>
                    Name: {query.solutions[activeSolutionIndex]?.solutionName}:{' '}
                  </p>
                  <p>
                    Solution :{' '}
                    {query.solutions[activeSolutionIndex]?.solutionText}
                  </p>
                </div>
              </div>
              <div className="solution-navigation">
                <button
                  onClick={handlePrevSolution}
                  disabled={activeSolutionIndex === 0}
                >
                  Prev
                </button>
                <button
                  onClick={handleNextSolution}
                  disabled={
                    activeSolutionIndex ===
                    (query.solutions.length > 0
                      ? query.solutions.length - 1
                      : 0)
                  }
                >
                  Next
                </button>
              </div>
            </div>
          ))
        )}
      </Col>
    </Row>
  </Container>
</section>

    
    </div>
  );
}
