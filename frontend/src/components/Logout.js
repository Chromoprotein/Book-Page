import {useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { navigateWithTimeout } from "../utils/navigateWithTimeout";
import { handleAxiosError } from "../utils/handleAxiosError";
import { useNotification } from "../utils/notificationContext";
import { useAuth } from "../utils/authContext";

export default function Logout() {

    const {setNotification} = useNotification();
    const navigate = useNavigate();
    const { isAuthenticated, loading, setIsAuthenticated } = useAuth();

    useEffect(() => {
        async function logout() {
            try {
                const response = await axios.post(process.env.REACT_APP_LOGOUT_URI, {}, {
                    withCredentials: true
                });
                setNotification(response.data.message);
                sessionStorage.removeItem('isAuthenticated');
                setIsAuthenticated(null);
                navigateWithTimeout(navigate);
            } catch (error) {
                const errorMessage = handleAxiosError(error);
                navigate('*', { state: { message: errorMessage } });
            }
        }
        logout();
    })
}