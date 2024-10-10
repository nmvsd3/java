import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ViewCrimes.css';

const ViewCrimes = () => {
  const [crimes, setCrimes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editDescription, setEditDescription] = useState('');
  const [editStatus, setEditStatus] = useState('');
  const navigate = useNavigate();

  // Fetch crimes data when the component mounts
  useEffect(() => {
    const fetchCrimes = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/crimes/all', {
          cache: 'no-store',
        });
        if (!response.ok) {
          throw new Error('Failed to fetch crimes');
        }
        const data = await response.json();
        setCrimes(data);
      } catch (error) {
        console.error('Error fetching crimes:', error);
      }
    };

    fetchCrimes();
  }, []);

  const filteredCrimes = crimes.filter(crime => {
    const matchesSearch =
      crime.place.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crime.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || crime.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditDescription(crimes[index].description); // Set current description in edit mode
    setEditStatus(crimes[index].status); // Set current status in edit mode
  };

  const handleSave = async (index) => {
    const crimeToUpdate = crimes[index];
    try {
      const response = await fetch(`http://localhost:8080/api/crimes/${crimeToUpdate.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...crimeToUpdate,
          description: editDescription, // Updated description
          status: editStatus,           // Updated status
        }),
      });

      if (response.ok) {
        const updatedCrime = await response.json(); // Get the updated crime
        const updatedCrimes = [...crimes];
        updatedCrimes[index] = updatedCrime; // Update the state with new crime details
        setCrimes(updatedCrimes);
        setEditingIndex(null); // Exit edit mode
      } else {
        console.error('Failed to update crime');
      }
    } catch (error) {
      console.error('Error updating crime:', error);
    }
  };

  const handleDelete = async (index) => {
    const crimeToDelete = crimes[index];
    try {
      const response = await fetch(`http://localhost:8080/api/crimes/${crimeToDelete.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedCrimes = [...crimes];
        updatedCrimes.splice(index, 1);
        setCrimes(updatedCrimes);
        navigate('/delete');
      } else {
        console.error('Failed to delete crime');
      }
    } catch (error) {
      console.error('Error deleting crime:', error);
    }
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
                {editingIndex === index ? (
                  <>
                    <td>
                      <input
                        type="text"
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                      />
                    </td>
                    <td>{crime.suspects}</td>
                    <td>
                      <select
                        value={editStatus}
                        onChange={(e) => setEditStatus(e.target.value)}
                      >
                        <option value="solved">Solved</option>
                        <option value="not solved">Not Solved</option>
                      </select>
                    </td>
                    <td>
                      <button onClick={() => handleSave(index)} style={{ backgroundColor: '#4CAF50', color: 'white' }}>
                        Save
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{crime.description}</td>
                    <td>{crime.suspects}</td>
                    <td>{crime.status}</td>
                    <td>
                      <button onClick={() => handleEdit(index)} style={{ backgroundColor: '#2196F3', color: 'white' }}>
                        Edit
                      </button>
                      <button onClick={() => handleDelete(index)} style={{ marginLeft: '5px', backgroundColor: '#f44336', color: 'white' }}>
                        Delete
                      </button>
                    </td>
                  </>
                )}
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
