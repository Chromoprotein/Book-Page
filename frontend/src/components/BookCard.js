import React from "react";
import EasyLink from "./smallReusables/EasyLink";

export default function BookCard({book, details}) {

    const {_id, title, author, genre} = book;

    return (

        <ul>
            <li>Id: {_id}</li>
            <li>Name: {title}</li>
            <li>Author: {author}</li>
            <li>Genre: {genre}</li>
            {details && <li>
                <EasyLink to={`details/${_id}`} name="Details"/>
            </li>}
        </ul>

    );

}