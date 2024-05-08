import React from "react";
import { DarkLink } from "./smallReusables/EasyLink";
import { BodyText } from "./smallReusables/TextComponents";
import bookPlaceholder from '.././assets/book.webp';
import { Link } from "react-router-dom";
import { SpecialText } from "./smallReusables/TextComponents";

export default function BookCard({book, details}) {

    const {_id, title, author, genre} = book;

    return (

        <div className="w-96 bg-white shadow-md m-4 rounded-lg border-t-4 border-teal-800 grid grid-cols-2">

            <Link to={`details/${_id}`}><img src={bookPlaceholder} alt="Book cover" className="rounded-l-lg h-full object-cover" /></Link>

            <div className="flex flex-col p-5">
                <SpecialText>{title}</SpecialText>
                <div>
                    <BodyText><span className="material-symbols-outlined">ink_pen</span>{author}</BodyText>
                    <BodyText><span className="material-symbols-outlined">book_2</span> {genre}</BodyText>
                    <BodyText><span className="material-symbols-outlined">book_2</span> Series </BodyText>
                    <BodyText><span className="material-symbols-outlined">book_2</span> Rating</BodyText>
                </div>
                <div className="mt-5">
                    {details && <DarkLink to={`../details/${_id}`}>Details</DarkLink>}
                </div>
            </div>

        </div>

    );

}