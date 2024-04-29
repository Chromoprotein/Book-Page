import React, { useState } from 'react';
import axios from 'axios';
import DumbBookForm from './DumbBookForm';
import { handleAxiosError } from '../utils/handleAxiosError';
import { navigateWithTimeout } from '../utils/navigateWithTimeout';
import { useNavigate } from 'react-router-dom';
import EasyLink from './smallReusables/EasyLink';
import Message from './smallReusables/Message';

export default function AddBook() {

    const initialState = { title: "", author: "", genre: "" };
    const [formState, setFormState] = useState(initialState);
    const [message, setMessage] = useState();
    const navigate = useNavigate();

    const formStateHandler = (e) => {
        setFormState((prevState) => ({
            ...prevState, 
            [e.target.name]: e.target.value
        }));
    }

    // Post request has withCredentials as a separate parameter
  const submitFormHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(process.env.REACT_APP_ADD_URI, formState, { withCredentials: true });

      if (response.status === 201) {
          setMessage(response.data.message);
          navigateWithTimeout(navigate, `/getBooks/details/${response.data.bookId}`);
      }
    } catch (error) {
      setMessage(handleAxiosError(error));
    }
  };

    return (
        <div>
          {message && <Message message={message} />}
          <DumbBookForm formState={formState} formStateHandler={formStateHandler} submitFormHandler={submitFormHandler} />
          <EasyLink to="/" name="Return"/>
        </div>
    );
};
