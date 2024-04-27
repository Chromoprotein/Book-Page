import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from "react-cookie";
import Button from './smallReusables/Button';
import Input from './smallReusables/Input';
import { handleAxiosError } from '../utils/handleAxiosError';
import { navigateWithTimeout } from '../utils/navigateWithTimeout';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [setCookie] = useCookies(['jwt']);
  const [message, setMessage] = useState();
  const navigate = useNavigate();

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
      const response = await axios.post(process.env.REACT_APP_REGISTER_URI, formData, { withCredentials: true });
      console.log(response.data);
      if (response.status === 201) {
          const token = response.data.jwt;
          setCookie('jwt', token, { path: '/', secure: true, httpOnly: true }); // Set the JWT token as a cookie
            setMessage(response.data.message)
            navigateWithTimeout(navigate);
      }
    } catch (error) {
      setMessage(handleAxiosError(error));
    }
  };

  const formIsFilled = Object.keys(formData).every(key => {  
      const value = formData[key];
      return value !== null && value !== undefined && value !== '';
  });

  // The form will grow so that is why it's not combined with the login form
  return (
    <form onSubmit={handleSubmit}>
      <Input name="username" stateValue={formData.username} func={handleChange} />
      <Input name="password" stateValue={formData.password} func={handleChange} />
      <Button type="submit" name="Register" optionalDisabledCondition={formIsFilled ? false : true} func={handleSubmit}/>
      {message}
    </form>
  );
};