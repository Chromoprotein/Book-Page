import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Users() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getUsers() {
      try {
        const res = await axios.get(process.env.REACT_APP_USERS_URI, { withCredentials: true });
        setUsers(res.data.user);
        console.log(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getUsers();
  }, [])

  return (
    <ul>
        {users.map((user, index) => {
           return (
            <div key={index}>
                <li>Name: {user.username}</li>
                <li>Role: {user.role}</li>
            </div>
           ) 
        })}
    </ul>
  );
};
