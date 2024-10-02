import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Admin.css';
import SoilList from './SoilList';
import DistributorList from './DistributorList';

function Admin() {
  const [soil, setSoil] = useState({ type: '', characteristics: '', suitableCrops: '' });
  const [distributor, setDistributor] = useState({ name: '', location: '', contact: '', cropsDistributed: '' });
  const [activeForm, setActiveForm] = useState('soilList'); // Default active section is the soil list
  const history = useNavigate();

  const handleSoilSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Get token from localStorage

    const response = await fetch('http://localhost:5000/api/admin/soil', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Include token in the header
      },
      body: JSON.stringify({
        type: soil.type,
        characteristics: soil.characteristics,
        suitableCrops: soil.suitableCrops.split(',').map(crop => crop.trim())
      })
    });

    if (response.ok) {
      alert('Soil details added successfully!');
      setSoil({ type: '', characteristics: '', suitableCrops: '' });
    } else {
      alert('Failed to add soil details');
    }
  };

  const handleDistributorSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Get token from localStorage

    const response = await fetch('http://localhost:5000/api/admin/distributor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Include token in the header
      },
      body: JSON.stringify({
        name: distributor.name,
        location: distributor.location,
        contact: distributor.contact,
        cropsDistributed: distributor.cropsDistributed.split(',').map(crop => crop.trim())
      })
    });

    if (response.ok) {
      alert('Distributor details added successfully!');
      setDistributor({ name: '', location: '', contact: '', cropsDistributed: '' });
    } else {
      alert('Failed to add distributor details');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');  // Remove the token from localStorage
    history('/login'); // Redirect to the login page
  };

  return (
    <>
      {/* Navbar */}
      <nav className="admin-navbar">
        <ul>
          <li>
            <button onClick={() => setActiveForm('soilList')}>View Soil List</button>
          </li>
          <li>
            <button onClick={() => setActiveForm('distributorList')}>View Distributor List</button>
          </li>
          <li>
            <button onClick={() => setActiveForm('soil')}>Post Soil Details</button>
          </li>
          <li>
            <button onClick={() => setActiveForm('distributor')}>Post Distributor Details</button>
          </li>
          <li className="logout" >
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </li>
        </ul>
      </nav>

      <div className='admin-container'>
        {/* <h2>Admin Dashboard</h2> */}

        {/* Conditionally render soil list */}
        {activeForm === 'soilList' && <SoilList />}

        {/* Conditionally render distributor list */}
        {activeForm === 'distributorList' && <DistributorList />}

        {/* Conditionally render soil form */}
        {activeForm === 'soil' && (
          <form onSubmit={handleSoilSubmit}>
            <h3>Post Soil Details</h3>
            <input
              type="text"
              placeholder="Soil Type"
              value={soil.type}
              onChange={(e) => setSoil({ ...soil, type: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Characteristics"
              value={soil.characteristics}
              onChange={(e) => setSoil({ ...soil, characteristics: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Suitable Crops (comma-separated)"
              value={soil.suitableCrops}
              onChange={(e) => setSoil({ ...soil, suitableCrops: e.target.value })}
              required
            />
            <button type="submit">Add Soil</button>
          </form>
        )}

        {/* Conditionally render distributor form */}
        {activeForm === 'distributor' && (
          <form onSubmit={handleDistributorSubmit}>
            <h3>Post Distributor Details</h3>
            <input
              type="text"
              placeholder="Distributor Name"
              value={distributor.name}
              onChange={(e) => setDistributor({ ...distributor, name: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Location"
              value={distributor.location}
              onChange={(e) => setDistributor({ ...distributor, location: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Contact"
              value={distributor.contact}
              onChange={(e) => setDistributor({ ...distributor, contact: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Crops Distributed (comma-separated)"
              value={distributor.cropsDistributed}
              onChange={(e) => setDistributor({ ...distributor, cropsDistributed: e.target.value })}
              required
            />
            <button type="submit">Add Distributor</button>
          </form>
        )}
      </div>
    </>
  );
}

export default Admin;
