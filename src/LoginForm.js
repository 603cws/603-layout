import React, { useState, useEffect, useMemo } from 'react';
import './LoginForm.css';
import { supabase } from './supabaseClient'; // Import Supabase client
import checkIfEmailExists from './CheckIfEmailExists';
import { useNavigate, useLocation } from 'react-router-dom';
import countryList from 'react-select-country-list';
import Select from 'react-select';

const countryCodes = [
  { code: '+91', country: 'India' },
  { code: '+1', country: 'USA' },
  { code: '+44', country: 'UK' },
  { code: '+61', country: 'Australia' },
  { code: '+81', country: 'Japan' },
  // Add more as needed
];

const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(false);

  const location = useLocation();
  const areas = location.state?.areas;
  const areaValues = location.state?.areaValues;
  const totalArea = location.state?.totalArea;
  const isOtherSelected = location.state?.isOtherSelected;

  console.log('Inside LoginForm');
  console.log(areas);
  console.log(areaValues);
  console.log(totalArea);
  console.log(isOtherSelected);

  const [formData, setFormData] = useState({
    email: '',
    companyName: '',
    mobile: '',
    location: '',
    // password: '',
    // confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [debouncedEmail, setDebouncedEmail] = useState(formData.email);
  const [debouncedMobile, setDebouncedMobile] = useState(formData.mobile); // Debounced mobile number
  // const [selectedCountryCode, setSelectedCountryCode] = useState('+91'); // Default to India code
  const [value, setValue] = useState('');
  const options = useMemo(() => countryList().getData(), []);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const mobileRegex = /^(?!([0-9])\1{9})\d{10}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Only clear the error for the specific field if it hasn't been set already by the debounce effect
    if (name !== 'email' || !errors.email) {
      setErrors({ ...errors, [name]: '' });
    }

    if (name === 'email') {
      setDebouncedEmail(value); // Update debounced value for email

      // Perform live validation for email format
      if (value && !emailRegex.test(value)) {
        showErrorWithTimeout('email', 'Invalid email format. Please enter a valid email.');
      }
    }

    if (name === 'mobile') {
      setDebouncedMobile(value); // Set debounced mobile value
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Debounce effect to check email in DB after user stops typing
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (debouncedEmail) {
        const emailExists = await checkIfEmailExists(debouncedEmail);
        if (emailExists) {
          // Only set the "Email already registered" error if it isn't already set
          if (!errors.email) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              email: 'Email is already registered.',
            }));
          }
        } else {
          // Clear the email error if it is not registered
          if (errors.email) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              email: '',
            }));
          }
        }
      }
    }, 500); // Delay of 500ms for debounce

    return () => clearTimeout(timeoutId); // Cleanup on unmount or when debouncedEmail changes
  }, [debouncedEmail, errors.email]); // Depend on both debouncedEmail and errors.email


  // Debounce effect to validate mobile after user stops typing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (debouncedMobile && !mobileRegex.test(debouncedMobile)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          mobile: 'Invalid mobile number. Must be 10 unique digits.',
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          mobile: '',
        }));
      }
    }, 500); // Delay of 500ms

    return () => clearTimeout(timeoutId); // Clear timeout on cleanup
  }, [debouncedMobile]);

  const handleCountryCodeChange = (value) => {
    // setSelectedCountryCode(e.target.value);
    setValue(value);
    console.log('Country code');
    console.log(value);
  };

  // const toggleForm = () => {
  //   setIsLogin(!isLogin);
  //   setFormData({
  //     email: '',
  //     companyName: '',
  //     mobile: '',
  //     location: '',
  //     password: '',
  //     confirmPassword: '',
  //   });
  //   setErrors({});
  // };

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

  const navigate = useNavigate();

  const handleRegister = async () => {
    const { email, companyName, mobile, location, /*password*/ } = formData;

    try {
      // Step 1: Insert data into 'users' table and retrieve the user ID
      const { data: userData, error: userInsertError } = await supabase
        .from('users')
        .insert([{
          email,
          companyname: companyName,
          mobile,
          location,
          // password,
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
          breakoutroom: areaValues.breakoutRoom,
          executivewashroom: areaValues.executiveWashroom,
          videorecordingroom: areaValues.videoRecordingRoom,
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
          breakoutroom: areas.breakoutRoom,
          executivewashroom: areas.executiveWashroom,
          videorecordingroom: areas.videoRecordingRoom,
          other: isOtherSelected ? areaValues.other : 0,
        }]);

      if (quantityInsertError) {
        console.error("Error inserting data into quantity:", quantityInsertError.message);
        return;
      }

      console.log("User, areas, and quantity data inserted successfully!");

      navigate('/Contact', { replace: true });

    } catch (error) {
      console.error("Unexpected error during registration:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // if (!isLogin) {
    //   if (!passwordRegex.test(formData.password)) {
    //     showErrorWithTimeout(
    //       'password',
    //       'Password must be at least 8 characters, contain one uppercase, one lowercase, one number, and one symbol.'
    //     );
    //     return;
    //   }
    //   if (formData.password !== formData.confirmPassword) {
    //     showErrorWithTimeout('confirmPassword', 'Passwords do not match.');
    //     return;
    //   }
      handleRegister(); // Call register function on successful validation
    // }
  };

  return (
    <div className="login-form-container">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>Email Id <span className="form-error-message">{errors.email}</span></label>
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
            <label>Company Name <span className="form-error-message">{errors.companyName}</span></label>
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
            <label>Mobile Number <span className="form-error-message">{errors.mobile}</span></label>
            <div className="mobile-input-wrapper">
              <Select
                className="country-code-dropdown"
                options={options}
                value={value}
                onChange={handleCountryCodeChange}
              />
              {/* {countryCodes.map(({ code, country }) => (
                  <option key={code} value={code}>
                    {country} ({code})
                  </option>
                ))} */}
              {/* </select> */}
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
                placeholder="Enter Mobile No" //Number
                maxLength="10"
                inputMode="numeric"
                pattern="\d{10}"
              />
            </div>
          </div>
        )}
        {!isLogin && (
          <div className="form-group">
            <label>Location <span className="form-error-message">{errors.location}</span></label>
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
        {/* <div className="form-group">
          <label>Password <span className="form-error-message">{errors.password}</span></label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter Password"
          />
        </div>
        {!isLogin && (
          <div className="form-group">
            <label>Confirm Password <span className="form-error-message">{errors.confirmPassword}</span></label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Re-enter Password"
            />
          </div>
        )} */}
        <button type="submit" className="submit-button">
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>
      {/* <p onClick={toggleForm} className="toggle-link">
        {isLogin ? "Don't have an account? Register here" : 'Already have an account? Login'}
      </p> */}
    </div>
  );
};

export default LoginForm;
