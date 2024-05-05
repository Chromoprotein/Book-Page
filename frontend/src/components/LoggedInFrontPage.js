import BookCard from "./BookCard";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { handleAxiosError } from "../utils/handleAxiosError";
import { DarkLink } from "./smallReusables/EasyLink";
import Message from "./smallReusables/Message";
import { TitleText } from "./smallReusables/TextComponents";
import LinkButton from "./smallReusables/LinkButton";
import { BodyText } from "./smallReusables/TextComponents";

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
        <div className="w-2/3 mx-auto min-h-screen">
            <TitleText>Your recent books</TitleText>
            {books.length > 0 ?
                <div className="w-full flex flex-col gap-5 justify-center">
                    <div className="flex flex-wrap justify-center">
                        {books.map((book, index) => {
                        return (
                            <BookCard key={index} book={book} details={true} />
                        ) 
                        })}
                    </div> 
                    
                    <LinkButton to="getBooks">View More</LinkButton>
                </div> 
                :
                <div className="w-full flex flex-col gap-5 justify-center text-center">
                    <BodyText>...there are only tumbleweeds here.</BodyText>
                    <LinkButton to={`addBook`}>Upload a book</LinkButton>
                </div>
            }

            {message && <Message message={message} />}
        </div>

    );
}