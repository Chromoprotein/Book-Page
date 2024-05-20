import { Link } from "react-router-dom";

export function DarkLink({to, children}) {
    
    return (
        <Link className="text-center p-1 font-bold tracking-wide text-teal-600 hover:text-teal-300 m-5 font-roboto" to={to}>
            {children}
        </Link>
    );
}

export function LightLink({to, children}) {
    
    return (
        <Link className="text-center p-1 font-bold tracking-wide text-teal-100 hover:text-white m-5 font-roboto flex justify-center items-center gap-1" to={to}>
            {children}
        </Link>
    );
}

export function TitleLink({to, children}) {
    
    return (
        <Link className="text-4xl font-bold p-5 tracking-wide leading-relaxed text-teal-100 text-center hover:text-white font-poppins" to={to}>
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
