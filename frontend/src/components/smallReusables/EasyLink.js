import { Link } from "react-router-dom";

export default function EasyLink({to, name}) {
    return (
        <Link className="text-center p-2" to={to}>{name}</Link>
    );
}