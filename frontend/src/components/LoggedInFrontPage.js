import BookCard from "./BookCard";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { handleAxiosError } from "../utils/handleAxiosError";
import EasyLink from "./smallReusables/EasyLink";
import Message from "./smallReusables/Message";

export default function LoggedInFrontPage() {

    const [books, setBooks] = useState([]);
    const navigate = useNavigate();
    const [message, setMessage] = useState();

    useEffect(() => {
    const frontPageBooks = async () => {
        try {
            const res = await axios.get(process.env.REACT_APP_SEARCH_URI, { withCredentials: true,
                params: {
                    pageSize: 5,
                }
            });
            setBooks(res.data.books);
        } catch (err) {
            setMessage(handleAxiosError(err));
        }
    }
    frontPageBooks();

    }, [navigate])

    return (
        <>
            {books &&
                <>
                    <h1>You recently read:</h1>
                    {books.map((book, index) => {
                    return (
                        <BookCard key={index} book={book} details={true} />
                    ) 
                    })}
                    <EasyLink to="getBooks" name="View more" />
                </>
            }

            {message && <Message message={message} />}
        </>

    );
}