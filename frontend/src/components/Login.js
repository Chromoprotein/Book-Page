import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Input from './smallReusables/Input';
import Button from './smallReusables/Button';
import { handleAxiosError } from '../utils/handleAxiosError';
import { navigateWithTimeout } from '../utils/navigateWithTimeout';
import Message from './smallReusables/Message';
import { TitleText } from './smallReusables/TextComponents';

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
    <div className="min-h-screen">
      <form className="w-1/2 shadow-md rounded-lg p-10 mx-auto flex flex-col justify-center gap-6 mt-5 border-t-4 border-teal-800">
        <TitleText>Log in</TitleText>

        <Input name="username" placeholder="Username" stateValue={formData.username} func={handleChange} />

        <Input name="password" placeholder="Password" type="password" stateValue={formData.password} func={handleChange} />

        <Button type="submit" name="Log in" func={handleSubmit}/>
        
        {message && <Message message={message} />}

      </form>
    </div>
  );
};