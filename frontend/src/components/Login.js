import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Input from './smallReusables/Input';
import { handleAxiosError } from '../utils/handleAxiosError';
import { navigateWithTimeout } from '../utils/navigateWithTimeout';
import FormWrapper from './smallReusables/FormWrapper';
import { useAuth } from '../utils/authContext';
import ContentWrapper from './smallReusables/ContentWrapper';
import { useNotification } from '../utils/notificationContext';

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const {setNotification} = useNotification();
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
            setNotification(response.data.message)
            setIsAuthenticated(true);
            sessionStorage.setItem('isAuthenticated', 'true');
            navigateWithTimeout(navigate);
          }
      } catch (error) {
        setNotification(handleAxiosError(error));
      }
  }

  const formIsFilled = Object.keys(formData).every(key => {  
      const value = formData[key];
      return value !== null && value !== undefined && value !== '';
  });

  return (
    <ContentWrapper>
      <FormWrapper title="Log in" formIsFilled={formIsFilled} handleSubmit={handleSubmit}>

          <Input name="username" placeholder="Username" stateValue={formData.username} func={handleChange} />

          <Input name="password" placeholder="Password" type="password" stateValue={formData.password} func={handleChange} />

      </FormWrapper>
    </ContentWrapper>
  );
};