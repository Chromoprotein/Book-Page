import { useAuth } from '../utils/authContext';
import { LightLink, TitleLink } from './smallReusables/EasyLink';
import bookicon from '.././assets/bookicon.jpg';

export default function NavbarFooter({ children }) {

    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <nav className="bg-gradient-to-r from-teal-800 to-teal-600 h-20 px-10 gap-3 flex justify-between">
                    <div className="flex justify-start items-center">
                        <LightLink to="/">
                            <img src={bookicon} alt="Home link icon" className="h-16 rounded-full" />
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

            <div className="bg-white min-h-screen">
                <div className="bg-white w-full h-full bg-opacity-50 pb-10"> 
                    {children}
                </div>
            </div>
            
            <div className="bg-gradient-to-r from-teal-800 to-teal-600 h-20 px-10 gap-3 flex justify-center items-center">
                <LightLink to="about">About</LightLink>
                <LightLink to="https://github.com/Chromoprotein">Github</LightLink>
                <LightLink to="more">More websites</LightLink>
            </div>
        </>
    );
}