import React from "react";
import { DarkLink } from "./smallReusables/EasyLink";
import { BodyText } from "./smallReusables/TextComponents";
import bookPlaceholder from '.././assets/book.webp';
import { Link } from "react-router-dom";
import { SpecialText } from "./smallReusables/TextComponents";
import RatingStars from "./smallReusables/RatingStars";

export default function BookCard({book}) {

    const {_id, title, author, genre, coverUrl, series, stars, notes} = book;

    const coverSrc = coverUrl ? `https://covers.openlibrary.org/b/id/${coverUrl}-M.jpg` : bookPlaceholder;

    return (

        <div className="w-96 min-h-96 bg-white shadow-md m-4 rounded-lg border-t-4 border-teal-800 grid grid-cols-2">

            <Link to={`details/${_id}`}>
                <img src={coverSrc} alt="Book cover" className="rounded-l-lg h-full object-cover" />
            </Link>

            <div className="flex flex-col p-5">
                <SpecialText>{title}</SpecialText>
                <div>
                    <BodyText>
                        <span className="material-symbols-outlined text-teal-700">ink_pen</span> {author}
                    </BodyText>
                    <BodyText>
                        <span className="material-symbols-outlined text-teal-700">book_2</span> {genre}
                    </BodyText>
                    {series && 
                        <BodyText>
                            <span class="material-symbols-outlined text-teal-700">lists</span> {series} 
                        </BodyText>
                    }
                    {stars && 
                        <BodyText>
                            <RatingStars stars={stars}/>
                        </BodyText>
                    }
                </div>
                <div className="mt-5">
                    <DarkLink to={`../details/${_id}`}>Details</DarkLink>
                </div>
            </div>

        </div>

    );

}