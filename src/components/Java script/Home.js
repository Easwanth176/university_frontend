import React, { useState, useEffect } from 'react';
import { useLocation,Link } from 'react-router-dom';
import { Navbar, Nav, Dropdown,Carousel,Button } from 'react-bootstrap';
import Ribbon from './Ribbon';



import '../CSS/Home.css';

import logoImage from '../../logoimage.png';
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
  const [mode, setMode] = useState('add'); 
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
        const response = await fetch('https://sathyabama-backend.onrender.com/messages/add', {
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
        const response = await fetch('https://sathyabama-backend.onrender.com/messages/all');
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

  const viewProfile = () => {
    window.location.href = `/profile?identifier=${identifier}&userType=${userType}`;

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
        const response = await fetch(`https://sathyabama-backend.onrender.com/api/user?userType=student&registrationNumber=${identifier}`);
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

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
           <Nav.Link href={`#home?identifier=${identifier}&userType=${userType}`}>Home</Nav.Link>
            <Link to={`/query?identifier=${identifier}&userType=${userType}`} className="nav-link">Query</Link>
            <Link to={`/chat?identifier=${identifier}&userType=${userType}`} className="nav-link">Chat</Link>
            <Link to={`/expo?identifier=${identifier}&userType=${userType}`} className="nav-link">project Expo</Link>
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
                <Dropdown.Item onClick={viewProfile}>View</Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>

              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Ribbon />

      <section className="home" id="home">

      <div className='heading-home'>
      <h1>
            Welcome to <span class="multitext">Learning Link up</span>
          </h1>
      </div>


        <div style={{ padding: '8%' }} className="wrapper">
      
          <div className="cols cols1">
            <div className="imgbox">
             

            <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.collegedunia.com/public/college_data/images/campusimage/155064512020180724050340_2.jpg"
          alt="First slide"
        />

      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://nettv4u.com/imagine/sathyabama-university-pre-launch-event-of-sathyabamasat-lovely-stills-22.jpg"
          alt="Second slide"
        />

      </Carousel.Item>

    </Carousel>

            </div>
          </div>


          <div className="cols cols0">

          <section className ='hapenings'>
                      <h2>Happenings</h2> 
                      <div className="hapenings-section">
                        <div className="hapenings-container">
                          <div className="view-hapenings-container">
                                  {messages.map((message) => (
                                      <div key={message._id} className='hapenings-message'>
                                        {message.Message}
                                      </div>
                                    ))}
                          </div>
                          {message && <p className="note-message">{message}</p>}
                        </div>
                      </div>
                    </section>

                            {userType === 'teacher' && (
                                 <div className='happenings-Button'>
                                 <Button>Add Happenings</Button>
             
                                 </div>
                            )
                              }


                 

          
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
        <div className="note-header">
      <label >Select Section:</label>
      <select
        id="student"
        name="studentId"
        className="note-dropdown"
        required
      >
          <option>All Sections</option>
          <option>section 1</option>
          <option>section 2</option>
          <option>section 3</option>
          <option>section 4</option>
          <option>section 5</option>

     
      </select>
      </div>

      <textarea
        name="content"
        value={noteData.content}
        onChange={handleInputChange}
        className="note-textarea"
        placeholder="Message Content"
        required
      ></textarea>
    </div>
    <button type="submit" className="note-button">
      Add Message
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
                        <h4>Messgaes</h4>
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



        <section className="research" id="research">
          <div className="all_projects">
          <h1 className="research_heading">Research & Projects</h1>

        <div className="project">
          <div className="phead">Query</div>
          <div className="pbody"><p>Post and solve all your queries</p></div>
          <div className="pbutton">
          <Link to={`/query?identifier=${identifier}&userType=${userType}`} className="nav-link">Query</Link>
          </div>
        </div>

        <div className="project">
          <div className="phead">Project Expo</div>
          <div className="pbody"><p>Departments</p></div>
          <div className="pbutton">
          <Link to={`/department?identifier=${identifier}&userType=${userType}`} className="nav-link">project Expo</Link>
          </div>
        </div>

        <div className="project">
          <div className="phead">Staff Interaction</div>
          <div className="pbody"><p>Talk with Faculty</p></div>
          <div className="pbutton">
          <Link to={`/chat?identifier=${identifier}&userType=${userType}`} className="nav-link">Chat</Link>
          </div>
        </div>

        <div className="project">
          <div className="phead">Profile </div>
          <div className="pbody"><p>View your Profile</p></div>
          <div className="pbutton">
          <Link to={`/profile?identifier=${identifier}&userType=${userType}`} className="nav-link">Profile</Link>
          </div>
        </div>

        <div className="project">
          <div className="phead">Feedback form</div>
          <div className="pbody"><p>Suggestion Link UP</p></div>
          <div className="pbutton">
            <a href="https://www.sathyabama.ac.in/form/student-feedback-iqac-naac" target="_blank" rel="noopener noreferrer">FeedBack</a>
          </div>
        </div>
      </div>
        </section>




              
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






    </div>
  );
}

