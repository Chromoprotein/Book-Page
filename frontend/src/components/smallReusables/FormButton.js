// Small buttons for forms etc.

export default function FormButton({type, name, optionalValue, optionalDisabledCondition, func, children, alert}) {

    const disabledStyle = optionalDisabledCondition ? "bg-slate-500 text-slate-200" : "bg-white text-gray-900";

    const alertStyle = alert ? "border-red-500" : "border-teal-700";

    return (
        <div className="flex flex-col w-full">
            <label className="text-sm text-teal-700 font-bold font-roboto p-1" for={name}>{name.toUpperCase()}</label>
            <button 
                className={`p-3 my-2 rounded-lg text-left h-12 flex items-center font-roboto border focus:shadow-md shadow-inner ${disabledStyle} ${alertStyle}`}
                type={type} 
                name={name} 
                value={optionalValue} 
                disabled={optionalDisabledCondition} 
                onClick={func}>
                    {children ? children : name}
            </button>
        </div>
    );
}