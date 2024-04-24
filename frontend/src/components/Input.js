import React from "react";

export default function Input({ name, placeholder, func }) {

    return (
        <input name={name} placeholder={placeholder} onChange={func} />
    );
}