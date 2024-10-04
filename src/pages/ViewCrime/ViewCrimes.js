import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './ViewCrimes.css';

const ViewCrimes = () => {
  const [crimes, setCrimes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deletedCrimes, setDeletedCrimes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8080/api/crimes/all') 
      .then(response => response.json())
      .then(data => setCrimes(data))
      .catch(error => console.error('Error fetching crimes:', error));
  }, []);

  const filteredCrimes = crimes.filter(crime => {
    const matchesSearch =
      crime.place.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crime.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || crime.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (index) => {
    const updatedCrimes = [...crimes];
    updatedCrimes[index].status = updatedCrimes[index].status === 'solved' ? 'not solved' : 'solved';
    setCrimes(updatedCrimes);
  };

  const handleDelete = (index) => {
    const updatedCrimes = [...crimes];
    const deletedCrime = updatedCrimes.splice(index, 1)[0];
    setCrimes(updatedCrimes);
    setDeletedCrimes((prev) => [...prev, deletedCrime]);
    navigate('/delete');
  };

  return (
    <div className="view-crimes-container">
      <h2>View Crimes</h2>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by place or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select onChange={(e) => setStatusFilter(e.target.value)} value={statusFilter}>
          <option value="all">All Crimes</option>
          <option value="solved">Solved</option>
          <option value="not solved">Not Solved</option>
        </select>
      </div>

      {filteredCrimes.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Place</th>
              <th>Type of Crime</th>
              <th>Victims</th>
              <th>Description</th>
              <th>Suspects</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCrimes.map((crime, index) => (
              <tr key={index}>
                <td>{crime.date}</td>
                <td>{crime.place}</td>
                <td>{crime.crimeType}</td>
                <td>{crime.victims}</td>
                <td>{crime.description}</td>
                <td>{crime.suspects}</td>
                <td>{crime.status}</td>
                <td>
                  <button onClick={() => handleStatusChange(index)}>
                    {crime.status === 'solved' ? 'Mark as Not Solved' : 'Mark as Solved'}
                  </button>
                  <button onClick={() => handleDelete(index)} style={{ marginLeft: '5px', backgroundColor: '#f44336', color: 'white' }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No crimes to display.</p>
      )}
    </div>
  );
};

export default ViewCrimes;
