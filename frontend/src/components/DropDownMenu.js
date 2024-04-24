import React from "react";

export default function DropDownMenu({name, arr, func, selectedVal}) {
    return (
          <select onChange={func} value={selectedVal ? selectedVal : ""}>
            <option value="" disabled>{name}</option>
            {arr.map((item, index) => {
                return <option key={index} value={item}>{item}</option>
            })}
          </select>
    );
}