import React, { useState } from 'react';
import axios from 'axios';
import DumbBookForm from './DumbBookForm';

export default function AddBook() {

    const initialState = { title: "", author: "", genre: "" };
    const [formState, setFormState] = useState(initialState);

    const formStateHandler = (e) => {
        setFormState((prevState) => ({
            ...prevState, 
            [e.target.name]: e.target.value
        }));
        console.log(formState.genre)
    }

    // Post request has withCredentials as a separate parameter
  const submitFormHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(process.env.REACT_APP_ADD_URI, formState, { withCredentials: true });

      if (response.status === 201) {
          console.log(response.data)
      }
    } catch (error) {
      console.error(error);
    }
  };

    return (
        <div>
            <DumbBookForm formState={formState} formStateHandler={formStateHandler} submitFormHandler={submitFormHandler} />
        </div>
    );
};
