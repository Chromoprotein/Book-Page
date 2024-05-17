import React from "react";
import { BodyText } from "./TextComponents";
import { SpecialText } from "./TextComponents";

export default function Input({ name, type = "text", placeholder, stateValue, func, alert }) {

  const alertStyle = alert ? "border-b-4 border-red-500" : "border-0 bg-slate-100"

    return (
      <div className="flex flex-col w-full">
          <label className="text-sm text-teal-700 font-bold font-roboto p-1" for={name}>{name.toUpperCase()}</label>
          <input
            className={`p-3 my-2 rounded-lg text-gray-900 h-12 placeholder:text-gray-900 placeholder:font-roboto focus:shadow-md shadow-inner ${alertStyle}`}
            name={name}
            value={stateValue}
            onChange={func}
            type={type}
            placeholder={placeholder}
            required
          />
      </div>
    );
}