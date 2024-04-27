import React from "react";

export default function Input({ name, type = "text", placeholder, stateValue, func }) {

    return (
        <div>
            <label for={name}>{name}</label>
            <input name={name} type={type} placeholder={placeholder} value={stateValue} onChange={func} />
        </div>
    );
}