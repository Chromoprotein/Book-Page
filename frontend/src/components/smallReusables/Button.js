export default function Button({type, name, optionalValue, optionalDisabledCondition, func}) {
    return (
        <button 
            className=""
            type={type} 
            name={name} 
            value={optionalValue} 
            disabled={optionalDisabledCondition} 
            onClick={func}>
                {name}
        </button>
    );
}