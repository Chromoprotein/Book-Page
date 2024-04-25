import React from "react";

export default function Input({ name, placeholder, stateValue, func }) {

    return (
        <div>
            <label for={name}>{name}</label>
            <input name={name} placeholder={placeholder} value={stateValue} onChange={func} />
        </div>
    );
}