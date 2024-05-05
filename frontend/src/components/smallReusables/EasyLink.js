import { Link } from "react-router-dom";

export function DarkLink({to, children}) {
    
    return (
        <Link className="text-center p-1 font-bold tracking-wide font-playfair text-black hover:text-teal-500 m-5" to={to}>
            {children}
        </Link>
    );
}

export function LightLink({to, children}) {
    
    return (
        <Link className="text-center p-1 font-bold tracking-wide font-playfair text-teal-100 hover:text-amber-100 m-5" to={to}>
            {children}
        </Link>
    );
}

export function TitleLink({to, children}) {
    
    return (
        <Link className="text-4xl font-bold p-5 tracking-wide leading-relaxed text-teal-100 font-playfair text-center hover:text-amber-100" to={to}>
            {children}
        </Link>
    );
}











// Phasing out this one
export default function EasyLink({to, name, children, size}) {
    
    const sizeClass = size && "text-2xl";
    
    return (
        <Link className={`text-center p-2 ${sizeClass} `} to={to}>
            {children ? children : name}
        </Link>
    );
}
