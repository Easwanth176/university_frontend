import React, { useState } from 'react';
import '../CSS/Expo.css';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import logoImage from '../../logoimage.png';
import faculty0 from '../Images/faculty0.png';
import faculty1 from '../Images/faculty1.jpg';
import faculty2 from '../Images/faculty2.jpeg';
import faculty3 from '../Images/faculty3.jpeg';
import faculty4 from '../Images/faculty4.jpg';
import faculty5 from '../Images/faculty5.jpg';
import faculty6 from '../Images/faculty6.jpg';
import faculty7 from '../Images/faculty7.jpg';
import Ribbon from './Ribbon';
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
      name: 'Veda Vyas',
      profilePicture:faculty0 ,
      projectDescription: 'Working on AI and ML Procject that can be used in the field of Agriculture', 
      contactNumber: '9951330193',
      email: 'veda@example.com',
    },
    {
      id: 2,
      name: 'Rishitha',
      profilePicture: faculty1,
      projectDescription: 'Working on AI and ML Procject that can be used in the field of Medical',
      contactNumber: '995133293',
      email: 'rishita@gmail.com',
    },
    {
      id: 3,
      name: 'Sandhiya',
      profilePicture: faculty2,
      projectDescription: 'Working on AI and ML Procject that can be used in the field of Education',
      contactNumber: '9951330193',
      email: 'sandhiya@gmail.com',
    },
    // add some more projects here with the same format as above

    {
      id: 4,
      name: 'Sai',
      profilePicture: faculty3,
      projectDescription: 'Working on AI and ML Procject that can be used in the field of Agriculture',
      contactNumber: '9951330193',
      email: 'teacher@gmnail.com',
    },
    {
      id: 5,
      name: 'Sri',
      profilePicture: faculty4,
      projectDescription: 'Working on AI and ML Procject that can be used in the field of Medical',
      contactNumber: '9951330193',
      email: 'teacher@gmail.com',
    },
    {
      id: 6,
      name: 'Sai',
      profilePicture: faculty5,
      projectDescription: 'Working on AI and ML Procject that can be used in the field of Education',
      contactNumber: '9951330193',
      email: 'teacher@gmail.com',
    },
    {
      id: 7,
      name: 'Sri',
      profilePicture: faculty6,
      projectDescription: 'Working on AI and ML Procject that can be used in the field of Agriculture',
      contactNumber: '9951330193',
      email: 'teacher@gmail.com ',
    },
    {
      id: 8,
      name: 'Sai',
      profilePicture: faculty7,
      projectDescription: 'Working on AI and ML Procject that can be used in the field of Medical',
      contactNumber: '9951330193',
      email: 'teacher@gmail.com',
    },
    
  ];
  const handleLogout = () => {
    window.location.href = '/';
  };

  const viewProfile = () => {
    window.location.href = `/profile?identifier=${identifier}&userType=${userType}`;
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
         <Ribbon />

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
                 
                    <Link to={`/details?identifier=${identifier}&userType=${userType}&id=${project.id}`} className="nav-link">
                    <button className="ribbon-chat-button"> View Details </button>     
                          </Link>
                 
                </div>
              </div>
            ))}
          </div>
    </div>

    </div>
 
  );
};

export default RibbonComponent;
