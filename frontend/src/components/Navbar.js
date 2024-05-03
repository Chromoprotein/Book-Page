import { useAuth } from '../utils/useAuth';
import EasyLink from './smallReusables/EasyLink';

export default function Navbar() {

    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <nav className="bg-teal-700 h-20 px-10 gap-3 flex justify-between font-bold tracking-wide font-playfair">
                <div className="flex justify-start items-center">
                    {<EasyLink to="/" name="Reading challenge" />}
                </div>
                <div className="flex justify-end items-center">
                    {!isAuthenticated && <EasyLink to="register" name="Register" />}
                    {!isAuthenticated && <EasyLink to="login" name="Log in" />}

                    {isAuthenticated && <EasyLink to="getBooks" name="My books" />}
                    {isAuthenticated && <EasyLink to="addBook" name="Add books" />}
                    {isAuthenticated && <EasyLink to="logout" name="Log out" />}
                </div>
        </nav>
    );
}