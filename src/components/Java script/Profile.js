// Profile.js
import React from 'react';
import '../CSS/Profile.css';

const Profile = () => {
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
    permanentAddress: {
      addressLine1: '20-86/8, Berhavolu',
      townCity: 'Gudivada (Andhra Pradesh)',
      district: 'Krishna',
      state: 'Andhra Pradesh',
      country: 'India',
      pin: '521301',
    },
    correspondingAddress: {
      addressLine1: '20-86/8, Berhavolu',
      townCity: 'Gudivada (Andhra Pradesh)',
      district: 'Krishna',
      state: 'Andhra Pradesh',
      country: 'India',
      pin: '521301',
    },
    pgAddress: {
      hnoBuilding: 'YourPGHnoBuilding',
      colony: 'YourPGColony',
      townCity: 'YourPGTownCity',
      district: 'YourPGDistrict',
      state: 'YourPGState',
      country: 'YourPGCountry',
    },
  };

  return (
    <div id="profile-page" className="profile-container">
      <div className="profile-header">
        <img src="https://via.placeholder.com/150" alt="Profile Picture" />
        <div className="profile-info">
          <h1>{studentData.name}</h1>
          <p>Prov. Regd. # {studentData.registrationNumber}</p>
          <p>Date of birth: {studentData.dateOfBirth}</p>
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

        <div className="profile-section">
          <h2>Permanent Address</h2>
          <p>{studentData.permanentAddress.addressLine1}</p>
          <p>{studentData.permanentAddress.townCity}</p>
          <p>{studentData.permanentAddress.district}</p>
          <p>{studentData.permanentAddress.state}</p>
          <p>{studentData.permanentAddress.country}</p>
          <p>Pin/Zip: {studentData.permanentAddress.pin}</p>
        </div>

        <div className="profile-section">
          <h2>Corresponding Address</h2>
          <p>{studentData.correspondingAddress.addressLine1}</p>
          <p>{studentData.correspondingAddress.townCity}</p>
          <p>{studentData.correspondingAddress.district}</p>
          <p>{studentData.correspondingAddress.state}</p>
          <p>{studentData.correspondingAddress.country}</p>
          <p>Pin/Zip: {studentData.correspondingAddress.pin}</p>
        </div>

        <div className="profile-section">
          <h2>Paying Guest Address</h2>
          <p>HNo-Building: {studentData.pgAddress.hnoBuilding}</p>
          <p>Colony: {studentData.pgAddress.colony}</p>
          <p>Town/City: {studentData.pgAddress.townCity}</p>
          <p>District: {studentData.pgAddress.district}</p>
          <p>State/UT: {studentData.pgAddress.state}</p>
          <p>Country: {studentData.pgAddress.country}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
