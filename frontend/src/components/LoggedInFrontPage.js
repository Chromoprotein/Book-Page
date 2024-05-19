import BookCard from "./BookCard";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { handleAxiosError } from "../utils/handleAxiosError";
import { TitleText } from "./smallReusables/TextComponents";
import LinkButton from "./smallReusables/LinkButton";
import { BodyText } from "./smallReusables/TextComponents";
import ContentWrapper from "./smallReusables/ContentWrapper";
import { useNotification } from "../utils/notificationContext";

export default function LoggedInFrontPage() {

    const [books, setBooks] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const {setNotification} = useNotification();

    useEffect(() => {
    const frontPageBooks = async () => {
        try {
            setLoading(true);
            const res = await axios.get(process.env.REACT_APP_SEARCH_URI, { withCredentials: true,
                params: {
                    pageSize: 5,
                }
            });
            setBooks(res.data.books);
            setLoading(false);
        } catch (err) {
            setNotification(handleAxiosError(err));
            setLoading(false);
        }
    }
    frontPageBooks();

    }, [navigate])

    return (
        <ContentWrapper>
            <div className="text-center">
                <TitleText>Your recent books</TitleText>
            </div>
            {loading ? "Loading" : 
                <>{books.length > 0 ?
                    <div className="w-full flex flex-col gap-5 justify-center">
                        <div className="w-full flex flex-wrap justify-center">
                            {books.map((book, index) => {
                            return (
                                <BookCard key={index} book={book} details={true} />
                            ) 
                            })}
                        </div> 
                        <div className="text-center mx-auto">
                            <LinkButton to="getBooks">View More</LinkButton>
                        </div>
                    </div> 
                :
                    <EmptyFrontPage/>
                }</>
            }
                
        </ContentWrapper>

    );
}

function EmptyFrontPage() {
    return (
        <div className="w-full flex flex-col gap-5 justify-center text-center">
            <BodyText>...there are only tumbleweeds here.</BodyText>
            <LinkButton to={`addBook`}>Upload a book</LinkButton>
        </div>
    );
}