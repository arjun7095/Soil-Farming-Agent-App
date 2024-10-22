import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import '../styles/DistributorList.css'; // Optional: Include your CSS for styling the table

function DistributorList() {
  const [distributors, setDistributors] = useState([]);
  const [filteredDistributors, setFilteredDistributors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchDistributors = async () => {
      const response = await fetch('http://localhost:5000/api/distributors');
      const data = await response.json();
      setDistributors(data);
      setFilteredDistributors(data); // Set initial filtered data to be the same as the full data
    };
    fetchDistributors();
  }, []);

  // Handle search input changes
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const searchText = e.target.value.toLowerCase();
    
    const filtered = distributors.filter(distributor => 
      distributor.name.toLowerCase().includes(searchText) ||
      distributor.location.toLowerCase().includes(searchText) ||
      distributor.cropsDistributed.some(crop => crop.toLowerCase().includes(searchText))
    );
    
    setFilteredDistributors(filtered);
  };

  // Function to handle PDF download for filtered data
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text('Distributor Details', 20, 10);

    const tableColumn = ["Name", "Location", "Contact", "Crops Distributed"];
    const tableRows = [];

    filteredDistributors.forEach(distributor => {
      const distributorData = [
        distributor.name,
        distributor.location,
        distributor.contact,
        distributor.cropsDistributed.join(', ')
      ];
      tableRows.push(distributorData);
    });

    // Add autoTable with filtered rows and columns
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("distributor_details.pdf");
  };

  return (
    <div className="distributor-list-container">
      
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by Name, Location, or Crop"
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />

      <table className="distributor-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Contact</th>
            <th>Crops Distributed</th>
          </tr>
        </thead>
        <tbody>
          {filteredDistributors.map((distributor) => (
            <tr key={distributor._id}>
              <td>{distributor.name}</td>
              <td>{distributor.location}</td>
              <td>{distributor.contact}</td>
              <td>{distributor.cropsDistributed.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <button onClick={downloadPDF} className="download-btn">Download as PDF</button> {/* Add the download button */}
    </div>
  );
}

export default DistributorList;
