import { Link } from "react-router-dom";

// Links meant for dark backgrounds 

export default function EasyLink({to, name, children, size}) {
    
    const sizeClass = size && "text-2xl";
    
    return (
        <Link className={`text-center p-2 font-bold tracking-wide font-playfair text-teal-100 hover:text-amber-100 ${sizeClass} `} to={to}>
            {children ? children : name}
        </Link>
    );
}