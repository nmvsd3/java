import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import './Overview.css';

const Overview = () => {
  const [totalCrimes, setTotalCrimes] = useState(0);
  const [solvedCrimes, setSolvedCrimes] = useState(0);
  const [unsolvedCrimes, setUnsolvedCrimes] = useState(0);
  const [monthlyCrimes, setMonthlyCrimes] = useState(0);
  const [totalCriminals, setTotalCriminals] = useState(0);
  const [crimes, setCrimes] = useState([]);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch crime and criminal data from the backend
    const fetchOverviewData = async () => {
      try {
        const crimeResponse = await axios.get('http://localhost:8080/api/crimes/all'); // Change to your actual endpoint
        const criminalResponse = await axios.get('http://localhost:8080/api/criminals/all'); // Change to your actual endpoint

        const crimeData = crimeResponse.data; // Assuming this is an array of crimes
        const criminalData = criminalResponse.data; // Assuming this is an array of criminals

        setCrimes(crimeData); // Set the crimes in the state
        setTotalCrimes(crimeData.length);
        setTotalCriminals(criminalData.length);

        const solved = crimeData.filter(crime => crime.status === 'solved').length;
        const unsolved = crimeData.length - solved;

        const currentMonth = new Date().getMonth();
        const monthlyCount = crimeData.filter(crime => new Date(crime.date).getMonth() === currentMonth).length;

        setSolvedCrimes(solved);
        setUnsolvedCrimes(unsolved);
        setMonthlyCrimes(monthlyCount);
      } catch (error) {
        setError('Error fetching overview data');
        console.error('There was an error fetching overview data!', error);
      }
    };

    fetchOverviewData();
  }, []); // Empty dependency array to run once on mount

  // Function to mark a crime as solved
  const markAsSolved = async (crimeId) => {
    try {
      await axios.patch(`http://localhost:8080/api/crimes/${crimeId}`, { status: 'solved' }); // Change to your actual endpoint
      // Update the local state after marking it as solved
      const updatedCrimes = crimes.map(crime => 
        crime.id === crimeId ? { ...crime, status: 'solved' } : crime
      );
      setCrimes(updatedCrimes);

      // Recalculate the stats
      setTotalCrimes(updatedCrimes.length);
      const solvedCount = updatedCrimes.filter(crime => crime.status === 'solved').length;
      const unsolvedCount = updatedCrimes.length - solvedCount;
      setSolvedCrimes(solvedCount);
      setUnsolvedCrimes(unsolvedCount);
    } catch (error) {
      setError('Error updating crime status');
      console.error('There was an error updating the crime status!', error);
    }
  };

  return (
    <div className="overview-container">
      <h2>Overview</h2>
      {error && <p className="error">{error}</p>} {/* Display error if exists */}
      <div className="stats">
        <div className="stat-item" onClick={() => navigate('/viewcriminals')}>
          <h3>Total Criminals</h3>
          <p>{totalCriminals}</p>
        </div>
        <div className="stat-item" onClick={() => navigate('/viewcrimes')}>
          <h3>Total Crimes</h3>
          <p>{totalCrimes}</p>
        </div>
        <div className="stat-item">
          <h3>Solved Crimes</h3>
          <p>{solvedCrimes}</p>
        </div>
        <div className="stat-item">
          <h3>Unsolved Crimes</h3>
          <p>{unsolvedCrimes}</p>
        </div>
        <div className="stat-item">
          <h3>Crimes This Month</h3>
          <p>{monthlyCrimes}</p>
        </div>
      </div>

      <h3>Unsolved Crimes</h3>
      <ul>
        {crimes.filter(crime => crime.status === 'unsolved').map(crime => (
          <li key={crime.id}>
            {crime.description} 
            <button onClick={() => markAsSolved(crime.id)}>Mark as Solved</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Overview;
