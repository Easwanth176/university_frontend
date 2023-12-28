import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../CSS/Query.css';

export default function Query() {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [unresolvedQueries, setUnresolvedQueries] = useState([]);
  const [solution, setSolution] = useState('');
  const [solvedQueries, setSolvedQueries] = useState([]);

  const [queryFormData, setQueryFormData] = useState({
    Name: '',
    Regarding: '',
    Description: '',
    contact: '',
  });

  const handleResolveCheckboxChange = async (queryId, isChecked) => {
    try {
      const response = await fetch(`http://localhost:5000/api/setResolvedStatus/${queryId}`, {
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
        setSubmitSuccess();
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

  const handleSolutionSubmit = async (queryId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/submitSolution/${queryId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ solution: solution }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Solution submitted successfully');
        fetchUnresolvedQueries();
        setSolution('');
      } else {
        console.error('Solution submission failed:', data.error);
      }
    } catch (error) {
      console.error('Error during solution submission:', error);
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

  useEffect(() => {
    fetchQueries();
  }, []);

  useEffect(() => {
    fetchUnresolvedQueries();
  }, []);

  const renderSolvedQueries = () => {
    const queriesWithSolutions = solvedQueries.filter((query) => query.solutions.length > 0);

    return queriesWithSolutions.map((query) => (
      <Col key={query._id} md={3} className="category-column">
      <h4>{query.Regarding}</h4>
      <div className="query1">
        <div className="query-header">
          <h5>{query.Name}</h5>
        </div>
        <p>{query.Description}</p>
        <p>{query.contact}</p>
        <p>Solutions:</p>
        {/* Map over the solutions and display each one */}
        {query.solutions.map((solution, index) => (
          <p key={index}>Solution {index + 1}: {solution.solutionText}</p>
        ))}
      </div>
    </Col>
     
    ));
  };

  return (
    <div>
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
                  <input
                    type="checkbox"
                    checked={query.isResolved}
                    onChange={() => handleResolveCheckboxChange(query._id, !query.isResolved)}
                  />
                  <label>Resolved</label>
                  <button onClick={() => handleSolutionSubmit(query._id)}>Submit</button>
                </div>
              ))}
            </Col>
          </Row>
        </Container>
      </section>

      <section className="Teacher-container">
        <Container>
          <Row className="category-row">{renderSolvedQueries()}</Row>
        </Container>
      </section>
    </div>
  );
}
