import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Button from './smallReusables/Button';
import DumbBookForm from './DumbBookForm';
import { handleAxiosError } from '../utils/handleAxiosError';
import { useNavigate } from 'react-router-dom';
import { navigateWithTimeout } from '../utils/navigateWithTimeout';
import Message from './smallReusables/Message';
import { TitleText } from './smallReusables/TextComponents';
import { BodyText } from './smallReusables/TextComponents';
import ContentWrapper from './smallReusables/ContentWrapper';
import { DarkLink } from './smallReusables/EasyLink';
import bookPlaceholder from '.././assets/book.webp';
import { SpecialText } from './smallReusables/TextComponents';

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
        <ContentWrapper>
        <div className="flex flex-col justify-center items-center">
            {message && <Message message={message} />}
            {book &&
                <>
                    <div className="bg-white shadow-md m-4 rounded-lg grid grid-cols-2 w-full">

                        <img src={bookPlaceholder} alt="Book cover" className="rounded-l-lg h-full object-cover" />

                        <div className="flex flex-col p-5 justify-between">
                            <SpecialText>{book.title}</SpecialText>
                            <div>
                                <BodyText><span className="material-symbols-outlined">ink_pen</span>{book.author}</BodyText>
                                <BodyText><span className="material-symbols-outlined">book_2</span> {book.genre}</BodyText>
                                <BodyText><span className="material-symbols-outlined">book_2</span> Series </BodyText>
                                <BodyText><span className="material-symbols-outlined">book_2</span> Rating</BodyText>
                            </div>
                            <div className="flex flex-row justify-center gap-5">
                                <Button type="button" func={toggleEdit} name={editMode ? "Cancel" : "Edit"}/>
                                <Button type="button" func={toggleConfirm} name="Delete" />
                            </div>
                        </div>

                    </div>
  
                    {editMode && 
                        <DumbBookForm title="Edit book details" formState={formState} formStateHandler={formStateHandler} submitFormHandler={submitFormHandler} />
                    }

                    {showConfirm &&
                        <div className="shadow-lg rounded-lg p-5 bg-slate-100 m-5">
                            <BodyText>Confirm you want to delete this book permanently</BodyText>
                            <div className="flex flex-row justify-center gap-5">
                                <Button type="button" func={deleteBook} name="Continue" />
                                <Button type="button" func={toggleConfirm} name="Cancel" />
                            </div>
                        </div>
                    }
                </>
            }

            <div className="mt-10">
                <DarkLink to="/">Return to book list</DarkLink>
            </div>
        </div>
        </ContentWrapper>
        
    );
}