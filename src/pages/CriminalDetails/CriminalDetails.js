import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './CriminalDetails.css'; 

const CriminalDetails = () => {
  const { criminalId } = useParams(); 
  const [criminal, setCriminal] = useState(null);
  const [crimes, setCrimes] = useState([]);
  const [error, setError] = useState('');

  // Fetch criminal details
  useEffect(() => {
    const fetchCriminal = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/criminals/${criminalId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch criminal details');
        }
        const data = await response.json();
        setCriminal(data);
      } catch (error) {
        setError('Error fetching criminal details');
        console.error('Error fetching criminal details:', error);
      }
    };

    fetchCriminal();
  }, [criminalId]);


  useEffect(() => {
    const fetchCrimes = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/crimes?suspectName=${criminal?.name}`);
        if (!response.ok) {
          throw new Error('Failed to fetch crimes');
        }
        const data = await response.json();
        setCrimes(data);
      } catch (error) {
        setError('Error fetching crimes related to this criminal');
        console.error('Error fetching crimes:', error);
      }
    };

    if (criminal) {
      fetchCrimes();
    }
  }, [criminal]);

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!criminal) {
    return <p>Loading criminal details...</p>;
  }

  return (
    <div className="criminal-details-container">
      <h2>Criminal Details</h2>
      <div className="criminal-info">
        <img src={`http://localhost:8080/uploads/${criminal.photo}`} alt={criminal.name} className="criminal-photo" />
        <p><strong>Name:</strong> {criminal.name}</p>
        <p><strong>Age:</strong> {criminal.age}</p>
        <p><strong>Gender:</strong> {criminal.gender}</p>
        <p><strong>Address:</strong> {criminal.address}</p>
        <p><strong>Identifying Mark:</strong> {criminal.identifyingMark}</p>
        <p><strong>Crime Area:</strong> {criminal.crimeArea}</p>
        <p><strong>Attached Crime:</strong> {criminal.attachedCrime}</p>
      </div>

      <h3>Crimes Associated with {criminal.name}</h3>
      {crimes.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Place</th>
              <th>Type of Crime</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {crimes.map((crime) => (
              <tr key={crime.id}>
                <td>{crime.date}</td>
                <td>{crime.place}</td>
                <td>{crime.crimeType}</td>
                <td>{crime.description}</td>
                <td>{crime.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No crimes associated with this criminal.</p>
      )}
    </div>
  );
};

export default CriminalDetails;
