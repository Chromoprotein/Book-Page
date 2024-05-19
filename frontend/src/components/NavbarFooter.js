import { useAuth } from '../utils/authContext';
import { LightLink, TitleLink } from './smallReusables/EasyLink';
import bookicon from '.././assets/bookicon.jpg';
import { useRef, useEffect } from 'react';
import { useNotification } from '../utils/notificationContext';

export default function NavbarFooter({ children }) {

    const { isAuthenticated } = useAuth();
    const navbarRef = useRef(null);
    const notificationBarRef = useRef(null);
    const {notification, setNotification} = useNotification();

    useEffect(() => {
        if(notification) {
            const handleScroll = () => {
            const navbar = navbarRef.current;
            const notificationBar = notificationBarRef.current;
            const navbarHeight = navbar.offsetHeight;
            const scrollTop = document.documentElement.scrollTop;

            if (scrollTop > navbarHeight) {
                notificationBar.style.position = 'fixed';
                notificationBar.style.top = '0';
            } else {
                notificationBar.style.position = 'absolute';
                notificationBar.style.top = `${navbarHeight}px`;
            }
            };

            window.addEventListener('scroll', handleScroll);
            handleScroll(); // Initialize position on load

            // Cleanup the event listener on component unmount
            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }
    }, [notification]);

    const closeNotification = () => {
        setNotification("");
    }

    return (
        <>
            <nav className="navbar bg-gradient-to-r from-teal-800 to-teal-600 h-20 px-10 gap-3 flex justify-between" ref={navbarRef}>
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

            {notification &&
                <div className="notification-bar bg-teal-700 text-white z-40 w-full top-0 left-0 right-0 absolute flex flex-row justify-between p-2" ref={notificationBarRef}>
                    <p>{notification}</p>
                    <button onClick={closeNotification}>X</button>
                </div>
            }

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