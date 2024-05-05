import { useAuth } from '../utils/useAuth';
import { LightLink, TitleLink } from './smallReusables/EasyLink';
import bookicon from '.././assets/bookicon.webp';

export default function Navbar() {

    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <nav className="bg-teal-700 h-20 px-10 gap-3 flex justify-between">
                <div className="flex justify-start items-center">
                    <LightLink to="/">
                        <img src={bookicon} alt="Home link icon" className="h-20" />
                    </LightLink>
                    <TitleLink to="/">Booksmosis</TitleLink>
                </div>
                <div className="flex justify-end items-center">
                    {!isAuthenticated && <LightLink to="register">Register</LightLink>}
                    {!isAuthenticated && <LightLink to="login">Log in</LightLink>}

                    {isAuthenticated && <LightLink to="getBooks">My books</LightLink>}
                    {isAuthenticated && <LightLink to="addBook">Add books</LightLink>}
                    {isAuthenticated && <LightLink to="logout">Log out</LightLink>}
                </div>
        </nav>
    );
}