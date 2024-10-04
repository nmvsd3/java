import React, { useEffect, useState } from 'react';
import './ViewCriminals.css';

const ViewCriminals = () => {
  const [criminals, setCriminals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storedCriminals = JSON.parse(localStorage.getItem('criminals')) || [];
    setCriminals(storedCriminals);
  }, []);

  const filteredCriminals = criminals.filter(criminal =>
    criminal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    criminal.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="view-criminals-container">
      <h2>View Criminals</h2>
      
      <input
        type="text"
        placeholder="Search by name or address..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      {filteredCriminals.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Address</th>
              <th>Identifying Mark</th>
              <th>Crime Area</th>
              <th>Attached Crime</th>
            </tr>
          </thead>
          <tbody>
            {filteredCriminals.map((criminal, index) => (
              <tr key={index}>
                <td>{criminal.name}</td>
                <td>{criminal.age}</td>
                <td>{criminal.gender}</td>
                <td>{criminal.address}</td>
                <td>{criminal.identifyingMark}</td>
                <td>{criminal.crimeArea}</td>
                <td>{criminal.attachedCrime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No criminals to display.</p>
      )}
    </div>
  );
};

export default ViewCriminals;
