export default function MiniButton({type, name, optionalValue, optionalDisabledCondition, func, children}) {

    const disabledStyle = optionalDisabledCondition ? "bg-slate-500 text-slate-200" : "bg-gradient-to-r from-teal-800 to-teal-500 text-teal-100 hover:text-white";

    return (
        <button 
            className={`rounded-full w-15 px-5 text-center p-1 font-bold tracking-wide font-playfair h-12 ${disabledStyle}`}
            type={type} 
            name={name} 
            value={optionalValue} 
            disabled={optionalDisabledCondition} 
            onClick={func}>
                {children ? children : name}
        </button>
    );
}