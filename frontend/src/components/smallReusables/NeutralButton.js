// Small buttons for forms etc.

export default function NeutralButton({type, name, optionalValue, optionalDisabledCondition, func, children}) {

    const disabledStyle = optionalDisabledCondition ? "bg-slate-500 text-slate-200" : "bg-slate-100 hover:text-teal-700";

    return (
        <button 
            className={`rounded-full w-48 border border-slate-500 px-5 text-center flex justify-center items-center p-1 font-bold tracking-wide font-playfair h-12 ${disabledStyle}`}
            type={type} 
            name={name} 
            value={optionalValue} 
            disabled={optionalDisabledCondition} 
            onClick={func}>
                {children}
        </button>
    );
}