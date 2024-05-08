import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Input from './smallReusables/Input';
import Button from './smallReusables/Button';
import { handleAxiosError } from '../utils/handleAxiosError';
import { navigateWithTimeout } from '../utils/navigateWithTimeout';
import Message from './smallReusables/Message';
import { TitleText } from './smallReusables/TextComponents';
import FormWrapper from './smallReusables/FormWrapper';
import { useAuth } from '../utils/authContext';

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [message, setMessage] = useState();
  const navigate = useNavigate();

  const { isAuthenticated, loading, setIsAuthenticated } = useAuth();

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
            setMessage(response.data.message)
            setIsAuthenticated(true);
            sessionStorage.setItem('isAuthenticated', 'true');
            navigateWithTimeout(navigate);
          }
      } catch (error) {
        setMessage(handleAxiosError(error));
      }
  }

  const formIsFilled = Object.keys(formData).every(key => {  
      const value = formData[key];
      return value !== null && value !== undefined && value !== '';
  });

  return (
    <FormWrapper title="Log in" formIsFilled={formIsFilled} handleSubmit={handleSubmit} message={message}>

        <Input name="username" placeholder="Username" stateValue={formData.username} func={handleChange} />

        <Input name="password" placeholder="Password" type="password" stateValue={formData.password} func={handleChange} />

    </FormWrapper>
  );
};