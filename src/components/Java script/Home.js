import React, { useState, useEffect } from 'react';
import { useLocation,Link } from 'react-router-dom';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';

import '../CSS/Home.css';

import logoImage from '../../logo.png';
import ownerImage from '../../founder.jpg';
import collegeImage1 from '../Images/collage1.jpg';
import collegeImage2 from '../Images/collage2.jpeg';
import collegeImage3 from '../Images/collage3.jpg';
import collegeImage4 from '../Images/collage4.jpg';
import collegeImage5 from '../Images/collage5.jpg';
import collegeImage6 from '../Images/collage6.jpeg';
import collegeImage7 from '../Images/collage7.jpeg';
import collegeImage8 from '../Images/collage8.jpeg';
import collegeImage9 from '../Images/collage9.jpeg';
import collegeImage10 from '../Images/collage10.jpeg';


export default function Home() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [userData, setUserData] = useState({ name: '', number: '' });



  const [currentImageIndex, setCurrentImageIndex] = useState(0);


  const CollegeImages = [
    collegeImage1,
    collegeImage2,
    collegeImage3,
    collegeImage4,
    collegeImage5,
    collegeImage6,
    collegeImage7,
    collegeImage8,
    collegeImage9,
    collegeImage10,
  ];
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const identifier = queryParams.get('identifier');
  const userType = queryParams.get('userType');
  const [messages, setMessages] = useState([]); 



  // Notes
  const [mode, setMode] = useState('add'); // 'add' or 'view'
  const [noteData, setNoteData] = useState({
    content: '',
  });
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setNoteData({ ...noteData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      if (mode === 'add') {
        // Send a POST request to add a message
        const response = await fetch('http://localhost:5000/messages/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: noteData.content }),
        });

        const data = await response.json();

        if (response.ok) {
          
          setMessage('Message added successfully');
          setNoteData({ content: '' });

        } else {
          console.error('Message submission failed:', data.error);
          setMessage('Internal Server Error');
        }
      }
    } catch (error) {
      console.error(error);
      setMessage('Internal Server Error');
    }
  };

  const switchToAddMode = () => {
    setMode('add');
    setMessage('');
  };

  const switchToViewMode = () => {
    setMode('view');
    setMessage('');
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('http://localhost:5000/messages/all');
        const data = await response.json();
  
        if (response.ok) {
          console.log('Fetched messages:', data);
          setMessages(data);
        } else {
          console.error('Failed to fetch messages:', data.error);
        }
      } catch (error) {
        console.error('Error during message fetch:', error);
      }
    };
  
    fetchMessages();
  }, []);
  
  
  


  const handleLogout = () => {
    window.location.href = '/';
  };

 
  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? CollegeImages.length - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === CollegeImages.length - 1 ? 0 : prevIndex + 1));
  };
 

    useEffect(() => {
      const intervalId = setInterval(handleNextClick, 5000); // Automatically advance every 5 seconds
      return () => clearInterval(intervalId);
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
            <Link to="/query" className="nav-link">Query</Link>
            <Nav.Link href="#chat">Chat</Nav.Link>
            <Nav.Link href="#gallery">Other</Nav.Link>
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



{/* 
      <section className="query" id="query">
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
                  <button onClick={() => handleSolutionSubmit(query._id)}>Submit</button>
                </div>
              ))}
          </Col>

          </Row>
        </Container>
      </section>


              
          <section className="Teacher-container">

                     <h3>Answered Queries</h3>
              {solvedQueries.map((query) => (
                <div className="query1" key={query._id}>
                  <div className="query-header">
                    <h4>{query.Regarding}</h4>
                    <p>{query.Name}</p>
                  </div>
                  <p>{query.Description}</p>
                  <p>{query.contact}</p>
                  <p>Solution: {query.solution}</p>
                </div>
              ))}
      </section>
       */}



        <section className="gallery" id="gallery">
              <h2>Gallery</h2>
              <div className="certificates">
                <div className="Certification">
                  <button className="pre-btn" onClick={handlePrevClick}></button>
                  <button className="nxt-btn" onClick={handleNextClick}></button>
                  <div className="certificate-container">
                    {CollegeImages.map((image, index) => (
                      <div className="certificate-card" key={index}>
                        <div className="certificate-image">
                          <span className="certificate-tag">SIST</span>
                          <img src={image} className="certificate-thumb" alt="" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
        </section>














                      
                      {userType === 'teacher' && (
                <section className ='notes'>
                  <h2>Drop A Messgae</h2>
                <div className="note-section">
                  <div className="note-container">
                    <div className="buttons-container">
                      <button onClick={switchToAddMode} className={`mode-button ${mode === 'add' ? 'active' : ''}`}>
                        Add Messgaes
                      </button>
                      <button onClick={switchToViewMode} className={`mode-button ${mode === 'view' ? 'active' : ''}`}>
                        View Messgaes
                      </button>
                    </div>
                    {mode === 'add' && (
                      <form onSubmit={handleFormSubmit}>
                        <div className="note-content">

                          <textarea
                            name="content"
                            value={noteData.content}
                            onChange={handleInputChange}
                            className="note-textarea"
                            placeholder="Messgae Content"
                            required
                          ></textarea>
                        </div>
                        <button type="submit" className="note-button">
                          Add Messgae
                        </button>
                      </form>
                    )}
{mode === 'view' && (
  <div className="view-notes-container">
    <ul>
    {messages.map((message) => (
  <div key={message._id}>
    {message.Message}
  </div>
))}

    </ul>
  </div>
)}

                    {message && <p className="note-message">{message}</p>}
                  </div>
                </div>
                </section>
                  )}


                  {userType === 'student' && (
                    <section className ='notes'>
                      <h2>view A Messgae</h2> 
                      <div className="note-section">
                        <div className="note-container">
                        <h3>Messgaes</h3>
                          <div className="view-notes-container">
                                  {messages.map((message) => (
                                      <div key={message._id}>
                                        {message.Message}
                                      </div>
                                    ))}
                          </div>

                        
                          {message && <p className="note-message">{message}</p>}
                        </div>
                      </div>
                    </section>
                        )}



    </div>
  );
}

