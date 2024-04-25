import { Link } from 'react-router-dom';
import { useAuth } from '../utils/useAuth';
import EasyLink from './EasyLink';

export default function Navbar() {

    const { isAuthenticated, loading } = useAuth();
    console.log(isAuthenticated)
    if (loading) {
        console.log("loading in the app.js")
        return <div>Loading...</div>;
    }

    return (
    <nav>
        <ul>
            {!isAuthenticated &&
                <>
                    <li>
                    <EasyLink to="register" name="Register" />
                    </li>
                    <li>
                    <EasyLink to="login" name="Log in" />
                    </li>
                </>
            }
            {isAuthenticated &&
                <>
                    <li>
                    <EasyLink to="getBooks" name="My books" />
                    </li>
                    <li>
                    <EasyLink to="addBook" name="Add books" />
                    </li>
                    <li>
                    <EasyLink to="logout" name="Log out" />
                    </li>
                </>
            }
        </ul>
        </nav>
    );
}