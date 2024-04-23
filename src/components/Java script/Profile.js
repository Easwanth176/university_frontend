import {React,useState}from 'react';
import '../CSS/Profile.css';  
import { useLocation,Link} from 'react-router-dom';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import logoImage from '../../logoimage.png';
import faculty0 from '../Images/faculty0.png';
import faculty1 from '../Images/faculty1.jpg';
import faculty3 from '../Images/faculty3.jpeg';
import a from '../Images/a.jpg';
import b from '../Images/b.jpg';
import c from '../Images/c.jpg';
import d from '../Images/d.jpg';
import e from '../Images/e.jpg';
import f from '../Images/f.jpg';


const Profile = () => {
  const handleLogout = () => {
    window.location.href = '/';
  };
  const location = useLocation();
const queryParams = new URLSearchParams(location.search);
const identifier = queryParams.get('identifier');
const userType = queryParams.get('userType');
const [showDropdown, setShowDropdown] = useState(false);
const [userData, setUserData] = useState({ name: '', number: '' });


const studentsData = [
  { name: 'Sandhiya', role: 'Faculty', location: 'Tamil Nadu', image: faculty3, identifier: 'sandhiya@gmail.com', phone: '9784568412', mobile: '9784568412', address: 'Satyabhama University' },
  { name: 'Veda Vyas', role: 'Student', location: 'Tamil Nadu', image: faculty0, identifier: '41110152', phone: '9951330193', mobile: '9951330193', address: 'Satyabhama University' },
  { name: 'Rishitha', role: 'Student', location: 'Tamil Nadu', image: faculty1, identifier: '41110167', phone: '9951330193', mobile: '9951330193', address: 'Satyabhama University' },
  { name: 'manognya', role: 'Student', location: 'Tamil Nadu', image: a, identifier: '41110945', phone: '9951330193', mobile: '9951330193', address: 'Satyabhama University' },
  { name: 'B.gireesh', role: 'Student', location: 'Tamil Nadu', image: b, identifier: '41110173 ', phone: '9951330193', mobile: '9951330193', address: 'Satyabhama University' },
  { name: 'B sruthi', role: 'Student', location: 'Tamil Nadu', image: c, identifier: '41110154', phone: '9951330193', mobile: '9951330193', address: 'Satyabhama University' },
  { name: 'Gollapalli Sai Srihitha', role: 'Student', location: 'Tamil Nadu', image: d, identifier: '41110417', phone: '9951330193', mobile: '9951330193', address: 'Satyabhama University' },
  { name: 'Godavarthy R P Lakshmi Aiswarya', role: 'Student', location: 'Tamil Nadu', image: e, identifier: '41110406', phone: '9951330193', mobile: '9951330193', address: 'Satyabhama University' },
  { name: 'Charitha bhooma', role: 'Student', location: 'Tamil Nadu', image: f, identifier: '41110195', phone: '9951330193', mobile: '9951330193', address: 'Satyabhama University' },

];

const studentDetails = studentsData.find((student) => student.identifier === identifier);

  if (!studentDetails) {
    // Handle case where the provided identifier is not found
    return <div>Student not found</div>;
  }

  const viewProfile = () => {
    window.location.href = '/profile';
  };
  return (
  
    <div className='xxx'>

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

  <div className="container">
        <div className="main-body">

          <div className="row">
            <div className="col-lg-4">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img
                      src={studentDetails.image}
                      alt="Student"
                      className="rounded-circle p-1 bg-primary"
                      width="110"
                    />
                    <div className="mt-3">
                      <h4>{studentDetails.name}</h4>
                      <p className="text-muted font-size-sm">{studentDetails.role}</p>
                      <button className="btn btn-primary">Follow</button>
                      <button className="btn btn-outline-primary">Message</button>
                    </div>
                  </div>
                  <hr className="my-4" />
                  <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-globe me-2 icon-inline"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>Website</h6>
                <span className="text-secondary">www.aaa.com</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-github me-2 icon-inline"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>Github</h6>
                <span className="text-secondary">veda vyas</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-twitter me-2 icon-inline text-info"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>Twitter</h6>
                <span className="text-secondary">veda vyas</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-instagram me-2 icon-inline text-danger"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>Instagram</h6>
                <span className="text-secondary">veda vyas</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-facebook me-2 icon-inline text-primary"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>Facebook</h6>
                <span className="text-secondary">veda vyas</span>
              </li>
            </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-8">
        <div className="card">
          <div className="card-body">
          <div className="row mb-3">
<div className="col-sm-3">
<h6 className="mb-0">Full Name</h6>
</div>
<div className="col-sm-9 text-secondary">
<input type="text" className="form-control" value={studentDetails.name} />
</div>
</div>
<div className="row mb-3">
<div className="col-sm-3">
<h6 className="mb-0">Email</h6>
</div>
<div className="col-sm-9 text-secondary">
<input type="text" className="form-control" value={studentDetails.identifier} />
</div>
</div>
<div className="row mb-3">
<div className="col-sm-3">
<h6 className="mb-0">Phone</h6>
</div>
<div className="col-sm-9 text-secondary">
<input type="text" className="form-control" value={studentDetails.mobile} />
</div>
</div>
<div className="row mb-3">
<div className="col-sm-3">
<h6 className="mb-0">Mobile</h6>
</div>
<div className="col-sm-9 text-secondary">
<input type="text" className="form-control" value={studentDetails.mobile} />
</div>
</div>
<div className="row mb-3">
<div className="col-sm-3">
<h6 className="mb-0">Address</h6>
</div>
<div className="col-sm-9 text-secondary">
<input type="text" className="form-control" value={studentDetails.address} />
</div>
</div>
<div className="row">
<div className="col-sm-3"></div>
<div className="col-sm-9 text-secondary">
<input type="button" className="btn btn-primary px-4" value="Save Changes" />
</div>
</div>

            {/* ... (Similar structure for other form fields) ... */}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
            <div className="card-body">
<h5 className="d-flex align-items-center mb-3">Project Status</h5>
<p>Web Design</p>
<div className="progress mb-3" style={{ height: '5px' }}>
<div className="progress-bar bg-primary" role="progressbar" style={{ width: '80%' }} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
</div>
<p>Website Markup</p>
<div className="progress mb-3" style={{ height: '5px' }}>
<div className="progress-bar bg-danger" role="progressbar" style={{ width: '72%' }} aria-valuenow="72" aria-valuemin="0" aria-valuemax="100"></div>
</div>
<p>One Page</p>
<div className="progress mb-3" style={{ height: '5px' }}>
<div className="progress-bar bg-success" role="progressbar" style={{ width: '89%' }} aria-valuenow="89" aria-valuemin="0" aria-valuemax="100"></div>
</div>
<p>Mobile Template</p>
<div className="progress mb-3" style={{ height: '5px' }}>
<div className="progress-bar bg-warning" role="progressbar" style={{ width: '55%' }} aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
</div>
<p>Backend API</p>
<div className="progress" style={{ height: '5px' }}>
<div className="progress-bar bg-info" role="progressbar" style={{ width: '66%' }} aria-valuenow="66" aria-valuemin="0" aria-valuemax="100"></div>
</div>
</div>

            </div>
          </div>
        </div>
      </div>

          </div>
        </div>
      </div>

    </div>
   
  

   
  );
};

export default Profile;
