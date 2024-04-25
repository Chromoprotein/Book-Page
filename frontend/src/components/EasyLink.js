import { Link } from "react-router-dom";

export default function EasyLink({to, name}) {
    return (
        <Link to={to}>{name}</Link>
    );
}