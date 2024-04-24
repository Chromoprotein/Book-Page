import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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
                    <ul>
                        <li>Id: {book._id}</li>
                        <li>Name: {book.title}</li>
                        <li>Author: {book.author}</li>
                        <li>Genre: {book.genre}</li>
                        <li>Read by: {book.userId}</li>
                    </ul>
                    <button type="button" onClick={toggleEdit}>{editMode ? "Cancel" : "Edit"}</button>

                    <button type="button" onClick={deleteBook}>Delete</button>
                </>
            }

            {successMessage}

            {editMode && 
                <form>
                    <label for="title">Title</label>
                    <input name="title" value={formState.title} onChange={formStateHandler} />

                    <label for="author">Author</label>
                    <input name="author" value={formState.author} onChange={formStateHandler} />

                    <select onChange={formStateHandler} name="genre" value={formState.genre}>
                        <option value="" disabled>Genre</option>
                        <option value="Fantasy">Fantasy</option>
                        <option value="Sci-fi">Sci-fi</option>
                    </select>

                    <button type="submit" onClick={submitFormHandler}>Submit</button>
                </form>
            }
        </div>
        
    );
}