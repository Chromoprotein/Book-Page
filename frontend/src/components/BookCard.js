import React from "react";
import { Link } from "react-router-dom";

export default function BookCard({book}) {

    const {_id, title, author, genre} = book;

    return (

        <ul>
            <li>Id: {_id}</li>
            <li>Name: {title}</li>
            <li>Author: {author}</li>
            <li>Genre: {genre}</li>
            <li><Link to={`details/${_id}`}>Details</Link></li>
        </ul>

    );

}