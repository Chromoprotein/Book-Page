import { useAuth } from '../utils/useAuth';
import EasyLink from './smallReusables/EasyLink';

export default function Navbar() {

    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <nav className="sticky top-0 bg-teal-700">
                <div className="flex justify-start items-center">
                    {<EasyLink to="/" name="Reading challenge" />}

                    {!isAuthenticated && <EasyLink to="register" name="Register" />}
                    {!isAuthenticated && <EasyLink to="login" name="Log in" />}

                    {isAuthenticated && <EasyLink to="getBooks" name="My books" />}
                    {isAuthenticated && <EasyLink to="addBook" name="Add books" />}
                    {isAuthenticated && <EasyLink to="logout" name="Log out" />}
                </div>
        </nav>
    );
}