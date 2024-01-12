// Profile.js
import React from 'react';
import '../CSS/Profile.css';
import faculty from '../Images/faculty0.png';
import { useLocation,Link} from 'react-router-dom';
import { Button } from 'react-bootstrap';


const Profile = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const identifier = queryParams.get('identifier');
  const userType = queryParams.get('userType');
  const studentData = {
    name: 'Konduru Easwanth Naga Narasimha',
    registrationNumber: '12106096',
    dateOfBirth: '08/09/2004',
    category: 'Gen',
    fatherName: 'Konduru Gangadhara Kameswara Rao',
    fatherMobile: '9949945193',
    motherName: 'Konduru Naga Lakshmi',
    motherMobile: 'YourMotherMobileNumber',
    gender: 'M',
    landline: 'YourLandlineNumber',
    studentMobile: '7777912365',
    email: 'easwanth123@gmail.com',
    emergencyContact: 'YourEmergencyContactNumber',
    fathersEmail: 'easwanth123@gmail.com',
    lpuEmail: 'konduru.12106096@lpu.in',


  };

  return (
    <div id="profile-page" className="profile-container">
      <div className="profile-header">
        <img src={faculty} alt="Profile Picture" />
        <h1 > STUDENT PROFILE </h1>
        <div className="profile-info">
          <h1>{studentData.name}</h1>
          <p>Prov. Regd. # {studentData.registrationNumber}</p>
          <p>Date of birth: {studentData.dateOfBirth}</p>
          <Button>
            <Link to={`/home?identifier=${identifier}&userType=${userType}`} className="nav-link">Home</Link>
          </Button>

        </div>
      </div>

      <div className="profile-body">
        <div className="profile-section">
          <h2>Personal Information</h2>
          <p>Gender: {studentData.gender}</p>
          <p>Landline No: {studentData.landline}</p>
          <p>Student Mobile: {studentData.studentMobile}</p>
          <p>E-mail Id: {studentData.email}</p>
          <p>Emergency Contact No: {studentData.emergencyContact}</p>
          <p>Father's Name: {studentData.fatherName}</p>
          <p>Father's Mobile No: {studentData.fatherMobile}</p>
          <p>Mother's Name: {studentData.motherName}</p>
          <p>Mother's Mobile No: {studentData.motherMobile}</p>
          <p>LPU Email Id: {studentData.lpuEmail}</p>
        </div>

 
      </div>
    </div>
  );
};

export default Profile;
