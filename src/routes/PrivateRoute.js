// import React from 'react';
// import { Route, Redirect } from 'react-router-dom';

// // PrivateRoute to check the flow
// const PrivateRoute = ({ component: Component, ...rest }) => {
//   const flowState = sessionStorage.getItem('flowState');

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         // Check if flowState exists and is valid for the user to access the route
//         flowState === 'REGISTER' || flowState === 'CONTACT' ? (
//           <Component {...props} />
//         ) : (
//           <Redirect to="/" /> // Redirect to layout if flow is invalid
//         )
//       }
//     />
//   );
// };

// export default PrivateRoute;


import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ isAuthorized }) => {
  return isAuthorized ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
