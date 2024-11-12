import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import '../src/AdminPanel.css'

const Admin = () => {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from('users')
          .select(`
            userId,
            email,
            companyname,
            mobile,
            location,
            areas ( totalArea ) 
          `); // Fetching all users' data along with areas and quantity
          console.log(data);
        if (error) throw error;

        setUsersData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="admin-container">
      <h2>All Users Details</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Email</th>
            <th>Company Name</th>
            <th>Mobile</th>
            <th>Location</th>
            <th>Total Area</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {usersData.map((user) => (
            <tr key={user.userId}>
              <td>{user.userId}</td>
              <td>{user.email}</td>
              <td>{user.companyname}</td>
              <td>{user.mobile}</td>
              <td>{user.location}</td>
              <td>{user.areas && user.areas.length > 0 ? user.areas[0].totalArea : 'N/A'}</td>
              <td>
                    <button>Go To Layout</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
