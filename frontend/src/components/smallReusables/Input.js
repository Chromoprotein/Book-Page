import React from "react";
import { BodyText } from "./TextComponents";
import { SpecialText } from "./TextComponents";

export default function Input({ name, type = "text", placeholder, stateValue, func }) {

    return (
      <div className="w-full">
          <input
            className="p-3 my-5 border-b-4 border-teal-700 bg-white text-gray-900 text-gray-200 w-full placeholder:text-teal-700 placeholder:font-playfair"
            name={name}
            value={stateValue}
            onChange={func}
            placeholder={placeholder ? placeholder : name}
            required
          />
      </div>
    );
}