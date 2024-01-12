import React, { useState } from 'react';
import '../CSS/Expo.css';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import logoImage from '../../logo.png';




const RibbonComponent = () => {


const location = useLocation();
const queryParams = new URLSearchParams(location.search);
const identifier = queryParams.get('identifier');
const userType = queryParams.get('userType');
const [showDropdown, setShowDropdown] = useState(false);
const [userData, setUserData] = useState({ name: '', number: '' });



  const studentProjects = [
    {
      id: 1,
      name: 'John Doe',
      profilePicture: 'profile1.jpg',
      projectDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      contactNumber: '123-456-7890',
      email: 'john.doe@example.com',
    },
    {
      id: 2,
      name: 'John Doe',
      profilePicture: 'profile1.jpg',
      projectDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      contactNumber: '123-456-7890',
      email: 'john.doe@example.com',
    },
    {
      id: 3,
      name: 'John Doe',
      profilePicture: 'profile1.jpg',
      projectDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      contactNumber: '123-456-7890',
      email: 'john.doe@example.com',
    },
    {
      id: 4,
      name: 'John Doe',
      profilePicture: 'profile1.jpg',
      projectDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      contactNumber: '123-456-7890',
      email: 'john.doe@example.com',
    },
    // Add more student projects as needed
  ];
  const handleLogout = () => {
    window.location.href = '/';
  };

  const viewProfile = () => {
    window.location.href = '/profile';
  };

  return (
    
    <div className='Total-container'>

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
            <Link to={`/home?identifier=${identifier}&userType=${userType}`} className="nav-link">
              Home
            </Link>
            <Link to={`/query?identifier=${identifier}&userType=${userType}`} className="nav-link">
              Query
            </Link>
            <Link to={`/chat?identifier=${identifier}&userType=${userType}`} className="nav-link">
              Chat
            </Link>
            <Nav.Link href={`/expo?identifier=${identifier}&userType=${userType}`}>
              Project Expo
            </Nav.Link>

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
         <div className="ribbon-scroll-container">
  

      <div className="ribbon-expo-container">
        {studentProjects.map((project) => (
          <div key={project.id} className="ribbon-expo-card">
            <div className="ribbon-profile-picture">
              <img src={project.profilePicture} alt={project.name} />
            </div>
            <div className="ribbon-project-details">
              <h3>{project.name}</h3>
              <p>{project.projectDescription}</p>
              <p>Contact: {project.contactNumber}</p>
              <p>Email: {project.email}</p>
              <button className="ribbon-chat-button">Chat</button>
            </div>
          </div>
        ))}
      </div>
    </div>

    </div>
 
  );
};

export default RibbonComponent;
