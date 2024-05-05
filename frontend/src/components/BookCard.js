import React from "react";
import { DarkLink } from "./smallReusables/EasyLink";
import { BodyText } from "./smallReusables/TextComponents";
import bookPlaceholder from '.././assets/book.webp';
import { Link } from "react-router-dom";

export default function BookCard({book, details}) {

    const {_id, title, author, genre} = book;

    return (

        <div className="w-96 bg-gray-100 m-4 rounded-lg">
            <div className="grid grid-cols-2 rounded-lg justify-center items-center">
                <Link to={`details/${_id}`}><img src={bookPlaceholder} alt="Book cover" className="rounded-l-lg h-full" /></Link>
                <div>
                    <BodyText>{title} by {author}</BodyText>
                    <BodyText>Genre: {genre}</BodyText>
                    {details && <DarkLink to={`details/${_id}`}>Details</DarkLink>}
                </div>
            </div>
        </div>

    );

}