import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from './BookCard';
import DropDownMenu from './smallReusables/DropDownMenu';
import Input from './smallReusables/Input';
import Button from './smallReusables/Button';
import { genreArray } from '../utils/optionArrays';
import { sortArray } from '../utils/optionArrays';

export default function Books() {

  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState();
  const [searchGenre, setSearchGenre] = useState();
  const [sortBy, setSortBy] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isSubmit, setIsSubmit] = useState(false);

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
        console.error(err);
      }
    }
    getAllBooks();
    
  }, [])

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
        console.error(err);
      }
    }
    searchBooks();
    setIsSubmit(false);
    
  }, [searchQuery, searchGenre, sortBy, currentPage, isSubmit])

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
  const searchBooksHandeler = async (e) => {
    e.preventDefault();

    // Triggers the useEffect
    setIsSubmit(true);
  }

  const paginationButtonNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const paginate = async (e) => {
    e.preventDefault();
    setCurrentPage(e.target.value);

    // Triggers the useEffect
    setIsSubmit(true);
  }

  return (
    <div>
        <form>
          <Input name="search" stateValue={searchQuery} placeholder="Search books" func={searchQueryHandler} />

          <DropDownMenu name="Genre" arr={genreArray} func={searchGenreHandler} selectedVal={searchGenre} />

          <DropDownMenu name="Sort by" arr={sortArray} func={sortHandler} selectedVal={sortBy} />

          <Button type="submit" name="Search" func={searchBooksHandeler} />
        </form>

        {books.map((book, index) => {
           return (
            <BookCard key={index} book={book} details={true} />
           ) 
        })}

        <nav>
          <Button type="button" name="Previous" optionalValue={currentPage - 1} optionalDisabledCondition={currentPage === 1} func={paginate} />

          {paginationButtonNumbers.map((paginationNumber, index) => {
            return <Button key={index} type="button" name={paginationNumber} optionalValue={paginationNumber} optionalDisabledCondition={currentPage === paginationNumber} func={paginate} />
          })}

          <Button type="button" name="Next" optionalValue={currentPage + 1} optionalDisabledCondition={currentPage === totalPages} func={paginate} />
        </nav>
    </div>
  );
};
