import React, { useState } from 'react';
import axios from 'axios';
import { handleAxiosError } from '../utils/handleAxiosError';
import { navigateWithTimeout } from '../utils/navigateWithTimeout';
import { useNavigate } from 'react-router-dom';
import { DarkLink } from './smallReusables/EasyLink';
import Message from './smallReusables/Message';
import ContentWrapper from './smallReusables/ContentWrapper';
import Button from './smallReusables/Button';
import MiniButton from './smallReusables/MiniButton';
import Input from "./smallReusables/Input";
import DropDownMenu from "./smallReusables/DropDownMenu";
import { genreArray } from "../utils/optionArrays";
import { TitleText, BodyText } from "./smallReusables/TextComponents";
import bookPlaceholder from '.././assets/book.webp';
import IconContainer from './smallReusables/IconContainer';
import useGenericKeyDown from '../utils/useGenericKeyDown';
import { FaRegStar, FaStar } from "react-icons/fa";
import Textarea from './smallReusables/Textarea';
import FormButton from './smallReusables/FormButton';
import { IoIosSearch } from "react-icons/io";

export default function AddBook() {

    const initialState = { title: "", author: "", genre: "", coverUrl: "", stars: "", notes: "", series: "" };
    const [formState, setFormState] = useState(initialState);
    const [bookCovers, setBookCovers] = useState([]);
    const [currentBookCover, setCurrentBookCover] = useState(0);
    const [message, setMessage] = useState();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const formStateHandler = (e) => {
        setFormState((prevState) => ({
            ...prevState, 
            [e.target.name]: e.target.value
        }));
    }

  const validateForm = () => {
    const newErrors = {};
    if (!formState.title) newErrors.title = 'Title is required';
    if (!formState.author) newErrors.author = 'Author is required';
    if (!formState.genre) newErrors.genre = 'Genre is required';
    console.log(newErrors)
    return newErrors;
  };

  const closeMessage = () => {
    setMessage("");
  }

    // Post request has withCredentials as a separate parameter
  const submitFormHandler = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setMessage("Some required fields are missing")
    } else {
      setErrors({});
      setMessage("");
      try {
        const response = await axios.post(process.env.REACT_APP_ADD_URI, formState, { withCredentials: true });

        if (response.status === 201) {
            setMessage(response.data.message);
            navigateWithTimeout(navigate, `/details/${response.data.bookId}`);
        }
      } catch (error) {
        setMessage(handleAxiosError(error));
      }
    }
  };

  const searchCover = async (e) => {
    if(formState.title.length === 0 || formState.author.length === 0) {
      setMessage("Fill in a title and an author to search covers");
      return;
    }
    
    const url = `https://openlibrary.org/search.json?title=${formState.title}&author=${formState.author}`;
    const response = await axios.get(url);

    if (response.status === 200) {
      const bookUrls = response.data.docs
      .filter(book => book.hasOwnProperty('cover_i') && book.cover_i !== null)
      .map(book => {
        return book.cover_i;
      });

      if(bookUrls.length === 0) {
        setMessage("No covers found for that book. A placeholder will be used instead.");
        setFormState((prevState) => ({
          ...prevState,
          coverUrl: "",
        }));
      } else {
        setBookCovers(bookUrls);
        setFormState((prevState) => ({
            ...prevState, 
            coverUrl: response.data.docs[0].cover_i,
        }));
      }
    }
  }

  const toggleCover = (e) => {
    // Sets the current book cover index for browsing results
    const newCoverIndex = parseInt(e.target.value, 10);
    if(newCoverIndex < 0 || newCoverIndex > (bookCovers.length - 1) ) {
      return;
    }
    setCurrentBookCover(newCoverIndex);

    // Saves the current cover to the form data
    setFormState((prevState) => ({
      ...prevState,
      coverUrl: bookCovers[newCoverIndex],
    }))
  }

  // Accessibility
  // (selectedItem) => { ... } is a callback function which is excuted by pressing enter
  const handleKeyDown = useGenericKeyDown((selectedItem) => {
    const index = parseInt(selectedItem.getAttribute('value'), 10); 
    const simulatedEvent = {
      target: {name: "stars", value: index + 1,}
    };
    formStateHandler(simulatedEvent);
  }, { next: 'ArrowRight', prev: 'ArrowLeft' });

    return (
      <ContentWrapper>
        {message && <Message message={message} onClose={closeMessage} />}

        <form className="flex flex-col justify-start shadow-md border-t-4 border-teal-800 items-start gap-5 bg-white rounded-lg w-full p-10 my-10 h-2/3 w-full">

          <TitleText>What did you read?</TitleText>
      
          <Input name="title" placeholder="Title" stateValue={formState.title} func={formStateHandler} alert={errors.title} />

          <Input name="author" placeholder="Author" stateValue={formState.author} func={formStateHandler} alert={errors.author} />

          <FormButton name="cover" type="button" func={searchCover}><IconContainer><IoIosSearch /> Click to search covers</IconContainer></FormButton>

          {formState.coverUrl && 
            <div className="flex flex-col justify-center items-center">
              <img src={`https://covers.openlibrary.org/b/id/${formState.coverUrl}-L.jpg`} alt="Book cover" className="w-48 m-5 rounded-lg" />
              <div className="flex flex-row justify-center gap-4">
                <MiniButton type="button" name="Previous" func={toggleCover} optionalValue={currentBookCover - 1} optionalDisabledCondition={currentBookCover === 0}>Prev</MiniButton>
                <MiniButton type="button" name="Next" func={toggleCover} optionalValue={currentBookCover + 1} optionalDisabledCondition={currentBookCover === (bookCovers.length - 1)}>Next</MiniButton>
              </div>
            </div>
          }
          
          <Input name="series" placeholder="Series" func={formStateHandler} />

          <div className="w-full">
            <label className="text-sm font-bold text-teal-700 font-roboto p-1" for="stars">RATING</label>
            <IconContainer>
                {[...Array(5)].map((_, index) => {
                    const simulatedEvent = {
                      target: {name: "stars", value: index + 1,}
                    };
                    return <span 
                      data-testid={`star-test-${index}`}
                      key={index} 
                      value={index}
                      tabIndex="0" 
                      className="selectable-item text-teal-800 mb-2" 
                      onKeyDown={handleKeyDown}
                      role="button"
                      aria-label={`Rate ${index} star${index > 1 ? 's' : ''}`}
                      onClick={() => formStateHandler(simulatedEvent)}>
                        {index < formState.stars ? <FaStar size="28px" /> : <FaRegStar size="28px" />}
                    </span>
                })}
            </IconContainer>
          </div>

          <Textarea name="notes" placeholder="Notes or review" func={formStateHandler}></Textarea>

          <DropDownMenu name="genre" arr={genreArray} func={formStateHandler} selectedVal={formState.genre} alert={errors.genre} />

          <Button type="submit" name="Submit"  func={submitFormHandler} />

        </form>

        <div className="text-start">
          <DarkLink to="/">Return</DarkLink>
        </div>
      </ContentWrapper>
    );
};
