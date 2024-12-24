import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/index.css';
import App from './pages/App';
import reportWebVitals from './tests/reportWebVitals';
import LoginForm from './pages/LoginForm';
import Contact from './pages/Contact';
import PrivateRoute from './routes/PrivateRoute';
// import AdminPanel from './pages/AdminPanel';

const Root = () => {
  // Assume this value changes based on the user's progression through the flow
  const [isAuthorized, setIsAuthorized] = useState(false);

  const handleAuthorize = () => {
    setIsAuthorized(true);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App onAuthorize={handleAuthorize} />} />
        {/* <Route path="/Admin" element={<AdminPanel />} /> */}
        {/* Private routes */}
        <Route element={<PrivateRoute isAuthorized={isAuthorized} />}>
          <Route path="/Loginform" element={<LoginForm />} />
          <Route path="/Contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//     <Routes>
//       <Route path='/' element={<App/>}/>
//       <Route path='/Loginform' element={<LoginForm/>}/>
//       <Route path='/Contact' element={<Contact/>}/>
//     </Routes>
//     </BrowserRouter>
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
