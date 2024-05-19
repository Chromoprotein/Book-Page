import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from './BookCard';
import DropDownMenu from './smallReusables/DropDownMenu';
import Input from './smallReusables/Input';
import Button from './smallReusables/Button';
import { genreArray } from '../utils/optionArrays';
import { sortArray } from '../utils/optionArrays';
import { useNavigate } from 'react-router-dom';
import { handleAxiosError } from '../utils/handleAxiosError';
import MiniButton from './smallReusables/MiniButton';
import { TitleText } from './smallReusables/TextComponents';
import ContentWrapper from './smallReusables/ContentWrapper';
import { IoIosSearch } from "react-icons/io";
import IconContainer from './smallReusables/IconContainer';
import { useNotification } from '../utils/notificationContext';

export default function Books() {

  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState();
  const [searchGenre, setSearchGenre] = useState();
  const [sortBy, setSortBy] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  const {setNotification} = useNotification();

  useEffect(() => {
    const getAllBooks = async () => {
      try {
        const res = await axios.get(process.env.REACT_APP_SEARCH_URI, { withCredentials: true,
          params: {
            page: 1
          }
        });
        setBooks(res.data.books);
        setCurrentPage(res.data.currentPage);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        const errorMessage = handleAxiosError(err);
        navigate('*', { state: { message: errorMessage } });
      }
    }
    getAllBooks();
    
  }, [navigate])

  useEffect(() => {
    if (!isSubmit) return;

    const searchBooks = async () => {
      try {
        const res = await axios.get(process.env.REACT_APP_SEARCH_URI, { withCredentials: true,
          params: {
            title: searchQuery,
            genre: searchGenre,
            sortBy: sortBy,
            page: currentPage
          }
        });
        
        setBooks(res.data.books);
        setCurrentPage(res.data.currentPage);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        setNotification(handleAxiosError(err));
      }
    }
    searchBooks();
    setIsSubmit(false);
    
  }, [searchQuery, searchGenre, sortBy, currentPage, isSubmit, setNotification])

  const searchQueryHandler = (e) => {
    const newSearchQuery = e.target.value;
    setSearchQuery(newSearchQuery);
  }

  const searchGenreHandler = (e) => {
    const newSearchGenre = e.target.value;
    setSearchGenre(newSearchGenre);
  }

  const sortHandler = (e) => {
    const newSortBy = e.target.value;
    setSortBy(newSortBy);
  }

  // GET request has withCredeintials and params together in the same configuration object
  const searchBooksHandeler = (e) => {
    e.preventDefault();

    // Triggers the useEffect
    setIsSubmit(true);
  }

  const paginationButtonNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const paginate = (e) => {
    e.preventDefault();
    setCurrentPage(parseInt(e.target.value, 10));

    console.log(e.target.value)
    // Triggers the useEffect
    setIsSubmit(true);
  }

  return (
    <ContentWrapper>
        <div className="text-center">
            <TitleText>Your bookshelf</TitleText>
        </div>

        <form className="shadow-md border-t-4 border-teal-800  bg-white rounded-lg p-10 my-10 flex flex-col justify-center items-center">
          <div className=" flex flex-row flex-wrap gap-4 items-center justify-center mb-5">
            <div className="w-48">
              <Input name="search" stateValue={searchQuery} placeholder="Type title or author" func={searchQueryHandler} />
            </div>
            <div className="w-48">
              <DropDownMenu name="Genre" arr={genreArray} func={searchGenreHandler} selectedVal={searchGenre} />
            </div>
            <div className="w-48">
              <DropDownMenu name="Sort by" arr={sortArray} func={sortHandler} selectedVal={sortBy} />
            </div>
          </div>
          <Button type="submit" name="Search" func={searchBooksHandeler} ><IconContainer><IoIosSearch /> Search</IconContainer></Button>
        </form>


          {books &&
            <>
              <div className="flex flex-row flex-wrap justify-center w-full">
                {books.map((book, index) => {
                  return (
                    <BookCard key={index} book={book} />
                  ) 
                })}
              </div>

              <nav className="p-5 flex flex-row justify-center gap-5">
                <Button type="button" name="Previous" optionalValue={currentPage - 1} optionalDisabledCondition={currentPage === 1} func={paginate} />

                {paginationButtonNumbers.map((paginationNumber, index) => {
                  return <MiniButton key={index} type="button" name={paginationNumber} optionalValue={paginationNumber} optionalDisabledCondition={currentPage === paginationNumber} func={paginate} />
                })}

                <Button type="button" name="Next" optionalValue={currentPage + 1} optionalDisabledCondition={currentPage === totalPages} func={paginate} />
              </nav>

            </>
          }

    </ContentWrapper>
  );
};
