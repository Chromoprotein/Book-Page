export default function Button({type, name, optionalValue, optionalDisabledCondition, func, children}) {
    return (
        <button 
            className="bg-teal-800 text-white rounded-full min-w-32 h-12 px-5 mx-auto font-bold tracking-wide font-playfair hover:scale-105 text-center"
            type={type} 
            name={name} 
            value={optionalValue} 
            disabled={optionalDisabledCondition} 
            onClick={func}>
                {children ? children : name}
        </button>
    );
}