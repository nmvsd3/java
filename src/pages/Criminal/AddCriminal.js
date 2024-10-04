import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddCriminal.css';

const AddCriminal = () => {
  const [criminalData, setCriminalData] = useState({
    name: '',
    age: '',
    gender: '',
    address: '',
    identifyingMark: '',
    crimeArea: '',
    attachedCrime: '',
    photo: null, // State for the photo
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCriminalData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setCriminalData((prevState) => ({
      ...prevState,
      photo: e.target.files[0], // Update photo state
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in criminalData) {
      formData.append(key, criminalData[key]);
    }

    try {
      const response = await axios.post('http://localhost:8080/api/criminals/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        alert('Criminal added successfully!');
        navigate('/ViewCriminals');
      }
    } catch (error) {
      console.error('Error adding criminal:', error);
      alert('Failed to add criminal. Please try again.');
    }
  };

  return (
    <div className="add-criminal-container">
      <h2>Add Criminal</h2>
      <form onSubmit={handleSubmit} className="criminal-form">
        <div className="form-group">
          <label>Name of the Criminal:</label>
          <input
            type="text"
            name="name"
            value={criminalData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={criminalData.age}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Gender:</label>
          <select
            name="gender"
            value={criminalData.gender}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={criminalData.address}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Identifying Mark:</label>
          <input
            type="text"
            name="identifyingMark"
            value={criminalData.identifyingMark}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Area of Crime:</label>
          <input
            type="text"
            name="crimeArea"
            value={criminalData.crimeArea}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Attached to which Crime:</label>
          <input
            type="text"
            name="attachedCrime"
            value={criminalData.attachedCrime}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Upload Photo:</label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn">Add Criminal</button>
      </form>
    </div>
  );
};

export default AddCriminal;
