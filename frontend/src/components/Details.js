import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Button from './smallReusables/Button';
import { handleAxiosError } from '../utils/handleAxiosError';
import { useNavigate } from 'react-router-dom';
import { navigateWithTimeout } from '../utils/navigateWithTimeout';
import { BodyText } from './smallReusables/TextComponents';
import ContentWrapper from './smallReusables/ContentWrapper';
import { DarkLink } from './smallReusables/EasyLink';
import bookPlaceholder from '.././assets/book.webp';
import { SpecialText } from './smallReusables/TextComponents';
import RatingStars from "./smallReusables/RatingStars";
import NeutralButton from './smallReusables/NeutralButton';
import LinkButton from './smallReusables/LinkButton';
import { useNotification } from '../utils/notificationContext';

export default function Details() {

    let { id } = useParams();
    const [book, setBook] = useState([]);
    const navigate = useNavigate();
    const [showConfirm, setShowConfirm] = useState(false);
    const {setNotification} = useNotification();

    useEffect(() => {
        const getBook = async () => {
            try {
                const url = `${process.env.REACT_APP_BOOK_DETAIL_URI}/${id}`;
                const res = await axios.get(url, { 
                    withCredentials: true
                });
                setBook(res.data.book);
            } catch (err) {
                const errorMessage = handleAxiosError(err);
                navigate('*', { state: { message: errorMessage } });
            }
        }
        getBook();
    }, [id, navigate])

    const coverSrc = book.coverUrl ? `https://covers.openlibrary.org/b/id/${book.coverUrl}-L.jpg` : bookPlaceholder;

    const toggleConfirm = () => {
        setShowConfirm((prev) => !prev);
    }

    const deleteBook = async (e) => {
        e.preventDefault();
        try {
            const url = `${process.env.REACT_APP_DELETE_BOOK_URI}/${book._id}`; // Include book ID in URL
            const response = await axios.delete(url, { withCredentials: true });
            console.log(response.data);
            setNotification(response.data.message);
            navigateWithTimeout(navigate);
        } catch (error) {
            setNotification(handleAxiosError(error));
        }
    }

    return (
        <ContentWrapper>
        <div className="flex flex-col justify-center items-center">
            {book &&
                <>
                    <div className="bg-white shadow-md m-4 rounded-lg grid grid-cols-2 w-full">

                        <img src={coverSrc} alt="Book cover" className="rounded-l-lg h-full object-cover" />

                        <div className="flex flex-col p-5 justify-between">
                            <SpecialText>{book.title}</SpecialText>
                            <div>
                                <BodyText><span className="material-symbols-outlined text-teal-700">ink_pen</span>{book.author}</BodyText>
                                <BodyText><span className="material-symbols-outlined text-teal-700">book_2</span> {book.genre}</BodyText>
                                {book.series && 
                                    <BodyText>
                                        <span class="material-symbols-outlined text-teal-700">lists</span> {book.series} 
                                    </BodyText>
                                }
                                {book.stars && 
                                    <BodyText>
                                        <RatingStars stars={book.stars}/>
                                    </BodyText>
                                }
                                {book.notes &&
                                    <BodyText>
                                        <span class="material-symbols-outlined text-teal-700">reviews</span> {book.notes}
                                    </BodyText>}
                            </div>
                            {showConfirm ?
                                <div className="shadow-lg rounded-lg p-5 bg-slate-100 m-5">
                                    <BodyText>Confirm you want to delete this book permanently</BodyText>
                                    <div className="flex flex-row justify-center gap-5">
                                        <Button type="button" func={deleteBook} name="Continue" />
                                        <Button type="button" func={toggleConfirm} name="Cancel" />
                                    </div>
                                </div>
                            : 
                            <div className="flex flex-row justify-center gap-5">
                                <LinkButton to={`../addBook/${id}`}>Edit</LinkButton>
                                <NeutralButton type="button" func={toggleConfirm} name="Delete">Delete</NeutralButton>
                            </div>
                            }
                        </div>

                    </div>
                </>
            }

            <div className="mt-10">
                <DarkLink to="/">Return to book list</DarkLink>
            </div>
        </div>
        </ContentWrapper>
        
    );
}