// Small buttons for forms etc.

export default function Button({type, name, optionalValue, optionalDisabledCondition, func, children}) {
    return (
        <button 
            className="bg-teal-800 rounded-full w-32 px-5 mx-auto text-center p-1 font-bold tracking-wide font-playfair text-teal-100 hover:text-amber-100"
            type={type} 
            name={name} 
            value={optionalValue} 
            disabled={optionalDisabledCondition} 
            onClick={func}>
                {children ? children : name}
        </button>
    );
}