import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Button from './smallReusables/Button';
import DumbBookForm from './DumbBookForm';
import BookCard from './BookCard';

export default function Details() {

    let { id } = useParams();
    const [book, setBook] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [formState, setFormState] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [successMessage, setSuccessMessage] = useState();

    useEffect(() => {
        const getBook = async () => {
            try {
                const url = `${process.env.REACT_APP_BOOK_DETAIL_URI}/${id}`;
                const res = await axios.get(url, { 
                    withCredentials: true
                });
                setBook(res.data.book);
                setFormState({ title: res.data.book.title, author: res.data.book.author, genre: res.data.book.genre })
            } catch (err) {
                console.error(err);
            }
        }
        getBook();
    }, [id, isSubmitted])

    const toggleEdit = () => {
        setEditMode((prev) => !prev);
    }

    const formStateHandler = (e) => {
        setFormState((prevState) => ({
            ...prevState, 
            [e.target.name]: e.target.value
        }));
    }

    const submitFormHandler = async (e) => {
        e.preventDefault();
        try {
            const url = `${process.env.REACT_APP_UPDATE_BOOK_URI}/${book._id}`; // Include book ID in URL
            const response = await axios.put(url, formState, { withCredentials: true });
            console.log(response.data);
            setSuccessMessage(response.data.message);
            setEditMode(false);
            setIsSubmitted((prev) => !prev);
        } catch (error) {
            console.error(error.response.data); // To get more detailed error info
        }
    };

    const deleteBook = async (e) => {
        e.preventDefault();
        try {
            const url = `${process.env.REACT_APP_DELETE_BOOK_URI}/${book._id}`; // Include book ID in URL
            const response = await axios.delete(url, { withCredentials: true });
            console.log(response.data);
            setSuccessMessage(response.data.message);
            setBook(null);
            setEditMode(false);
        } catch (error) {
            console.error(error.response.data);
        }
    }

    return (
        <div>
            {book &&
                <>
                    <BookCard book={book} details={false} />
  
                    <Button type="button" func={toggleEdit} name={editMode ? "Cancel" : "Edit"}/>

                    <Button type="button" func={deleteBook} name="Delete" />
                </>
            }

            {successMessage}

            {editMode && 
                <DumbBookForm formState={formState} formStateHandler={formStateHandler} submitFormHandler={submitFormHandler} />
            }
        </div>
        
    );
}