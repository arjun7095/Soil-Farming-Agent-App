import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import '../styles/SoilList.css'; // Optional: Include your CSS for styling the table

function SoilList() {
  const [soils, setSoils] = useState([]);
  const [filteredSoils, setFilteredSoils] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchSoils = async () => {
      const response = await fetch('http://localhost:5000/api/soils');
      const data = await response.json();
      setSoils(data);
      setFilteredSoils(data); // Initialize filtered data
    };
    fetchSoils();
  }, []);

  // Handle search input changes
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const searchText = e.target.value.toLowerCase();

    const filtered = soils.filter(soil =>
      soil.type.toLowerCase().includes(searchText) ||
      soil.characteristics.toLowerCase().includes(searchText) ||
      soil.suitableCrops.some(crop => crop.toLowerCase().includes(searchText))
    );
    setFilteredSoils(filtered);
  };

  // Function to handle PDF download for filtered data
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text('Soil Details', 20, 10);

    const tableColumn = ["Type", "Characteristics", "Suitable Crops"];
    const tableRows = [];

    filteredSoils.forEach(soil => {
      const soilData = [
        soil.type,
        soil.characteristics,
        soil.suitableCrops.join(', ')
      ];
      tableRows.push(soilData);
    });

    // Add autoTable with filtered rows and columns
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("filtered_soil_details.pdf");
  };

  return (
    <div className="soil-list-container">
      
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by Type, Characteristics, or Crop"
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />

      <table className="soil-table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Characteristics</th>
            <th>Suitable Crops</th>
          </tr>
        </thead>
        <tbody>
          {filteredSoils.map((soil) => (
            <tr key={soil._id}>
              <td>{soil.type}</td>
              <td>{soil.characteristics}</td>
              <td>{soil.suitableCrops.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <button onClick={downloadPDF} className="download-btn">Download as PDF</button> {/* Add the download button */}
    </div>
  );
}

export default SoilList;
