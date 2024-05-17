import { BodyText } from "./TextComponents";

export default function Textarea({ name, placeholder, stateValue, func, alert }) {

  const alertStyle = alert ? "border-b-4 border-red-500" : "border-0 bg-slate-100"

    return (
      <div className="w-full">
            <label className="text-sm text-teal-700 font-bold font-roboto p-1" for={name}>{name.toUpperCase()}</label>
            <textarea
            rows="4"
            className={`p-3 my-2 rounded-lg text-gray-900 text-gray-200 w-full placeholder:text-gray-900 placeholder:font-roboto focus:shadow-md shadow-inner ${alertStyle}`}
            name={name}
            value={stateValue}
            onChange={func}
            placeholder={placeholder ? placeholder : name}
            required
            ></textarea>
      </div>
    );
}