import React, { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { supabase } from '../services/supabaseClient';
import '../styles/styles.css';
import Modal from '../components/Modal';
import Card from '../components/Card';
import './LoginForm'
import { useNavigate } from 'react-router-dom';

const AreaInput = ({ totalArea, setTotalArea, areaValues, builtArea, availableArea, resetAll, areas, showModal,
  setShowModal, setErrorMessage, isOtherSelected, onAuthorize, MIN_AREA, MAX_AREA, comeBack }) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    if (e.target.value.length <= 5) {
      setInputValue(e.target.value);
      setError(false); // Reset error state on input change
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'e' || e.key === 'E' || e.key === '+' || e.key === '-' || e.key === '.') {
      e.preventDefault(); // Prevent the default behavior
    }
  };

  const handleSubmit = () => {
    const area = parseInt(inputValue, 10);
    if (!isNaN(area)) {
      if (area >= MIN_AREA && area <= MAX_AREA) {
        setTotalArea(area);
        setError(false);
      } else if (area === 0 || area === undefined) {
        setError(false);
        resetAll();
      }
      else {
        setError(true); // Set error state if area is out of range
        resetAll();
      }
    } else {
      setError(true); // Set error state if input is invalid
    }
  };

  const handleReset = () => {
    setInputValue('');
    setError(false);
    resetAll(); // Call the resetAll function passed from the parent component
  };

  const handleGenerateBOQ = async () => {
    if (!totalArea) {
      console.error("Please enter the total area before generating BOQ.");
      setErrorMessage("Please enter the total area before generating BOQ.")
      setShowModal(true);
      return; // Stop execution if total area is not entered
    }

    // setFinalData(areas, areaValues, totalArea); // Store the data in finalData

    try {
      // Step 1: Insert into 'quantity' and retrieve the generated 'id'
      const { data: quantityData, error: quantityError } = await supabase
        .from('quantity')
        .insert([{
          linear: areas.linear,
          lType: areas.lType,
          md: areas.md,
          manager: areas.manager,
          small: areas.small,
          ups: areas.ups,
          bms: areas.bms,
          server: areas.server,
          reception: areas.reception,
          lounge: areas.lounge,
          sales: areas.sales,
          phoneBooth: areas.phoneBooth,
          discussionRoom: areas.discussionRoom,
          interviewRoom: areas.interviewRoom,
          conferenceRoom: areas.conferenceRoom,
          boardRoom: areas.boardRoom,
          meetingRoom: areas.meetingRoom,
          meetingRoomLarge: areas.meetingRoomLarge,
          hrRoom: areas.hrRoom,
          financeRoom: areas.financeRoom,
          other: isOtherSelected ? areaValues.other : 0
        }])
        .select('id'); // Retrieve the ID generated for quantityData

      if (quantityError) {
        console.error('Error inserting data into quantity:', quantityError.message);
        return;
      }
      console.log('Data inserted into quantity successfully:', quantityData);

      // Capture the ID from the quantity insert to use in areas
      const sharedId = quantityData[0]?.id;

      if (!sharedId) {
        console.error('Shared ID not retrieved. Insert into quantity may have failed.');
        return;
      }

      // Step 2: Insert into 'areas' using the same shared ID
      const { data: areasData, error: areasError } = await supabase
        .from('areas')
        .insert([{
          id: sharedId, // Use the shared ID from quantity as the ID in areas
          quantity_id: sharedId, // Optionally set quantity_id if used as a foreign key
          linear: areaValues.linear,
          lType: areaValues.lType,
          md: areaValues.md,
          manager: areaValues.manager,
          small: areaValues.small,
          ups: areaValues.ups,
          bms: areaValues.bms,
          server: areaValues.server,
          reception: areaValues.reception,
          lounge: areaValues.lounge,
          sales: areaValues.sales,
          phoneBooth: areaValues.phoneBooth,
          discussionRoom: areaValues.discussionRoom,
          interviewRoom: areaValues.interviewRoom,
          conferenceRoom: areaValues.conferenceRoom,
          boardRoom: areaValues.boardRoom,
          meetingRoom: areaValues.meetingRoom,
          meetingRoomLarge: areaValues.meetingRoomLarge,
          hrRoom: areaValues.hrRoom,
          financeRoom: areaValues.financeRoom,
          other: areas.other,
          totalArea: totalArea,
        }]);

      if (areasError) {
        console.error('Error inserting data into areas:', areasError.message);
        return;
      }
      console.log('Data inserted into areas successfully:', areasData);
    } catch (error) {
      console.error('Error saving data:', error);
    }

    window.location.href = 'https://lucky-kataifi-065416.netlify.app/';
  };

  const handleLogin = () => {
    if (!totalArea) {
      console.error("Please enter the total area before generating BOQ.");
      setErrorMessage("Please enter the total area before generating BOQ.");
      setShowModal(true);
      return; // Stop execution if total area is not entered
    }
    // setShowLoginForm(true);
    onAuthorize(); // Set user as authorized
    navigate('/Loginform', {
      state: { areas: areas, areaValues: areaValues, totalArea: totalArea, isOtherSelected: isOtherSelected }
    });
  }

  return (
    <div className="area-input">
      <div className="input-container">
        <FontAwesomeIcon
          icon={faCalculator}
          className="calculator-icon"
          title="Calculator"
          beatFade
          style={{ color: "#FFD43B" }}
        />
        <div className='input-wrapper'>
          <input
            type="number"
            value={comeBack ? totalArea : inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onKeyUp={handleSubmit}
            placeholder="Enter total area (sq ft)"
            title="Set the area value here"
            className={`set-area-input ${error ? 'error' : ''}`}
            aria-label="Total Area Input"
            data-tip="Enter the total area in square feet" />

          <FontAwesomeIcon
            icon={faXmark}
            className='reset-cross'
            onClick={handleReset}
            title="Click to reset the area input"
            aria-label="Reset Area Button"
            data-tip="Click to reset the area input" />
        </div>
        {error && (
          <div className="error-message" aria-live="polite">
            <span className="warning-icon">⚠️</span>
            Invalid area value. Must be between {MIN_AREA} and {MAX_AREA} square feet.
          </div>
        )}
      </div>

      <button className="generate-boq-button" onClick={() => handleLogin()}>
        Generate BOQ
        <svg className="star-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path className="fil0" d="M12 0l3.09 6.26L22 7.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 12.14 2 7.27l6.91-1.01L12 0z" />
        </svg>
        <svg className="star-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path className="fil0" d="M12 0l3.09 6.26L22 7.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 12.14 2 7.27l6.91-1.01L12 0z" />
        </svg>
        <svg className="star-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path className="fil0" d="M12 0l3.09 6.26L22 7.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 12.14 2 7.27l6.91-1.01L12 0z" />
        </svg>
        <svg className="star-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path className="fil0" d="M12 0l3.09 6.26L22 7.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 12.14 2 7.27l6.91-1.01L12 0z" />
        </svg>
        <svg className="star-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path className="fil0" d="M12 0l3.09 6.26L22 7.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 12.14 2 7.27l6.91-1.01L12 0z" />
        </svg>
        <svg className="star-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path className="fil0" d="M12 0l3.09 6.26L22 7.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 12.14 2 7.27l6.91-1.01L12 0z" />
        </svg>
      </button>
      <div className="flexbox-container">
        <div className="flexbox-item available">
          Available Space: {availableArea} sq ft
        </div>
        <div className="flexbox-item built">
          Built Space: {builtArea} sq ft
        </div>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <Card /> {/* Ensure this Card component is displayed properly */}
      </Modal>
      <Tooltip />
    </div>
  );
};

export default AreaInput;