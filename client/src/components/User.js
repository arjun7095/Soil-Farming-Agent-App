import React, { useState } from "react";
import SoilList from "./SoilList";
import DistributorList from "./DistributorList";
import { useNavigate } from 'react-router-dom';
import '../styles/User.css'; // Import the CSS file

function User() {
  const history = useNavigate();
  const [activeSection, setActiveSection] = useState('soil'); // State to toggle between soil and distributor

  // Logout functionality
  const handleLogout = () => {
    localStorage.removeItem('token');  // Remove the token from localStorage
    history('/login'); // Redirect to the login page
  };

  return (
    <>
      {/* Navigation Bar */}
      <nav className="navbar">
        <ul className="nav-links">
          <li>
            <button
              className={`nav-link-btn ${activeSection === 'soil' ? 'active' : ''}`}
              onClick={() => setActiveSection('soil')}
            >
              Soil Details
            </button>
          </li>
          <li>
            <button
              className={`nav-link-btn ${activeSection === 'distributor' ? 'active' : ''}`}
              onClick={() => setActiveSection('distributor')}
            >
              Distributor Details
            </button>
          </li>
        </ul>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </nav>

      {/* Conditional Rendering of Soil or Distributor List */}
      <div className="admin-dashboard">
        {activeSection === 'soil' && (
          <div id="soil-section" className="admin-section">
            <h3>Soil List</h3>
            <SoilList />
          </div>
        )}
        {activeSection === 'distributor' && (
          <div id="distributor-section" className="admin-section">
            <h3>Distributor List</h3>
            <DistributorList />
          </div>
        )}
      </div>
    </>
  );
}

export default User;
