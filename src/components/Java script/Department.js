import React, { useState, useEffect } from 'react';
import { useLocation,Link } from 'react-router-dom';
import { Navbar, Nav, Dropdown,Carousel,Button } from 'react-bootstrap';
import logoImage from '../../logoimage.png';
import '../CSS/Department.css';
import chemical from '../Images/chemical.png';
import civil from '../Images/civil.jpg';
import cse from '../Images/cse.png';
import ece from '../Images/ece.jpg';
import mechanical from '../Images/mechanical.jpg';
import Ribbon from './Ribbon';


export default function Department() {
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
  const topics = [
    {
      title: 'Computer Science and Engineering',
      image: cse,
    },
    {
      title: 'Electronics and Communication Engineering',
      image: ece,
    },
    {
      title: 'Mechanical Engineering',
      image: mechanical,
    },
    {
      title: 'Civil Engineering',
      image: civil,
    },
    {
      title: 'Chemical Engineering',
      image: chemical,
    }
    
  ];

  return (
    <div className='department-container'>

    <Ribbon identifier={identifier} userType={userType} />
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
       <Nav.Link href={`/home?identifier=${identifier}&userType=${userType}`}>Home</Nav.Link>
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


      <div className="row mt-4">
        {topics.map((topic, index) => (
          <div className="col-lg-4 col-md-6 mb-4" key={index}>
            <div className="card">
              <div className="card-body">
                <img src={topic.image} className="card-img-top" alt="Card" />
                <h5 className="card-title">{topic.title}</h5>
                <Link to={`/expo?identifier=${identifier}&userType=${userType}&projectType=${topic.title}`} className="btn btn-primary">View Projects</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='button-department'>
      <Button variant="primary" >
      <Link to={`/form?identifier=${identifier}&userType=${userType}&projectType=${topic.title}`} className="btn btn-primary">Add Projects</Link>

     </Button>
      </div>
  
  </div>
  )
}
