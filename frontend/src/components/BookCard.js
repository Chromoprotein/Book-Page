import React from "react";
import { DarkLink } from "./smallReusables/EasyLink";
import { BodyText } from "./smallReusables/TextComponents";
import bookPlaceholder from '.././assets/book.webp';
import { Link } from "react-router-dom";
import { SpecialText } from "./smallReusables/TextComponents";
import RatingStars from "./smallReusables/RatingStars";

export default function BookCard({book}) {

    const {_id, title, author, coverUrl, stars} = book;

    const coverSrc = coverUrl ? `https://covers.openlibrary.org/b/id/${coverUrl}-M.jpg` : bookPlaceholder;

    return (

        <div className="w-96 bg-white shadow p-5 m-4 rounded-lg flex flex-col items-center justify-start">

            <Link to={`details/${_id}`}>
                <img src={coverSrc} alt="Book cover" className="h-48 rounded-lg object-cover" />
            </Link>

            <div className="flex flex-col p-2 justify-center items-center text-center">
                <Link to={`details/${_id}`}>
                    <SpecialText>{title}</SpecialText>
                </Link>
                <BodyText>
                    <span className="material-symbols-outlined text-teal-700">ink_pen</span> {author}
                </BodyText>
                {stars && 
                    <BodyText>
                        <RatingStars stars={stars}/>
                    </BodyText>
                }
            </div>

        </div>

    );

}