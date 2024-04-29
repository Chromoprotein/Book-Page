import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Input from './smallReusables/Input';
import Button from './smallReusables/Button';
import { handleAxiosError } from '../utils/handleAxiosError';
import { navigateWithTimeout } from '../utils/navigateWithTimeout';
import Message from './smallReusables/Message';

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [message, setMessage] = useState();
  const navigate = useNavigate();

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
            navigateWithTimeout(navigate);
          }
      } catch (error) {
        setMessage(handleAxiosError(error));
      }
  }

  return (
    <form>
      <Input name="username" stateValue={formData.username} func={handleChange} />

      <Input name="password" type="password" stateValue={formData.password} func={handleChange} />

      <Button type="submit" name="Log in" func={handleSubmit}/>
      
      {message && <Message message={message} />}

    </form>
  );
};