import React, { useState } from 'react';
import axios from 'axios';
import DumbBookForm from './DumbBookForm';
import { handleAxiosError } from '../utils/handleAxiosError';
import { navigateWithTimeout } from '../utils/navigateWithTimeout';
import { useNavigate } from 'react-router-dom';
import { DarkLink } from './smallReusables/EasyLink';
import Message from './smallReusables/Message';
import ContentWrapper from './smallReusables/ContentWrapper';
import Button from './smallReusables/Button';

export default function AddBook() {

    const initialState = { title: "", author: "", genre: "", coverUrl: "" };
    const [formState, setFormState] = useState(initialState);
    const [bookCovers, setBookCovers] = useState([]);
    const [currentBookCover, setCurrentBookCover] = useState(0);
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
          navigateWithTimeout(navigate, `/details/${response.data.bookId}`);
      }
    } catch (error) {
      setMessage(handleAxiosError(error));
    }
  };

  const searchCover = async (e) => {
    const url = `https://openlibrary.org/search.json?title=${formState.title}&author=${formState.author}`;
    const response = await axios.get(url);

    if (response.status === 200) {
      const bookUrls = response.data.docs
      .filter(book => book.hasOwnProperty('cover_i') && book.cover_i !== null)
      .map(book => {
        return `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
      });

      setBookCovers(bookUrls);

      setFormState((prevState) => ({
          ...prevState, 
          coverUrl: `https://covers.openlibrary.org/b/id/${response.data.docs[0].cover_i}-L.jpg`,
      }));
    }
  }

  const toggleCover = (e) => {
    // Sets the current book cover index for browsing results
    const newCoverIndex = parseInt(e.target.value, 10);
    setCurrentBookCover(newCoverIndex);
    console.log("the target value is " + e.target.value)

    // Saves the current cover to the form data
    setFormState((prevState) => ({
      ...prevState,
      coverUrl: bookCovers[newCoverIndex],
    }))
  }

  console.log(currentBookCover)
    return (
        <ContentWrapper>
          {message && <Message message={message} />}

          <Button type="button" func={searchCover}>Search covers</Button>

          <img src={formState.coverUrl} alt="Book cover" className="w-96" />

          <Button type="button" name="Previous" func={toggleCover} optionalValue={currentBookCover - 1}>Previous result</Button>
          <Button type="button" name="Next" func={toggleCover} optionalValue={currentBookCover + 1}>Next result</Button>

          <DumbBookForm formState={formState} formStateHandler={formStateHandler} submitFormHandler={submitFormHandler} title="What did you read?" />

          <div className="text-center">
            <DarkLink to="/">Return</DarkLink>
          </div>
        </ContentWrapper>
    );
};
