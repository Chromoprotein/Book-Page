import React, {useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { navigateWithTimeout } from "../utils/navigateWithTimeout";
import { handleAxiosError } from "../utils/handleAxiosError";

export default function Logout() {

    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        async function logout() {
            try {
                const response = await axios.post(process.env.REACT_APP_LOGOUT_URI, {}, {
                    withCredentials: true
                });
                setMessage(response.data.message);
                navigateWithTimeout(navigate);
            } catch (error) {
                const errorMessage = handleAxiosError(error);
                navigate('*', { state: { message: errorMessage } });
            }
        }
        logout();
        sessionStorage.removeItem('isAuthenticated');
        sessionStorage.removeItem('userRole');
    }, [navigate])

    return (
        <p>{message && message}</p>
    );
}