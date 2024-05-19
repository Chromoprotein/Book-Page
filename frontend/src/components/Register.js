import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from "react-cookie";
import Input from './smallReusables/Input';
import { handleAxiosError } from '../utils/handleAxiosError';
import { navigateWithTimeout } from '../utils/navigateWithTimeout';
import { useNavigate } from 'react-router-dom';
import FormWrapper from './smallReusables/FormWrapper';
import ContentWrapper from './smallReusables/ContentWrapper';
import { useNotification } from '../utils/notificationContext';

export default function Register() {
  const [cookies, setCookie, removeCookie] = useCookies(['jwt']);
  const {setNotification} = useNotification();
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
            setNotification(response.data.message)
            navigateWithTimeout(navigate);
      }
    } catch (error) {
      setNotification(handleAxiosError(error));
    }
  };

  const formIsFilled = Object.keys(formData).every(key => {  
      const value = formData[key];
      return value !== null && value !== undefined && value !== '';
  });

  return (
    <ContentWrapper>
      <FormWrapper title="Register" formIsFilled={formIsFilled} handleSubmit={handleSubmit}>
          <Input name="username" stateValue={formData.username} func={handleChange} placeholder="Username" />
          <Input name="password" stateValue={formData.password} func={handleChange} placeholder="Password" />
      </FormWrapper>
    </ContentWrapper>
  );
};