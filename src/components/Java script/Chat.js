import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import '../CSS/Chat.css';


import logoImage from '../../logo.png';
import faculty0 from '../Images/faculty0.png';
import faculty1 from '../Images/faculty1.jpeg';
import faculty2 from '../Images/faculty2.jpeg';
import faculty3 from '../Images/faculty3.jpeg';
import faculty4 from '../Images/faculty4.jpg';
import faculty5 from '../Images/faculty5.jpg';
import faculty6 from '../Images/faculty6.jpg';
import faculty7 from '../Images/faculty7.jpg';
import faculty8 from '../Images/faculty8.jpeg';
import ds1 from '../Images/DS1.jpeg';
import ds2 from '../Images/DS2.jpeg';
import ds3 from '../Images/DS3.jpeg';
import ds4 from '../Images/DS4.jpg'; 
import ds5 from '../Images/DS5.jpeg';
import ds6 from '../Images/DS6.jpeg';
import ds7 from '../Images/DS7.jpg';
import ds8 from '../Images/DS8.jpeg';
import bsf1 from '../Images/BSF1.jpg';
import bsf2 from '../Images/BSF2.jpeg';
import bsf3 from '../Images/BSF3.jpg';
import bsf4 from '../Images/BSF4.jpeg';
import bsf5 from '../Images/BSF5.jpg';
import bsf6 from '../Images/BSF6.jpg';
import bsf7 from '../Images/BSF7.jpeg';
import bsf8 from '../Images/BSF8.jpeg';
import ee1 from '../Images/EE1.jpg';
import ee2 from '../Images/EE2.jpg';
import ee3 from '../Images/EE3.jpeg';
import ee4 from '../Images/EE4.jpg';
import ee5 from '../Images/EE5.jpeg';
import ee6 from '../Images/EE6.jpg';
import ee7 from '../Images/EE7.jpg';
import ee8 from '../Images/EE8.jpg';

export default function Chat() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [roomName, setRoomName] = useState('');
  const [userData, setUserData] = useState({ name: '', number: '' });
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const identifier = queryParams.get('identifier');
  const userType = queryParams.get('userType');
  const [teacherMessages, setTeacherMessages] = useState({});
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState({
    id: 1,
    name: 'Usha Rani',
    department: 'School Of Computing',
    profilePicture: faculty1,
    Email: 'usharani@gmail.com',
  });

  useEffect(() => {
    const fetchChatMessages = async (selectedTeacherEmail) => {
      try {
        const response = await fetch(
          `https://sathyabama-backend.onrender.com/api/getChatMessages/${identifier}/${selectedTeacherEmail}`
        );
        const chatMessages = await response.json();
        console.log('Fetched Existing Messages:', chatMessages);
        setTeacherMessages({
          ...teacherMessages,
          [selectedTeacherEmail]: chatMessages,
        });
      } catch (error) {
        console.error('Error fetching existing chat messages:', error);
      }
    };

    const fetchMessagesAtInterval = () => {
      if (selectedTeacher && selectedTeacher.Email) {
        fetchChatMessages(selectedTeacher.Email);
      }
    };

    // Fetch messages initially
    fetchMessagesAtInterval();

    // Set up interval to fetch messages every 5 seconds (adjust as needed)
    const intervalId = setInterval(fetchMessagesAtInterval, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [identifier, selectedTeacher, teacherMessages]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === '' || !selectedTeacher) return;

    const selectedTeacherEmail = selectedTeacher.Email;

    try {
      await fetch('https://sathyabama-backend.onrender.com/api/storeChatMessages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier,
          selectedTeacherEmail,
          messages: [
            {
              sender: identifier,
              message: newMessage,
            },
          ],
        }),
      });
      console.log('Message sent and stored successfully');
    } catch (error) {
      console.error('Error storing chat message:', error);
    }

    try {
      const response = await fetch(
        `https://sathyabama-backend.onrender.com/api/getChatMessages/${identifier}/${selectedTeacherEmail}`
      );
      const chatMessages = await response.json();
      console.log('Fetched Updated Messages:', chatMessages);
      setTeacherMessages({
        ...teacherMessages,
        [selectedTeacherEmail]: chatMessages,
      });
    } catch (error) {
      console.error('Error fetching updated chat messages:', error);
    }

    setNewMessage('');
  };

  const handleLogout = () => {
    window.location.href = '/';
  };

  const viewProfile = () => {
    window.location.href = '/profile';
  };

  const teachers = [
    { id: 0, name: 'Dr.Easwanth Kopnduru', department: 'School Of Computing', profilePicture: faculty0, Email: 'easwanth@gmail.com'},
    { id: 1, name: 'Usha Rani', department: 'School Of Computing', profilePicture: faculty1, Email: 'usharani@gmail.com' },
    { id: 2, name: 'Karthika', department: 'School Of Computing', profilePicture: faculty2, Email: 'karthika@gmail.com' },
    { id: 3, name: 'Sandhiya', department: 'School Of Computing', profilePicture: faculty3, Email: 'sandhiya@gmail.com' },
    { id: 4, name: 'Anubarathi', department: 'School Of Computing', profilePicture: faculty4, Email: 'anubarathi@gmail.com' },
    { id: 5, name: 'Aroul', department: 'School Of Computing', profilePicture: faculty5, Email: 'aroul@gmail.com' },
    { id: 6, name: 'Ankaya Kanni', department: 'School Of Computing', profilePicture: faculty6, Email: 'ankayakanni@gmail.com' },
    { id: 7, name: 'Kamalesh', department: 'School Of Computing', profilePicture: faculty7, Email: 'kamalesh@gmail.com' },
    { id: 8, name: 'Lakshmanan', department: 'School Of Computing', profilePicture: faculty8, Email: 'lakshmanan@gmail.com' },
    { id: 9, name: 'Ranji', department: 'Data Science', profilePicture: ds1, Email: 'ranji@gmail.com' },
    { id: 10, name: 'Angeline Aishwarya', department: 'Data Science', profilePicture: ds2, Email: 'angelineaishwarya@gmail.com' },
    { id: 11, name: 'Krithika', department: 'Data Science', profilePicture: ds3, Email: 'krithika@gmail.com' },
    { id: 12, name: 'Mirnalini', department: 'Data Science', profilePicture: ds4, Email: 'mirnalini@gmail.com' },
    { id: 13, name: 'Ashwanth', department: 'Data Science', profilePicture: ds5, Email: 'ashwanth@gmail.com' },
    { id: 14, name: 'Aravinthan', department: 'Data Science', profilePicture: ds6, Email: 'aravinthan@gmail.com' },
    { id: 15, name: 'Bharghav', department: 'Data Science', profilePicture: ds7, Email: 'bharghav@gmail.com' },
    { id: 16, name: 'Rajeshwariu', department: 'Data Science', profilePicture: ds8, Email: 'rajeshwariu@gmail.com' },
    { id: 17, name: 'Dr. SAHAYA ANSELIN NISHA', department: 'Business', profilePicture: bsf1, Email: 'sahayaanselin@gmail.com' },
    { id: 18, name: 'Dr. EMALDA ROSLIN', department: 'Business', profilePicture: bsf2, Email: 'emaldaroslin@gmail.com' },
    { id: 19, name: 'Dr. ANBARASI JEBASELVI', department: 'Business', profilePicture: bsf3, Email: 'anbarasijebaselvi@gmail.com' },
    { id: 20, name: 'Dr.S POORNAPUSHPAKALA', department: 'Business', profilePicture: bsf4, Email: 'spoornapushpakala@gmail.com' },
    { id: 21, name: 'Dr. BARANI SELVARAJ', department: 'Business', profilePicture: bsf5, Email: 'baraniselvaraj@gmail.com' },
    { id: 22, name: 'Dr. SUBRAMONIAM', department: 'Business', profilePicture: bsf6, Email: 'subramoniam@gmail.com' },
    { id: 23, name: 'Dr. ANITHA ARAVINDARAJ', department: 'Business', profilePicture: bsf7, Email: 'anithaaravindaraj@gmail.com' },
    { id: 24, name: 'KALIST VINCENT', department: 'Business', profilePicture: bsf8, Email: 'kalistvincent@gmail.com' },
    { id: 25, name: 'Ms.YUVA POORNIMA', department: 'Electrical', profilePicture: ee1, Email: 'yuva.poornima@gmail.com' },
    { id: 26, name: 'Ms. RESHMA JOHN', department: 'Electrical', profilePicture: ee2, Email: 'reshmajohn@gmail.com' },
    { id: 27, name: 'Ms.PREETHI', department: 'Electrical', profilePicture: ee3, Email: 'preethi@gmail.com' },
    { id: 28, name: 'Mr.G.NARESH', department: 'Electrical', profilePicture: ee4, Email: 'gnaresh@gmail.com' },
    { id: 29, name: 'Mr.K.SANJAY', department: 'Electrical', profilePicture: ee5, Email: 'ksanjay@gmail.com' },
    { id: 30, name: 'Mr.GOKUL PRASAD', department: 'Electrical', profilePicture: ee6, Email: 'gokulprasad@gmail.com' },
    { id: 31, name: 'Ms.YAZHINI', department: 'Electrical', profilePicture: ee7, Email: 'yazhini@gmail.com' },
    { id: 32, name: 'Dr.DILSHAD SHAIK', department: 'Electrical', profilePicture: ee8, Email: 'dilshadshaik@gmail.com' },
  ];
  const handleTeacherClick = (teacher) => {
    setSelectedTeacher(teacher);
    console.log('Selected Teacher:', teacher);
  };

  const filterTeachersByDepartment = (department) => {
    if (department === 'All') {
      setSelectedDepartment(null);
      return;
    }
    setSelectedDepartment(department);
  };

  const filteredTeachers = teachers.filter(
    (teacher) =>
      (selectedDepartment === null || teacher.department === selectedDepartment) &&
      (teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.Email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="chat-page">
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

      <div className="chat-container">
        <div className="teachers-list">
          <div className="drop-box">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Department
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => filterTeachersByDepartment('All')}>All</Dropdown.Item>
                <Dropdown.Item onClick={() => filterTeachersByDepartment('School Of Computing')}>
                  School Of Computing
                </Dropdown.Item>
                <Dropdown.Item onClick={() => filterTeachersByDepartment('Data Science')}>
                  Data Science
                </Dropdown.Item>
                <Dropdown.Item onClick={() => filterTeachersByDepartment('Business')}>
                  Business
                </Dropdown.Item>
                <Dropdown.Item onClick={() => filterTeachersByDepartment('Electrical')}>
                  Electrical
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div className="Teacher-search-bar">
            <input
              type="text"
              placeholder="Search Teachers"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {filteredTeachers.map((teacher) => (
            <div key={teacher.id} className="teacher-item" onClick={() => handleTeacherClick(teacher)}>
              <img src={teacher.profilePicture} alt={teacher.name} />
              <div>
                <p>{teacher.name}</p>
                <p>{teacher.department}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="chat-interface">
          <div className="selected-teacher">
            {selectedTeacher && (
              <img src={selectedTeacher.profilePicture} alt={selectedTeacher.name} />
            )}
            <div className="P-tags">
              {selectedTeacher && <p>{selectedTeacher.name}</p>}
              {selectedTeacher && <p>{selectedTeacher.department}</p>}
              {selectedTeacher && <p>{selectedTeacher.Email}</p>}
              {roomName && <p>Room Name: {roomName}</p>}
            </div>
          </div>

          <div className="message-area">
            {teacherMessages[selectedTeacher.Email]?.map((chat, index) => (
              <div
                key={index}
                className={`message ${
                  chat.identifier === identifier ? 'sent' : 'received'
                }`}
              >
                {chat.messages[0].message}
              </div>
            ))}
          </div>

          <div className="text-box">
            <div className="input-container">
              <input
                type="text"
                placeholder="Type your message here"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}










