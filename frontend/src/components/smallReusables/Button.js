// Small buttons for forms etc.

export default function Button({type, name, optionalValue, optionalDisabledCondition, func, children, alert}) {

    const disabledStyle = optionalDisabledCondition ? "bg-slate-500 text-slate-200" : "bg-gradient-to-r from-teal-800 to-teal-500 text-teal-100 hover:text-white";

    const alertStyle = alert ? "border-2 border-red-500" : "border-0";

    return (
        <button 
            className={`rounded-full w-48 px-5 text-center flex justify-center items-center p-1 font-bold tracking-wide font-playfair h-12 ${disabledStyle} ${alertStyle}`}
            type={type} 
            name={name} 
            value={optionalValue} 
            disabled={optionalDisabledCondition} 
            onClick={func}>
                {children ? children : name}
        </button>
    );
}