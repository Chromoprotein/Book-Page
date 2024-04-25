import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Input from './smallReusables/Input';
import Button from './smallReusables/Button';

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post(
            process.env.REACT_APP_LOGIN_URI,
            formData,
            { withCredentials: true }
          );
          if (response.status === 201) {
              console.log("user logged in")
          }
      } catch (error) {
          console.error(error);
      }
  };

  return (
    <form>
      <Input name="username" stateValue={formData.username} func={handleChange} />

      <Input name="password" stateValue={formData.password} func={handleChange} />

      <Button type="submit" name="Log in" func={handleSubmit}/>

    </form>
  );
};