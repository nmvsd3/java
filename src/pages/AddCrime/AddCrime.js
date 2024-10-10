import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for HTTP requests
import './AddCrime.css';

const AddCrime = () => {
  const [crimeData, setCrimeData] = useState({
    date: '',
    place: '',
    crimeType: 'Robbery', // Default value
    victims: '',
    description: '',
    suspects: '',
    status: 'not solved', // Default status
  });

  const navigate = useNavigate();

  // Handles input change in form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCrimeData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Send the crime data to the backend using axios
    axios.post('http://localhost:8080/api/crimes/add', crimeData)
      .then((response) => {
        // Alert user that the crime was added successfully
        alert('Crime added successfully!');
        // Redirect to the View Crimes page
        navigate('/ViewCrimes');
      })
      .catch((error) => {
        console.error('There was an error adding the crime!', error);
        alert('Failed to add crime. Please try again.');
      });
  };

  return (
    <div className="add-crime-container">
      <h2>Add Crime</h2>
      <form onSubmit={handleSubmit} className="crime-form">
        {/* Date of Crime */}
        <div className="form-group">
          <label>Date of Crime:</label>
          <input
            type="date"
            name="date"
            value={crimeData.date}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Place of Crime */}
        <div className="form-group">
          <label>Place of Crime:</label>
          <input
            type="text"
            name="place"
            value={crimeData.place}
            onChange={handleInputChange}
            placeholder="Enter place of crime"
            required
          />
        </div>

        {/* Type of Crime */}
        <div className="form-group">
          <label>Type of Crime:</label>
          <select
            name="crimeType"
            value={crimeData.crimeType}
            onChange={handleInputChange}
            required
          >
            <option value="Robbery">Robbery</option>
            <option value="Theft">Theft</option>
            <option value="Homicide">Homicide</option>
            <option value="Assault">Assault</option>
            <option value="Arson">Arson</option>
          </select>
        </div>

        {/* Victims */}
        <div className="form-group">
          <label>Victims:</label>
          <input
            type="text"
            name="victims"
            value={crimeData.victims}
            onChange={handleInputChange}
            placeholder="Enter names of victims"
            required
          />
        </div>

        {/* Detailed Description */}
        <div className="form-group">
          <label>Detailed Description:</label>
          <textarea
            name="description"
            value={crimeData.description}
            onChange={handleInputChange}
            placeholder="Describe the crime in detail"
            required
          ></textarea>
        </div>

        {/* Names of Main Suspects */}
        <div className="form-group">
          <label>Names of Main Suspects:</label>
          <input
            type="text"
            name="suspects"
            value={crimeData.suspects}
            onChange={handleInputChange}
            placeholder="Enter names of main suspects"
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-btn">Add Crime</button>
      </form>
    </div>
  );
};

export default AddCrime;
