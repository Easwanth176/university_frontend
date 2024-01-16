import React from 'react'
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import logoImage from '../../logoimage.png';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import faculty0 from '../Images/faculty0.png';
import faculty1 from '../Images/faculty1.jpg';
import faculty3 from '../Images/faculty3.jpeg';
import Ribbon  from '../Java script/Ribbon.js';
import '../CSS/Details.css';
export default function Details() {
    const handleLogout = () => {
        window.location.href = '/';
      };
    
      const viewProfile = () => {
        window.location.href = `/profile?identifier=${identifier}&userType=${userType}`;
      };
        const location = useLocation();
        const queryParams = new URLSearchParams(location.search);
        const identifier = queryParams.get('identifier');
        const userType = queryParams.get('userType');
        const id = queryParams.get('id');
        const [showDropdown, setShowDropdown] = useState(false);
        const [userData, setUserData] = useState({ name: '', number: '' });

    const studentsData = [
      {id:'3', name: 'Sandhiya', role: 'Faculty',  image: faculty3, identifier: 'sandhiya@gmail.com', project:'AI And ML' },
      {id:'1',name: 'Veda Vyas', role: 'Student',  image: faculty0, identifier: '41110152', project:'Education' },
      {id:'2', name: 'Veda Rishitha', role: 'Student',  image: faculty1, identifier: '41110167', project:'Medical' },
    ];
  const studentDetails = studentsData.find((student) => student.id === id);

  if (!studentDetails) {
    return <div>Student not found</div>;
  }


  return (

    <>
    
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
    <div className='whole-container'>
      <Ribbon/>

   
      <h2>Welcome, It's Me {studentDetails.name}</h2>
      <div className="container mt-4">
        {/* Display User's Name, Image, and Project Details */}
        
        <img src={studentDetails.image} alt={studentDetails.name} className="img-fluid" />
       
        <div className='student-name'>
        <div  className='project-title'>
         <p>
          <strong>Project:</strong> {studentDetails.project}
        </p><br></br>
         </div>
        <div className='project-description'>
        <p>
          <strong>Abstract:</strong> Artificial Intelligence, commonly known as AI, refers to the simulation of human intelligence in machines programmed to think, learn, and perform tasks autonomously. The goal of AI is to create systems that can exhibit traits such as problem-solving, reasoning, perception, natural language understanding, and even creativity. AI applications can be broadly categorized into narrow or weak AI, which is designed for a specific task, and general or strong AI, which aims to mimic human cognitive abilities across various domains.
        AI technologies encompass machine learning, natural language processing, computer vision, robotics, and expert systems. From virtual assistants like Siri and Alexa to self-driving cars and advanced medical diagnostics, AI is reshaping industries and daily life, offering solutions to complex problems and enhancing efficiency.
        </p>
        </div>
        <div className='group-members'>
        <p><strong>Team Members : </strong>Rishitha, Sandhiya</p>
        </div>
        <button className="btn btn-primary">
        <Link to={`/chat?identifier=${identifier}&userType=${userType}`} className="nav-link">Chat</Link>

        </button>

          </div>
       
       

       
      </div>


    </div>
    </>
  )
}
