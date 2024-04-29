import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Button from './smallReusables/Button';
import DumbBookForm from './DumbBookForm';
import BookCard from './BookCard';
import EasyLink from './smallReusables/EasyLink';
import { handleAxiosError } from '../utils/handleAxiosError';
import { useNavigate } from 'react-router-dom';
import { navigateWithTimeout } from '../utils/navigateWithTimeout';
import Message from './smallReusables/Message';

export default function Details() {

    let { id } = useParams();
    const [book, setBook] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [formState, setFormState] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [message, setMessage] = useState();
    const navigate = useNavigate();
    const [showConfirm, setShowConfirm] = useState(false);

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
                const errorMessage = handleAxiosError(err);
                navigate('*', { state: { message: errorMessage } });
            }
        }
        getBook();
    }, [id, isSubmitted, navigate])

    const toggleEdit = () => {
        setEditMode((prev) => !prev);
    }

    const toggleConfirm = () => {
        setShowConfirm((prev) => !prev);
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
            setMessage(response.data.message);
            setEditMode(false);
            setIsSubmitted((prev) => !prev);
        } catch (error) {
            setMessage(handleAxiosError(error));
        }
    };

    const deleteBook = async (e) => {
        e.preventDefault();
        try {
            const url = `${process.env.REACT_APP_DELETE_BOOK_URI}/${book._id}`; // Include book ID in URL
            const response = await axios.delete(url, { withCredentials: true });
            console.log(response.data);
            setMessage(response.data.message);
            setBook(null);
            setEditMode(false);
            navigateWithTimeout(navigate);
        } catch (error) {
            setMessage(handleAxiosError(error));
        }
    }

    return (
        <div>
            {message && <Message message={message} />}
            {book &&
                <>
                    <BookCard book={book} details={false} />
  
                    <Button type="button" func={toggleEdit} name={editMode ? "Cancel" : "Edit"}/>

                    <Button type="button" func={toggleConfirm} name="Delete" />
                    {showConfirm &&
                        <>
                            <p>Confirm you want to delete this book permanently</p>
                            <Button type="button" func={deleteBook} name="Delete" />
                        </>
                    }
                </>
            }

            {editMode && 
                <DumbBookForm formState={formState} formStateHandler={formStateHandler} submitFormHandler={submitFormHandler} />
            }

            <EasyLink to="/" name="Return" />
        </div>
        
    );
}