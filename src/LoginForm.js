import React, { useState } from 'react';
import './LoginForm.css';
import { supabase } from './supabaseClient'; // Import Supabase client

const LoginForm = ({ areas, areaValues, totalArea, setShowModal, setFinalData, isOtherSelected }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    companyName: '',
    mobile: '',
    location: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({ ...errors, [name]: '' });
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      companyName: '',
      mobile: '',
      location: '',
      password: '',
      confirmPassword: '',
    });
    setErrors({});
  };

  const showErrorWithTimeout = (field, message) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: message,
    }));
    setTimeout(() => {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: '',
      }));
    }, 3000);
  };

  const handleRegister = async () => {
    const { email, companyName, mobile, location, password } = formData;

    try {
      // Step 1: Insert data into 'users' table and retrieve the user ID
      const { data: userData, error: userInsertError } = await supabase
        .from('users')
        .insert([{
          email,
          companyname: companyName,
          mobile,
          location,
          password,
        }])
        .select();

      if (userInsertError || !userData.length) {
        console.error("Error inserting new user:", userInsertError?.message);
        return;
      }

      const userId = userData[0]['userId']; // Retrieve the generated userId

      // Step 2: Insert data into 'areas' table with the retrieved user ID
      const { error: areasInsertError } = await supabase
        .from('areas')
        .insert([{
          "userId": userId,
          linear: areaValues.linear,
          ltype: areaValues.lType,
          md: areaValues.md,
          manager: areaValues.manager,
          small: areaValues.small,
          ups: areaValues.ups,
          bms: areaValues.bms,
          server: areaValues.server,
          reception: areaValues.reception,
          lounge: areaValues.lounge,
          sales: areaValues.sales,
          phonebooth: areaValues.phoneBooth,
          discussionroom: areaValues.discussionRoom,
          interviewroom: areaValues.interviewRoom,
          conferenceroom: areaValues.conferenceRoom,
          boardroom: areaValues.boardRoom,
          meetingroom: areaValues.meetingRoom,
          meetingroomlarge: areaValues.meetingRoomLarge,
          hrroom: areaValues.hrRoom,
          financeroom: areaValues.financeRoom,
          other: isOtherSelected ? areaValues.other : 0,
          totalArea,
        }]);

      if (areasInsertError) {
        console.error("Error inserting data into areas:", areasInsertError.message);
        return;
      }

      // Step 3: Insert data into 'quantity' table with the retrieved user ID
      const { error: quantityInsertError } = await supabase
        .from('quantity')
        .insert([{
          "userId": userId,
          linear: areas.linear,
          ltype: areas.lType,
          md: areas.md,
          manager: areas.manager,
          small: areas.small,
          ups: areas.ups,
          bms: areas.bms,
          server: areas.server,
          reception: areas.reception,
          lounge: areas.lounge,
          sales: areas.sales,
          phonebooth: areas.phoneBooth,
          discussionroom: areas.discussionRoom,
          interviewroom: areas.interviewRoom,
          conferenceroom: areas.conferenceRoom,
          boardroom: areas.boardRoom,
          meetingroom: areas.meetingRoom,
          meetingroomlarge: areas.meetingRoomLarge,
          hrroom: areas.hrRoom,
          financeroom: areas.financeRoom,
          other: isOtherSelected ? areaValues.other : 0,
        }]);

      if (quantityInsertError) {
        console.error("Error inserting data into quantity:", quantityInsertError.message);
        return;
      }

      console.log("User, areas, and quantity data inserted successfully!");
    } catch (error) {
      console.error("Unexpected error during registration:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!isLogin) {
      if (!passwordRegex.test(formData.password)) {
        showErrorWithTimeout(
          'password',
          'Password must be at least 8 characters, contain one uppercase, one lowercase, one number, and one symbol.'
        );
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        showErrorWithTimeout('confirmPassword', 'Passwords do not match.');
        return;
      }
      handleRegister(); // Call register function on successful validation
    }
  };

  return (
    <div className="login-form-container">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>Email Id <span className="error-message">{errors.email}</span></label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter Email Address"
          />
        </div>
        {!isLogin && (
          <div className="form-group">
            <label>Company Name <span className="error-message">{errors.companyName}</span></label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
              placeholder="Enter Company Name"
            />
          </div>
        )}
        {!isLogin && (
          <div className="form-group">
            <label>Mobile Number <span className="error-message">{errors.mobile}</span></label>
            <input
              type="number"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
              placeholder="Enter Mobile Number"
            />
          </div>
        )}
        {!isLogin && (
          <div className="form-group">
            <label>Location <span className="error-message">{errors.location}</span></label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="Enter Location"
            />
          </div>
        )}
        <div className="form-group">
          <label>Password <span className="error-message">{errors.password}</span></label>
          <input
            type="text"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter Password"
          />
        </div>
        {!isLogin && (
          <div className="form-group">
            <label>Confirm Password <span className="error-message">{errors.confirmPassword}</span></label>
            <input
              type="text"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Re-enter Password"
            />
          </div>
        )}
        <button type="submit" className="submit-button">
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>
      <p onClick={toggleForm} className="toggle-link">
        {isLogin ? "Don't have an account? Register here" : 'Already have an account? Login'}
      </p>
    </div>
  );
};

export default LoginForm;
